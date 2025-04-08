
import { useState, useEffect, useRef, useCallback } from 'react';
import Vapi from '@vapi-ai/web';

type VapiMessage = {
  text: string;
  isUser: boolean;
};

interface UseVapiConversationProps {
  onMessage?: (message: VapiMessage) => void;
  onError?: (error: Error) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export const useVapiConversation = ({
  onMessage,
  onError,
  onConnect,
  onDisconnect
}: UseVapiConversationProps = {}) => {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'disconnected'>('idle');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(1);
  const clientRef = useRef<Vapi | null>(null);

  const startSession = useCallback(async ({ 
    apiKey, 
    assistantId, 
    initialMessage 
  }: { 
    apiKey: string; 
    assistantId: string;
    initialMessage?: string;
  }) => {
    try {
      setStatus('connecting');

      // For Vapi.ai, we need to pass configuration directly
      const client = new Vapi(apiKey, assistantId);
      
      // Configure client options
      client.setLogLevel('debug');
      client.setAudioPlayback(true);
      client.setAudioVolume(volume);
      
      // Set up event handlers
      client.onAgentStart = () => {
        setIsSpeaking(true);
      };
      
      client.onAgentStop = () => {
        setIsSpeaking(false);
      };
      
      client.onError = (error: Error) => {
        console.error('Vapi error:', error);
        if (onError) onError(error);
      };
      
      client.onConnect = () => {
        setStatus('connected');
        if (onConnect) onConnect();
      };
      
      client.onDisconnect = () => {
        setStatus('disconnected');
        if (onDisconnect) onDisconnect();
      };
      
      client.onTranscription = (transcript: { text: string }) => {
        if (onMessage) {
          onMessage({
            text: transcript.text,
            isUser: true
          });
        }
      };
      
      client.onMessage = (message: { text: string }) => {
        if (onMessage) {
          onMessage({
            text: message.text,
            isUser: false
          });
        }
      };

      clientRef.current = client;

      // Start the call
      await client.start();

      // Send initial message if provided
      if (initialMessage && client) {
        client.send(initialMessage);
      }

      return client;
    } catch (error) {
      setStatus('disconnected');
      console.error('Failed to start Vapi session:', error);
      if (onError && error instanceof Error) onError(error);
      throw error;
    }
  }, [onConnect, onDisconnect, onError, onMessage, volume]);

  const endSession = useCallback(async () => {
    try {
      if (clientRef.current) {
        await clientRef.current.stop();
        clientRef.current = null;
      }
      setStatus('disconnected');
    } catch (error) {
      console.error('Failed to end Vapi session:', error);
      if (onError && error instanceof Error) onError(error);
    }
  }, [onError]);

  const adjustVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    // Update the volume on the active client if it exists
    if (clientRef.current) {
      clientRef.current.setAudioVolume(newVolume);
    }
  }, []);

  const sendMessage = useCallback((message: string) => {
    if (clientRef.current && status === 'connected') {
      clientRef.current.send(message);
      return true;
    }
    return false;
  }, [status]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (clientRef.current) {
        clientRef.current.stop();
      }
    };
  }, []);

  return {
    status,
    isSpeaking,
    startSession,
    endSession,
    adjustVolume,
    sendMessage
  };
};
