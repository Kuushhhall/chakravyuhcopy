
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";
import { BookOpen, Download, ExternalLink, Film, FileText, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ResourceLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock resource data
  const resources = [
    {
      id: 1,
      title: "Physics: Mechanics Formula Sheet",
      description: "Complete compilation of mechanics formulas with examples",
      type: "document",
      subject: "Physics",
      format: "PDF",
      size: "2.4 MB",
      url: "#",
      downloads: 1245
    },
    {
      id: 2,
      title: "Organic Chemistry Reactions Map",
      description: "Visual map of common organic chemistry reactions",
      type: "document",
      subject: "Chemistry",
      format: "PDF",
      size: "3.7 MB",
      url: "#",
      downloads: 923
    },
    {
      id: 3,
      title: "Calculus Integration Techniques",
      description: "Step-by-step guide to various integration methods",
      type: "document",
      subject: "Mathematics",
      format: "PDF",
      size: "1.8 MB",
      url: "#",
      downloads: 1089
    },
    {
      id: 4,
      title: "Introduction to Wave Mechanics",
      description: "Tutorial video explaining wave properties and behavior",
      type: "video",
      subject: "Physics",
      duration: "18:24",
      url: "#",
      views: 4523
    },
    {
      id: 5,
      title: "Periodic Table Interactive Guide",
      description: "Interactive tool for learning about elements",
      type: "interactive",
      subject: "Chemistry",
      url: "#",
      users: 7845
    }
  ];
  
  // Filter resources based on search query
  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get resource icon based on type
  const getResourceIcon = (type: string) => {
    switch(type) {
      case 'document':
        return <FileText className="h-5 w-5" />;
      case 'video':
        return <Film className="h-5 w-5" />;
      case 'interactive':
        return <ExternalLink className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container px-4">
          <h1 className="text-2xl font-bold mb-6">Resource Library</h1>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search resources..."
                className="pl-10 pr-4 py-2 w-full border rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button>
              Upload Resource
            </Button>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="interactive">Interactive</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <Card key={resource.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start mb-4">
                        <div className={`p-2 rounded-full mr-3 ${
                          resource.type === 'document' 
                            ? 'bg-blue-100 text-blue-600' 
                            : resource.type === 'video'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-green-100 text-green-600'
                        }`}>
                          {getResourceIcon(resource.type)}
                        </div>
                        <div>
                          <h3 className="font-medium">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground">{resource.subject}</p>
                        </div>
                      </div>
                      
                      <p className="text-sm mb-4">{resource.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        {resource.type === 'document' && (
                          <>
                            <span>{resource.format}</span>
                            <span>{resource.size}</span>
                          </>
                        )}
                        {resource.type === 'video' && (
                          <>
                            <span>Video</span>
                            <span>{resource.duration}</span>
                          </>
                        )}
                        {resource.type === 'interactive' && (
                          <>
                            <span>Interactive</span>
                            <span>{resource.users} users</span>
                          </>
                        )}
                      </div>
                      
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          {resource.type === 'document' ? (
                            <>
                              <Download className="h-4 w-4" />
                              Download
                            </>
                          ) : (
                            <>
                              <ExternalLink className="h-4 w-4" />
                              Open
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredResources.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No resources found matching your search.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="documents" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources
                  .filter(resource => resource.type === 'document')
                  .map((resource) => (
                    <Card key={resource.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start mb-4">
                          <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{resource.title}</h3>
                            <p className="text-sm text-muted-foreground">{resource.subject}</p>
                          </div>
                        </div>
                        
                        <p className="text-sm mb-4">{resource.description}</p>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <span>{resource.format}</span>
                          <span>{resource.size}</span>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="videos" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources
                  .filter(resource => resource.type === 'video')
                  .map((resource) => (
                    <Card key={resource.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start mb-4">
                          <div className="p-2 rounded-full bg-red-100 text-red-600 mr-3">
                            <Film className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{resource.title}</h3>
                            <p className="text-sm text-muted-foreground">{resource.subject}</p>
                          </div>
                        </div>
                        
                        <p className="text-sm mb-4">{resource.description}</p>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <span>Video</span>
                          <span>{resource.duration}</span>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <ExternalLink className="h-4 w-4" />
                            Watch
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="interactive" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources
                  .filter(resource => resource.type === 'interactive')
                  .map((resource) => (
                    <Card key={resource.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start mb-4">
                          <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                            <ExternalLink className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{resource.title}</h3>
                            <p className="text-sm text-muted-foreground">{resource.subject}</p>
                          </div>
                        </div>
                        
                        <p className="text-sm mb-4">{resource.description}</p>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <span>Interactive</span>
                          <span>{resource.users} users</span>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <ExternalLink className="h-4 w-4" />
                            Open
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResourceLibrary;
