
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";
import { Progress } from "@/components/ui-custom/Progress";
import { ArrowLeft, Book, BookOpen, Calendar, CheckCircle, Clock, Download, ExternalLink, FileText, ListChecks, PlayCircle, Star } from "lucide-react";

// Mock data - same as in SubjectDashboard
const subjectsData = [
  {
    id: "physics",
    subject: "Physics",
    duration: "8 weeks",
    progress: 65,
    difficulty: "medium" as const,
    topics: [
      { name: "Mechanics", completed: true, duration: "2 weeks" },
      { name: "Thermodynamics", completed: true, duration: "1 week" },
      { name: "Electromagnetism", completed: false, duration: "2 weeks" },
      { name: "Optics", completed: false, duration: "1 week" },
      { name: "Modern Physics", completed: false, duration: "2 weeks" },
    ],
    description: "Physics is the natural science that studies matter, its fundamental constituents, its motion and behavior through space and time, and the related entities of energy and force. For JEE, focus on mechanics, thermodynamics, electromagnetism, optics and modern physics.",
    instructors: [
      { name: "Dr. Verma", specialization: "Mechanics & Thermodynamics", rating: 4.8 },
      { name: "Prof. Sharma", specialization: "Electromagnetism & Modern Physics", rating: 4.9 }
    ],
    resources: [
      { title: "HC Verma Solutions", type: "PDF", link: "#" },
      { title: "Physics Video Lectures", type: "Video", link: "#" },
      { title: "JEE Physics Formula Sheet", type: "PDF", link: "#" },
      { title: "Physics Practice Problems", type: "Practice", link: "#" }
    ]
  },
  {
    id: "chemistry",
    subject: "Chemistry",
    duration: "7 weeks",
    progress: 42,
    difficulty: "hard" as const,
    topics: [
      { name: "Physical Chemistry", completed: true, duration: "2 weeks" },
      { name: "Organic Chemistry", completed: false, duration: "3 weeks" },
      { name: "Inorganic Chemistry", completed: false, duration: "2 weeks" },
    ],
    description: "Chemistry is the scientific study of the properties and behavior of matter. JEE Chemistry covers physical chemistry, organic chemistry, and inorganic chemistry. It is essential to understand chemical properties, reactions, and structures.",
    instructors: [
      { name: "Dr. Patel", specialization: "Organic Chemistry", rating: 4.7 },
      { name: "Dr. Gupta", specialization: "Physical & Inorganic Chemistry", rating: 4.6 }
    ],
    resources: [
      { title: "Organic Chemistry Notes", type: "PDF", link: "#" },
      { title: "Chemistry Video Lectures", type: "Video", link: "#" },
      { title: "Periodic Table Reference", type: "PDF", link: "#" },
      { title: "Chemistry Practice Tests", type: "Practice", link: "#" }
    ]
  },
  {
    id: "mathematics",
    subject: "Mathematics",
    duration: "10 weeks",
    progress: 30,
    difficulty: "hard" as const,
    topics: [
      { name: "Algebra", completed: true, duration: "2 weeks" },
      { name: "Calculus", completed: false, duration: "3 weeks" },
      { name: "Coordinate Geometry", completed: false, duration: "2 weeks" },
      { name: "Trigonometry", completed: false, duration: "1 week" },
      { name: "Statistics & Probability", completed: false, duration: "2 weeks" },
    ],
    description: "Mathematics is the study of numbers, shapes and patterns. JEE Mathematics covers algebra, calculus, coordinate geometry, trigonometry, and statistics & probability. Strong mathematical foundations are vital for engineering studies.",
    instructors: [
      { name: "Prof. Iyer", specialization: "Calculus & Algebra", rating: 4.9 },
      { name: "Dr. Joshi", specialization: "Geometry & Trigonometry", rating: 4.8 }
    ],
    resources: [
      { title: "Mathematics Formula Sheet", type: "PDF", link: "#" },
      { title: "Calculus Video Lectures", type: "Video", link: "#" },
      { title: "Coordinate Geometry Notes", type: "PDF", link: "#" },
      { title: "Mathematics Practice Problems", type: "Practice", link: "#" }
    ]
  },
  {
    id: "biology",
    subject: "Biology",
    duration: "6 weeks",
    progress: 80,
    difficulty: "easy" as const,
    topics: [
      { name: "Cell Biology", completed: true, duration: "1 week" },
      { name: "Genetics", completed: true, duration: "1 week" },
      { name: "Human Physiology", completed: true, duration: "2 weeks" },
      { name: "Plant Physiology", completed: false, duration: "1 week" },
      { name: "Ecology", completed: false, duration: "1 week" },
    ],
    description: "Biology is the scientific study of life. For NEET and other medical entrance exams, it covers cell biology, genetics, human physiology, plant physiology, and ecology. A thorough understanding of biological concepts is essential for medical studies.",
    instructors: [
      { name: "Dr. Reddy", specialization: "Cell Biology & Genetics", rating: 4.7 },
      { name: "Dr. Kapoor", specialization: "Physiology & Ecology", rating: 4.6 }
    ],
    resources: [
      { title: "Biology Notes", type: "PDF", link: "#" },
      { title: "Cell Biology Animations", type: "Video", link: "#" },
      { title: "Human Physiology Diagrams", type: "PDF", link: "#" },
      { title: "Biology Practice Questions", type: "Practice", link: "#" }
    ]
  }
];

const SubjectDetail = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const [subject, setSubject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch subject data
    setTimeout(() => {
      const foundSubject = subjectsData.find(s => s.id === subjectId);
      setSubject(foundSubject || null);
      setLoading(false);
    }, 500);
  }, [subjectId]);
  
  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container py-8">
          <div className="flex justify-center items-center min-h-[60vh]">
            <p>Loading subject details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!subject) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container py-8">
          <div className="flex flex-col justify-center items-center min-h-[60vh]">
            <h2 className="text-xl font-bold mb-4">Subject not found</h2>
            <Button onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{subject.subject}</h1>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{subject.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <ListChecks className="h-4 w-4 mr-1" />
                    <span>{subject.topics.length} Topics</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Schedule
                </Button>
                <Button className="flex items-center gap-1" onClick={() => navigate('/study')}>
                  <BookOpen className="h-4 w-4" />
                  Start Learning
                </Button>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-3">About This Subject</h2>
                <p className="mb-6">{subject.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium">Overall Progress</h3>
                    <span className="text-sm">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <Card className="bg-secondary/30">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Difficulty</p>
                      <p className="font-bold mt-1 capitalize">{subject.difficulty}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary/30">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-bold mt-1">{subject.duration}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary/30">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Topics</p>
                      <p className="font-bold mt-1">{subject.topics.length}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <h3 className="font-bold mb-3">Topics & Syllabus</h3>
                <div className="space-y-3 mb-6">
                  {subject.topics.map((topic: any, index: number) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center">
                        {topic.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-muted-foreground mr-3" />
                        )}
                        <div>
                          <h4 className="font-medium">{topic.name}</h4>
                          <p className="text-xs text-muted-foreground">{topic.duration}</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant={topic.completed ? "outline" : "default"}
                        onClick={() => navigate('/study')}
                      >
                        {topic.completed ? "Review" : "Start"}
                      </Button>
                    </div>
                  ))}
                </div>
                
                <h3 className="font-bold mb-3">Expert Instructors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {subject.instructors.map((instructor: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                          {instructor.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-medium">{instructor.name}</h4>
                          <p className="text-xs text-muted-foreground">{instructor.specialization}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 text-amber-500 mr-1 fill-amber-500" />
                            <span className="text-xs">{instructor.rating}/5.0</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Learning Resources</h2>
                <div className="space-y-3">
                  {subject.resources.map((resource: any, index: number) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        {resource.type === "PDF" ? (
                          <div className="p-2 rounded-full bg-red-100 text-red-800">
                            <FileText className="h-4 w-4" />
                          </div>
                        ) : resource.type === "Video" ? (
                          <div className="p-2 rounded-full bg-blue-100 text-blue-800">
                            <PlayCircle className="h-4 w-4" />
                          </div>
                        ) : (
                          <div className="p-2 rounded-full bg-green-100 text-green-800">
                            <Book className="h-4 w-4" />
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium">{resource.title}</h4>
                          <p className="text-xs text-muted-foreground">{resource.type}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                        {resource.type === "PDF" ? (
                          <Download className="h-4 w-4" />
                        ) : (
                          <ExternalLink className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">View All Resources</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Recommended Practice</h2>
                <div className="space-y-3">
                  <Card className="bg-secondary/30">
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-1">Daily Quiz: {subject.subject}</h3>
                      <p className="text-sm text-muted-foreground mb-3">10 questions • 15 minutes</p>
                      <Button size="sm" className="w-full">Start Quiz</Button>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary/30">
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-1">Practice Problems</h3>
                      <p className="text-sm text-muted-foreground mb-3">50+ problems with solutions</p>
                      <Button size="sm" variant="outline" className="w-full">View Problems</Button>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary/30">
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-1">Mock Test</h3>
                      <p className="text-sm text-muted-foreground mb-3">Full subject test • 3 hours</p>
                      <Button size="sm" variant="outline" className="w-full">Take Test</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Performance Insights</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm">Concept Understanding</p>
                      <p className="text-sm font-medium">75%</p>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm">Problem Solving</p>
                      <p className="text-sm font-medium">62%</p>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm">Test Performance</p>
                      <p className="text-sm font-medium">58%</p>
                    </div>
                    <Progress value={58} className="h-2" />
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">View Detailed Analytics</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubjectDetail;
