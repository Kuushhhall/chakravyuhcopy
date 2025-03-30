
import { Card, CardContent } from "@/components/ui-custom/Card";
import { GraduationCap, Activity, BookOpen, BarChart4, Clock, Star, Brain, Zap } from "lucide-react";

export function FeatureSection() {
  const features = [
    {
      icon: Brain,
      title: "Adaptive Learning",
      description: "AI checks prerequisites before advancing to complex topics, ensuring you build a solid foundation."
    },
    {
      icon: Activity,
      title: "Real-time Assessment",
      description: "Get instant feedback on your progress and identify knowledge gaps for targeted improvement."
    },
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description: "Dynamic visualizations and explanations make complex concepts easier to understand."
    },
    {
      icon: BarChart4,
      title: "Performance Analytics",
      description: "Comprehensive dashboards track your performance and help optimize your study strategy."
    },
    {
      icon: Clock,
      title: "Time Optimization",
      description: "Focus on what matters most with AI-recommended study priorities based on your progress."
    },
    {
      icon: Star,
      title: "Personalized Experience",
      description: "Tailor your learning experience based on your preferences and learning style."
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-0" />
      
      {/* Background elements */}
      <div className="absolute top-40 left-20 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl opacity-5" />
      <div className="absolute bottom-40 right-20 w-72 h-72 bg-purple-400 rounded-full filter blur-3xl opacity-5" />
      
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Revolutionizing JEE Exam Preparation</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform adapts to your learning style and creates personalized study plans for JEE success.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover-scale glass-card overflow-hidden border-background/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="mb-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 w-fit">
                  <feature.icon className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
