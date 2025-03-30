
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Search, BookOpen, MessageCircle, PlayCircle, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui-custom/Button";
import { Link } from "react-router-dom";

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>("question-1");
  
  const toggleQuestion = (id: string) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };
  
  const faqs = [
    {
      id: "question-1",
      question: "How does Chakravyuh personalize my learning experience?",
      answer: "Chakravyuh uses advanced AI algorithms to analyze your learning patterns, strengths, and areas for improvement. We track your performance on assessments, time spent on different topics, and your interaction with various types of content. This data helps our system create a customized study plan that adapts in real-time as you progress."
    },
    {
      id: "question-2",
      question: "Can I use Chakravyuh if I'm preparing for exams other than JEE?",
      answer: "Currently, Chakravyuh is optimized for JEE preparation, covering Physics, Chemistry, and Mathematics. However, we're continuously expanding our content library and will be introducing support for other competitive exams in the near future."
    },
    {
      id: "question-3",
      question: "How often is the content updated?",
      answer: "Our content is regularly reviewed and updated by subject matter experts to ensure it reflects the latest JEE syllabus and examination patterns. Major updates occur quarterly, with minor updates and corrections happening on a weekly basis."
    },
    {
      id: "question-4",
      question: "Can I access Chakravyuh on mobile devices?",
      answer: "Yes, Chakravyuh is fully optimized for mobile devices. You can access all features through our responsive web application on any modern smartphone or tablet. We also offer native mobile apps for iOS and Android for an enhanced experience."
    },
    {
      id: "question-5",
      question: "What happens if I encounter technical issues?",
      answer: "Our support team is available 24/7 to help with any technical issues. You can reach us through the in-app chat support, email at support@chakravyuh.edu, or call our helpline at +91-80123-45678. Most technical queries are resolved within 4 hours."
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container px-4">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers, learn how to use Chakravyuh, and get support
            </p>
          </div>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input 
                type="text" 
                placeholder="Search for help..." 
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </div>
          </div>
          
          {/* Help Categories */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${activeCategory === "getting-started" ? "border-primary bg-primary/5" : ""}`}
              onClick={() => setActiveCategory("getting-started")}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <BookOpen className={`h-8 w-8 mb-4 ${activeCategory === "getting-started" ? "text-primary" : "text-muted-foreground"}`} />
                <h3 className="font-semibold mb-2">Getting Started</h3>
                <p className="text-sm text-muted-foreground">New to Chakravyuh? Start here</p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${activeCategory === "guides" ? "border-primary bg-primary/5" : ""}`}
              onClick={() => setActiveCategory("guides")}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <PlayCircle className={`h-8 w-8 mb-4 ${activeCategory === "guides" ? "text-primary" : "text-muted-foreground"}`} />
                <h3 className="font-semibold mb-2">Video Tutorials</h3>
                <p className="text-sm text-muted-foreground">Learn with step-by-step videos</p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${activeCategory === "faq" ? "border-primary bg-primary/5" : ""}`}
              onClick={() => setActiveCategory("faq")}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Lightbulb className={`h-8 w-8 mb-4 ${activeCategory === "faq" ? "text-primary" : "text-muted-foreground"}`} />
                <h3 className="font-semibold mb-2">FAQs</h3>
                <p className="text-sm text-muted-foreground">Answers to common questions</p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${activeCategory === "contact" ? "border-primary bg-primary/5" : ""}`}
              onClick={() => setActiveCategory("contact")}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <MessageCircle className={`h-8 w-8 mb-4 ${activeCategory === "contact" ? "text-primary" : "text-muted-foreground"}`} />
                <h3 className="font-semibold mb-2">Contact Support</h3>
                <p className="text-sm text-muted-foreground">Get help from our team</p>
              </CardContent>
            </Card>
          </div>
          
          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map(faq => (
                <Card key={faq.id} className="overflow-hidden">
                  <div 
                    className="p-4 flex justify-between items-center cursor-pointer"
                    onClick={() => toggleQuestion(faq.id)}
                  >
                    <h3 className="font-semibold">{faq.question}</h3>
                    {expandedQuestion === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  
                  {expandedQuestion === faq.id && (
                    <CardContent className="pt-0 pb-4 px-4 border-t">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-secondary/20 rounded-lg text-center">
              <h3 className="font-semibold mb-2">Still need help?</h3>
              <p className="text-muted-foreground mb-4">Contact our support team and get the assistance you need</p>
              <Button asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenter;
