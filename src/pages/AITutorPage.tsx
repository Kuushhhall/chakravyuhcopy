
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { LearningProvider } from "@/contexts/LearningContext";
import { AITutorContent } from "@/components/ai-tutor/AITutorContent";

export default function AITutorPage() {
  const { user, loading } = useAuth();
  
  // Check authentication
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary/30 mb-4"></div>
          <div className="h-4 w-32 bg-primary/30 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!user) {
    toast.error("Please sign in to access the AI Tutor");
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-4">
        <Container>
          <LearningProvider>
            <AITutorContent />
          </LearningProvider>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
