
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";
import { MapPin, Briefcase, Clock, BadgeDollarSign } from "lucide-react";

const Careers = () => {
  const jobOpenings = [
    {
      id: 1,
      title: "Senior AI Engineer",
      department: "AI Research",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "5+ years",
      salary: "₹20-30 LPA",
      description: "Design and develop advanced AI algorithms for personalized learning and content recommendation systems.",
      responsibilities: [
        "Research and implement state-of-the-art ML/DL techniques for education technology",
        "Build and optimize AI models for tracking student progress and adapting content",
        "Collaborate with education experts to implement pedagogical principles into AI systems",
        "Improve existing algorithms based on student feedback and performance metrics"
      ],
      requirements: [
        "M.S. or Ph.D. in Computer Science, AI, or related field",
        "5+ years experience in developing AI/ML systems in production",
        "Expertise in Python, TensorFlow/PyTorch, and NLP",
        "Experience with educational technology is a plus"
      ]
    },
    {
      id: 2,
      title: "Content Developer - Physics",
      department: "Academic Content",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      salary: "₹12-18 LPA",
      description: "Create high-quality, engaging educational content for JEE Physics preparation, optimized for digital learning.",
      responsibilities: [
        "Develop comprehensive study materials, practice problems, and assessments for JEE Physics",
        "Create interactive visualizations and simulations to explain complex physics concepts",
        "Align content with the latest JEE syllabus and examination patterns",
        "Collaborate with AI team to optimize content for personalized learning paths"
      ],
      requirements: [
        "M.Sc. or Ph.D. in Physics",
        "3+ years experience in teaching JEE Physics",
        "Strong understanding of JEE examination patterns and requirements",
        "Excellent communication and content development skills"
      ]
    },
    {
      id: 3,
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "3+ years",
      salary: "₹15-25 LPA",
      description: "Build and optimize our learning platform with focus on performance, scalability, and user experience.",
      responsibilities: [
        "Develop and maintain front-end and back-end components of our educational platform",
        "Implement responsive UI designs and integrate with AI-driven backend systems",
        "Optimize application performance and ensure high availability",
        "Collaborate with product and design teams to improve user experience"
      ],
      requirements: [
        "B.Tech/B.E. in Computer Science or related field",
        "3+ years experience in full stack development",
        "Proficiency in React, Node.js, and modern web technologies",
        "Experience with AWS/GCP and CI/CD pipelines"
      ]
    },
    {
      id: 4,
      title: "Product Manager",
      department: "Product",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "4+ years",
      salary: "₹18-28 LPA",
      description: "Lead product development initiatives to enhance our AI-powered learning platform for competitive exam preparation.",
      responsibilities: [
        "Define product vision, strategy, and roadmap based on market research and user feedback",
        "Work with engineering, design, and content teams to deliver new features and improvements",
        "Analyze user metrics and feedback to identify areas for improvement",
        "Conduct competitive analysis and stay updated with EdTech trends"
      ],
      requirements: [
        "B.Tech/MBA or equivalent",
        "4+ years of product management experience, preferably in EdTech",
        "Strong analytical and problem-solving skills",
        "Excellent communication and stakeholder management abilities"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container px-4">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Help us revolutionize education through AI and make quality learning accessible to all
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">Why Work With Us</h2>
              <p className="text-muted-foreground mb-6">
                At Chakravyuh, we're passionate about democratizing education and creating innovative solutions that help students achieve their full potential. Join us in our mission to transform how students prepare for competitive exams.
              </p>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex gap-4 p-4 bg-secondary/20 rounded-lg">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Impactful Work</h3>
                    <p className="text-sm text-muted-foreground">Your work directly helps thousands of students achieve their dreams</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-secondary/20 rounded-lg">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Work-Life Balance</h3>
                    <p className="text-sm text-muted-foreground">Flexible work hours and remote options for many positions</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-secondary/20 rounded-lg">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <BadgeDollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Competitive Benefits</h3>
                    <p className="text-sm text-muted-foreground">Excellent compensation, health insurance, and learning opportunities</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80" 
                alt="Team at Chakravyuh" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-8 text-center">Current Openings</h2>
          <div className="space-y-6 mb-12">
            {jobOpenings.map(job => (
              <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3">
                    <div className="p-6 md:border-r">
                      <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                      <p className="text-muted-foreground mb-4">{job.department}</p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{job.experience}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <BadgeDollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{job.salary}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 md:col-span-2">
                      <p className="text-muted-foreground mb-4">{job.description}</p>
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          {job.responsibilities.map((resp, index) => (
                            <li key={index}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Requirements:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <Button className="mt-2">Apply Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="bg-secondary/20 p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-4">Don't see the right fit?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team. Send us your resume, and we'll keep you in mind for future opportunities.
            </p>
            <Button size="lg">
              Send Open Application
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
