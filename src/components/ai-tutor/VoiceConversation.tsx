
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui-custom/Button";
import { Card } from "@/components/ui-custom/Card";
import { Mic, MicOff, VolumeX, Volume2, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useVapiConversation } from "@/hooks/useVapiConversation";

interface Message {
  text: string;
  isUser: boolean;
  highlighted?: number; // Index of the word being spoken
}

interface VoiceConversationProps {
  apiKey: string;
  assistantId: string;
}

export default function VoiceConversation({ apiKey, assistantId }: VoiceConversationProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [whiteboard, setWhiteboard] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const whiteboardRef = useRef<HTMLDivElement>(null);

  // Use our custom Vapi hook
  const vapiConversation = useVapiConversation({
    onConnect: () => {
      console.log("Connected to Vapi AI");
      toast({
        title: "Connected",
        description: "Voice conversation started",
      });
      // Add initial welcome message
      setMessages(prev => [...prev, {
        text: "Hello! I'm your AI tutor. What would you like to learn about today?",
        isUser: false
      }]);
      
      // Initialize the whiteboard with the welcome message
      setWhiteboard(["Hello!", "I'm", "your", "AI", "tutor.", "What", "would", "you", "like", "to", "learn", "about", "today?"]);
      simulateWordHighlighting(["Hello!", "I'm", "your", "AI", "tutor.", "What", "would", "you", "like", "to", "learn", "about", "today?"]);
    },
    onDisconnect: () => {
      console.log("Disconnected from Vapi AI");
      setIsSessionActive(false);
    },
    onError: (error) => {
      console.error("Vapi AI error:", error);
      toast({
        title: "Connection Error",
        description: "We couldn't connect to the voice service. Please try again.",
        variant: "destructive",
      });
      setIsSessionActive(false);
    },
    onMessage: (message) => {
      setMessages(prev => [...prev, message]);
      
      // If the message is from the AI, update the whiteboard
      if (!message.isUser) {
        const words = message.text.split(/\s+/);
        setWhiteboard(words);
        simulateWordHighlighting(words);
      }
    }
  });

  // Simulate progressive word highlighting for speech synchronization
  const simulateWordHighlighting = (words: string[]) => {
    setCurrentWordIndex(0);
    let index = 0;
    
    // Clear any existing interval
    const intervalId = setInterval(() => {
      if (index < words.length) {
        setCurrentWordIndex(index);
        index++;
      } else {
        clearInterval(intervalId);
        setCurrentWordIndex(-1); // Reset after completion
      }
    }, 350); // Average speech rate
    
    return () => clearInterval(intervalId);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    whiteboardRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentWordIndex]);

  const handleStartConversation = async () => {
    if (isSessionActive) return;
    
    try {
      setIsSessionActive(true);
      
      await vapiConversation.startSession({
        apiKey,
        assistantId,
        initialMessage: "You are an AI tutor. Greet the student and ask what they'd like to learn about today."
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
      setIsSessionActive(false);
      toast({
        title: "Connection Failed",
        description: "Could not connect to voice service. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEndConversation = async () => {
    try {
      await vapiConversation.endSession();
      setIsSessionActive(false);
      toast({
        title: "Session Ended",
        description: "Voice conversation has ended",
      });
    } catch (error) {
      console.error("Failed to end conversation:", error);
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    // Update the volume in the conversation
    vapiConversation.adjustVolume(isMuted ? 1 : 0);
  };

  // Render animated circular waveform
  const renderCircularWaveform = () => {
    return (
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center z-10">
            <Activity className="h-8 w-8 text-primary animate-pulse" />
          </div>
        </div>
        
        {/* Animated circles */}
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="absolute inset-0 rounded-full border-2 border-primary/40 animate-ping"
            style={{ 
              animationDuration: `${2 + i * 0.5}s`,
              animationDelay: `${i * 0.2}s`,
              opacity: 0.8 - (i * 0.15)
            }}
          />
        ))}
      </div>
    );
  };

  // Render animated audio waveform
  const renderWaveform = () => {
    return (
      <div className="flex items-center gap-[2px] h-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i}
            className={`w-[3px] bg-primary rounded-full animate-pulse`}
            style={{ 
              height: `${Math.max(12, Math.min(32, 12 + Math.sin(i * 0.8) * 20))}px`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${0.8 + Math.random() * 0.4}s`
            }}
          ></div>
        ))}
      </div>
    );
  };

  const isListening = vapiConversation.status === "connected" && !vapiConversation.isSpeaking;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100vh-8rem)]">
      {/* Voice Conversation Panel */}
      <div className="flex flex-col bg-background rounded-lg border shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <h2 className="font-medium">AI Voice Tutor</h2>
            {isSessionActive && vapiConversation.isSpeaking && (
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
                onClick={handleEndConversation}
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
                onClick={handleStartConversation}
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
        {isSessionActive && !vapiConversation.isSpeaking && (
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
              onClick={handleStartConversation}
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
          {vapiConversation.isSpeaking && <div className="ml-2">{renderWaveform()}</div>}
        </div>
        
        <div className="flex-1 p-6 bg-slate-50 dark:bg-slate-900 overflow-y-auto">
          {isSessionActive ? (
            <div className="flex flex-wrap gap-2 items-start" ref={whiteboardRef}>
              {whiteboard.map((word, index) => (
                <span 
                  key={index}
                  className={`inline-block px-1.5 py-0.5 rounded-md text-lg transition-all duration-300 ${
                    index === currentWordIndex 
                      ? 'bg-primary text-white scale-125 font-medium' 
                      : index < currentWordIndex 
                        ? 'text-foreground' 
                        : 'text-muted-foreground'
                  }`}
                >
                  {word}
                </span>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
              {messages.length === 0 ? (
                <>
                  <div className="mb-6">
                    {renderCircularWaveform()}
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Interactive Learning Board</h2>
                  <p className="text-muted-foreground max-w-md">
                    Start a voice session to see words appear here as they're spoken.
                    This visual aid helps reinforce concepts during your learning session.
                  </p>
                </>
              ) : (
                <Button 
                  onClick={handleStartConversation}
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
        
        {isSessionActive && vapiConversation.isSpeaking && (
          <div className="p-4 border-t flex justify-center items-center gap-4">
            <div className="text-sm text-muted-foreground">AI tutor is speaking</div>
            {renderWaveform()}
          </div>
        )}
      </div>
    </div>
  );
}
