import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CircularWaveform } from './CircularWaveform';

interface TeacherAvatarProps {
  teacherName: string;
  teacherImage: string;
  isSpeaking: boolean;
  isListening: boolean;
}

export function TeacherAvatar({ 
  teacherName, 
  teacherImage, 
  isSpeaking, 
  isListening 
}: TeacherAvatarProps) {
  const [status, setStatus] = useState<'idle' | 'speaking' | 'listening'>('idle');
  
  useEffect(() => {
    if (isSpeaking) {
      setStatus('speaking');
    } else if (isListening) {
      setStatus('listening');
    } else {
      setStatus('idle');
    }
  }, [isSpeaking, isListening]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <motion.div
          className="relative rounded-full overflow-hidden border-2 border-primary/50 shadow-lg"
          animate={{
            scale: status === 'idle' ? 1 : status === 'speaking' ? [1, 1.03, 1] : 1,
            borderColor: status === 'speaking' 
              ? ['rgba(59, 130, 246, 0.5)', 'rgba(59, 130, 246, 0.8)', 'rgba(59, 130, 246, 0.5)'] 
              : status === 'listening'
              ? ['rgba(139, 92, 246, 0.5)', 'rgba(139, 92, 246, 0.8)', 'rgba(139, 92, 246, 0.5)']
              : 'rgba(59, 130, 246, 0.5)'
          }}
          transition={{
            repeat: status !== 'idle' ? Infinity : 0,
            duration: 2,
          }}
        >
          <img 
            src={teacherImage} 
            alt={teacherName}
            className="w-12 h-12 object-cover rounded-full"
          />
          
          {/* Overlay for speaking/listening state */}
          <div 
            className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
              status !== 'idle' ? 'opacity-30' : 'opacity-0'
            }`}
            style={{ 
              background: status === 'speaking' 
                ? 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)' 
                : 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0) 70%)'
            }}
          />
        </motion.div>
        
        {/* Waveform indicator */}
        {status !== 'idle' && (
          <div className="absolute -bottom-1 -right-1">
            <CircularWaveform 
              isActive={status !== 'idle'} 
              isUser={status === 'listening'}
              size={20}
            />
          </div>
        )}
      </div>
      
      <div className="mt-1 text-center">
        <h3 className="text-xs font-medium">{teacherName}</h3>
        <p className="text-xs text-muted-foreground">
          {status === 'speaking' ? 'Speaking...' : status === 'listening' ? 'Listening...' : 'Ready to help'}
        </p>
      </div>
    </div>
  );
}