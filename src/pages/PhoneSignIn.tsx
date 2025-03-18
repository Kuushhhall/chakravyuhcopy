
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui-custom/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const PhoneSignIn = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone,
      });

      if (error) throw error;
      
      setOtpSent(true);
      toast.success("OTP sent to your phone number!");
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP. Please try again.");
      console.error("OTP sending error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: 'sms',
      });

      if (error) throw error;
      
      toast.success("Signed in successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Invalid OTP. Please try again.");
      console.error("OTP verification error:", error);
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
              {otpSent ? "Verify OTP" : "Sign In with Phone"}
            </h1>
            <p className="text-muted-foreground">
              {otpSent 
                ? "Enter the verification code sent to your phone" 
                : "Enter your phone number to receive a verification code"}
            </p>
          </div>

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Please include your country code (e.g., +1 for US)
                </p>
              </div>

              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Code...
                  </>
                ) : (
                  "Send Verification Code"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>

              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  "Verify Code"
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  className="text-primary hover:underline text-sm"
                  onClick={() => setOtpSent(false)}
                >
                  Change phone number
                </button>
              </div>
            </form>
          )}

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

export default PhoneSignIn;
