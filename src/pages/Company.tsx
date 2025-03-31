
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const teamMembers = [
  {
    name: "Dr. Amit Sharma",
    role: "Founder & CEO",
    bio: "Former professor at IIT Delhi with 15+ years of teaching experience in Physics. Created Chakravyuh to democratize quality JEE preparation.",
    image: "/team/amit.jpg",
    fallback: "AS"
  },
  {
    name: "Priya Gupta",
    role: "Chief Learning Officer",
    bio: "JEE All India Rank 8, Chemistry specialist with a passion for creating engaging learning experiences through technology.",
    image: "/team/priya.jpg",
    fallback: "PG"
  },
  {
    name: "Rahul Mehta",
    role: "CTO",
    bio: "AI researcher and engineering graduate from IIT Bombay. Leads the technical development of our adaptive learning algorithms.",
    image: "/team/rahul.jpg",
    fallback: "RM"
  },
  {
    name: "Dr. Neha Patel",
    role: "Mathematics Content Director",
    bio: "PhD in Mathematics with specialization in calculus. Taught at BITS Pilani for 8 years before joining Chakravyuh.",
    image: "/team/neha.jpg",
    fallback: "NP"
  },
  {
    name: "Vikram Singh",
    role: "Physics Content Director",
    bio: "Former JEE coach with over 300 students clearing JEE Advanced. Known for his intuitive approach to teaching complex physics concepts.",
    image: "/team/vikram.jpg",
    fallback: "VS"
  },
  {
    name: "Anjali Kumar",
    role: "UX Research Lead",
    bio: "Education psychologist focused on creating learning experiences that maximize retention and minimize cognitive load.",
    image: "/team/anjali.jpg",
    fallback: "AK"
  }
];

export default function Company() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-12 md:py-20">
          <PageHeader 
            title="Our Team" 
            description="Meet the passionate educators, technologists, and subject matter experts behind Chakravyuh."
            gradient
          />
          
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg leading-relaxed mb-6">
              At Chakravyuh, we're on a mission to democratize high-quality JEE preparation through adaptive AI technology, making elite education accessible to all aspiring engineers regardless of their location or background.
            </p>
            <p className="text-lg leading-relaxed">
              Our platform combines cutting-edge technology with proven pedagogical methods to create personalized learning pathways that adapt to each student's unique strengths, weaknesses, and learning style.
            </p>
          </div>
          
          <h2 className="text-2xl font-bold mb-8 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {teamMembers.map((member) => (
              <Card key={member.name} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback className="text-lg">{member.fallback}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="bg-primary/5 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
            <p className="max-w-2xl mx-auto mb-6">
              We're always looking for passionate educators, developers, and learning specialists to join our mission of transforming JEE preparation.
            </p>
            <a href="/careers" className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-6 rounded-full transition-colors">
              View Open Positions
            </a>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
