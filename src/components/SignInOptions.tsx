
import { Button } from "@/components/ui-custom/Button";

interface SignInOptionProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}

export function SignInOption({ icon, text, onClick }: SignInOptionProps) {
  return (
    <Button
      variant="outline"
      className="w-full flex items-center gap-2 justify-center py-6 bg-white hover:bg-secondary/50"
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </Button>
  );
}
