
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui-custom/Button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mic, MicOff, Send, UserCircle2 } from "lucide-react";
import { useConversation } from "@11labs/react";
import { useToast } from "@/hooks/use-toast";

type Teacher = {
  id: string;
  name: string;
  title: string;
  avatar: string;
  description: string;
  subjects: string[];
  voiceId: string;
};

type Role = "user" | "ai";

interface Message {
  message: string;
  source: Role;
}

interface KnowledgeGraphNode {
  id: string;
  label: string;
  level: number;
  mastered: boolean;
}

interface KnowledgeGraphEdge {
  source: string;
  target: string;
}

interface ChatInterfaceProps {
  teacher: Teacher;
  knowledgeAreas: string[];
  initialScore: number;
  onBack: () => void;
}

// Helper to generate knowledge graph
const generateKnowledgeGraph = (areas: string[], initialScore: number): {
  nodes: KnowledgeGraphNode[];
  edges: KnowledgeGraphEdge[];
} => {
  const nodes: KnowledgeGraphNode[] = [];
  const edges: KnowledgeGraphEdge[] = [];
  
  // Generate nodes based on knowledge areas
  areas.forEach((area, idx) => {
    // Main concept node
    nodes.push({
      id: area,
      label: area,
      level: 1,
      mastered: initialScore > 3 // Consider mastered if quiz score was good
    });
    
    // Sub-concepts (would be dynamically generated in full implementation)
    const subConcepts = [
      `${area} Basic Principles`,
      `${area} Applications`,
      `${area} Advanced Topics`
    ];
    
    subConcepts.forEach((subConcept, subIdx) => {
      const nodeId = `${area}-${subIdx}`;
      nodes.push({
        id: nodeId,
        label: subConcept,
        level: 2,
        mastered: initialScore > 3 ? (subIdx === 2 ? false : true) : false
      });
      
      // Edge from main concept to subconcept
      edges.push({
        source: area,
        target: nodeId
      });
    });
  });
  
  return { nodes, edges };
};

export default function ChatInterface({ teacher, knowledgeAreas, initialScore, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Knowledge graph state
  const [knowledgeGraph, setKnowledgeGraph] = useState(() => 
    generateKnowledgeGraph(knowledgeAreas, initialScore)
  );
  
  // Voice conversation handling
  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to Eleven Labs");
      // Add initial AI message for welcome
      setTimeout(() => {
        const welcomeMessage = `Hello, I'm ${teacher.name}. Based on your assessment, I'll focus on ${knowledgeAreas.join(", ")}. What would you like to learn about today?`;
        setMessages(prev => [...prev, { message: welcomeMessage, source: "ai" }]);
        setIsTyping(false);
      }, 1500);
    },
    onDisconnect: () => {
      console.log("Disconnected from Eleven Labs");
      setIsChatStarted(false);
    },
    onError: (error) => {
      console.error("Eleven Labs error:", error);
      toast({
        title: "Connection Error",
        description: "We couldn't connect to the AI tutor. Please try again.",
        variant: "destructive",
      });
      setIsChatStarted(false);
    },
    onMessage: (message) => {
      // Handle incoming message from AI
      if (message && typeof message === 'object') {
        // Process different message types from the 11labs library
        if ("message" in message && typeof message.message === 'string') {
          setIsTyping(false);
          setMessages(prev => [...prev, { message: message.message, source: "ai" }]);
        }
      }
    }
  });

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleStartConversation = async () => {
    if (isChatStarted) return;
    
    try {
      setIsTyping(true);
      setShowIntro(false);
      
      await conversation.startSession({
        agentId: "8OPvpBZArqGy3fVZKjt1", // Using the provided agent ID
        overrides: {
          tts: {
            voiceId: teacher.voiceId,
          },
          agent: {
            firstMessage: `Hello, I'm ${teacher.name}. Based on your assessment, I'll focus on ${knowledgeAreas.join(", ")}. What would you like to learn about today?`,
          }
        },
      });
      
      setIsChatStarted(true);
      
      toast({
        title: "Connected to AI Tutor",
        description: `You are now connected to ${teacher.name}`,
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
      setIsTyping(false);
      toast({
        title: "Connection Failed",
        description: "Could not connect to AI tutor. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEndConversation = async () => {
    try {
      await conversation.endSession();
      setIsChatStarted(false);
    } catch (error) {
      console.error("Failed to end conversation:", error);
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !isChatStarted) return;
    
    // Add message to chat
    const userMessage = { message: inputMessage.trim(), source: "user" as const };
    setMessages(prev => [...prev.concat(userMessage)]);
    
    // Clear input and show typing indicator
    setInputMessage("");
    setIsTyping(true);
    
    // Use simulated AI response (would be replaced by actual voice API response)
    try {
      // This would send the message to the Eleven Labs API
      // In a full implementation, the AI's response would be handled via the onMessage callback
      // For now, we'll simulate response timing
      console.log("Sending message to 11labs:", inputMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsTyping(false);
      toast({
        title: "Communication Error",
        description: "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Render animated waveform
  const renderWaveform = () => {
    return (
      <div className="flex items-center gap-[2px] h-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i}
            className={`w-[3px] bg-primary rounded-full animate-pulse`}
            style={{ 
              height: `${Math.max(15, Math.min(24, 15 + Math.sin(i * 0.8) * 10))}px`,
              animationDelay: `${i * 0.1}s`
            }}
          ></div>
        ))}
      </div>
    );
  };

  // Build message display
  const renderMessage = (msg: Message, index: number) => {
    const isAi = msg.source === "ai";
    
    return (
      <div 
        key={index}
        className={`flex gap-4 mb-6 ${isAi ? "animate-fade-in" : ""}`}
      >
        {isAi ? (
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src={teacher.avatar} 
              alt={teacher.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <UserCircle2 className="w-5 h-5 text-primary" />
          </div>
        )}
        
        <div className={`px-4 py-3 rounded-lg ${isAi ? "bg-secondary/20" : "bg-primary/10"}`}>
          <div className="whitespace-pre-wrap">{msg.message}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between py-2 px-4 border-b">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-sm font-medium leading-tight">{teacher.name}</h2>
              <p className="text-xs text-muted-foreground leading-tight">{teacher.title}</p>
            </div>
            
            {isChatStarted && conversation.isSpeaking && (
              <div className="ml-2">
                {renderWaveform()}
              </div>
            )}
          </div>
        </div>
        
        {isChatStarted && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleMuteToggle}
              title={isMuted ? "Unmute" : "Mute"}
              className="rounded-full h-8 w-8"
            >
              {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
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
      
      <div className="flex-1 overflow-y-auto p-4 bg-background/80">
        {showIntro ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">What do you want to study today?</h1>
            
            <div className="relative w-full mb-8">
              <Input
                placeholder="Ask anything..."
                className="pr-20 py-6 text-lg bg-background/80 border border-primary/20 focus-visible:ring-primary"
                value=""
                disabled
              />
              <Button 
                className="absolute right-1 top-1 rounded-full h-10 w-10 p-0"
                onClick={handleStartConversation}
              >
                <Mic className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 w-full max-w-md">
              {knowledgeAreas.map((area) => (
                <Button
                  key={area}
                  variant="outline"
                  className="justify-start h-auto py-4 px-4"
                  onClick={handleStartConversation}
                >
                  <span>{area}</span>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map(renderMessage)}
            
            {isTyping && (
              <div className="flex gap-4 mb-6">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={teacher.avatar} 
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-4 py-3 rounded-lg bg-secondary/20 flex items-center">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "600ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      {isChatStarted && (
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
              ref={inputRef}
            />
            <Button onClick={handleSendMessage} className="rounded-full h-10 w-10 p-0" disabled={!inputMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {!isChatStarted && !showIntro && (
        <div className="p-4 flex justify-center">
          <Button 
            onClick={handleStartConversation}
            size="lg"
            className="rounded-full px-8"
          >
            <Mic className="h-5 w-5 mr-2" />
            Start Voice Session
          </Button>
        </div>
      )}
    </div>
  );
}
