import { useState, useEffect, useRef, useCallback } from 'react';
import { ELEVEN_LABS_API_KEY, ELEVEN_LABS_VOICE_ID, ELEVEN_LABS_MODEL_ID } from '@/config/env';

interface SpeechRecognition extends EventTarget {
  new(): SpeechRecognition;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: any) => void;
  onerror: (event: any) => void;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognition;
    webkitSpeechRecognition: SpeechRecognition;
  }
}

interface Message {
  text: string;
  isUser: boolean;
  timestamp: number;
}

interface ElevenLabsConversationOptions {
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onTranscript?: (text: string) => void;
  onMessage?: (message: Message) => void;
  onError?: (error: Error) => void;
  initialMessage?: string;
}

export function useElevenLabsConversation(options: ElevenLabsConversationOptions = {}) {
  const [isReady, setIsReady] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition and audio
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio();
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';
        setIsReady(true);
      } else {
        setError(new Error('Speech recognition not supported'));
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const generateSpeech = async (text: string) => {
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_LABS_VOICE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': ELEVEN_LABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: ELEVEN_LABS_MODEL_ID,
          voice_settings: {
            stability: 0.7,
            similarity_boost: 0.9,
            style: 0.8,
            speaker_boost: true
          },
        }),
      });

      if (!response.ok) throw new Error('Speech generation failed');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        setIsSpeaking(true);
        options.onSpeechStart?.();
        
        audioRef.current.onended = () => {
          setIsSpeaking(false);
          options.onSpeechEnd?.();
          URL.revokeObjectURL(audioUrl);
        };
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Speech generation failed');
      setError(error);
      options.onError?.(error);
    }
  };

  const startSession = useCallback(async () => {
    if (!isReady || isActive) return;

    try {
      setIsActive(true);
      setError(null);

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
          
        if (event.results[0].isFinal) {
          const userMessage = {
            text: transcript,
            isUser: true,
            timestamp: Date.now()
          };
          setMessages(prev => [...prev, userMessage]);
          setCurrentTranscript(transcript);
          options.onTranscript?.(transcript);
          options.onMessage?.(userMessage);

          // Generate AI response to user message
          if (transcript.trim().length > 0) {
            const aiResponse = `I heard you say: "${transcript}". What would you like to learn next?`;
            const aiMessage = {
              text: aiResponse,
              isUser: false,
              timestamp: Date.now()
            };
            setMessages(prev => [...prev, aiMessage]);
            generateSpeech(aiResponse);
            options.onMessage?.(aiMessage);
          }
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        const error = new Error(event.error);
        setError(error);
        options.onError?.(error);
      };

      recognitionRef.current.start();
      setIsListening(true);

      // Play welcome message
      const welcomeMessage = options.initialMessage || "Hello! I'm your AI tutor. What would you like to learn?";
      const tutorMessage = {
        text: welcomeMessage,
        isUser: false,
        timestamp: Date.now()
      };
      setMessages([tutorMessage]);
      await generateSpeech(welcomeMessage);
      options.onMessage?.(tutorMessage);

    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to start session');
      setError(error);
      options.onError?.(error);
      setIsActive(false);
    }
  }, [isReady, isActive, options]);

  const endSession = useCallback(() => {
    if (!isActive) return;

    try {
      recognitionRef.current?.stop();
      audioRef.current?.pause();
      setIsActive(false);
      setIsListening(false);
      setIsSpeaking(false);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to end session');
      setError(error);
      options.onError?.(error);
    }
  }, [isActive, options]);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      return audioRef.current.muted;
    }
    return false;
  }, []);

  return {
    isReady,
    isActive,
    isSpeaking,
    isListening,
    isMuted: audioRef.current?.muted || false,
    currentSpeech: messages.filter(m => !m.isUser).map(m => m.text).join(' '),
    messages,
    currentTranscript,
    error,
    startSession,
    endSession,
    generateSpeech,
    toggleMute
  };
}
