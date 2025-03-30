
import { Card, CardContent } from "@/components/ui-custom/Card";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Chakravyuh helped me identify my weak areas in Physics. After just 3 months, my scores improved by 40%. The personalized study plan was a game-changer.",
      name: "Aisha K.",
      position: "JEE Advanced, AIR 112",
      initial: "A"
    },
    {
      quote: "The interactive visualizations helped me understand complex concepts in Organic Chemistry that I had been struggling with for months.",
      name: "Rahul S.",
      position: "NEET, 99.8 percentile",
      initial: "R"
    },
    {
      quote: "The AI tutor's ability to adapt to my learning pace was incredible. It never moved too fast or too slow, perfectly matching my understanding.",
      name: "Priya M.",
      position: "JEE Main, 99.5 percentile",
      initial: "P"
    }
  ];

  return (
    <section className="py-20 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-900/50 dark:to-blue-950/50 z-0" />
      
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Join thousands of students who have transformed their JEE preparation experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800 border-none shadow-xl hover-scale">
              <CardContent className="p-6">
                <p className="mb-6 text-muted-foreground italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                    {testimonial.initial}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
