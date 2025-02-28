
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";
import { Progress } from "@/components/ui-custom/Progress";
import { AvatarContainer, AvatarImage, AvatarFallback } from "@/components/ui-custom/Avatar";
import { Mic, Volume2, Settings, PenTool, ChevronRight, ChevronLeft } from "lucide-react";

const Study = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const handleMicToggle = () => {
    setIsListening(!isListening);
  };
  
  const handleSpeakToggle = () => {
    setIsSpeaking(!isSpeaking);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-6">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Table of Contents */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-20 space-y-6">
                <Card>
                  <CardContent className="p-4">
                    <h2 className="font-semibold mb-4">Table of Contents</h2>
                    <ul className="space-y-1 text-sm">
                      <li className="px-2 py-1.5 rounded-md bg-secondary/50 font-medium">
                        1. Introduction to Mechanics
                      </li>
                      <li className="px-2 py-1.5 rounded-md hover:bg-secondary/30 cursor-pointer">
                        2. Newton's Laws of Motion
                      </li>
                      <li className="px-2 py-1.5 rounded-md hover:bg-secondary/30 cursor-pointer">
                        3. Work, Energy & Power
                      </li>
                      <li className="px-2 py-1.5 rounded-md hover:bg-secondary/30 cursor-pointer">
                        4. Circular Motion
                      </li>
                      <li className="px-2 py-1.5 rounded-md hover:bg-secondary/30 cursor-pointer">
                        5. Rotational Dynamics
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h2 className="font-semibold mb-4">Progress</h2>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1 text-sm">
                          <span>Current Chapter</span>
                          <span>40%</span>
                        </div>
                        <Progress value={40} />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1 text-sm">
                          <span>Overall Course</span>
                          <span>25%</span>
                        </div>
                        <Progress value={25} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-3 order-1 lg:order-2 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">Introduction to Mechanics</h1>
                  <p className="text-muted-foreground">Physics - Chapter 1</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleSpeakToggle}>
                    <Volume2 className={`h-5 w-5 ${isSpeaking ? "text-primary" : ""}`} />
                  </Button>
                </div>
              </div>
              
              {/* AI Tutor Conversation */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <AvatarContainer size="lg" className="mt-1">
                        <AvatarImage src="https://placekitten.com/200/200" alt="AI Tutor" />
                        <AvatarFallback>AI</AvatarFallback>
                      </AvatarContainer>
                      <div className="space-y-2">
                        <Card className="bg-secondary/30 border-none">
                          <CardContent className="p-4">
                            <p>
                              Welcome to Mechanics, the branch of physics that deals with the motion of objects and the forces acting on them. Before we dive into Newton's Laws, let's make sure you understand the fundamentals.
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="bg-secondary/30 border-none">
                          <CardContent className="p-4">
                            <p>
                              Can you explain what you understand by the terms <strong>displacement</strong> and <strong>velocity</strong>?
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 justify-end">
                      <div>
                        <Card className="bg-black text-white border-none">
                          <CardContent className="p-4">
                            <p>
                              Displacement is the change in position, and it's a vector quantity. Velocity is the rate of change of displacement with respect to time, also a vector.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                      <AvatarContainer size="lg" className="mt-1">
                        <AvatarImage src="https://placekitten.com/201/201" alt="User" />
                        <AvatarFallback>You</AvatarFallback>
                      </AvatarContainer>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <AvatarContainer size="lg" className="mt-1">
                        <AvatarImage src="https://placekitten.com/200/200" alt="AI Tutor" />
                        <AvatarFallback>AI</AvatarFallback>
                      </AvatarContainer>
                      <div className="space-y-2">
                        <Card className="bg-secondary/30 border-none">
                          <CardContent className="p-4">
                            <p>
                              Excellent! You're right that both are vector quantities, which means they have both magnitude and direction.
                            </p>
                            <div className="mt-4 p-4 bg-white rounded-md">
                              <h3 className="font-semibold mb-2">Key Concept: Vectors vs. Scalars</h3>
                              <p className="text-sm">
                                <strong>Vector quantities</strong> have both magnitude and direction (e.g., displacement, velocity, acceleration, force)
                              </p>
                              <p className="text-sm">
                                <strong>Scalar quantities</strong> have only magnitude (e.g., distance, speed, time, mass)
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="bg-secondary/30 border-none">
                          <CardContent className="p-4">
                            <p>
                              Now, let's take this a step further. How would you differentiate between speed and velocity?
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Input area */}
              <Card className="bg-secondary/20 border-border/40">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      className={`${isListening ? "bg-primary text-white" : ""}`}
                      onClick={handleMicToggle}
                    >
                      <Mic className="h-5 w-5" />
                    </Button>
                    <div className="flex-1 relative">
                      <textarea 
                        className="w-full p-3 rounded-md border border-border/40 focus:outline-none focus:ring-1 focus:ring-primary resize-none min-h-[60px]"
                        placeholder={isListening ? "Listening..." : "Type your response or question..."}
                        rows={2}
                      ></textarea>
                      <div className="absolute right-3 bottom-3">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <PenTool className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button>Send</Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Navigation buttons */}
              <div className="flex justify-between">
                <Button variant="outline" className="flex items-center gap-2">
                  <ChevronLeft className="h-4 w-4" />
                  Previous Section
                </Button>
                <Button className="flex items-center gap-2">
                  Next Section
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Study;
