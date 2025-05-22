import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ELEVEN_LABS_API_KEY, ELEVEN_LABS_VOICE_ID, ELEVEN_LABS_MODEL_ID } from '@/config/env';

interface ElevenLabsSetupProps {
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onError?: (error: Error) => void;
  children: (props: {
    generateSpeech: (text: string) => Promise<void>;
    isSpeaking: boolean;
    isMuted: boolean;
    toggleMute: () => void;
  }) => React.ReactNode;
}

export function ElevenLabsSetup({ 
  onSpeechStart, 
  onSpeechEnd, 
  onError,
  children 
}: ElevenLabsSetupProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio();
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
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

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.muted = isMuted;
        audioRef.current.play();
        setIsSpeaking(true);
        onSpeechStart?.();
        
        audioRef.current.onended = () => {
          setIsSpeaking(false);
          onSpeechEnd?.();
          URL.revokeObjectURL(audioUrl);
        };
      }
    } catch (error) {
      console.error('Speech generation error:', error);
      const err = error instanceof Error ? error : new Error('Failed to generate speech');
      onError?.(err);
      toast({
        title: 'Speech Error',
        description: err.message,
        variant: 'destructive',
      });
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  return (
    <>
      {children({
        generateSpeech,
        isSpeaking,
        isMuted,
        toggleMute
      })}
    </>
  );
}
