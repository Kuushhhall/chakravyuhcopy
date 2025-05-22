
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui-custom/Button";
import { Card } from "@/components/ui-custom/Card";
import { Mic, MicOff, VolumeX, Volume2, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ElevenLabsSetup } from "@/components/ai-tutor/ElevenLabsSetup";

interface Message {
  text: string;
  isUser: boolean;
  highlighted?: number; // Index of the word being spoken
}

interface VoiceConversationProps {
  apiKey: string;
  assistantId: string;
  onMessage?: (text: string) => void;
}

export default function VoiceConversation() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [whiteboard, setWhiteboard] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const whiteboardRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize SpeechRecognition
  const setupRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser does not support speech recognition. Please use Chrome or Edge.",
        variant: "destructive",
      });
      return null;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    return recognition;
  };

  const handleStartSession = () => {
    setIsSessionActive(true);
    setMessages([
      { text: "Hello! I'm your AI tutor. What would you like to learn about today?", isUser: false },
    ]);
  };

  const handleStartListening = () => {
    const recognition = setupRecognition();
    if (!recognition) return;
    recognitionRef.current = recognition;
    setIsListening(true);
    recognition.start();
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setMessages((prev) => [...prev, { text: transcript, isUser: true }]);
      setIsListening(false);
      // Here you would send transcript to your AI backend and get a response
      // For demo, we'll echo the user input
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: `You said: ${transcript}`, isUser: false },
        ]);
      }, 1000);
    };
    recognition.onerror = (event: any) => {
      setIsListening(false);
      toast({
        title: "Speech Recognition Error",
        description: event.error,
        variant: "destructive",
      });
    };
    recognition.onend = () => setIsListening(false);
  };

  const handleStopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleMuteToggle = () => setIsMuted((m) => !m);

  const renderCircularWaveform = () => (
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center z-10">
          <Activity className="h-8 w-8 text-primary animate-pulse" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100vh-8rem)]">
      {/* Voice Conversation Panel */}
      <div className="flex flex-col bg-background rounded-lg border shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <h2 className="font-medium">AI Voice Tutor</h2>
            {isSessionActive && isListening && (
              <div className="ml-2">
                {renderWaveform()}
              </div>
            )}
          </div>
          
          {isSessionActive && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleMuteToggle}
                title={isMuted ? "Unmute" : "Mute"}
                className="rounded-full h-8 w-8"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsSessionActive(false)}
                className="rounded-full"
              >
                End Session
              </Button>
            </div>
          )}
        </div>
        
        {/* Conversation Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 && !isSessionActive ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <h1 className="text-2xl font-bold mb-4">Voice-Powered Learning</h1>
              <p className="text-muted-foreground mb-8 max-w-md">
                Click the button below to start a voice conversation with your AI tutor.
                Speak naturally and ask any questions about topics you want to learn.
              </p>
              <Button 
                onClick={handleStartSession}
                size="lg"
                className="rounded-full px-8"
              >
                <Mic className="h-5 w-5 mr-2" />
                Start Voice Session
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`flex gap-3 ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`px-4 py-2 rounded-lg max-w-[80%] ${
                      msg.isUser 
                        ? 'bg-primary text-primary-foreground rounded-tr-none' 
                        : 'bg-muted rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        {/* Voice Controls */}
        {isSessionActive && (
          <div className="p-4 border-t flex justify-center">
            <div className="relative">
              <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-secondary rounded-full text-xs ${isListening ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                Listening...
              </div>
              <div className={`h-16 w-16 rounded-full flex items-center justify-center ${isListening ? 'bg-primary/10 animate-pulse' : 'bg-muted'}`}>
                <Mic className={`h-8 w-8 ${isListening ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
            </div>
          </div>
        )}
        
        {/* Start Button for Not Started State */}
        {!isSessionActive && messages.length > 0 && (
          <div className="p-4 border-t flex justify-center">
            <Button 
              onClick={handleStartSession}
              size="lg"
              className="rounded-full px-8"
            >
              <Mic className="h-5 w-5 mr-2" />
              Resume Voice Session
            </Button>
          </div>
        )}
      </div>
      
      {/* Digital Whiteboard Panel */}
      <div className="flex flex-col bg-background rounded-lg border shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-medium">Digital Whiteboard</h2>

        </div>
        
        <div className="flex-1 p-6 bg-slate-50 dark:bg-slate-900 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="mb-6">
                {renderCircularWaveform()}
              </div>
              <h2 className="text-xl font-semibold mb-2">Interactive Learning Board</h2>
              <p className="text-muted-foreground max-w-md">
                Start a voice session to see words appear here as they're spoken.
                This visual aid helps reinforce concepts during your learning session.
              </p>
                <Button 
                  onClick={handleStartSession}
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8"
                >
                  Resume Session to Continue
                </Button>
              )}
            </div>
          )}
        </div>
        

      </div>
    </div>
  );
}
