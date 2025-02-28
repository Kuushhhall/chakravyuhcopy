
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui-custom/Button";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Progress } from "@/components/ui-custom/Progress";
import { AvatarContainer, AvatarImage, AvatarFallback } from "@/components/ui-custom/Avatar";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33);
  const totalSteps = 3;
  
  const navigate = useNavigate();
  
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      setProgress(Math.round(((step + 1) / totalSteps) * 100));
    } else {
      // Complete onboarding and redirect to dashboard
      navigate("/dashboard");
    }
  };
  
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      setProgress(Math.round(((step - 1) / totalSteps) * 100));
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-10">
        <div className="container max-w-3xl px-4 mx-auto">
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2">
                  Hi! I'm your AI tutor. Let's understand your background better.
                </h1>
              </div>
              
              <div className="flex items-start mb-8">
                <AvatarContainer size="lg" className="mr-4 mt-1">
                  <AvatarImage src="https://placekitten.com/200/200" alt="AI Tutor" />
                  <AvatarFallback>AI</AvatarFallback>
                </AvatarContainer>
                <Card className="w-full">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">
                      I'll be your personal AI tutor. To create the best learning experience for you, I need to understand your current knowledge and learning goals.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-3">
                <Card 
                  className="w-full hover-scale cursor-pointer"
                  onClick={() => handleNext()}
                >
                  <CardContent className="p-4">
                    <p>I'm a high school student</p>
                  </CardContent>
                </Card>
                
                <Card 
                  className="w-full hover-scale cursor-pointer"
                  onClick={() => handleNext()}
                >
                  <CardContent className="p-4">
                    <p>I'm in college</p>
                  </CardContent>
                </Card>
                
                <Card 
                  className="w-full hover-scale cursor-pointer"
                  onClick={() => handleNext()}
                >
                  <CardContent className="p-4">
                    <p>I'm working professional</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2">
                  Knowledge Assessment
                </h1>
                <p className="text-sm text-muted-foreground">
                  Question 1/15
                </p>
              </div>
              
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-lg font-medium mb-4">
                    What is the primary purpose of Newton's First Law of Motion?
                  </h2>
                  
                  <div className="space-y-3">
                    <Card 
                      className="w-full hover-scale cursor-pointer"
                      onClick={() => handleNext()}
                    >
                      <CardContent className="p-4">
                        <p>To explain inertia</p>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className="w-full hover-scale cursor-pointer"
                      onClick={() => handleNext()}
                    >
                      <CardContent className="p-4">
                        <p>To define force</p>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className="w-full hover-scale cursor-pointer"
                      onClick={() => handleNext()}
                    >
                      <CardContent className="p-4">
                        <p>To explain acceleration</p>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className="w-full hover-scale cursor-pointer"
                      onClick={() => handleNext()}
                    >
                      <CardContent className="p-4">
                        <p>To define momentum</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
                <Button onClick={handleNext}>
                  Next
                </Button>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2">
                  Choose Your Learning Style
                </h1>
                <p className="text-muted-foreground">
                  Select your preferred learning method
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card 
                  className="w-full hover-scale cursor-pointer"
                  onClick={() => handleNext()}
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m22 8-6 4 6 4V8Z"/>
                        <rect x="2" y="6" width="14" height="12" rx="2" ry="2"/>
                      </svg>
                    </div>
                    <h3 className="font-semibold mb-1">Video Lessons</h3>
                    <p className="text-xs text-muted-foreground">
                      Learn through detailed video explanations
                    </p>
                  </CardContent>
                </Card>
                
                <Card 
                  className="w-full hover-scale cursor-pointer"
                  onClick={() => handleNext()}
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
                        <path d="M8 7h6"/>
                        <path d="M8 11h8"/>
                        <path d="M8 15h6"/>
                      </svg>
                    </div>
                    <h3 className="font-semibold mb-1">Text & Notes</h3>
                    <p className="text-xs text-muted-foreground">
                      Comprehensive reading materials
                    </p>
                  </CardContent>
                </Card>
                
                <Card 
                  className="w-full hover-scale cursor-pointer"
                  onClick={() => handleNext()}
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2"/>
                        <line x1="8" y1="21" x2="16" y2="21"/>
                        <line x1="12" y1="17" x2="12" y2="21"/>
                      </svg>
                    </div>
                    <h3 className="font-semibold mb-1">Interactive</h3>
                    <p className="text-xs text-muted-foreground">
                      Learn through practice and games
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-center mt-6">
                <Button size="lg" onClick={handleNext}>
                  Let's Start Learning
                </Button>
              </div>
            </div>
          )}
          
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Step {step} of {totalSteps}
              </span>
            </div>
            <Progress value={progress} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Onboarding;
