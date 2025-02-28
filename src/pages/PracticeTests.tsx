
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  AlarmClock, 
  BookOpen, 
  Calendar, 
  Check, 
  ChevronDown, 
  Clock, 
  FileCheck, 
  FileClock, 
  Filter, 
  FlaskConical, 
  GraduationCap, 
  LayoutGrid, 
  LineChart, 
  ListFilter, 
  Search, 
  Settings2, 
  Sigma, 
  Star, 
  Timer 
} from "lucide-react";

const PracticeTests = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);
  const [subjectFilter, setSubjectFilter] = useState<string[]>([]);
  
  // Mock test data
  const testsData = [
    { 
      id: "jee-physics-1", 
      title: "JEE Physics Mock Test 1", 
      subject: "Physics", 
      icon: FlaskConical,
      questions: 30, 
      time: 45, 
      difficulty: "medium", 
      recommended: true,
      completed: false,
      topics: ["Mechanics", "Thermodynamics", "Electromagnetism"]
    },
    { 
      id: "jee-chemistry-1", 
      title: "JEE Chemistry Mock Test 1", 
      subject: "Chemistry", 
      icon: FlaskConical,
      questions: 25, 
      time: 40, 
      difficulty: "hard", 
      recommended: true,
      completed: false,
      topics: ["Physical Chemistry", "Organic Chemistry"]
    },
    { 
      id: "jee-maths-1", 
      title: "JEE Mathematics Mock Test 1", 
      subject: "Mathematics", 
      icon: Sigma,
      questions: 30, 
      time: 60, 
      difficulty: "hard", 
      recommended: false,
      completed: false,
      topics: ["Algebra", "Calculus", "Trigonometry"]
    },
    { 
      id: "jee-physics-2", 
      title: "JEE Physics Practice Test", 
      subject: "Physics", 
      icon: FlaskConical,
      questions: 15, 
      time: 25, 
      difficulty: "easy", 
      recommended: false,
      completed: true,
      topics: ["Optics", "Modern Physics"]
    },
    { 
      id: "jee-full-1", 
      title: "JEE Full Mock Exam", 
      subject: "Full Test", 
      icon: GraduationCap,
      questions: 90, 
      time: 180, 
      difficulty: "hard", 
      recommended: true,
      completed: false,
      topics: ["Physics", "Chemistry", "Mathematics"]
    },
    { 
      id: "jee-chemistry-2", 
      title: "JEE Chemistry Practice Test", 
      subject: "Chemistry", 
      icon: FlaskConical,
      questions: 20, 
      time: 30, 
      difficulty: "medium", 
      recommended: false,
      completed: true,
      topics: ["Inorganic Chemistry"]
    },
    { 
      id: "jee-maths-2", 
      title: "JEE Mathematics Practice Test", 
      subject: "Mathematics", 
      icon: Sigma,
      questions: 15, 
      time: 25, 
      difficulty: "medium", 
      recommended: false,
      completed: false,
      topics: ["Coordinate Geometry", "Statistics"]
    },
    { 
      id: "jee-physics-weekly", 
      title: "Weekly Physics Challenge", 
      subject: "Physics", 
      icon: FlaskConical,
      questions: 10, 
      time: 15, 
      difficulty: "medium", 
      recommended: false,
      completed: false,
      topics: ["Mixed Topics"]
    },
  ];
  
  // Filter tests
  const filteredTests = testsData.filter(test => {
    if (difficultyFilter.length > 0 && !difficultyFilter.includes(test.difficulty)) {
      return false;
    }
    if (subjectFilter.length > 0 && !subjectFilter.includes(test.subject)) {
      return false;
    }
    return true;
  });
  
  const handleStartTest = (testId: string) => {
    toast({
      title: "Starting Test",
      description: "Preparing your test environment...",
      duration: 3000,
    });
    
    // Navigate to assessment page with test ID
    setTimeout(() => {
      navigate(`/assessment?testId=${testId}`);
    }, 1000);
  };
  
  const handleDifficultyFilter = (difficulty: string) => {
    if (difficultyFilter.includes(difficulty)) {
      setDifficultyFilter(difficultyFilter.filter(d => d !== difficulty));
    } else {
      setDifficultyFilter([...difficultyFilter, difficulty]);
    }
  };
  
  const handleSubjectFilter = (subject: string) => {
    if (subjectFilter.includes(subject)) {
      setSubjectFilter(subjectFilter.filter(s => s !== subject));
    } else {
      setSubjectFilter([...subjectFilter, subject]);
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-green-600 bg-green-50 border-green-100";
      case "medium": return "text-amber-600 bg-amber-50 border-amber-100";
      case "hard": return "text-red-600 bg-red-50 border-red-100";
      default: return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };
  
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case "Physics": return "text-blue-600 bg-blue-50 border-blue-100";
      case "Chemistry": return "text-purple-600 bg-purple-50 border-purple-100";
      case "Mathematics": return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "Full Test": return "text-gray-600 bg-gray-50 border-gray-100";
      default: return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Practice Tests</h1>
              <p className="text-muted-foreground">
                Enhance your exam preparation with targeted practice tests
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={view === "grid" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setView("grid")}
                className="h-9 w-9 p-0 flex items-center justify-center"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button 
                variant={view === "list" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setView("list")}
                className="h-9 w-9 p-0 flex items-center justify-center"
              >
                <ListFilter className="h-4 w-4" />
              </Button>
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center gap-1 h-9"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {(difficultyFilter.length > 0 || subjectFilter.length > 0) && (
                    <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                      {difficultyFilter.length + subjectFilter.length}
                    </span>
                  )}
                </Button>
                {filterOpen && (
                  <Card className="absolute right-0 top-10 z-10 w-64">
                    <CardContent className="p-3">
                      <div className="mb-3">
                        <h3 className="font-medium mb-2 text-sm">Difficulty</h3>
                        <div className="flex flex-wrap gap-1">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDifficultyFilter("easy")}
                            className={`text-xs h-7 ${difficultyFilter.includes("easy") ? "bg-green-50 border-green-200" : ""}`}
                          >
                            Easy
                            {difficultyFilter.includes("easy") && <Check className="ml-1 h-3 w-3" />}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDifficultyFilter("medium")}
                            className={`text-xs h-7 ${difficultyFilter.includes("medium") ? "bg-amber-50 border-amber-200" : ""}`}
                          >
                            Medium
                            {difficultyFilter.includes("medium") && <Check className="ml-1 h-3 w-3" />}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDifficultyFilter("hard")}
                            className={`text-xs h-7 ${difficultyFilter.includes("hard") ? "bg-red-50 border-red-200" : ""}`}
                          >
                            Hard
                            {difficultyFilter.includes("hard") && <Check className="ml-1 h-3 w-3" />}
                          </Button>
                        </div>
                      </div>
                      <div className="mb-3">
                        <h3 className="font-medium mb-2 text-sm">Subject</h3>
                        <div className="flex flex-wrap gap-1">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleSubjectFilter("Physics")}
                            className={`text-xs h-7 ${subjectFilter.includes("Physics") ? "bg-blue-50 border-blue-200" : ""}`}
                          >
                            Physics
                            {subjectFilter.includes("Physics") && <Check className="ml-1 h-3 w-3" />}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleSubjectFilter("Chemistry")}
                            className={`text-xs h-7 ${subjectFilter.includes("Chemistry") ? "bg-purple-50 border-purple-200" : ""}`}
                          >
                            Chemistry
                            {subjectFilter.includes("Chemistry") && <Check className="ml-1 h-3 w-3" />}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleSubjectFilter("Mathematics")}
                            className={`text-xs h-7 ${subjectFilter.includes("Mathematics") ? "bg-emerald-50 border-emerald-200" : ""}`}
                          >
                            Mathematics
                            {subjectFilter.includes("Mathematics") && <Check className="ml-1 h-3 w-3" />}
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            setDifficultyFilter([]);
                            setSubjectFilter([]);
                          }}
                          className="text-xs"
                        >
                          Clear All
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => setFilterOpen(false)}
                          className="text-xs"
                        >
                          Apply Filters
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Recommended for You</h2>
              <Button variant="link" className="text-sm p-0">View All</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {testsData
                .filter(test => test.recommended)
                .slice(0, 3)
                .map(test => (
                  <Card key={test.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className={`p-2 rounded-full ${getSubjectColor(test.subject)}`}>
                          <test.icon className="h-5 w-5" />
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(test.difficulty)}`}>
                          {test.difficulty.charAt(0).toUpperCase() + test.difficulty.slice(1)}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{test.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{test.subject}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <FileCheck className="h-4 w-4 mr-1" />
                          <span>{test.questions} Questions</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{test.time} mins</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        onClick={() => handleStartTest(test.id)}
                      >
                        Start Test
                      </Button>
                    </CardContent>
                  </Card>
                ))
              }
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">All Tests</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tests..."
                  className="pl-9 pr-4 py-2 border rounded-md text-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            {view === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTests.map(test => (
                  <Card key={test.id} className={`hover:shadow-md transition-shadow ${test.completed ? 'border-green-200 bg-green-50/30' : ''}`}>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className={`p-2 rounded-full ${getSubjectColor(test.subject)}`}>
                          <test.icon className="h-5 w-5" />
                        </div>
                        <div className="flex items-center gap-2">
                          {test.completed && (
                            <span className="text-xs font-medium px-2 py-1 rounded-full text-green-600 bg-green-50 border border-green-100">
                              Completed
                            </span>
                          )}
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(test.difficulty)}`}>
                            {test.difficulty.charAt(0).toUpperCase() + test.difficulty.slice(1)}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{test.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{test.subject}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <FileCheck className="h-4 w-4 mr-1" />
                          <span>{test.questions} Questions</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{test.time} mins</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        variant={test.completed ? "outline" : "default"}
                        onClick={() => test.completed 
                          ? navigate(`/test-results/${test.id}`) 
                          : handleStartTest(test.id)
                        }
                      >
                        {test.completed ? "View Results" : "Start Test"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left whitespace-nowrap p-4 text-sm font-medium">Test Name</th>
                          <th className="text-left whitespace-nowrap p-4 text-sm font-medium">Subject</th>
                          <th className="text-center whitespace-nowrap p-4 text-sm font-medium">Questions</th>
                          <th className="text-center whitespace-nowrap p-4 text-sm font-medium">Duration</th>
                          <th className="text-center whitespace-nowrap p-4 text-sm font-medium">Difficulty</th>
                          <th className="text-center whitespace-nowrap p-4 text-sm font-medium">Status</th>
                          <th className="text-right whitespace-nowrap p-4 text-sm font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTests.map(test => (
                          <tr key={test.id} className="border-b last:border-b-0 hover:bg-secondary/20">
                            <td className="whitespace-nowrap p-4 text-sm font-medium">{test.title}</td>
                            <td className="whitespace-nowrap p-4 text-sm">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubjectColor(test.subject)}`}>
                                {test.subject}
                              </span>
                            </td>
                            <td className="whitespace-nowrap p-4 text-sm text-center">{test.questions}</td>
                            <td className="whitespace-nowrap p-4 text-sm text-center">{test.time} mins</td>
                            <td className="whitespace-nowrap p-4 text-sm text-center">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(test.difficulty)}`}>
                                {test.difficulty.charAt(0).toUpperCase() + test.difficulty.slice(1)}
                              </span>
                            </td>
                            <td className="whitespace-nowrap p-4 text-sm text-center">
                              {test.completed ? (
                                <span className="text-xs font-medium px-2 py-1 rounded-full text-green-600 bg-green-50">
                                  Completed
                                </span>
                              ) : (
                                <span className="text-xs font-medium px-2 py-1 rounded-full text-blue-600 bg-blue-50">
                                  Ready
                                </span>
                              )}
                            </td>
                            <td className="whitespace-nowrap p-4 text-sm text-right">
                              <Button 
                                size="sm"
                                variant={test.completed ? "outline" : "default"}
                                onClick={() => test.completed 
                                  ? navigate(`/test-results/${test.id}`) 
                                  : handleStartTest(test.id)
                                }
                              >
                                {test.completed ? "View Results" : "Start Test"}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-blue-50/50 border-blue-100">
              <CardContent className="p-6">
                <div className="mb-4 p-3 rounded-full bg-blue-100 w-fit">
                  <AlarmClock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Timed Practice</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Set custom time limits to improve your speed and accuracy under exam conditions.
                </p>
                <Button variant="outline" className="w-full border-blue-200 hover:bg-blue-100">
                  Create Timed Test
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50/50 border-purple-100">
              <CardContent className="p-6">
                <div className="mb-4 p-3 rounded-full bg-purple-100 w-fit">
                  <Settings2 className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Custom Tests</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create personalized tests focusing on specific topics or question types.
                </p>
                <Button variant="outline" className="w-full border-purple-200 hover:bg-purple-100">
                  Create Custom Test
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50/50 border-green-100">
              <CardContent className="p-6">
                <div className="mb-4 p-3 rounded-full bg-green-100 w-fit">
                  <LineChart className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Performance Analysis</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  View detailed analysis of your test performance and identify areas for improvement.
                </p>
                <Button variant="outline" className="w-full border-green-200 hover:bg-green-100" onClick={() => navigate('/test-results/latest')}>
                  View Analysis
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-xl font-bold mb-2">Ready for a Full Mock Exam?</h2>
                  <p className="text-muted-foreground mb-4">
                    Test yourself with a complete JEE mock exam under real exam conditions. This 3-hour test covers Physics, Chemistry, and Mathematics with authentic exam-style questions.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">180 minutes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileCheck className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">90 questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm text-muted-foreground">Highly recommended</span>
                    </div>
                  </div>
                  <Button className="mt-4" onClick={() => handleStartTest("jee-full-1")}>
                    Start Full Mock Exam
                  </Button>
                </div>
                <div className="hidden md:block">
                  <Timer className="h-24 w-24 text-indigo-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Test History</h2>
            <Button variant="link" className="text-sm p-0" onClick={() => navigate('/test-results/all')}>
              View All History
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left whitespace-nowrap p-3 text-sm font-medium">Test Name</th>
                      <th className="text-center whitespace-nowrap p-3 text-sm font-medium">Date</th>
                      <th className="text-center whitespace-nowrap p-3 text-sm font-medium">Score</th>
                      <th className="text-center whitespace-nowrap p-3 text-sm font-medium">Time Taken</th>
                      <th className="text-right whitespace-nowrap p-3 text-sm font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-secondary/20">
                      <td className="whitespace-nowrap p-3 text-sm font-medium">JEE Physics Practice Test</td>
                      <td className="whitespace-nowrap p-3 text-sm text-center">2 days ago</td>
                      <td className="whitespace-nowrap p-3 text-sm text-center">
                        <span className="text-green-600 font-medium">85%</span>
                      </td>
                      <td className="whitespace-nowrap p-3 text-sm text-center">22 mins</td>
                      <td className="whitespace-nowrap p-3 text-sm text-right">
                        <Button size="sm" variant="outline" onClick={() => navigate('/test-results/jee-physics-2')}>
                          View Details
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-secondary/20">
                      <td className="whitespace-nowrap p-3 text-sm font-medium">JEE Chemistry Practice Test</td>
                      <td className="whitespace-nowrap p-3 text-sm text-center">5 days ago</td>
                      <td className="whitespace-nowrap p-3 text-sm text-center">
                        <span className="text-amber-600 font-medium">72%</span>
                      </td>
                      <td className="whitespace-nowrap p-3 text-sm text-center">28 mins</td>
                      <td className="whitespace-nowrap p-3 text-sm text-right">
                        <Button size="sm" variant="outline" onClick={() => navigate('/test-results/jee-chemistry-2')}>
                          View Details
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PracticeTests;
