
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Book, BookOpen, Users, Star, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for courses
  const courses = [
    {
      id: 1,
      title: "Physics Master Course",
      description: "Comprehensive JEE Physics preparation including mechanics, electromagnetism, and modern physics",
      students: 12500,
      rating: 4.8,
      topics: ["Mechanics", "Thermodynamics", "Optics"],
      imageUrl: "https://placekitten.com/400/225",
      category: "physics"
    },
    {
      id: 2,
      title: "Organic Chemistry Deep Dive",
      description: "Master organic chemistry reactions, mechanisms, and problem-solving techniques",
      students: 8750,
      rating: 4.7,
      topics: ["Reactions", "Mechanisms", "Nomenclature"],
      imageUrl: "https://placekitten.com/401/225",
      category: "chemistry"
    },
    {
      id: 3,
      title: "Calculus for JEE",
      description: "Comprehensive coverage of differential and integral calculus with JEE-focused problem solving",
      students: 10200,
      rating: 4.9,
      topics: ["Limits", "Differentiation", "Integration"],
      imageUrl: "https://placekitten.com/402/225",
      category: "mathematics"
    },
    {
      id: 4,
      title: "Inorganic Chemistry Masterclass",
      description: "Systematic approach to mastering inorganic chemistry topics for competitive exams",
      students: 7800,
      rating: 4.6,
      topics: ["Periodic Table", "Chemical Bonding", "Coordination Compounds"],
      imageUrl: "https://placekitten.com/403/225",
      category: "chemistry"
    },
    {
      id: 5,
      title: "Mechanics Problem Solving",
      description: "Advanced problem-solving techniques for JEE physics mechanics questions",
      students: 9300,
      rating: 4.7,
      topics: ["Newton's Laws", "Rotational Dynamics", "Fluids"],
      imageUrl: "https://placekitten.com/404/225",
      category: "physics"
    },
    {
      id: 6,
      title: "Algebra & Coordinate Geometry",
      description: "Comprehensive coverage of algebra, functions, and coordinate geometry for JEE",
      students: 11500,
      rating: 4.8,
      topics: ["Functions", "Conic Sections", "Vectors"],
      imageUrl: "https://placekitten.com/405/225",
      category: "mathematics"
    }
  ];
  
  // Filter courses based on search query and selected tab
  const filterCourses = (courses: typeof courses, tab: string, query: string) => {
    return courses.filter(course => {
      const matchesCategory = tab === "all" || course.category === tab;
      const matchesSearch = query === "" || 
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase()) ||
        course.topics.some(topic => topic.toLowerCase().includes(query.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Explore Courses</h1>
              <p className="text-muted-foreground">Discover comprehensive learning paths and focused topic modules</p>
            </div>
            <div className="relative w-full md:w-64">
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <Tabs defaultValue="all" className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="physics">Physics</TabsTrigger>
                <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
                <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
              </TabsList>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterCourses(courses, "all", searchQuery).map(course => (
                  <Link key={course.id} to={`/subject/${course.category}`} className="block">
                    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={course.imageUrl} 
                          alt={course.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-5 flex-grow flex flex-col">
                        <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 flex-grow">{course.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {course.topics.map((topic, idx) => (
                            <Badge key={idx} variant="secondary">{topic}</Badge>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            {course.students.toLocaleString()} students
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Star className="h-4 w-4 mr-1 text-yellow-500" />
                            {course.rating}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="physics" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterCourses(courses, "physics", searchQuery).map(course => (
                  <Link key={course.id} to={`/subject/${course.category}`} className="block">
                    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={course.imageUrl} 
                          alt={course.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-5 flex-grow flex flex-col">
                        <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 flex-grow">{course.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {course.topics.map((topic, idx) => (
                            <Badge key={idx} variant="secondary">{topic}</Badge>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            {course.students.toLocaleString()} students
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Star className="h-4 w-4 mr-1 text-yellow-500" />
                            {course.rating}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="chemistry" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterCourses(courses, "chemistry", searchQuery).map(course => (
                  <Link key={course.id} to={`/subject/${course.category}`} className="block">
                    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={course.imageUrl} 
                          alt={course.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-5 flex-grow flex flex-col">
                        <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 flex-grow">{course.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {course.topics.map((topic, idx) => (
                            <Badge key={idx} variant="secondary">{topic}</Badge>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            {course.students.toLocaleString()} students
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Star className="h-4 w-4 mr-1 text-yellow-500" />
                            {course.rating}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="mathematics" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterCourses(courses, "mathematics", searchQuery).map(course => (
                  <Link key={course.id} to={`/subject/${course.category}`} className="block">
                    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={course.imageUrl} 
                          alt={course.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-5 flex-grow flex flex-col">
                        <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 flex-grow">{course.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {course.topics.map((topic, idx) => (
                            <Badge key={idx} variant="secondary">{topic}</Badge>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            {course.students.toLocaleString()} students
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Star className="h-4 w-4 mr-1 text-yellow-500" />
                            {course.rating}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Featured Learning Paths</h2>
              <Button variant="outline">View All</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://placekitten.com/800/400" 
                    alt="JEE Physics Mastery" 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-2">JEE Physics Mastery Path</h3>
                  <p className="text-muted-foreground text-sm mb-4">A comprehensive 16-week program covering all JEE Physics topics</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium">16 weeks • 45 modules</span>
                    <Badge>Most Popular</Badge>
                  </div>
                  <Button className="w-full">Start Learning Path</Button>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://placekitten.com/801/400" 
                    alt="Chemistry Accelerator" 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-2">Chemistry Accelerator Program</h3>
                  <p className="text-muted-foreground text-sm mb-4">Fast-track chemistry preparation with focused modules and practice</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium">12 weeks • 35 modules</span>
                    <Badge variant="outline">New</Badge>
                  </div>
                  <Button className="w-full">Start Learning Path</Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Free Resources</h2>
              <Button variant="link">View All Resources</Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-3">
                  <Book className="h-10 w-10 text-primary" />
                  <div>
                    <h3 className="font-medium">Formula Sheets</h3>
                    <p className="text-xs text-muted-foreground">Quick reference guides</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-3">
                  <BookOpen className="h-10 w-10 text-primary" />
                  <div>
                    <h3 className="font-medium">Practice Papers</h3>
                    <p className="text-xs text-muted-foreground">Previous year questions</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-3">
                  <Users className="h-10 w-10 text-primary" />
                  <div>
                    <h3 className="font-medium">Study Groups</h3>
                    <p className="text-xs text-muted-foreground">Collaborate with peers</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-3">
                  <Star className="h-10 w-10 text-primary" />
                  <div>
                    <h3 className="font-medium">Exam Tips</h3>
                    <p className="text-xs text-muted-foreground">Strategic advice</p>
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

export default Explore;
