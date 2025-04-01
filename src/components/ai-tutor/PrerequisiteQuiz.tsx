
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";
import { PageHeader } from "@/components/ui/page-header";
import { ArrowLeft, CheckCircle2, XCircle, Loader2 } from "lucide-react";

type Teacher = {
  id: string;
  name: string;
  title: string;
  avatar: string;
  description: string;
  subjects: string[];
  voiceId: string;
};

type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  concept: string;
};

interface PrerequisiteQuizProps {
  teacher: Teacher;
  onComplete: (results: {score: number, knowledgeAreas: string[]}) => void;
  onBack: () => void;
}

// Physics knowledge areas that will be assessed
const physicsKnowledgeAreas = [
  "Mechanics",
  "Electromagnetism",
  "Thermodynamics",
  "Optics",
  "Modern Physics",
  "Fluid Mechanics",
  "Waves and Oscillations",
  "Units and Measurement",
  "Kinematics",
  "Laws of Motion"
];

// Dynamic question generation function (simplified for demonstration)
const generateQuestions = (): Question[] => {
  // In a real implementation, this would use an AI service to generate questions
  // For now, we'll use predefined questions that shuffle
  const questionPool = [
    {
      id: 1,
      text: "What is the SI unit of force?",
      options: ["Newton", "Joule", "Watt", "Pascal"],
      correctAnswer: "Newton",
      concept: "Mechanics"
    },
    {
      id: 2,
      text: "Which of the following is a scalar quantity?",
      options: ["Velocity", "Force", "Energy", "Momentum"],
      correctAnswer: "Energy",
      concept: "Mechanics"
    },
    {
      id: 3,
      text: "What is the principle behind electromagnetic induction?",
      options: [
        "Law of conservation of energy",
        "Changing magnetic field produces electric field",
        "Electric charges always flow from high to low potential",
        "Like charges attract each other"
      ],
      correctAnswer: "Changing magnetic field produces electric field",
      concept: "Electromagnetism"
    },
    {
      id: 4, 
      text: "Which lens is used to correct myopia?",
      options: ["Convex lens", "Concave lens", "Bifocal lens", "Cylindrical lens"],
      correctAnswer: "Concave lens",
      concept: "Optics"
    },
    {
      id: 5,
      text: "What does the first law of thermodynamics state?",
      options: [
        "Heat always flows from hot to cold objects",
        "The total entropy of an isolated system always increases",
        "Energy can neither be created nor destroyed",
        "The efficiency of a heat engine can never be 100%"
      ],
      correctAnswer: "Energy can neither be created nor destroyed",
      concept: "Thermodynamics"
    },
    {
      id: 6,
      text: "What is the formula for kinetic energy?",
      options: ["½mv²", "mgh", "F=ma", "P=F/A"],
      correctAnswer: "½mv²",
      concept: "Mechanics"
    },
    {
      id: 7,
      text: "Which phenomenon proves the wave nature of light?",
      options: ["Photoelectric effect", "Interference", "Compton effect", "Pair production"],
      correctAnswer: "Interference",
      concept: "Optics"
    },
    {
      id: 8,
      text: "In an LCR circuit at resonance, what is true?",
      options: [
        "Current is maximum", 
        "Current is minimum", 
        "Impedance is infinite", 
        "Power factor is zero"
      ],
      correctAnswer: "Current is maximum",
      concept: "Electromagnetism"
    }
  ];
  
  // Shuffle and select 5 questions
  const shuffled = [...questionPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
};

export default function PrerequisiteQuiz({ teacher, onComplete, onBack }: PrerequisiteQuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate AI generating questions
    const timer = setTimeout(() => {
      setQuestions(generateQuestions());
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(newAnswers);
    
    // Check if correct
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    // Move to next question or show results
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };
  
  const handleComplete = () => {
    // Analyze quiz to determine knowledge areas
    // In a real implementation, this would use ML/GNN to determine areas of strength/weakness
    const knownAreas = score >= 3 
      ? physicsKnowledgeAreas.slice(0, 4) 
      : physicsKnowledgeAreas.slice(4, 6);
    
    onComplete({
      score,
      knowledgeAreas: knownAreas
    });
  };
  
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="flex items-center gap-2 mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-8 flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <h3 className="text-xl font-medium mb-2">Generating personalized questions</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Our AI is analyzing the JEE syllabus to create relevant questions to assess your current knowledge level...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (showResult) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <PageHeader
          title="Quiz Results"
          description={`You scored ${score} out of ${questions.length}`}
        />
        
        <Card className="overflow-hidden mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary">
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{teacher.name}</h3>
                  <p className="text-sm text-muted-foreground">{teacher.title}</p>
                </div>
              </div>
              <div className="px-4 py-1 bg-primary/10 text-primary rounded-full font-medium">
                {score}/{questions.length}
              </div>
            </div>
            
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={question.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium">Question {index + 1}</h4>
                    {answers[index] === question.correctAnswer ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <p className="text-sm mb-2">{question.text}</p>
                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span>Your answer: {answers[index]}</span>
                    {answers[index] !== question.correctAnswer && (
                      <span className="text-green-500">Correct: {question.correctAnswer}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <Button size="lg" onClick={handleComplete}>
            Start Learning Session
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-8 border-b pb-4">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary">
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium">{teacher.name}</h3>
              <p className="text-sm text-muted-foreground">
                Let's assess your knowledge before we begin
              </p>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-sm text-muted-foreground">{questions[currentQuestion]?.concept}</span>
            </div>
            
            <h2 className="text-xl font-medium mb-6">{questions[currentQuestion]?.text}</h2>
            
            <div className="space-y-3">
              {questions[currentQuestion]?.options.map((option) => (
                <Button 
                  key={option}
                  variant="outline"
                  className="w-full justify-start h-auto py-3 px-4 text-left"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {currentQuestion + 1} of {questions.length} questions
              </div>
              <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
