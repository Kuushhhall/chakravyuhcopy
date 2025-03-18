
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { useParams } from "react-router-dom";
import { Progress } from "@/components/ui-custom/Progress";
import { BookOpen, FileText, HelpCircle, Timer } from "lucide-react";

const TestResults = () => {
  const { testId } = useParams<{ testId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock test result data
  const [testData, setTestData] = useState({
    title: "Physics Mid-term Test",
    date: "May 15, 2023",
    duration: "45 minutes",
    score: 85,
    totalQuestions: 30,
    correctAnswers: 26,
    incorrectAnswers: 4,
    sections: [
      { name: "Mechanics", score: 92, questions: 10 },
      { name: "Electricity", score: 80, questions: 10 },
      { name: "Optics", score: 83, questions: 10 },
    ]
  });
  
  useEffect(() => {
    // Simulate API call to fetch test results
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [testId]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Test Results</h1>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold">{testData.title}</h2>
                      <p className="text-muted-foreground">{testData.date}</p>
                    </div>
                    <div className="mt-4 md:mt-0 bg-secondary/50 py-2 px-4 rounded-full text-center">
                      <span className="text-2xl font-bold">{testData.score}%</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center p-4 bg-secondary/30 rounded-lg">
                      <Timer className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-medium">{testData.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-secondary/30 rounded-lg">
                      <FileText className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Questions</p>
                        <p className="font-medium">{testData.totalQuestions} questions</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-secondary/30 rounded-lg">
                      <HelpCircle className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Correct Answers</p>
                        <p className="font-medium">{testData.correctAnswers} of {testData.totalQuestions}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium mb-2">Performance by Section</h3>
                    {testData.sections.map((section, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <p>{section.name}</p>
                          <p className="font-medium">{section.score}%</p>
                        </div>
                        <Progress value={section.score} className="h-2 mb-2" />
                        <p className="text-sm text-muted-foreground">{section.questions} questions</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Areas for Improvement</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="p-2 bg-red-100 text-red-600 rounded-full mr-3">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Electricity Concepts</h4>
                        <p className="text-sm text-muted-foreground">
                          Review Ohm's Law and circuit analysis techniques.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="p-2 bg-amber-100 text-amber-600 rounded-full mr-3">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Optics Calculations</h4>
                        <p className="text-sm text-muted-foreground">
                          Practice more problems involving lenses and mirrors.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Comparison with Previous Tests</h3>
                  <div className="h-64 flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">
                      Performance chart comparison would appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestResults;
