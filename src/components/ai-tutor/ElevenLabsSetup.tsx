
import { useState } from "react";
import { Button } from "@/components/ui-custom/Button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui-custom/Card";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface ElevenLabsSetupProps {
  onSetupComplete: (apiKey: string) => void;
}

export function ElevenLabsSetup({ onSetupComplete }: ElevenLabsSetupProps) {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Eleven Labs API key",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Store in localStorage for this session
      localStorage.setItem("elevenLabsApiKey", apiKey);
      
      toast({
        title: "Success",
        description: "API key saved successfully",
      });
      
      onSetupComplete(apiKey);
    } catch (error) {
      console.error("Error saving API key:", error);
      toast({
        title: "Error",
        description: "Failed to save API key",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Eleven Labs Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <p className="mb-4 text-sm text-muted-foreground">
                To enable voice conversation, please enter your Eleven Labs API key.
                You can find or create your API key in the{" "}
                <a 
                  href="https://elevenlabs.io/account"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Eleven Labs dashboard
                </a>.
              </p>
              
              <div className="relative">
                <Input
                  type={showApiKey ? "text" : "password"}
                  placeholder="Enter your Eleven Labs API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
              
              <p className="mt-2 text-xs text-muted-foreground">
                Your API key will be stored locally in your browser and not shared with our servers.
              </p>
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save API Key"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-xs text-muted-foreground">
          <p>
            Don't have an Eleven Labs account?{" "}
            <a 
              href="https://elevenlabs.io/sign-up"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Sign up here
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
