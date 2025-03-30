
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";
import { CalendarDays, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Five Proven Techniques to Master JEE Physics Problems",
      excerpt: "Discover the most effective approaches to solving complex Physics problems, with insights from JEE toppers and expert educators.",
      author: "Dr. Ananya Singh",
      date: "August 15, 2023",
      category: "Study Tips",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 2,
      title: "How AI is Revolutionizing JEE Preparation",
      excerpt: "Explore the cutting-edge AI technologies transforming how students prepare for competitive exams and how personalized learning is becoming the new standard.",
      author: "Kushal Jain",
      date: "July 22, 2023",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: 3,
      title: "Memorization vs. Understanding: What Works Better for JEE?",
      excerpt: "A deep dive into learning strategies and why conceptual understanding is more valuable than rote memorization for JEE success.",
      author: "Prof. Rajat Mehta",
      date: "June 18, 2023",
      category: "Learning Strategy",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: 4,
      title: "The Impact of Study Environment on JEE Performance",
      excerpt: "Research-backed insights on how your study environment affects productivity and learning outcomes for competitive exam preparation.",
      author: "Dr. Leela Krishnan",
      date: "May 27, 2023",
      category: "Study Tips",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: 5,
      title: "Organic Chemistry Made Easy: Visualization Techniques",
      excerpt: "Learn how to use visualization and mnemonic techniques to master organic chemistry reactions and mechanisms for JEE.",
      author: "Dr. Vikram Sharma",
      date: "April 12, 2023",
      category: "Subject Deep Dive",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: 6,
      title: "The Psychology of Test-Taking: Conquering JEE Exam Anxiety",
      excerpt: "Expert strategies to manage anxiety, boost confidence, and optimize your mental state for peak performance during competitive exams.",
      author: "Dr. Neha Kapoor",
      date: "March 8, 2023",
      category: "Mindfulness",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      featured: false
    }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container px-4">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4">Chakravyuh Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Insights, strategies, and expert advice for JEE preparation
            </p>
          </div>
          
          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="h-64 md:h-full bg-cover bg-center" style={{ backgroundImage: `url(${featuredPost.image})` }} />
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {featuredPost.category}
                      </span>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4 mr-1" />
                        {featuredPost.date}
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">{featuredPost.title}</h2>
                    <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm font-medium">{featuredPost.author}</span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/blog/${featuredPost.id}`}>
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          )}
          
          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map(post => (
              <Card key={post.id} className="overflow-hidden flex flex-col h-full">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }} />
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="bg-secondary/20 text-foreground px-2 py-0.5 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t">
                    <div className="flex items-center text-sm">
                      <CalendarDays className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">{post.date}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <User className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">{post.author}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link to="/blog/archive">View All Articles</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
