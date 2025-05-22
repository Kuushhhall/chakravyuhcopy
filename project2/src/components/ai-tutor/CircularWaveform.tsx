import { useEffect, useRef } from 'react';

interface CircularWaveformProps {
  isActive: boolean;
  isUser?: boolean;
  size?: number;
  color?: string;
}

export function CircularWaveform({ 
  isActive, 
  isUser = false, 
  size = 120,
  color
}: CircularWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    radius: number;
    angle: number;
    velocity: number;
    amplitude: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = size;
    canvas.height = size;

    // Colors based on whether it's user or AI
    const primaryColor = color || (isUser ? '#8B5CF6' : '#3B82F6');
    const secondaryColor = color ? `${color}80` : (isUser ? '#C4B5FD' : '#93C5FD');

    // Initialize particles
    const particleCount = 32;
    particlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
      x: size / 2,
      y: size / 2,
      radius: 35, // Circle radius
      angle: (i * 2 * Math.PI) / particleCount,
      velocity: 0.02,
      amplitude: isActive ? Math.random() * 10 + 5 : 0
    }));

    const animate = () => {
      ctx.clearRect(0, 0, size, size);

      // Create gradient for outer circle
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, primaryColor);
      gradient.addColorStop(1, secondaryColor);

      // Draw outer circle
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, 40, 0, 2 * Math.PI);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        if (isActive) {
          particle.amplitude = Math.max(0, particle.amplitude + (Math.random() - 0.5) * 2);
          particle.amplitude = Math.min(15, Math.max(5, particle.amplitude));
        } else {
          particle.amplitude = Math.max(0, particle.amplitude - 0.5);
        }

        const distance = particle.radius + particle.amplitude;
        const x = size / 2 + Math.cos(particle.angle) * distance;
        const y = size / 2 + Math.sin(particle.angle) * distance;

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();

        particle.angle += particle.velocity;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, isUser, size]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-[${size}px] h-[${size}px] transition-opacity duration-300`}
      style={{ opacity: isActive ? 1 : 0.5 }}
    />
  );
}
