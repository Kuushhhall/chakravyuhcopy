
import { Card, CardContent } from "@/components/ui-custom/Card";
import { cn } from "@/lib/utils";

interface LearningStyleCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  isSelected?: boolean;
  className?: string;
  onClick?: () => void;
}

export function LearningStyleCard({ title, description, icon, isSelected, className, onClick }: LearningStyleCardProps) {
  return (
    <Card 
      className={cn(
        "hover-scale cursor-pointer border border-border/40",
        isSelected ? "bg-primary/10 border-primary" : "",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6 flex flex-col items-center text-center">
        {icon && (
          <div className="mb-4 p-2">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
