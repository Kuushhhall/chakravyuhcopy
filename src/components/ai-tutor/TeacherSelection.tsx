import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { teacherProfiles } from '@/data/teacherProfiles';
import { cn } from '@/lib/utils';

interface TeacherSelectionProps {
  onSelect: (teacherId: string) => void;
  selectedTeacher?: string;
}

export function TeacherSelection({ onSelect, selectedTeacher }: TeacherSelectionProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {teacherProfiles.map((teacher) => (
        <Button
          key={teacher.id}
          variant="ghost"
          onClick={() => onSelect(teacher.id)}
          className={cn(
            "flex flex-col items-center gap-2 h-auto p-4 rounded-lg border",
            selectedTeacher === teacher.id 
              ? "border-primary bg-primary/10" 
              : "border-transparent hover:border-gray-300"
          )}
        >
          <Avatar className="h-16 w-16">
            <AvatarImage src={teacher.avatar} />
            <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="font-medium">{teacher.name}</h3>
            <p className="text-sm text-muted-foreground">{teacher.subject}</p>
          </div>
        </Button>
      ))}
    </div>
  );
}
