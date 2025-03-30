
import { useState } from "react";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";
import { AvatarContainer, AvatarImage, AvatarFallback } from "@/components/ui-custom/Avatar";
import { Check, User, GraduationCap, Brain, Lightbulb, Atom, Flask, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";

export type AvatarStyle = "flat" | "3d" | "photo";

export interface AvatarOption {
  id: string;
  type: AvatarStyle;
  imageUrl?: string;
  icon?: React.ReactNode;
  color?: string;
  name: string;
}

interface StudentAvatarSelectorProps {
  selectedAvatar?: string;
  onSelect: (avatarId: string) => void;
  className?: string;
}

// Define avatar options - we'll have flat icons, 3D rendered avatars, and photo avatars
const avatarOptions: AvatarOption[] = [
  // Flat icon avatars
  { id: "flat-1", type: "flat", icon: <User className="h-6 w-6" />, color: "bg-blue-100 text-blue-600", name: "Default" },
  { id: "flat-2", type: "flat", icon: <GraduationCap className="h-6 w-6" />, color: "bg-purple-100 text-purple-600", name: "Graduate" },
  { id: "flat-3", type: "flat", icon: <Brain className="h-6 w-6" />, color: "bg-amber-100 text-amber-600", name: "Thinker" },
  { id: "flat-4", type: "flat", icon: <Lightbulb className="h-6 w-6" />, color: "bg-green-100 text-green-600", name: "Bright" },
  { id: "flat-5", type: "flat", icon: <Atom className="h-6 w-6" />, color: "bg-red-100 text-red-600", name: "Scientist" },
  { id: "flat-6", type: "flat", icon: <Flask className="h-6 w-6" />, color: "bg-cyan-100 text-cyan-600", name: "Chemist" },
  { id: "flat-7", type: "flat", icon: <PenTool className="h-6 w-6" />, color: "bg-indigo-100 text-indigo-600", name: "Artist" },

  // 3D rendered avatars
  { id: "3d-1", type: "3d", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=student1&backgroundColor=b6e3f4", name: "3D Shape 1" },
  { id: "3d-2", type: "3d", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=student2&backgroundColor=d1d4f9", name: "3D Shape 2" },
  { id: "3d-3", type: "3d", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=student3&backgroundColor=c0aede", name: "3D Shape 3" },
  { id: "3d-4", type: "3d", imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=student1", name: "3D Thumbs 1" },
  { id: "3d-5", type: "3d", imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=student2", name: "3D Thumbs 2" },
  { id: "3d-6", type: "3d", imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=student1", name: "3D Avatar 1" },
  { id: "3d-7", type: "3d", imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=student2", name: "3D Avatar 2" },

  // Photo avatars
  { id: "photo-1", type: "photo", imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=200&h=200", name: "Photo 1" },
  { id: "photo-2", type: "photo", imageUrl: "https://images.unsplash.com/photo-1501286353178-1ec881214838?auto=format&fit=crop&w=200&h=200", name: "Photo 2" },
  { id: "photo-3", type: "photo", imageUrl: "https://images.unsplash.com/photo-1441057206919-63d19fac2369?auto=format&fit=crop&w=200&h=200", name: "Photo 3" },
];

export function StudentAvatarSelector({ selectedAvatar, onSelect, className }: StudentAvatarSelectorProps) {
  const [selectedType, setSelectedType] = useState<AvatarStyle>("flat");
  
  // Filter avatars based on selected type
  const filteredAvatars = avatarOptions.filter(avatar => avatar.type === selectedType);
  
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex justify-center mb-4">
        <div className="inline-flex p-1 bg-secondary/30 rounded-lg">
          <Button 
            variant={selectedType === "flat" ? "default" : "ghost"} 
            size="sm" 
            onClick={() => setSelectedType("flat")}
            className="rounded-md"
          >
            Flat Icons
          </Button>
          <Button 
            variant={selectedType === "3d" ? "default" : "ghost"} 
            size="sm" 
            onClick={() => setSelectedType("3d")}
            className="rounded-md"
          >
            3D Avatars
          </Button>
          <Button 
            variant={selectedType === "photo" ? "default" : "ghost"} 
            size="sm" 
            onClick={() => setSelectedType("photo")}
            className="rounded-md"
          >
            Photos
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
        {filteredAvatars.map((avatar) => (
          <Card 
            key={avatar.id}
            className={cn(
              "cursor-pointer transition-all duration-300 hover:scale-105",
              selectedAvatar === avatar.id ? "ring-2 ring-primary ring-offset-2" : "hover:border-primary/50"
            )}
            onClick={() => onSelect(avatar.id)}
          >
            <CardContent className="p-3 flex flex-col items-center justify-center text-center">
              <div className="relative">
                <AvatarContainer size="lg" className={cn("mx-auto", avatar.color)}>
                  {avatar.imageUrl ? (
                    <AvatarImage src={avatar.imageUrl} alt={avatar.name} />
                  ) : (
                    <AvatarFallback>{avatar.icon}</AvatarFallback>
                  )}
                </AvatarContainer>
                {selectedAvatar === avatar.id && (
                  <div className="absolute -right-2 -bottom-2 bg-primary text-white rounded-full p-1">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </div>
              <p className="text-xs mt-2 truncate w-full">{avatar.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
