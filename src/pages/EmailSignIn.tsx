
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui-custom/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const EmailSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        toast.success("Signed in successfully!");
        navigate("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });

        if (error) throw error;
        
        toast.success("Please check your email for a confirmation link.");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during authentication");
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-10">
        <div className="w-full max-w-md px-4 py-8 mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {mode === "signin" ? "Sign In" : "Create Account"}
            </h1>
            <p className="text-muted-foreground">
              {mode === "signin" 
                ? "Enter your credentials to continue" 
                : "Fill in the details to create your account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {mode === "signin" && (
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
            )}

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {mode === "signin" ? "Signing In..." : "Creating Account..."}
                </>
              ) : (
                <>{mode === "signin" ? "Sign In" : "Create Account"}</>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                className="text-primary hover:underline font-medium"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              >
                {mode === "signin" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/signin")}
            >
              Back to Sign In Options
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EmailSignIn;
