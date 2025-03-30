
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";
import { Progress } from "@/components/ui-custom/Progress";
import { LearningStyleCard } from "@/components/LearningStyleCard";
import { useToast } from "@/components/ui/use-toast";

const Onboarding = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  
  // Get exam type from URL params
  const queryParams = new URLSearchParams(location.search);
  const examType = queryParams.get('exam') || 'jee';
  
  const totalSteps = 3;
  
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Onboarding complete
      toast({
        title: "Onboarding complete!",
        description: "Your personalized learning experience is ready.",
      });
      navigate("/dashboard");
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/exam-select");
    }
  };
  
  const handleStyleSelect = (style: string) => {
    setSelectedStyle(style);
  };
  
  const handleTopicToggle = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };
  
  // Map exam types to their proper names
  const examNames: {[key: string]: string} = {
    jee: "JEE (Joint Entrance Examination)",
    neet: "NEET (National Eligibility cum Entrance Test)",
    cat: "CAT (Common Admission Test)",
    upsc: "UPSC Civil Services",
    custom: "Custom Learning Path"
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container max-w-4xl px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Personalize Your Learning</h1>
            <p className="text-muted-foreground">
              {examType && examNames[examType] 
                ? `Let's customize your ${examNames[examType]} preparation` 
                : "Let's customize your learning experience"}
            </p>
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Step {step} of {totalSteps}</span>
                <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
              </div>
              <Progress value={(step / totalSteps) * 100} />
            </div>
          </div>
          
          {step === 1 && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Choose Your Learning Style</h2>
                <p className="text-muted-foreground mb-6">Select the learning approach that works best for you</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <LearningStyleCard 
                    title="Visual Learner"
                    description="Learn through diagrams, charts, and visualizations"
                    isSelected={selectedStyle === 'visual'}
                    onClick={() => handleStyleSelect('visual')}
                  />
                  <LearningStyleCard 
                    title="Reading/Writing"
                    description="Learn through textual information and note-taking"
                    isSelected={selectedStyle === 'reading'}
                    onClick={() => handleStyleSelect('reading')}
                  />
                  <LearningStyleCard 
                    title="Interactive"
                    description="Learn through quizzes, problems, and activities"
                    isSelected={selectedStyle === 'interactive'}
                    onClick={() => handleStyleSelect('interactive')}
                  />
                </div>
              </CardContent>
            </Card>
          )}
          
          {step === 2 && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Select Topics of Interest</h2>
                <p className="text-muted-foreground mb-6">Choose topics you want to focus on</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {examType === 'jee' && (
                    <>
                      <div 
                        className={`p-4 border rounded-lg cursor-pointer ${
                          selectedTopics.includes('mechanics') ? 'bg-primary/10 border-primary' : 'hover:bg-secondary/50'
                        }`}
                        onClick={() => handleTopicToggle('mechanics')}
                      >
                        <h3 className="font-medium">Mechanics</h3>
                        <p className="text-sm text-muted-foreground">Newton's laws, work, energy, etc.</p>
                      </div>
                      <div 
                        className={`p-4 border rounded-lg cursor-pointer ${
                          selectedTopics.includes('electromagnetism') ? 'bg-primary/10 border-primary' : 'hover:bg-secondary/50'
                        }`}
                        onClick={() => handleTopicToggle('electromagnetism')}
                      >
                        <h3 className="font-medium">Electromagnetism</h3>
                        <p className="text-sm text-muted-foreground">Electric fields, magnetism, etc.</p>
                      </div>
                      <div 
                        className={`p-4 border rounded-lg cursor-pointer ${
                          selectedTopics.includes('organic') ? 'bg-primary/10 border-primary' : 'hover:bg-secondary/50'
                        }`}
                        onClick={() => handleTopicToggle('organic')}
                      >
                        <h3 className="font-medium">Organic Chemistry</h3>
                        <p className="text-sm text-muted-foreground">Reactions, mechanisms, etc.</p>
                      </div>
                      <div 
                        className={`p-4 border rounded-lg cursor-pointer ${
                          selectedTopics.includes('calculus') ? 'bg-primary/10 border-primary' : 'hover:bg-secondary/50'
                        }`}
                        onClick={() => handleTopicToggle('calculus')}
                      >
                        <h3 className="font-medium">Calculus</h3>
                        <p className="text-sm text-muted-foreground">Differentiation, integration, etc.</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          
          {step === 3 && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Set Your Study Goals</h2>
                <p className="text-muted-foreground mb-6">Define how much time you can commit to your studies</p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Weekly study hours</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="p-4 border rounded-lg cursor-pointer bg-primary/10 border-primary">
                        <h4 className="text-center font-medium">15-20</h4>
                        <p className="text-center text-sm text-muted-foreground">hours/week</p>
                      </div>
                      <div className="p-4 border rounded-lg cursor-pointer hover:bg-secondary/50">
                        <h4 className="text-center font-medium">20-30</h4>
                        <p className="text-center text-sm text-muted-foreground">hours/week</p>
                      </div>
                      <div className="p-4 border rounded-lg cursor-pointer hover:bg-secondary/50">
                        <h4 className="text-center font-medium">30-40</h4>
                        <p className="text-center text-sm text-muted-foreground">hours/week</p>
                      </div>
                      <div className="p-4 border rounded-lg cursor-pointer hover:bg-secondary/50">
                        <h4 className="text-center font-medium">40+</h4>
                        <p className="text-center text-sm text-muted-foreground">hours/week</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Target exam date</h3>
                    <div className="p-4 border rounded-lg">
                      <p className="text-center">May 2024 (Default JEE Main)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              {step === 1 ? "Back to Exams" : "Previous Step"}
            </Button>
            <Button onClick={handleNext} disabled={step === 1 && !selectedStyle}>
              {step < totalSteps ? "Next Step" : "Start Learning"}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Onboarding;
