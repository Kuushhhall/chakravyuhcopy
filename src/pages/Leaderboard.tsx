
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";
import { AvatarContainer, AvatarImage, AvatarFallback } from "@/components/ui-custom/Avatar";
import { Award, Calendar, ChevronDown, Clock, Filter, Medal, Search, Trophy, Users } from "lucide-react";

const Leaderboard = () => {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "all">("week");
  const [subject, setSubject] = useState<string>("all");
  
  // Mock leaderboard data
  const leaderboardData = [
    { rank: 1, name: "Rahul Sharma", score: 98, hours: 42, streak: 30, avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=200&h=200" },
    { rank: 2, name: "Priya Patel", score: 96, hours: 38, streak: 25, avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=200&h=200" },
    { rank: 3, name: "Amit Singh", score: 94, hours: 36, streak: 27, avatar: "" },
    { rank: 4, name: "Sneha Gupta", score: 91, hours: 40, streak: 22, avatar: "" },
    { rank: 5, name: "Rohit Kumar", score: 90, hours: 32, streak: 18, avatar: "" },
    { rank: 6, name: "Anjali Desai", score: 88, hours: 30, streak: 15, avatar: "" },
    { rank: 7, name: "Vikram Joshi", score: 86, hours: 28, streak: 21, avatar: "" },
    { rank: 8, name: "Neha Sharma", score: 85, hours: 34, streak: 14, avatar: "" },
    { rank: 9, name: "Arun Verma", score: 83, hours: 26, streak: 12, avatar: "" },
    { rank: 10, name: "Kavita Reddy", score: 82, hours: 29, streak: 19, avatar: "" },
  ];
  
  // Mock achievement data
  const achievementData = [
    { title: "Top Performer", description: "Highest test score in Physics", recipient: "Rahul Sharma", date: "This Week" },
    { title: "Most Dedicated", description: "Highest study hours", recipient: "Priya Patel", date: "This Month" },
    { title: "Perfect Streak", description: "30 day study streak", recipient: "Amit Singh", date: "Current" },
  ];
  
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "text-yellow-500 bg-yellow-50";
      case 2: return "text-gray-500 bg-gray-50";
      case 3: return "text-amber-600 bg-amber-50";
      default: return "text-gray-700 bg-gray-50";
    }
  };
  
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-500" />;
      case 3: return <Medal className="h-5 w-5 text-amber-600" />;
      default: return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Leaderboard - 2/3 width on large screens */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h2 className="text-xl font-semibold">Top Students</h2>
                    
                    <div className="flex flex-wrap gap-2">
                      <div className="relative">
                        <select
                          className="appearance-none bg-secondary/50 rounded-md py-2 pl-3 pr-10 text-sm font-medium"
                          value={timeRange}
                          onChange={(e) => setTimeRange(e.target.value as any)}
                        >
                          <option value="day">Today</option>
                          <option value="week">This Week</option>
                          <option value="month">This Month</option>
                          <option value="all">All Time</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                      
                      <div className="relative">
                        <select
                          className="appearance-none bg-secondary/50 rounded-md py-2 pl-3 pr-10 text-sm font-medium"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        >
                          <option value="all">All Subjects</option>
                          <option value="physics">Physics</option>
                          <option value="chemistry">Chemistry</option>
                          <option value="mathematics">Mathematics</option>
                          <option value="biology">Biology</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                      
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Filter className="h-4 w-4" />
                        More Filters
                      </Button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left whitespace-nowrap p-3 text-sm font-medium">Rank</th>
                          <th className="text-left whitespace-nowrap p-3 text-sm font-medium">Student</th>
                          <th className="text-right whitespace-nowrap p-3 text-sm font-medium">Score</th>
                          <th className="text-right whitespace-nowrap p-3 text-sm font-medium">Hours</th>
                          <th className="text-right whitespace-nowrap p-3 text-sm font-medium">Streak</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboardData.map((student) => (
                          <tr key={student.rank} className="border-b last:border-b-0 hover:bg-secondary/20">
                            <td className="whitespace-nowrap p-3 text-sm">
                              <div className="flex items-center">
                                <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${getRankColor(student.rank)}`}>
                                  {student.rank}
                                </span>
                                {getRankIcon(student.rank)}
                              </div>
                            </td>
                            <td className="whitespace-nowrap p-3 text-sm">
                              <div className="flex items-center">
                                <AvatarContainer className="h-8 w-8 mr-2">
                                  <AvatarImage src={student.avatar} alt={student.name} />
                                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                </AvatarContainer>
                                <span className="font-medium">{student.name}</span>
                              </div>
                            </td>
                            <td className="whitespace-nowrap p-3 text-sm text-right font-semibold">{student.score}%</td>
                            <td className="whitespace-nowrap p-3 text-sm text-right">{student.hours} hrs</td>
                            <td className="whitespace-nowrap p-3 text-sm text-right">{student.streak} days</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-100">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-yellow-100 mb-3">
                      <Trophy className="h-5 w-5 text-yellow-600" />
                    </div>
                    <p className="font-semibold text-lg">Top Scorer</p>
                    <p className="text-sm text-muted-foreground mb-2">This Week</p>
                    <AvatarContainer size="lg" className="mb-2">
                      <AvatarImage src={leaderboardData[0].avatar} alt={leaderboardData[0].name} />
                      <AvatarFallback>{leaderboardData[0].name.charAt(0)}</AvatarFallback>
                    </AvatarContainer>
                    <p className="font-medium">{leaderboardData[0].name}</p>
                    <p className="text-sm text-muted-foreground">Score: {leaderboardData[0].score}%</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-purple-100 mb-3">
                      <Clock className="h-5 w-5 text-purple-600" />
                    </div>
                    <p className="font-semibold text-lg">Most Hours</p>
                    <p className="text-sm text-muted-foreground mb-2">This Week</p>
                    <AvatarContainer size="lg" className="mb-2">
                      <AvatarImage src={leaderboardData[1].avatar} alt={leaderboardData[1].name} />
                      <AvatarFallback>{leaderboardData[1].name.charAt(0)}</AvatarFallback>
                    </AvatarContainer>
                    <p className="font-medium">{leaderboardData[1].name}</p>
                    <p className="text-sm text-muted-foreground">Hours: {leaderboardData[1].hours}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-green-100 mb-3">
                      <Award className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="font-semibold text-lg">Longest Streak</p>
                    <p className="text-sm text-muted-foreground mb-2">Current</p>
                    <AvatarContainer size="lg" className="mb-2">
                      <AvatarImage src={leaderboardData[2].avatar} alt={leaderboardData[2].name} />
                      <AvatarFallback>{leaderboardData[2].name.charAt(0)}</AvatarFallback>
                    </AvatarContainer>
                    <p className="font-medium">{leaderboardData[2].name}</p>
                    <p className="text-sm text-muted-foreground">Streak: {leaderboardData[2].streak} days</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Sidebar - 1/3 width on large screens */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Your Rankings</h2>
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <div className="flex items-center">
                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold mr-3">
                          8
                        </span>
                        <div>
                          <p className="font-medium">Overall Rank</p>
                          <p className="text-xs text-muted-foreground">Out of 250 students</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">85%</p>
                        <p className="text-xs text-green-600">↑ 2 this week</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center">
                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold mr-3">
                          5
                        </span>
                        <div>
                          <p className="font-medium">Physics</p>
                          <p className="text-xs text-muted-foreground">Your strongest subject</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">92%</p>
                        <p className="text-xs text-green-600">↑ 3 this week</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center">
                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 font-bold mr-3">
                          12
                        </span>
                        <div>
                          <p className="font-medium">Chemistry</p>
                          <p className="text-xs text-muted-foreground">Needs improvement</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">78%</p>
                        <p className="text-xs text-red-600">↓ 1 this week</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">
                    View Complete Rankings
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Recent Achievements</h2>
                    <Award className="h-5 w-5 text-muted-foreground" />
                  </div>
                  
                  <div className="space-y-4">
                    {achievementData.map((achievement, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-start">
                          <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-3">
                            <Award className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{achievement.title}</h3>
                            <p className="text-xs text-muted-foreground">{achievement.description}</p>
                            <div className="flex items-center mt-2">
                              <span className="text-xs font-medium">{achievement.recipient}</span>
                              <span className="mx-2 text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{achievement.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">
                    View All Achievements
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Find Friends</h2>
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                  
                  <div className="relative mb-4">
                    <input
                      type="text"
                      placeholder="Search students by name..."
                      className="w-full pl-10 pr-4 py-2 border rounded-md"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                  
                  <div className="text-center p-4 border rounded-md bg-secondary/20">
                    <p className="text-sm text-muted-foreground">
                      Connect with friends to compare progress and motivate each other!
                    </p>
                    <Button className="mt-3">
                      Find Classmates
                    </Button>
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

export default Leaderboard;
