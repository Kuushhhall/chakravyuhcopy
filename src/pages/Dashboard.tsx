
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";
import { Progress } from "@/components/ui-custom/Progress";
import { StudyPlanItem } from "@/components/StudyPlanItem";
import { Link } from "react-router-dom";
import { Calendar, Clock, BookOpen, GraduationCap, BarChart4 } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="lg:w-2/3 space-y-8">
              {/* Welcome section */}
              <section className="animate-fade-in">
                <h1 className="text-3xl font-bold mb-6">Welcome back, Alex</h1>
                <Card className="bg-gradient-to-r from-secondary to-secondary/30 border-none">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="mb-4 md:mb-0">
                        <h2 className="text-xl font-semibold mb-2">Your Learning Path</h2>
                        <p className="text-muted-foreground mb-4">
                          Continue your JEE preparation journey
                        </p>
                        <Button asChild>
                          <Link to="/study">Resume Learning</Link>
                        </Button>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-black"></div>
                          <span className="text-sm">Physics - 70% completed</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                          <span className="text-sm">Chemistry - 45% completed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                          <span className="text-sm">Mathematics - 25% completed</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
              
              {/* Learning graph visualization */}
              <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Your Learning Path</h2>
                  <Link 
                    to="/learning-path" 
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    View detailed path
                  </Link>
                </div>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="aspect-video bg-secondary/40 rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Interactive Learning Graph Visualization</p>
                    </div>
                    
                    <div className="flex items-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-black"></div>
                        <span className="text-sm">Mastered</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                        <span className="text-sm">Needs Practice</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <span className="text-sm">Weak</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
              
              {/* Study plan */}
              <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Your Study Plan</h2>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/study-plan">Customize Plan</Link>
                  </Button>
                </div>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="divide-y">
                      <StudyPlanItem 
                        subject="Physics - Mechanics" 
                        duration="2h 30m" 
                        progress={70} 
                      />
                      <StudyPlanItem 
                        subject="Chemistry - Organic" 
                        duration="1h 45m" 
                        progress={45} 
                      />
                      <StudyPlanItem 
                        subject="Mathematics - Calculus" 
                        duration="3h 15m" 
                        progress={20} 
                      />
                    </div>
                  </CardContent>
                </Card>
              </section>
              
              {/* Recent activities */}
              <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <h2 className="text-xl font-semibold mb-6">Recent Activities</h2>
                
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="p-2 rounded-full bg-secondary/50">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Completed Lesson</h3>
                        <p className="text-sm text-muted-foreground">
                          Newton's Laws of Motion - Part 2
                        </p>
                      </div>
                      <span className="ml-auto text-xs text-muted-foreground">2 hours ago</span>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="p-2 rounded-full bg-secondary/50">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Quiz Completed</h3>
                        <p className="text-sm text-muted-foreground">
                          Practice Quiz: Kinematics - Score: 85%
                        </p>
                      </div>
                      <span className="ml-auto text-xs text-muted-foreground">Yesterday</span>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="p-2 rounded-full bg-secondary/50">
                        <BarChart4 className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Progress Update</h3>
                        <p className="text-sm text-muted-foreground">
                          Monthly assessment - Improved by 12%
                        </p>
                      </div>
                      <span className="ml-auto text-xs text-muted-foreground">3 days ago</span>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-8">
              {/* Progress overview */}
              <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <CardHeader>
                  <CardTitle>Progress Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Study Streak</span>
                        <span className="text-sm">7 days</span>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(7)].map((_, i) => (
                          <div 
                            key={i} 
                            className="h-2 flex-1 rounded-full bg-black"
                          ></div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm">45%</span>
                      </div>
                      <Progress value={45} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Today's Goal</span>
                        <span className="text-sm">2/3 hours</span>
                      </div>
                      <Progress value={66} />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Upcoming events */}
              <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <CardHeader>
                  <CardTitle>Upcoming</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-secondary/50">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Mock Test</h3>
                        <p className="text-sm text-muted-foreground">
                          Today, 2:00 PM
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-secondary/50">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Live Class</h3>
                        <p className="text-sm text-muted-foreground">
                          Today, 4:30 PM
                        </p>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      View All Events
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Recommended practice */}
              <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <CardHeader>
                  <CardTitle>Recommended Practice</CardTitle>
                  <CardDescription>Based on your learning patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Card className="hover-scale cursor-pointer">
                      <CardContent className="p-4">
                        <h3 className="font-medium">Kinematics Problems</h3>
                        <p className="text-sm text-muted-foreground">
                          Practice numerical problems
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover-scale cursor-pointer">
                      <CardContent className="p-4">
                        <h3 className="font-medium">Organic Chemistry Quiz</h3>
                        <p className="text-sm text-muted-foreground">
                          Revise key concepts
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover-scale cursor-pointer">
                      <CardContent className="p-4">
                        <h3 className="font-medium">Calculus Revision</h3>
                        <p className="text-sm text-muted-foreground">
                          Strengthen your basics
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
