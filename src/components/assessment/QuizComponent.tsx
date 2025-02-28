
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";
import { Progress } from "@/components/ui-custom/Progress";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Clock, XCircle, ArrowRight, ArrowLeft, HelpCircle, Flag } from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  subject: string;
  topic: string;
  tags?: string[];
}

interface QuizProps {
  questions: QuizQuestion[];
  title: string;
  description?: string;
  timeLimit?: number; // in minutes
  onComplete?: (results: {
    score: number;
    totalQuestions: number;
    timeSpent: number;
    answers: { questionId: number; selectedAnswer: number | null; correct: boolean }[];
  }) => void;
}

export function QuizComponent({ 
  questions, 
  title, 
  description,
  timeLimit,
  onComplete 
}: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Timer functionality would be implemented here
  
  const handleSelectAnswer = (optionIndex: number) => {
    if (showExplanation || quizCompleted) return;
    
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);
  };
  
  const handleCheckAnswer = () => {
    if (selectedAnswers[currentQuestion] === null) {
      toast({
        title: "No answer selected",
        description: "Please select an answer before checking",
        duration: 3000,
      });
      return;
    }
    
    setShowExplanation(true);
  };
  
  const handleNextQuestion = () => {
    setShowExplanation(false);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeQuiz();
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };
  
  const handleFlagQuestion = () => {
    if (flaggedQuestions.includes(currentQuestion)) {
      setFlaggedQuestions(flaggedQuestions.filter(q => q !== currentQuestion));
    } else {
      setFlaggedQuestions([...flaggedQuestions, currentQuestion]);
    }
  };
  
  const completeQuiz = () => {
    setQuizCompleted(true);
    
    const results = {
      score: calculateScore(),
      totalQuestions: questions.length,
      timeSpent,
      answers: questions.map((question, index) => ({
        questionId: question.id,
        selectedAnswer: selectedAnswers[index],
        correct: selectedAnswers[index] === question.correctAnswer
      }))
    };
    
    if (onComplete) {
      onComplete(results);
    }
  };
  
  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === questions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };
  
  const getScorePercentage = () => {
    const score = calculateScore();
    return Math.round((score / questions.length) * 100);
  };
  
  if (quizCompleted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Quiz Results</h2>
          
          <div className="mb-6 text-center">
            <div className="inline-block p-4 rounded-full bg-secondary/30 mb-4">
              <div className="relative h-32 w-32">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{getScorePercentage()}%</span>
                </div>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="42"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-primary"
                    strokeWidth="8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="42"
                    cx="50"
                    cy="50"
                    strokeDasharray={Math.PI * 2 * 42}
                    strokeDashoffset={
                      Math.PI * 2 * 42 * (1 - getScorePercentage() / 100)
                    }
                    style={{ transformOrigin: "50% 50%", transform: "rotate(-90deg)" }}
                  />
                </svg>
              </div>
            </div>
            
            <h3 className="text-xl font-medium mb-1">
              {getScorePercentage() >= 70 ? "Great job!" : getScorePercentage() >= 40 ? "Good effort!" : "Keep practicing!"}
            </h3>
            <p className="text-muted-foreground">
              You scored {calculateScore()} out of {questions.length} questions correctly.
            </p>
          </div>
          
          <h3 className="font-medium mb-3">Question Summary</h3>
          <div className="space-y-2 mb-6">
            {questions.map((question, index) => (
              <Card key={index} className={`border-l-4 ${
                selectedAnswers[index] === question.correctAnswer 
                  ? "border-l-green-500" 
                  : "border-l-red-500"
              }`}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {selectedAnswers[index] === question.correctAnswer ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <span className="text-sm truncate">{question.question}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setCurrentQuestion(index);
                        setQuizCompleted(false);
                        setShowExplanation(true);
                      }}
                    >
                      Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex gap-3 justify-between">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
            <Button onClick={() => {
              setQuizCompleted(false);
              setCurrentQuestion(0);
              setSelectedAnswers(Array(questions.length).fill(null));
              setShowExplanation(false);
              setFlaggedQuestions([]);
            }}>
              Retry Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const currentQuestionData = questions[currentQuestion];
  const isAnswerCorrect = selectedAnswers[currentQuestion] === currentQuestionData.correctAnswer;
  const isFlagged = flaggedQuestions.includes(currentQuestion);
  
  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={`h-8 w-8 p-0 flex items-center justify-center ${isFlagged ? "bg-amber-100 text-amber-800 border-amber-800" : ""}`}
              onClick={handleFlagQuestion}
              title={isFlagged ? "Unflag this question" : "Flag for review"}
            >
              <Flag className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 w-8 p-0 flex items-center justify-center"
              title="Get a hint"
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {description && (
          <p className="text-muted-foreground mb-4 text-sm">{description}</p>
        )}
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1 text-sm">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            {timeLimit && <div className="flex items-center"><Clock className="h-4 w-4 mr-1" /><span>12:34</span></div>}
          </div>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
        </div>
        
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
              currentQuestionData.difficulty === "easy" 
                ? "bg-green-100 text-green-800" 
                : currentQuestionData.difficulty === "medium" 
                  ? "bg-amber-100 text-amber-800" 
                  : "bg-red-100 text-red-800"
            }`}>
              {currentQuestionData.difficulty.charAt(0).toUpperCase() + currentQuestionData.difficulty.slice(1)}
            </span>
            <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {currentQuestionData.topic}
            </span>
          </div>
          
          <h3 className="text-lg font-medium mb-4">{currentQuestionData.question}</h3>
          
          <div className="space-y-3">
            {currentQuestionData.options.map((option, optionIndex) => (
              <div 
                key={optionIndex}
                className={`p-3 border rounded-md cursor-pointer transition-all ${
                  selectedAnswers[currentQuestion] === optionIndex 
                    ? showExplanation 
                      ? isAnswerCorrect 
                        ? "border-green-500 bg-green-50" 
                        : "border-red-500 bg-red-50" 
                      : "border-primary" 
                    : showExplanation && optionIndex === currentQuestionData.correctAnswer 
                      ? "border-green-500 bg-green-50" 
                      : "border-border hover:border-primary/50"
                }`}
                onClick={() => handleSelectAnswer(optionIndex)}
              >
                <div className="flex items-center">
                  <div className={`flex-shrink-0 h-5 w-5 mr-3 rounded-full border ${
                    selectedAnswers[currentQuestion] === optionIndex 
                      ? showExplanation 
                        ? isAnswerCorrect 
                          ? "border-green-500 bg-green-500" 
                          : "border-red-500 bg-red-500" 
                        : "border-primary bg-primary" 
                      : "border-muted-foreground"
                  } flex items-center justify-center`}>
                    {selectedAnswers[currentQuestion] === optionIndex && (
                      <CheckCircle className="h-4 w-4 text-white" />
                    )}
                    {showExplanation && optionIndex === currentQuestionData.correctAnswer && selectedAnswers[currentQuestion] !== optionIndex && (
                      <CheckCircle className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {showExplanation && (
          <Card className={`mb-6 border-l-4 ${isAnswerCorrect ? "border-l-green-500" : "border-l-red-500"}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {isAnswerCorrect ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <h4 className="font-medium">Correct Answer!</h4>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-500" />
                    <h4 className="font-medium">Incorrect Answer</h4>
                  </>
                )}
              </div>
              <p className="text-sm">{currentQuestionData.explanation}</p>
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          
          {!showExplanation ? (
            <Button onClick={handleCheckAnswer} disabled={selectedAnswers[currentQuestion] === null}>
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className="flex items-center gap-1">
              {currentQuestion < questions.length - 1 ? (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                "Finish Quiz"
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
