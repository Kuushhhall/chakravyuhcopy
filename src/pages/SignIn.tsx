
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui-custom/Button";
import { SignInOption } from "@/components/SignInOptions";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Mail, Google, Github, Phone } from "lucide-react";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Google sign in error:", error);
      toast.error("Failed to sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleGithubSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("GitHub sign in error:", error);
      toast.error("Failed to sign in with GitHub. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleEmailSignIn = () => {
    navigate("/email-signin");
  };
  
  const handlePhoneSignIn = () => {
    navigate("/phone-signin");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-10">
        <div className="w-full max-w-md px-4 py-8 mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Personal AI Tutor</h1>
            <p className="text-muted-foreground">
              Personalized study plans for competitive exam preparation
            </p>
          </div>
          
          <div className="space-y-4 animate-fade-in">
            <SignInOption 
              icon={<Google className="h-5 w-5" />}
              text="Continue with Google"
              onClick={handleGoogleSignIn}
              loading={loading}
            />
            
            <SignInOption 
              icon={<Github className="h-5 w-5" />}
              text="Continue with GitHub"
              onClick={handleGithubSignIn}
              loading={loading}
            />
            
            <SignInOption 
              icon={<Mail className="h-5 w-5" />}
              text="Continue with Email"
              onClick={handleEmailSignIn}
              loading={loading}
            />
            
            <SignInOption 
              icon={<Phone className="h-5 w-5" />}
              text="Continue with Phone"
              onClick={handlePhoneSignIn}
              loading={loading}
            />
          </div>
          
          <div className="mt-6 text-center text-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <p className="text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
