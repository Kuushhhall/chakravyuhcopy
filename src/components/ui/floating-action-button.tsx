
import { ReactNode, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui-custom/Button';

interface FloatingActionButtonProps {
  children: ReactNode;
  className?: string;
}

export function FloatingActionButton({
  children,
  className,
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <div className="relative">
        {/* Action menu */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 flex flex-col gap-2 items-end animate-in slide-in-from-bottom-5 duration-300">
            {children}
          </div>
        )}
        
        {/* Main button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full shadow-lg flex items-center justify-center bg-primary hover:bg-primary/90 transition-all duration-300 hover:ring-4 hover:ring-primary/20"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Plus className="h-6 w-6" />
          )}
        </Button>
      </div>
    </div>
  );
}

export interface FloatingActionItemProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

export function FloatingActionItem({
  icon,
  label,
  onClick,
}: FloatingActionItemProps) {
  return (
    <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-300">
      <span className="bg-background shadow-md text-foreground px-3 py-2 rounded-lg text-sm">
        {label}
      </span>
      <Button
        onClick={onClick}
        className="h-11 w-11 rounded-full shadow-md flex items-center justify-center"
        aria-label={label}
      >
        {icon}
      </Button>
    </div>
  );
}
