
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { AvatarContainer, AvatarImage, AvatarFallback } from "@/components/ui-custom/Avatar";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-4xl px-4">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4">About Chakravyuh</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transforming JEE preparation with AI-powered personalized learning
            </p>
          </div>
          
          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="mb-6">
                  At Chakravyuh, we believe that every student deserves a learning experience tailored to their unique needs and learning style. Our AI-powered platform adapts to how you learn, identifies your strengths and weaknesses, and creates a personalized path to JEE success.
                </p>
                
                <h2 className="text-2xl font-bold mb-4">Why Chakravyuh?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-secondary/30 p-6 rounded-lg">
                    <h3 className="font-bold mb-2">Personalized Learning</h3>
                    <p>Our AI analyzes your learning style and progress to create a customized study plan that evolves as you learn.</p>
                  </div>
                  <div className="bg-secondary/30 p-6 rounded-lg">
                    <h3 className="font-bold mb-2">AI Tutoring</h3>
                    <p>Get instant help from our AI tutors who can explain concepts, solve problems, and answer questions 24/7.</p>
                  </div>
                  <div className="bg-secondary/30 p-6 rounded-lg">
                    <h3 className="font-bold mb-2">Comprehensive Coverage</h3>
                    <p>Our curriculum covers all JEE subjects with deep concept mapping to ensure you understand connections between topics.</p>
                  </div>
                  <div className="bg-secondary/30 p-6 rounded-lg">
                    <h3 className="font-bold mb-2">Progress Tracking</h3>
                    <p>Detailed analytics show your improvement over time and highlight areas that need more attention.</p>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                <p className="mb-6">
                  Chakravyuh was founded by Kushal Jain, who understood the challenges students face in JEE preparation. By combining pedagogical expertise with cutting-edge AI technology, we've created a learning platform that understands how you learn and adapts to help you succeed.
                </p>
                
                <h2 className="text-2xl font-bold mb-4">What's with the name?</h2>
                <p>
                  The Chakravyuh is an ancient military formation mentioned in the Mahabharata that was complex to navigate but had a definite path to success for those who understood its pattern. Similarly, our platform helps you navigate the complex world of JEE preparation by providing a clear, personalized path to success.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-2xl font-bold mb-6 text-center">Founder</h2>
          <div className="flex justify-center mb-12">
            <div className="text-center max-w-xs">
              <AvatarContainer size="lg" className="mx-auto mb-4">
                <AvatarImage src="https://placekitten.com/300/300" alt="Kushal Jain" />
                <AvatarFallback>KJ</AvatarFallback>
              </AvatarContainer>
              <h3 className="font-bold text-lg">Kushal Jain</h3>
              <p className="text-muted-foreground">Founder & CEO</p>
              <p className="mt-2 text-sm">Passionate about revolutionizing education through AI to make quality learning accessible to all students preparing for competitive exams.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
