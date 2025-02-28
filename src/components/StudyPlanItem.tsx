
import { useState } from "react";
import { Progress } from "@/components/ui-custom/Progress";
import { Button } from "@/components/ui-custom/Button";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, ChevronDown, ChevronUp, Clock, BookOpen } from "lucide-react";

interface StudyPlanItemProps {
  subject: string;
  duration: string;
  progress: number;
  topics?: Array<{
    name: string;
    completed: boolean;
    duration: string;
  }>;
  difficulty?: "easy" | "medium" | "hard";
  onClick?: () => void;
}

export function StudyPlanItem({ 
  subject, 
  duration, 
  progress, 
  topics = [],
  difficulty = "medium",
  onClick 
}: StudyPlanItemProps) {
  const [expanded, setExpanded] = useState(false);
  const { toast } = useToast();

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleStartStudy = () => {
    toast({
      title: "Starting Study Session",
      description: `Preparing your ${subject} study materials...`,
      duration: 3000,
    });
    
    if (onClick) {
      onClick();
    }
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "easy":
        return "text-green-500";
      case "medium":
        return "text-amber-500";
      case "hard":
        return "text-red-500";
      default:
        return "text-amber-500";
    }
  };

  return (
    <Card className="mb-4 overflow-hidden border-l-4 transition-all duration-300 hover:shadow-md"
      style={{ borderLeftColor: difficulty === "easy" ? "#22c55e" : difficulty === "medium" ? "#f59e0b" : "#ef4444" }}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="font-medium text-lg">{subject}</h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor()} bg-opacity-20 bg-current`}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline"
              size="sm"
              onClick={handleToggle}
              className="rounded-full h-8 w-8 p-0 flex items-center justify-center"
            >
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            <Button 
              size="sm"
              onClick={handleStartStudy}
              className="flex items-center space-x-1"
            >
              <BookOpen className="h-4 w-4 mr-1" />
              Study Now
            </Button>
          </div>
        </div>
        
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1 text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {expanded && topics.length > 0 && (
          <div className="mt-4 pt-3 border-t border-border/40">
            <h4 className="text-sm font-medium mb-2">Topics Covered</h4>
            <ul className="space-y-2">
              {topics.map((topic, index) => (
                <li key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    {topic.completed ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-muted-foreground mr-2" />
                    )}
                    <span>{topic.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{topic.duration}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
