
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui-custom/Button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Progress } from "@/components/ui-custom/Progress";
import { GraduationCap, Activity, BookOpen, BarChart4, Clock, Star } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-secondary/40 z-0" />
          <div className="container relative z-10 py-20 md:py-32 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Your Personal AI Tutor
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Personalized study plans for competitive exam preparation, powered by adaptive AI technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Button size="lg" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/learn-more">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Revolutionizing Exam Preparation</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Our AI-powered platform adapts to your learning style and creates personalized study plans.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="study-card bg-white/50 border-border/40">
                <CardContent className="p-6">
                  <div className="mb-4 p-3 rounded-lg bg-secondary/50 w-fit">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Adaptive Learning</h3>
                  <p className="text-muted-foreground">
                    AI checks prerequisites before advancing to complex topics, ensuring you build a solid foundation.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="study-card bg-white/50 border-border/40">
                <CardContent className="p-6">
                  <div className="mb-4 p-3 rounded-lg bg-secondary/50 w-fit">
                    <Activity className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Real-time Assessment</h3>
                  <p className="text-muted-foreground">
                    Get instant feedback on your progress and identify knowledge gaps for targeted improvement.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="study-card bg-white/50 border-border/40">
                <CardContent className="p-6">
                  <div className="mb-4 p-3 rounded-lg bg-secondary/50 w-fit">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
                  <p className="text-muted-foreground">
                    Dynamic visualizations and explanations make complex concepts easier to understand.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="study-card bg-white/50 border-border/40">
                <CardContent className="p-6">
                  <div className="mb-4 p-3 rounded-lg bg-secondary/50 w-fit">
                    <BarChart4 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Performance Analytics</h3>
                  <p className="text-muted-foreground">
                    Comprehensive dashboards track your performance and help optimize your study strategy.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="study-card bg-white/50 border-border/40">
                <CardContent className="p-6">
                  <div className="mb-4 p-3 rounded-lg bg-secondary/50 w-fit">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Time Optimization</h3>
                  <p className="text-muted-foreground">
                    Focus on what matters most with AI-recommended study priorities based on your progress.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="study-card bg-white/50 border-border/40">
                <CardContent className="p-6">
                  <div className="mb-4 p-3 rounded-lg bg-secondary/50 w-fit">
                    <Star className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Personalized Experience</h3>
                  <p className="text-muted-foreground">
                    Tailor your learning experience based on your preferences and learning style.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Join thousands of students who have transformed their exam preparation experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white border-none shadow-sm">
                <CardContent className="p-6">
                  <p className="mb-4 text-muted-foreground italic">
                    "StudyAI helped me identify my weak areas in Physics. After just 3 months, my scores improved by 40%. The personalized study plan was a game-changer."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-medium">A</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Aisha K.</h4>
                      <p className="text-sm text-muted-foreground">JEE Advanced, AIR 112</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-none shadow-sm">
                <CardContent className="p-6">
                  <p className="mb-4 text-muted-foreground italic">
                    "The interactive visualizations helped me understand complex concepts in Organic Chemistry that I had been struggling with for months."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-medium">R</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Rahul S.</h4>
                      <p className="text-sm text-muted-foreground">NEET, 99.8 percentile</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-none shadow-sm">
                <CardContent className="p-6">
                  <p className="mb-4 text-muted-foreground italic">
                    "The AI tutor's ability to adapt to my learning pace was incredible. It never moved too fast or too slow, perfectly matching my understanding."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-medium">P</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Priya M.</h4>
                      <p className="text-sm text-muted-foreground">CAT, 99.5 percentile</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-gray-50 to-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Learning Experience?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Start your personalized learning journey today with StudyAI and experience the future of education.
              </p>
              <Button size="lg" asChild className="animate-pulse-soft">
                <Link to="/signup">Get Started For Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
