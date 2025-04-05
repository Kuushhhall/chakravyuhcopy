
import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Container } from "@/components/ui/container";
import { VapiSetup } from "@/components/ai-tutor/VapiSetup";
import VoiceConversation from "@/components/ai-tutor/VoiceConversation";
import { VAPI_API_KEY, isVapiConfigured } from "@/config/env";

export default function AITutorPage() {
  const [apiKey, setApiKey] = useState<string>(VAPI_API_KEY);
  const [isConfigured, setIsConfigured] = useState<boolean>(isVapiConfigured);

  // Check for API key in localStorage on mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem("vapiApiKey");
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
    <PageLayout showFooter={false}>
      <Container className="py-4">
        {isConfigured ? (
          <VoiceConversation apiKey={apiKey} />
        ) : (
          <VapiSetup onSetupComplete={handleSetupComplete} />
        )}
      </Container>
    </PageLayout>
  );
}
