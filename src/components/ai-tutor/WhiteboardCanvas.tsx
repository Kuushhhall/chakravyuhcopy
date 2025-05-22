import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface WhiteboardCanvasProps {
  text: string;
  isRendering: boolean;
  onRenderComplete?: () => void;
}

export function WhiteboardCanvas({ text, isRendering, onRenderComplete }: WhiteboardCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [words, setWords] = useState<string[]>([]);
  const [renderedWords, setRenderedWords] = useState<string[]>([]);
  const renderIntervalRef = useRef<NodeJS.Timeout>();
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });
  
  // Split text into words when text changes
  useEffect(() => {
    if (text) {
      setWords(text.split(' '));
      setRenderedWords([]);
      setCursorPosition({ x: 50, y: 50 });
    }
  }, [text]);

  // Render words one by one when isRendering is true
  useEffect(() => {
    if (isRendering && words.length > 0) {
      let currentIndex = 0;
      const ctx = canvasRef.current?.getContext('2d');
      
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        ctx.font = '28px Inter, sans-serif';
        ctx.fillStyle = '#F3F4F6'; // Softer white for better readability
        
        renderIntervalRef.current = setInterval(() => {
          if (currentIndex < words.length) {
            const newWord = words[currentIndex];
            setRenderedWords(prev => [...prev, newWord]);
            
            // Calculate new cursor position
            const metrics = ctx.measureText(newWord + ' ');
            let newX = cursorPosition.x + metrics.width;
            let newY = cursorPosition.y;
            
            // Check if we need to wrap to next line
            if (newX > canvasRef.current!.width - 100) {
              newX = 50;
              newY += 40; // Line height
            }
            
            // Draw the word
            ctx.fillText(newWord, cursorPosition.x, cursorPosition.y);
            
            // Update cursor position
            setCursorPosition({ x: newX, y: newY });
            currentIndex++;
          } else {
            if (renderIntervalRef.current) {
              clearInterval(renderIntervalRef.current);
            }
            onRenderComplete?.();
          }
        }, Math.max(100, Math.min(300, 200 - (words[currentIndex]?.length || 0) * 5))); // Dynamic timing based on word length
      }

      return () => {
        if (renderIntervalRef.current) {
          clearInterval(renderIntervalRef.current);
        }
      };
    }
  }, [isRendering, words, onRenderComplete]);

  // Resize canvas when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const container = canvas.parentElement;
        if (container) {
          canvas.width = container.clientWidth;
          canvas.height = container.clientHeight;
          
          // Redraw content after resize
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = '24px Inter, sans-serif';
            ctx.fillStyle = '#FFFFFF';
            
            let x = 50;
            let y = 50;
            
            renderedWords.forEach(word => {
              const metrics = ctx.measureText(word + ' ');
              // Handle long words by breaking them
              if (metrics.width > canvas.width - 100) {
                const chars = word.split('');
                let currentLine = '';
                
                for (const char of chars) {
                  const testLine = currentLine + char;
                  const testMetrics = ctx.measureText(testLine);
                  
                  if (testMetrics.width > canvas.width - 100) {
                    ctx.fillText(currentLine, x, y);
                    currentLine = char;
                    x = 50;
                    y += 40;
                  } else {
                    currentLine = testLine;
                  }
                }
                
                if (currentLine) {
                  ctx.fillText(currentLine, x, y);
                  x += ctx.measureText(currentLine).width;
                }
              } else if (x + metrics.width > canvas.width - 100) {
                x = 50;
                y += 40;
              }
              
              ctx.fillText(word, x, y);
              x += metrics.width;
            });
          }
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [renderedWords]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full bg-transparent"
      />
      {isRendering && (
        <motion.div 
          className="absolute w-3 h-6 bg-primary rounded-sm"
          style={{ 
            left: cursorPosition.x, 
            top: cursorPosition.y - 24,
          }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        />
      )}
    </div>
  );
}