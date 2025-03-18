
import { Button } from "@/components/ui-custom/Button";

interface SignInOptionProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  loading?: boolean;
}

export function SignInOption({ icon, text, onClick, loading = false }: SignInOptionProps) {
  return (
    <Button
      variant="outline"
      className="w-full flex items-center gap-2 justify-center py-6 bg-white hover:bg-secondary/50"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        icon
      )}
      <span>{text}</span>
    </Button>
  );
}
