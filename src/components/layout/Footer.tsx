
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui-custom/Button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thanks for subscribing! You'll receive our newsletter soon.");
    const form = e.target as HTMLFormElement;
    form.reset();
  };
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-background relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-400/5 rounded-full filter blur-3xl" />
      </div>
      
      {/* Newsletter Section */}
      <div className="container py-12 relative">
        <div className="w-full max-w-3xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-4 bg-primary/10 px-3 py-1 rounded-full">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Join our community</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Get JEE tips and updates in your inbox
          </h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Subscribe to our newsletter to receive exam strategies, study tips, and the latest updates about JEE preparation.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              required 
              className="h-11 rounded-full px-5" 
            />
            <Button type="submit" className="h-11 rounded-full">
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="container py-8 md:py-12 border-t relative">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="gradient-text">Chakravyuh</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Personalized AI-powered learning platform that adapts to your unique learning style for JEE success.
            </p>
            <div className="flex items-center gap-4 mb-8">
              <Link 
                to="#" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                aria-label="Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link 
                to="#" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link 
                to="#" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link 
                to="#" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                aria-label="YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wider uppercase">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Learning Resources
                </Link>
              </li>
              <li>
                <Link to="/practice-tests" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Practice Tests
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wider uppercase">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/company" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wider uppercase">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wider uppercase">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <a href="mailto:contact@chakravyuh.edu" className="text-sm hover:text-primary transition-colors">
                    contact@chakravyuh.edu
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <a href="tel:+918012345678" className="text-sm hover:text-primary transition-colors">
                    +91 80123 45678
                  </a>
                </div>
              </li>
              <li className="mt-4">
                <Button variant="outline" size="sm" className="rounded-full" asChild>
                  <Link to="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Chakravyuh Learning. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="/cookies" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
