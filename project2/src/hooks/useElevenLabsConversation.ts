import { useState, useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onstart: () => void;
  onend: () => void;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}
import { ELEVEN_LABS_API_KEY, ELEVEN_LABS_VOICE_ID, ELEVEN_LABS_MODEL_ID } from '@/config/env';

interface Message {
  text: string;
  isUser: boolean;
}

interface ElevenLabsConversationOptions {
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onTranscriptReceived?: (text: string) => void;
  onMessageReceived?: (text: string) => void;
  onError?: (error: Error) => void;
  systemPrompt?: string;
  agentId?: string;
}

export function useElevenLabsConversation(options: ElevenLabsConversationOptions = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentSpeech, setCurrentSpeech] = useState('');
  const [error, setError] = useState<Error | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio();
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        setIsConnected(true);
      } else {
        setError(new Error('Speech recognition is not supported in this browser'));
      }
    }
  }, []);

  const generateSpeech = async (text: string, isSystemMessage = false) => {
    const finalText = isSystemMessage && options.systemPrompt 
      ? `${options.systemPrompt}\n\n${text}`
      : text;
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_LABS_VOICE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': ELEVEN_LABS_API_KEY,
        },
          body: JSON.stringify({
          text: finalText,
          model_id: ELEVEN_LABS_MODEL_ID,
          voice_settings: {
            stability: 0.7,  // Increased for more consistent voice
            similarity_boost: 0.9,  // Increased for clearer pronunciation
            style: 0.8,  // Added for more expressive delivery
            speaker_boost: true  // Added for better voice clarity
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        setIsSpeaking(true);
        
        audioRef.current.onended = () => {
          setIsSpeaking(false);
          options.onSpeechEnd?.();
          URL.revokeObjectURL(audioUrl);
        };
      }
    } catch (error) {
      console.error('Speech generation error:', error);
      setError(error instanceof Error ? error : new Error('Failed to generate speech'));
      options.onError?.(error instanceof Error ? error : new Error('Failed to generate speech'));
    }
  };

  const startSession = useCallback(async () => {
    if (!recognitionRef.current?.start || isSessionActive) return;

    try {
      setIsSessionActive(true);
      setError(null);

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');

        if (event.results[0].isFinal) {
          setMessages(prev => [...prev, { text: transcript, isUser: true }]);
          options.onTranscriptReceived?.(transcript);
          // Send transcript to Eleven Labs API for response
          setCurrentSpeech(transcript);
          generateSpeech(transcript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Recognition error:', event.error);
        setError(new Error(event.error));
        options.onError?.(new Error(event.error));
      };

      recognitionRef.current.start();

      // Initial welcome message
      const welcomeMessage = options.systemPrompt 
        ? "Hellooooo Bacchhhooooooooo !! Kaise hoo ? Badhiya ekdam ?"
        : "Hello! I'm your AI tutor. What would you like to learn about today?";
      setMessages([{ text: welcomeMessage, isUser: false }]);
      setCurrentSpeech(welcomeMessage);
      await generateSpeech(welcomeMessage);

    } catch (error) {
      console.error('Failed to start session:', error);
      setIsSessionActive(false);
      setError(error instanceof Error ? error : new Error('Failed to start session'));
      options.onError?.(error instanceof Error ? error : new Error('Failed to start session'));
    }
  }, [isSessionActive, options]);

  const endSession = useCallback(async () => {
    if (!recognitionRef.current?.stop) return;

    try {
      recognitionRef.current.stop();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsSessionActive(false);
      setIsSpeaking(false);
      setIsListening(false);
    } catch (error) {
      console.error('Failed to end session:', error);
      setError(error instanceof Error ? error : new Error('Failed to end session'));
      options.onError?.(error instanceof Error ? error : new Error('Failed to end session'));
    }
  }, [options]);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  }, []);

  return {
    isConnected,
    isSessionActive,
    isSpeaking,
    isListening,
    isMuted,
    messages,
    currentSpeech,
    error,
    startSession,
    endSession,
    toggleMute,
    generateSpeech
  };
}
