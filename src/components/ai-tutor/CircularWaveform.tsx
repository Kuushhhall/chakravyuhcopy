import { useEffect, useRef } from 'react';

interface CircularWaveformProps {
  isActive: boolean;
  size: number;
  color: string;
}

export function CircularWaveform({ isActive, size, color }: CircularWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;
    const bars = 12;
    const center = size / 2;
    const radius = size / 3;
    const barWidth = 2;
    const maxHeight = size / 4;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      
      for (let i = 0; i < bars; i++) {
        const angle = (i * (Math.PI * 2) / bars) + step;
        const height = maxHeight * (0.5 + 0.5 * Math.sin(angle * 3));
        
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(i * (Math.PI * 2) / bars);
        ctx.fillStyle = color;
        ctx.fillRect(radius - barWidth/2, -height/2, barWidth, height);
        ctx.restore();
      }

      step += 0.1;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, size, color]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="rounded-full"
    />
  );
}
