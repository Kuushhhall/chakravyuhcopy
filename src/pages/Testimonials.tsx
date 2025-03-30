
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Star, Quote } from "lucide-react";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { Button } from "@/components/ui-custom/Button";
import { AvatarContainer, AvatarImage, AvatarFallback } from "@/components/ui-custom/Avatar";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ankit Sharma",
      position: "JEE Advanced, AIR 87",
      quote: "Chakravyuh transformed my JEE preparation journey. The AI-driven approach identified my weak areas in Physical Chemistry and helped me focus my efforts efficiently. The interactive visualizations made complex concepts easy to grasp.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120",
      subject: "Chemistry",
      improved: "78%"
    },
    {
      id: 2,
      name: "Meera Patel",
      position: "JEE Main, 99.8 percentile",
      quote: "The personalized study plan was a game-changer. Chakravyuh adapted to my learning style and pace, providing just the right amount of challenge. The instant doubt resolution feature saved me countless hours that would have been spent searching for answers.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120",
      subject: "Physics",
      improved: "82%"
    },
    {
      id: 3,
      name: "Rohit Verma",
      position: "JEE Advanced, AIR 203",
      quote: "What sets Chakravyuh apart is its ability to make connections between different concepts. The concept mapping feature helped me understand how various topics in Mathematics were interrelated, which was crucial for solving complex problems in the exam.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120",
      subject: "Mathematics",
      improved: "65%"
    },
    {
      id: 4,
      name: "Shreya Kapoor",
      position: "JEE Main, 99.2 percentile",
      quote: "The mock tests on Chakravyuh were remarkably similar to the actual JEE pattern. The detailed analytics after each test helped me understand exactly what I needed to work on. The revision suggestions were spot on and helped me retain information better.",
      rating: 4,
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=120&h=120",
      subject: "Physics",
      improved: "70%"
    },
    {
      id: 5,
      name: "Arjun Nair",
      position: "JEE Advanced, AIR 345",
      quote: "The AI tutor was available 24/7, which was incredibly helpful during late-night study sessions. The way Chakravyuh breaks down complex problems into manageable steps made even the most challenging topics approachable. I wouldn't have cracked JEE without it.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=120&h=120",
      subject: "Chemistry",
      improved: "75%"
    },
    {
      id: 6,
      name: "Priya Mehta",
      position: "JEE Main, 98.6 percentile",
      quote: "Coming from a small town with limited access to good coaching, Chakravyuh leveled the playing field for me. The quality of content and teaching is at par with the best institutes in the country. The platform truly democratizes access to quality education.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120",
      subject: "Mathematics",
      improved: "85%"
    }
  ];

  const featuredTestimonials = testimonials.slice(0, 3);
  const regularTestimonials = testimonials.slice(3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Student Success Stories</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Hear from students who transformed their JEE preparation journey with Chakravyuh
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className="border-none shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="mb-4 flex justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <AvatarContainer>
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </AvatarContainer>
                        <div>
                          <h3 className="font-bold">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      {[...Array(5 - testimonial.rating)].map((_, i) => (
                        <Star key={i + testimonial.rating} className="h-4 w-4 text-muted-foreground" />
                      ))}
                    </div>
                    <blockquote className="relative">
                      <Quote className="absolute top-0 left-0 h-8 w-8 text-primary/20 -translate-x-2 -translate-y-2" />
                      <p className="pl-3 italic text-muted-foreground">{testimonial.quote}</p>
                    </blockquote>
                    <div className="mt-6 grid grid-cols-2 gap-2 text-center">
                      <div className="bg-primary/5 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">Key Subject</p>
                        <p className="font-bold">{testimonial.subject}</p>
                      </div>
                      <div className="bg-primary/5 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">Improvement</p>
                        <p className="font-bold text-primary">{testimonial.improved}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="py-16 bg-white">
          <div className="container px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">More Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className="border hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-3 flex justify-between items-center">
                      <div className="flex gap-3 items-center">
                        <AvatarContainer size="sm">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </AvatarContainer>
                        <div>
                          <h3 className="font-medium text-sm">{testimonial.name}</h3>
                          <p className="text-xs text-muted-foreground">{testimonial.position}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground italic">{testimonial.quote}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <TestimonialsSection />

        <div className="py-16 bg-primary text-primary-foreground text-center">
          <div className="container px-4">
            <h2 className="text-3xl font-bold mb-6">Join Thousands of Successful Students</h2>
            <p className="text-xl opacity-90 max-w-xl mx-auto mb-8">
              Start your JEE preparation journey with Chakravyuh today and experience the difference personalized AI learning can make.
            </p>
            <Button size="lg" variant="secondary" className="font-bold">
              Start Free Trial
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Testimonials;
