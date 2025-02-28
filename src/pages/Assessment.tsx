
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { QuizComponent } from "@/components/assessment/QuizComponent";
import { useNavigate } from "react-router-dom";

// Mock data for the quiz
const mockQuestions = [
  {
    id: 1,
    question: "Newton's first law of motion states that an object will remain at rest or in uniform motion unless acted upon by:",
    options: [
      "Gravity",
      "An external force",
      "Another object",
      "Friction"
    ],
    correctAnswer: 1,
    explanation: "Newton's first law, also known as the law of inertia, states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.",
    difficulty: "easy" as const,
    subject: "Physics",
    topic: "Mechanics",
    tags: ["newton's laws", "inertia", "force"]
  },
  {
    id: 2,
    question: "What is the SI unit of electric current?",
    options: [
      "Volt",
      "Watt",
      "Ampere",
      "Coulomb"
    ],
    correctAnswer: 2,
    explanation: "The ampere (A) is the SI unit of electric current. It measures the amount of electric charge passing a point in an electric circuit per unit time.",
    difficulty: "easy" as const,
    subject: "Physics",
    topic: "Electricity",
    tags: ["electric current", "units", "SI units"]
  },
  {
    id: 3,
    question: "Which of the following is NOT a noble gas?",
    options: [
      "Helium",
      "Neon",
      "Nitrogen",
      "Argon"
    ],
    correctAnswer: 2,
    explanation: "Nitrogen is not a noble gas. The noble gases are helium (He), neon (Ne), argon (Ar), krypton (Kr), xenon (Xe), and radon (Rn). Nitrogen is a diatomic non-metal.",
    difficulty: "medium" as const,
    subject: "Chemistry",
    topic: "Periodic Table",
    tags: ["noble gases", "elements", "periodic table"]
  },
  {
    id: 4,
    question: "If f(x) = x² + 3x + 2, what is f'(x)?",
    options: [
      "2x + 3",
      "x² + 3",
      "2x",
      "x + 3"
    ],
    correctAnswer: 0,
    explanation: "To find the derivative of f(x) = x² + 3x + 2, we use the power rule and the sum rule. The derivative of x² is 2x, the derivative of 3x is 3, and the derivative of 2 is 0. So, f'(x) = 2x + 3.",
    difficulty: "medium" as const,
    subject: "Mathematics",
    topic: "Calculus",
    tags: ["derivatives", "calculus", "functions"]
  },
  {
    id: 5,
    question: "What is the equivalent resistance of two resistors R₁ and R₂ connected in parallel?",
    options: [
      "R₁ + R₂",
      "R₁ × R₂",
      "(R₁ × R₂) / (R₁ + R₂)",
      "R₁ / R₂"
    ],
    correctAnswer: 2,
    explanation: "When resistors are connected in parallel, the equivalent resistance R is given by the formula: R = (R₁ × R₂) / (R₁ + R₂). This can also be written as 1/R = 1/R₁ + 1/R₂.",
    difficulty: "hard" as const,
    subject: "Physics",
    topic: "Electricity",
    tags: ["resistors", "circuits", "parallel circuits"]
  }
];

const Assessment = () => {
  const navigate = useNavigate();
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState<any>(null);
  
  const handleQuizComplete = (results: any) => {
    setQuizResults(results);
    setQuizCompleted(true);
    
    // In a real app, we would send these results to a backend
    console.log("Quiz results:", results);
  };
  
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">Physics & Chemistry Assessment</h1>
          
          <QuizComponent 
            questions={mockQuestions}
            title="JEE Practice Quiz"
            description="Test your knowledge of physics, chemistry and mathematics concepts covered in JEE syllabus."
            timeLimit={15}
            onComplete={handleQuizComplete}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Assessment;
