import { useState, useEffect, useRef } from 'react';
import { Mic, VolumeX, Volume2, X, Loader2, ChevronLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useElevenLabsConversation } from '@/hooks/useElevenLabsConversation';
import { ALAKH_PANDEY_PROMPT } from '@/constants/personas';
import { WhiteboardCanvas } from '@/components/ai-tutor/WhiteboardCanvas';
import { CircularWaveform } from '@/components/ai-tutor/CircularWaveform';
import { TeacherAvatar } from '@/components/ai-tutor/TeacherAvatar';
import { PageLayout } from '@/components/layout/PageLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';

export default function AITutorPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  interface Message {
    text: string;
    isUser: boolean;
    timestamp: number;
  }
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    isReady,
    isActive: isSessionActive,
    isSpeaking,
    isListening,
    isMuted,
    currentSpeech,
    error: elevenLabsError,
    startSession,
    endSession,
    toggleMute,
    generateSpeech,
    sendTextMessage
  } = useElevenLabsConversation({
    systemPrompt: ALAKH_PANDEY_PROMPT,
    onSpeechStart: () => {
      console.log('AI started speaking');
    },
    onSpeechEnd: () => {
      console.log('AI stopped speaking');
    },
    onTranscript: (text) => {
      addMessage(text, true);
    },
    onMessage: (message) => {
      if (!message.isUser) {
        addMessage(message.text, false);
      }
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Kuch technical issue aa gaya, thoda wait karo!',
        variant: 'destructive',
      });
      setIsConnecting(false);
    },
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle session timing
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (isSessionActive) {
      if (!sessionStartTime) {
        setSessionStartTime(Date.now());
      }
      interval = setInterval(() => {
        if (sessionStartTime) {
          setSessionDuration(Math.floor((Date.now() - sessionStartTime) / 1000));
        }
      }, 1000);
    } else {
      clearInterval(interval);
      setSessionStartTime(null);
      setSessionDuration(0);
    }
    
    return () => clearInterval(interval);
  }, [isSessionActive, sessionStartTime]);

  // Add a new message to the conversation
  const addMessage = (text: string, isUser: boolean) => {
    setMessages(prev => [...prev, { 
      text, 
      isUser, 
      timestamp: Date.now() 
    }]);
  };

  // Handle sending a text message
  const handleSendMessage = () => {
    if (!inputMessage.trim() || !isSessionActive) return;
    
    addMessage(inputMessage, true);
    
    // Send the message to the AI and get a response
    sendTextMessage(inputMessage);
    
    setInputMessage('');
  };

  // Enhanced start session with loading state
  const handleStartSession = async () => {
    setIsConnecting(true);
    try {
      await startSession();
      
      // Add welcome message
      const welcomeMessage = "Hellooooo Bacchhhooooooooo !! Kaise hoo ? Badhiya ekdam ? I'm your AI Physics tutor. What would you like to learn about today?";
      addMessage(welcomeMessage, false);
      
      toast({
        title: 'Session Started',
        description: 'Your AI tutor is ready to help you learn!',
      });
    } catch (err) {
      toast({
        title: 'Connection Failed',
        description: 'Unable to start your tutoring session. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsConnecting(false);
    }
  };

  // Format session duration as MM:SS
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <PageLayout showFooter={false}>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white flex flex-col p-4 md:p-8">
        {/* Header with status indicators */}
        <header className="w-full mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-gray-800"
              aria-label="Go back"
              onClick={() => navigate('/dashboard')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">AI Physics Tutor</h1>
              <p className="text-sm text-gray-400">Learn physics interactively</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {isSessionActive && (
              <Badge 
                variant="outline" 
                className={cn(
                  "px-3 py-1 border-2 transition-colors duration-300",
                  isListening ? "border-green-500 bg-green-500/10 text-green-400" : 
                  isSpeaking ? "border-blue-500 bg-blue-500/10 text-blue-400" : 
                  "border-gray-600 bg-gray-600/10 text-gray-400"
                )}
              >
                {isListening ? "Listening..." : 
                 isSpeaking ? "Speaking..." : 
                 "Session Active"}
              </Badge>
            )}
            
            {sessionDuration > 0 && (
              <Badge variant="secondary" className="px-3 py-1">
                {formatDuration(sessionDuration)}
              </Badge>
            )}
          </div>
        </header>

        {/* Main content area */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Whiteboard section */}
          <Card className="col-span-1 lg:col-span-2 border-gray-700 bg-gray-800/30 backdrop-blur shadow-xl overflow-hidden flex flex-col">
            <CardHeader className="border-b border-gray-700 pb-3 pt-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Interactive Whiteboard</CardTitle>
                {isSpeaking && (
                  <div className="flex items-center gap-2">
                    <CircularWaveform isActive={true} size={24} color="#3b82f6" />
                    <span className="text-sm text-gray-300 animate-pulse">Writing...</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0 h-[60vh] overflow-hidden">
              <WhiteboardCanvas
                text={currentSpeech}
                isRendering={isSpeaking}
                onRenderComplete={() => {
                  console.log('Rendering complete');
                }}
              />
            </CardContent>
          </Card>

          {/* Session information and recent messages */}
          <Card className="col-span-1 border-gray-700 bg-gray-800/30 backdrop-blur shadow-xl overflow-hidden flex flex-col">
            <CardHeader className="border-b border-gray-700 pb-3 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-medium">Session Information</CardTitle>
                  <CardDescription className="text-gray-400">
                    {isSessionActive 
                      ? "Your AI tutor is actively listening and teaching"
                      : "Start a session to begin learning"}
                  </CardDescription>
                </div>
                <div className="flex-shrink-0">
                  <TeacherAvatar 
                    teacherName="Alakh Pandey" 
                    teacherImage="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80" 
                    isSpeaking={isSpeaking} 
                    isListening={isListening} 
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="py-4 px-0 flex-1 overflow-y-auto">
              {messages.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-400 px-6">Conversation</h3>
                  <div className="space-y-3 px-6">
                    {messages.map((msg, idx) => (
                      <div 
                        key={idx}
                        className={cn(
                          "p-3 rounded-lg max-w-[90%]",
                          msg.isUser 
                            ? "bg-blue-950/30 border border-blue-800/50 ml-auto" 
                            : "bg-gray-800/50 border border-gray-700/50 mr-auto"
                        )}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              ) : isSessionActive ? (
                <div className="py-8 text-center text-gray-400 px-6">
                  <p>Speak to your AI tutor to get started</p>
                  <p className="mt-2 text-sm">Try asking a physics question</p>
                </div>
              ) : (
                <div className="py-12 text-center text-gray-400 px-6">
                  <p>No active session</p>
                  <p className="mt-2 text-sm">Click the button below to start learning</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t border-gray-700 pt-4">
              {isSessionActive ? (
                <div className="flex gap-3 w-full">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Type your message..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendMessage();
                      }}
                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700"
                      onClick={handleSendMessage}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={toggleMute}
                          className="rounded-full h-10 w-10 border-gray-600 hover:bg-gray-700 hover:text-white transition-colors"
                        >
                          {isMuted ? 
                            <VolumeX className="h-5 w-5" /> : 
                            <Volume2 className="h-5 w-5" />
                          }
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {isMuted ? "Unmute AI" : "Mute AI"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <Button 
                    variant="destructive"
                    onClick={endSession}
                    className="rounded-full px-4 py-2 bg-red-600 hover:bg-red-700 transition-colors"
                  >
                    <X className="h-5 w-5 mr-2" />
                    End Session
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleStartSession}
                  disabled={isConnecting}
                  size="lg"
                  className="rounded-full px-6 py-6 shadow-xl bg-indigo-600 hover:bg-indigo-700 transition-colors w-full"
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Mic className="h-5 w-5 mr-2" />
                      Start Tutoring Session
                    </>
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
        
        {/* Status indicator - floating only on mobile */}
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          {isSessionActive && (
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-full p-1 shadow-lg">
              <CircularWaveform 
                isActive={isListening || isSpeaking} 
                size={40} 
                color={isListening ? "#22c55e" : "#3b82f6"} 
              />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}