import { useState, useEffect, useRef, useCallback } from 'react';
import { ELEVEN_LABS_API_KEY, ELEVEN_LABS_VOICE_ID, ELEVEN_LABS_MODEL_ID } from '@/config/env';

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
  systemPrompt?: string;
  agentId?: string;
}

export function useElevenLabsConversation(options: ElevenLabsConversationOptions = {}) {
  const [isReady, setIsReady] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSpeech, setCurrentSpeech] = useState('');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

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
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.log('Error stopping recognition:', e);
        }
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const generateSpeech = async (text: string) => {
    try {
      setCurrentSpeech(text);
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
        audioRef.current.muted = isMuted;
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
      console.error('Speech generation error:', err);
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

      if (recognitionRef.current) {
        recognitionRef.current.onstart = () => {
          setIsListening(true);
        };

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = Array.from(event.results)
            .map((result: SpeechRecognitionResult) => result[0].transcript)
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

        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          const error = new Error(event.error);
          setError(error);
          options.onError?.(error);
        };

        recognitionRef.current.onend = () => setIsListening(false);

        recognitionRef.current.start();
        setIsListening(true);
      }

    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to start session');
      setError(error);
      options.onError?.(error);
      setIsActive(false);
    }
    
    return true;
  }, [isReady, isActive, options]);

  const endSession = useCallback(() => {
    if (!isActive) return;

    try {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
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
      setIsMuted(audioRef.current.muted);
      return audioRef.current.muted;
    }
    return false;
  }, []);

  // Function to send a text message and get AI response
  const sendTextMessage = useCallback(async (text: string) => {
    if (!text.trim() || !isActive) return;
    
    const userMessage = {
      text,
      isUser: true,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    options.onMessage?.(userMessage);
    
    // In a real implementation, this would call an API to get the AI response
    // For now, we'll simulate it
    try {
      const aiResponse = `You asked: "${text}". Let me explain this concept...`;
      const aiMessage = {
        text: aiResponse,
        isUser: false,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      await generateSpeech(aiResponse);
      options.onMessage?.(aiMessage);
      
      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to get AI response');
      setError(error);
      options.onError?.(error);
      return false;
    }
  }, [isActive, options]);

  return {
    isReady,
    isConnected: isReady,
    isActive,
    isSpeaking,
    isListening,
    isMuted,
    currentSpeech,
    messages,
    currentTranscript,
    error,
    startSession,
    endSession,
    generateSpeech,
    toggleMute,
    sendTextMessage
  };
}