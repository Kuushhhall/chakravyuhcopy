import { useState, useEffect } from 'react';
import { Mic, VolumeX, Volume2, X, Loader2, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useElevenLabsConversation } from '@/hooks/useElevenLabsConversation';
import { CircularWaveform } from '@/components/ai-tutor/CircularWaveform';
import { TeacherSelection } from '@/components/ai-tutor/TeacherSelection';
import { WhiteboardCanvas } from '@/components/ai-tutor/WhiteboardCanvas';
import { teacherProfiles } from '@/data/teacherProfiles';
import { PageLayout } from '@/components/layout/PageLayout';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { isElevenLabsConfigured } from "@/config/env";

export default function AITutorPage() {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [sessionDuration, setSessionDuration] = useState(0);
  
  // Format session duration as MM:SS
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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

  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([]);

  const renderMainContent = () => {
    if (!selectedTeacher) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white flex flex-col p-4 md:p-8">
          <div className="max-w-3xl mx-auto py-12">
            <h1 className="text-3xl font-bold text-center mb-8">Select Your Tutor</h1>
            <TeacherSelection 
              onSelect={(teacherId) => setSelectedTeacher(teacherId)}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white flex flex-col p-4 md:p-8">
        {/* Header with status indicators */}
        <header className="w-full mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-gray-800"
              onClick={() => setSelectedTeacher(null)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">AI {teacherProfiles.find(t => t.id === selectedTeacher)?.subject} Tutor</h1>
              <p className="text-sm text-gray-400">{teacherProfiles.find(t => t.id === selectedTeacher)?.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {isSessionActive && (
              <Badge variant="outline" className="px-3 py-1 border-2 border-gray-600 bg-gray-600/10 text-gray-400">
                Session Active
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

          {/* Session controls */}
          <Card className="col-span-1 border-gray-700 bg-gray-800/30 backdrop-blur shadow-xl overflow-hidden">
            <CardHeader className="border-b border-gray-700 pb-3 pt-4">
              <CardTitle className="text-lg font-medium">Session Controls</CardTitle>
            </CardHeader>
            <CardFooter className="border-t border-gray-700 pt-4 flex justify-center">
              {isSessionActive ? (
                <div className="flex gap-3 w-full justify-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-10 w-10 border-gray-600 hover:bg-gray-700 hover:text-white"
                    onClick={toggleMute}
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
                      </TooltipTrigger>
                      <TooltipContent>Mute AI</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      setIsSessionActive(false);
                      endSession();
                    }}
                    className="rounded-full px-4 py-2 flex-1 bg-red-600 hover:bg-red-700"
                  >
                    <X className="h-5 w-5 mr-2" />
                    End Session
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => setIsSessionActive(true)}
                  disabled={isConnecting}
                  size="lg"
                  className="rounded-full px-6 py-6 shadow-xl bg-indigo-600 hover:bg-indigo-700 w-full max-w-xs"
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
      </div>
    );
  };

  const {
    isReady,
    isActive,
    isSpeaking,
    isListening,
    isMuted,
    currentSpeech,
    messages: voiceMessages,
    error,
    startSession,
    endSession,
    generateSpeech,
    toggleMute
  } = useElevenLabsConversation({
    onSpeechStart: () => setIsSessionActive(true),
    onSpeechEnd: () => setIsSessionActive(false),
    onError: (error) => toast({
      title: 'Error',
      description: error.message,
      variant: 'destructive',
    }),
    onMessage: (message) => {
      setMessages(prev => [...prev, {
        text: message.text,
        isUser: message.isUser
      }]);
    }
  });

  useEffect(() => {
    if (isSessionActive && selectedTeacher && isReady) {
      const teacher = teacherProfiles.find(t => t.id === selectedTeacher);
      const welcomeMessage = `Hello! I'm ${teacher?.name}, your ${teacher?.subject} tutor. How can I help you today?`;
      startSession();
      generateSpeech(welcomeMessage);
    }
  }, [isSessionActive, selectedTeacher, isReady]);

  return (
    <PageLayout showFooter={false}>
      <Container className="p-0 max-w-full">
        {renderMainContent()}
      </Container>
    </PageLayout>
  );
}
