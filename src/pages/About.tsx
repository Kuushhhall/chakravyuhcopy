
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Building, Compass, Heart, Lightbulb, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui-custom/Button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" aria-hidden="true"></div>
          <div className="absolute top-20 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full filter blur-3xl transform translate-x-1/3 -translate-y-1/4 pointer-events-none" aria-hidden="true"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/5 rounded-full filter blur-3xl transform -translate-x-1/3 translate-y-1/4 pointer-events-none" aria-hidden="true"></div>
          
          <div className="container px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center gap-2 mb-6 bg-primary/10 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-primary">About Chakravyuh</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Revolutionizing <span className="gradient-text">JEE Preparation</span> with AI
              </h1>
              <p className="text-lg text-muted-foreground mb-8 mx-auto max-w-2xl">
                We're building an adaptive learning platform that personalizes your JEE preparation journey. Our AI-powered system evolves with you, making learning more effective and engaging.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/company">Our Company</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission & Vision Section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission & Vision</h2>
              <p className="text-muted-foreground">
                What drives us every day and what we're working towards
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-primary to-purple-600"></div>
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Compass className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To democratize quality education by creating an adaptive learning platform that provides personalized preparation for competitive exams, making world-class education accessible to every student regardless of their background or location.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-purple-600 to-primary"></div>
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To build a future where every student has access to a personal AI tutor that understands their unique learning style and adapts to their needs, revolutionizing how education is delivered and experienced worldwide.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Core Values Section */}
        <section className="py-16">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
              <p className="text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="card-hover-effect">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Student-First</h3>
                  <p className="text-sm text-muted-foreground">
                    Every decision we make starts with the question: "How does this benefit our students?"
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover-effect">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Excellence</h3>
                  <p className="text-sm text-muted-foreground">
                    We're committed to creating the highest quality educational content and technology.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover-effect">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Innovation</h3>
                  <p className="text-sm text-muted-foreground">
                    We continuously push the boundaries of what's possible in educational technology.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16 bg-gradient-to-b from-white to-primary/5 dark:from-gray-900 dark:to-primary/5">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p>
                  Chakravyuh was born from a simple observation: despite living in an age of information abundance, students still struggle to find personalized, effective ways to prepare for competitive exams like JEE.
                </p>
                
                <p>
                  Our founder, Kushal Jain, experienced this challenge firsthand while preparing for JEE. Despite access to countless resources, he found it difficult to create a study plan that addressed his specific strengths and weaknesses. He spent hours sifting through generic content when what he really needed was a tutor who understood his unique learning style.
                </p>
                
                <p>
                  In 2023, after advances in AI made personalized learning at scale possible, Kushal assembled a team of educators, engineers, and AI experts with a shared mission: to create an adaptive learning platform that could understand each student's needs and evolve with them.
                </p>
                
                <p>
                  Today, Chakravyuh's AI-powered platform analyzes how you learn, identifies knowledge gaps, and creates personalized study plans that adapt in real-time. We combine cutting-edge technology with proven pedagogical approaches to make your JEE preparation more efficient and effective.
                </p>
                
                <p>
                  Our name "Chakravyuh" comes from ancient Indian military formation that requires intelligence and strategy to navigate—much like the path to JEE success. We're here to help you navigate that path with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 z-0" />
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-70 animate-pulse-soft" />
          <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl opacity-70 animate-pulse-soft" style={{ animationDelay: "1s" }} />
          
          <div className="container px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center glass-panel p-10 rounded-2xl border border-white/10 backdrop-blur-lg">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your JEE Preparation?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of students who are using Chakravyuh to achieve their JEE dreams.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:shadow-lg shadow-primary/25 px-8" asChild>
                <Link to="/signup">
                  Get Started For Free
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
