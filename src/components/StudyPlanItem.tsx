
import { Progress } from "@/components/ui-custom/Progress";

interface StudyPlanItemProps {
  subject: string;
  duration: string;
  progress: number;
}

export function StudyPlanItem({ subject, duration, progress }: StudyPlanItemProps) {
  return (
    <div className="py-3 space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium">{subject}</span>
        <span className="text-sm text-muted-foreground">{duration}</span>
      </div>
      <Progress value={progress} />
    </div>
  );
}
