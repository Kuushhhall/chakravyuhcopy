
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Container } from "@/components/ui/container";
import { ElevenLabsSetup } from "@/components/ai-tutor/ElevenLabsSetup";
import VoiceConversation from "@/components/ai-tutor/VoiceConversation";
import { ELEVEN_LABS_API_KEY, isElevenLabsConfigured } from "@/config/env";

export default function AITutorPage() {
  const [apiKey, setApiKey] = useState<string>(ELEVEN_LABS_API_KEY);
  const [isConfigured, setIsConfigured] = useState<boolean>(isElevenLabsConfigured);

  // Check for API key in localStorage on mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem("elevenLabsApiKey");
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setIsConfigured(true);
    }
  }, []);

  const handleSetupComplete = (apiKey: string) => {
    setApiKey(apiKey);
    setIsConfigured(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-4">
        <Container>
          {isConfigured ? (
            <VoiceConversation apiKey={apiKey} />
          ) : (
            <ElevenLabsSetup onSetupComplete={handleSetupComplete} />
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
}
