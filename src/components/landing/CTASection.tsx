
import { Button } from "@/components/ui-custom/Button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-950 z-0" />
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl opacity-10 animate-float" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-400 rounded-full filter blur-3xl opacity-10 animate-float" style={{ animationDelay: "1s" }} />
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center glass-panel p-10 rounded-2xl border border-white/10 backdrop-blur-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your JEE Preparation?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start your personalized learning journey today with Chakravyuh and experience the future of JEE education.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 animate-pulse-soft text-white shadow-lg shadow-blue-500/25 px-8" asChild>
            <Link to="/signup">
              Get Started For Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
