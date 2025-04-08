
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
      
      // Create the Vapi client with configuration
      const client = new Vapi(apiKey, assistantId);
      
      // Add event listeners using the addListener approach
      client.addListener('agentStart', () => {
        setIsSpeaking(true);
      });
      
      client.addListener('agentStop', () => {
        setIsSpeaking(false);
      });
      
      client.addListener('error', (error: Error) => {
        console.error('Vapi error:', error);
        if (onError) onError(error);
      });
      
      client.addListener('connect', () => {
        setStatus('connected');
        if (onConnect) onConnect();
      });
      
      client.addListener('disconnect', () => {
        setStatus('disconnected');
        if (onDisconnect) onDisconnect();
      });
      
      // Handle transcriptions
      client.addListener('transcription', (transcript: any) => {
        if (onMessage && transcript.text) {
          onMessage({
            text: transcript.text,
            isUser: true
          });
        }
      });
      
      // Handle AI messages
      client.addListener('message', (message: any) => {
        if (onMessage && message.text) {
          onMessage({
            text: message.text,
            isUser: false
          });
        }
      });

      clientRef.current = client;

      // Start the call
      await client.start();

      // Send initial message if provided
      if (initialMessage && client) {
        client.sendText(initialMessage);
      }

      return client;
    } catch (error) {
      setStatus('disconnected');
      console.error('Failed to start Vapi session:', error);
      if (onError && error instanceof Error) onError(error);
      throw error;
    }
  }, [onConnect, onDisconnect, onError, onMessage]);

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
      // Try different approaches to adjust volume based on what's available
      try {
        // This is a workaround as the direct method might not be available
        const client = clientRef.current as any;
        if (typeof client.setVolume === 'function') {
          client.setVolume(newVolume);
        } else {
          console.warn('Volume control not available on Vapi client');
        }
      } catch (e) {
        console.warn('Volume adjustment not supported:', e);
      }
    }
  }, []);

  const sendMessage = useCallback((message: string) => {
    if (clientRef.current && status === 'connected') {
      try {
        clientRef.current.sendText(message);
        return true;
      } catch (e) {
        console.error('Error sending message:', e);
        return false;
      }
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
