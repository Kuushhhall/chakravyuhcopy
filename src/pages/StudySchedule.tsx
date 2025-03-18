
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarDays, Clock, Edit, Plus } from "lucide-react";

const StudySchedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Mock schedule data
  const scheduledSessions = [
    {
      id: 1,
      subject: "Physics",
      topic: "Mechanics",
      date: new Date(),
      startTime: "09:00 AM",
      endTime: "10:30 AM",
      completed: false
    },
    {
      id: 2,
      subject: "Chemistry",
      topic: "Organic Chemistry",
      date: new Date(),
      startTime: "11:00 AM",
      endTime: "12:30 PM",
      completed: false
    },
    {
      id: 3,
      subject: "Mathematics",
      topic: "Calculus",
      date: new Date(),
      startTime: "02:00 PM",
      endTime: "03:30 PM",
      completed: true
    }
  ];
  
  // Function to get sessions for the selected date
  const getSessionsForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    // In a real app, filter by comparing the dates
    return scheduledSessions;
  };
  
  const currentDaySessions = getSessionsForDate(selectedDate);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Study Schedule</h1>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Study Session
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Calendar</h2>
                    <CalendarDays className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>
            
            {/* Daily Schedule */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold">
                        {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"}
                      </h2>
                      <p className="text-muted-foreground">
                        {currentDaySessions.length} study sessions scheduled
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Edit className="h-4 w-4" />
                      Edit Day
                    </Button>
                  </div>
                  
                  {currentDaySessions.length > 0 ? (
                    <div className="space-y-4">
                      {currentDaySessions.map((session) => (
                        <div 
                          key={session.id} 
                          className={`p-4 rounded-lg border-l-4 ${
                            session.completed 
                              ? "border-l-green-500 bg-green-50" 
                              : "border-l-blue-500 bg-blue-50"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{session.subject}: {session.topic}</h3>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <Clock className="h-4 w-4 mr-1" />
                                {session.startTime} - {session.endTime}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {!session.completed && (
                                <Button size="sm" variant="outline">
                                  Mark Complete
                                </Button>
                              )}
                              <Button size="sm" variant="outline">
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">No study sessions scheduled for this day</p>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Session
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Weekly Overview</h2>
                  <div className="h-48 flex items-center justify-center border rounded-md mb-4">
                    <p className="text-muted-foreground">Weekly progress chart would appear here</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary/30 rounded-lg">
                      <h3 className="font-medium mb-1">This Week</h3>
                      <p className="text-2xl font-bold">12 hours</p>
                      <p className="text-sm text-muted-foreground">Scheduled study time</p>
                    </div>
                    <div className="p-4 bg-secondary/30 rounded-lg">
                      <h3 className="font-medium mb-1">Completion Rate</h3>
                      <p className="text-2xl font-bold">85%</p>
                      <p className="text-sm text-muted-foreground">Sessions completed</p>
                    </div>
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

export default StudySchedule;
