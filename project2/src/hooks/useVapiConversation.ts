import { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { ELEVEN_LABS_API_KEY, ELEVEN_LABS_VOICE_ID } from '@/config/env';

interface VapiConversationOptions {
  onCallStart?: () => void;
  onCallEnd?: () => void;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onMessage?: (message: string) => void;
  onError?: (error: Error) => void;
}

export function useVapiConversation(options: VapiConversationOptions = {}) {
  const [isActive, setIsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const vapiRef = useRef<Vapi | null>(null);

  useEffect(() => {
    // Initialize Vapi client with API key
    vapiRef.current = new Vapi(process.env.VAPI_API_KEY || '');

    // Setup event handlers
    vapiRef.current.on('call-start', () => {
      setIsActive(true);
      options.onCallStart?.();
    });

    vapiRef.current.on('call-end', () => {
      setIsActive(false);
      options.onCallEnd?.();
    });

    vapiRef.current.on('speech-start', () => {
      setIsSpeaking(true);
      options.onSpeechStart?.();
    });

    vapiRef.current.on('speech-end', () => {
      setIsSpeaking(false);
      options.onSpeechEnd?.();
    });

    vapiRef.current.on('message', (message: {content: string}) => {
      setTranscript(message.content);
      options.onMessage?.(message.content);
    });

    vapiRef.current.on('error', (error: Error) => {
      setError(error);
      options.onError?.(error);
    });

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, []);

  const start = async () => {
    try {
      await vapiRef.current?.start();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to start call'));
    }
  };

  const stop = async () => {
    try {
      await vapiRef.current?.stop();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to stop call'));
    }
  };

  const toggle = async () => {
    if (isActive) {
      await stop();
    } else {
      await start();
    }
  };

  return {
    isActive,
    isSpeaking,
    isListening,
    transcript,
    error,
    start,
    stop,
    toggle
  };
}
