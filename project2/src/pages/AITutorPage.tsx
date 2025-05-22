import { useState, useEffect } from 'react';
import { Mic, VolumeX, Volume2, X, Loader2, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useElevenLabsConversation } from '@/hooks/useElevenLabsConversation';
import { useVapiConversation } from '@/hooks/useVapiConversation';
import { ALAKH_PANDEY_PROMPT } from '@/constants/personas';
import { WhiteboardCanvas } from '@/components/ai-tutor/WhiteboardCanvas';
import { CircularWaveform } from '@/components/ai-tutor/CircularWaveform';
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

export default function AITutorPage() {
  const { toast } = useToast();
  interface Message {
    text: string;
    isUser: boolean;
  }
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [sessionDuration, setSessionDuration] = useState(0);
  
  const {
    isConnected: isElevenLabsConnected,
    isSessionActive,
    isSpeaking,
    isListening,
    isMuted,
    currentSpeech,
    error: elevenLabsError,
    startSession,
    endSession,
    toggleMute,
    generateSpeech
  } = useElevenLabsConversation({
    agentId: '8OPvpBZArqGy3fVZKjt1',
    systemPrompt: ALAKH_PANDEY_PROMPT,
    onSpeechStart: () => {
      console.log('AI started speaking');
    },
    onSpeechEnd: () => {
      console.log('AI stopped speaking');
      // Add motivational closing phrase
      if (messages.length > 2) {
        const motivationalPhrases = [
          "Beta, aaj bahut accha padh liya! Kal aur behtar karenge!",
          "Ek din me nahi hota, regular practice karo!",
          "Tension lene ka nahi, sirf samajhne ka!"
        ];
        const randomPhrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
        setMessages(prev => [...prev, { text: randomPhrase, isUser: false }]);
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

  // Enhanced start session with loading state
  const {
    isActive: isVapiActive,
    isSpeaking: isVapiSpeaking,
    isListening: isVapiListening,
    error: vapiError,
    start: startVapi,
    stop: stopVapi
  } = useVapiConversation({
    onMessage: (text) => {
      generateSpeech(text);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  const handleStartSession = async () => {
    setIsConnecting(true);
    try {
      await startVapi();
      await startSession();
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white flex flex-col p-4 md:p-8">
      {/* Header with status indicators */}
      <header className="w-full mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-gray-800"
            aria-label="Go back"
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
        <Card className="col-span-1 border-gray-700 bg-gray-800/30 backdrop-blur shadow-xl overflow-hidden">
          <CardHeader className="border-b border-gray-700 pb-3 pt-4">
            <CardTitle className="text-lg font-medium">Session Information</CardTitle>
            <CardDescription className="text-gray-400">
              {isSessionActive 
                ? "Your AI tutor is actively listening and teaching"
                : "Start a session to begin learning"}
            </CardDescription>
          </CardHeader>
          <CardContent className="py-4">
            {messages.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-400">Recent Interactions</h3>
                <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
                  {messages.slice(-5).map((msg, idx) => (
                    <div 
                      key={idx}
                      className={cn(
                        "p-3 rounded-lg",
                        msg.isUser 
                          ? "bg-blue-950/30 border border-blue-800/50" 
                          : "bg-gray-800/50 border border-gray-700/50"
                      )}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : isSessionActive ? (
              <div className="py-8 text-center text-gray-400">
                <p>Speak to your AI tutor to get started</p>
                <p className="mt-2 text-sm">Try asking a physics question</p>
              </div>
            ) : (
              <div className="py-12 text-center text-gray-400">
                <p>No active session</p>
                <p className="mt-2 text-sm">Click the button below to start learning</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t border-gray-700 pt-4 flex justify-center">
            {isSessionActive ? (
              <div className="flex gap-3 w-full justify-center">
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
                  className="rounded-full px-4 py-2 flex-1 bg-red-600 hover:bg-red-700 transition-colors"
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
                className="rounded-full px-6 py-6 shadow-xl bg-indigo-600 hover:bg-indigo-700 transition-colors w-full max-w-xs"
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
  );
}
