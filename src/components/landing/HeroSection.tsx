
import { Button } from "@/components/ui-custom/Button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden flex items-center">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-950 z-0" />
      
      {/* Animated shapes */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full filter blur-3xl opacity-20 animate-pulse-soft" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full filter blur-3xl opacity-10 animate-pulse-soft" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-300 to-purple-300 rounded-full filter blur-3xl opacity-5 animate-pulse-soft" style={{ animationDelay: "2s" }} />
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-6 w-6 text-blue-500" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">AI-POWERED LEARNING</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="block">The AI Tutor That</span>
            <span className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Understands You
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Master JEE with adaptive learning that evolves with your progress. 
            Personalized study plans, instant feedback, and AI-generated explanations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25" asChild>
              <Link to="/signup">
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2" asChild>
              <Link to="/explore">Explore Features</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
