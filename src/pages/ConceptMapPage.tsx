
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ConceptMap } from "@/components/concept-map/ConceptMap";
import { Button } from "@/components/ui-custom/Button";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Filter, Atom, Calculator, BookOpen } from "lucide-react";

// Mock data for the concept map
const conceptNodes = [
  {
    id: "physics-mechanics-newton-laws",
    label: "Newton's Laws",
    category: "Mechanics",
    difficulty: "basic" as const,
    mastery: 85,
    description: "The three fundamental laws that form the foundation of classical mechanics.",
    prerequisites: []
  },
  {
    id: "physics-mechanics-kinematics",
    label: "Kinematics",
    category: "Mechanics",
    difficulty: "basic" as const,
    mastery: 90,
    description: "The study of motion without considering its causes.",
    prerequisites: []
  },
  {
    id: "physics-mechanics-friction",
    label: "Friction",
    category: "Mechanics",
    difficulty: "intermediate" as const,
    mastery: 75,
    description: "The force that opposes the relative motion or tendency of motion between two surfaces in contact.",
    prerequisites: ["physics-mechanics-newton-laws"]
  },
  {
    id: "physics-mechanics-circular-motion",
    label: "Circular Motion",
    category: "Mechanics",
    difficulty: "intermediate" as const,
    mastery: 60,
    description: "Motion in a circular path at constant speed.",
    prerequisites: ["physics-mechanics-newton-laws", "physics-mechanics-kinematics"]
  },
  {
    id: "physics-mechanics-gravitation",
    label: "Gravitation",
    category: "Mechanics",
    difficulty: "intermediate" as const,
    mastery: 70,
    description: "The force of attraction between all masses in the universe.",
    prerequisites: ["physics-mechanics-newton-laws"]
  },
  {
    id: "physics-thermodynamics-heat",
    label: "Heat Transfer",
    category: "Thermodynamics",
    difficulty: "basic" as const,
    mastery: 80,
    description: "The exchange of thermal energy between physical systems.",
    prerequisites: []
  },
  {
    id: "physics-thermodynamics-laws",
    label: "Laws of Thermodynamics",
    category: "Thermodynamics",
    difficulty: "intermediate" as const,
    mastery: 65,
    description: "The fundamental principles that govern heat, work, and energy.",
    prerequisites: ["physics-thermodynamics-heat"]
  },
  {
    id: "physics-electromagnetism-electric-fields",
    label: "Electric Fields",
    category: "Electromagnetism",
    difficulty: "intermediate" as const,
    mastery: 50,
    description: "The region around an electric charge in which other charges experience a force.",
    prerequisites: []
  },
  {
    id: "physics-electromagnetism-magnetic-fields",
    label: "Magnetic Fields",
    category: "Electromagnetism",
    difficulty: "intermediate" as const,
    mastery: 45,
    description: "The region around a magnetic material or a moving electric charge within which the force of magnetism acts.",
    prerequisites: []
  },
  {
    id: "physics-electromagnetism-electromagnetic-induction",
    label: "Electromagnetic Induction",
    category: "Electromagnetism",
    difficulty: "advanced" as const,
    mastery: 30,
    description: "The production of an electromotive force across an electrical conductor in a changing magnetic field.",
    prerequisites: ["physics-electromagnetism-electric-fields", "physics-electromagnetism-magnetic-fields"]
  },
  {
    id: "physics-optics-reflection",
    label: "Reflection",
    category: "Optics",
    difficulty: "basic" as const,
    mastery: 85,
    description: "The change in direction of a wavefront at an interface between two different media.",
    prerequisites: []
  },
  {
    id: "physics-optics-refraction",
    label: "Refraction",
    category: "Optics",
    difficulty: "intermediate" as const,
    mastery: 70,
    description: "The change in direction of a wave passing from one medium to another or from a gradual change in the medium.",
    prerequisites: ["physics-optics-reflection"]
  },
  {
    id: "physics-modern-photoelectric",
    label: "Photoelectric Effect",
    category: "Modern Physics",
    difficulty: "advanced" as const,
    mastery: 40,
    description: "The emission of electrons when light shines on a material.",
    prerequisites: ["physics-optics-reflection", "physics-electromagnetism-electric-fields"]
  },
  {
    id: "chemistry-organic-hydrocarbons",
    label: "Hydrocarbons",
    category: "Organic Chemistry",
    difficulty: "basic" as const,
    mastery: 60,
    description: "Compounds consisting entirely of hydrogen and carbon.",
    prerequisites: []
  },
  {
    id: "chemistry-physical-thermochemistry",
    label: "Thermochemistry",
    category: "Physical Chemistry",
    difficulty: "intermediate" as const,
    mastery: 55,
    description: "The study of heat and energy associated with chemical reactions and physical transformations.",
    prerequisites: ["physics-thermodynamics-laws"]
  }
];

const conceptConnections = [
  { source: "physics-mechanics-newton-laws", target: "physics-mechanics-friction", type: "prerequisite" as const },
  { source: "physics-mechanics-newton-laws", target: "physics-mechanics-circular-motion", type: "prerequisite" as const },
  { source: "physics-mechanics-kinematics", target: "physics-mechanics-circular-motion", type: "prerequisite" as const },
  { source: "physics-mechanics-newton-laws", target: "physics-mechanics-gravitation", type: "prerequisite" as const },
  { source: "physics-thermodynamics-heat", target: "physics-thermodynamics-laws", type: "prerequisite" as const },
  { source: "physics-electromagnetism-electric-fields", target: "physics-electromagnetism-electromagnetic-induction", type: "prerequisite" as const },
  { source: "physics-electromagnetism-magnetic-fields", target: "physics-electromagnetism-electromagnetic-induction", type: "prerequisite" as const },
  { source: "physics-optics-reflection", target: "physics-optics-refraction", type: "prerequisite" as const },
  { source: "physics-optics-reflection", target: "physics-modern-photoelectric", type: "leads-to" as const },
  { source: "physics-electromagnetism-electric-fields", target: "physics-modern-photoelectric", type: "leads-to" as const },
  { source: "physics-thermodynamics-laws", target: "chemistry-physical-thermochemistry", type: "related" as const },
  { source: "physics-mechanics-newton-laws", target: "physics-mechanics-kinematics", type: "related" as const },
  { source: "physics-electromagnetism-electric-fields", target: "physics-electromagnetism-magnetic-fields", type: "related" as const }
];

const ConceptMapPage = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  
  const filteredNodes = selectedSubject === "all" 
    ? conceptNodes 
    : conceptNodes.filter(node => node.id.startsWith(selectedSubject));
  
  const filteredConnections = selectedSubject === "all"
    ? conceptConnections
    : conceptConnections.filter(conn => 
        conn.source.startsWith(selectedSubject) || conn.target.startsWith(selectedSubject)
      );
  
  const handleNodeClick = (nodeId: string) => {
    console.log("Node clicked:", nodeId);
    // In a real app, you would navigate to a detailed view or show more information
  };
  
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Knowledge Graph</h1>
            <p className="text-muted-foreground">Explore connections between concepts across different subjects</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={selectedSubject === "all" ? "default" : "outline"} 
              onClick={() => setSelectedSubject("all")}
              className="flex items-center gap-1"
            >
              <BookOpen className="h-4 w-4" />
              All
            </Button>
            <Button 
              variant={selectedSubject === "physics" ? "default" : "outline"} 
              onClick={() => setSelectedSubject("physics")}
              className="flex items-center gap-1"
            >
              <Atom className="h-4 w-4" />
              Physics
            </Button>
            <Button 
              variant={selectedSubject === "chemistry" ? "default" : "outline"} 
              onClick={() => setSelectedSubject("chemistry")}
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              Chemistry
            </Button>
            <Button 
              variant={selectedSubject === "mathematics" ? "default" : "outline"} 
              onClick={() => setSelectedSubject("mathematics")}
              className="flex items-center gap-1"
            >
              <Calculator className="h-4 w-4" />
              Mathematics
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ConceptMap 
              nodes={filteredNodes} 
              connections={filteredConnections}
              onNodeClick={handleNodeClick}
            />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Legend</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium mb-2">Concept Categories</h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: "#3b82f6"}}></div>
                        <span className="text-sm">Mechanics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: "#ef4444"}}></div>
                        <span className="text-sm">Thermodynamics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: "#eab308"}}></div>
                        <span className="text-sm">Electromagnetism</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: "#22c55e"}}></div>
                        <span className="text-sm">Optics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: "#8b5cf6"}}></div>
                        <span className="text-sm">Modern Physics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: "#ec4899"}}></div>
                        <span className="text-sm">Organic Chemistry</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: "#14b8a6"}}></div>
                        <span className="text-sm">Inorganic Chemistry</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: "#f97316"}}></div>
                        <span className="text-sm">Physical Chemistry</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Difficulty Levels</h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-3 border-2 border-green-500"></div>
                        <span className="text-sm">Basic</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-3 border-2 border-amber-500"></div>
                        <span className="text-sm">Intermediate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-3 border-2 border-red-500"></div>
                        <span className="text-sm">Advanced</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Connection Types</h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-0.5 bg-red-500"></div>
                        <span className="text-sm">Prerequisite</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-0.5 bg-blue-500 border-dashed border-t border-blue-500"></div>
                        <span className="text-sm">Related</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-0.5 bg-green-500"></div>
                        <span className="text-sm">Leads To</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Learning Path</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Recommended sequence of concepts to master based on prerequisites and difficulty.
                </p>
                <div className="space-y-2">
                  <Card className="bg-secondary/30">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-green-500 text-white h-6 w-6 rounded-full flex items-center justify-center text-xs">1</div>
                        <span className="font-medium">Newton's Laws</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary/30">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-green-500 text-white h-6 w-6 rounded-full flex items-center justify-center text-xs">2</div>
                        <span className="font-medium">Kinematics</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary/30">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-amber-500 text-white h-6 w-6 rounded-full flex items-center justify-center text-xs">3</div>
                        <span className="font-medium">Friction</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary/30">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-amber-500 text-white h-6 w-6 rounded-full flex items-center justify-center text-xs">4</div>
                        <span className="font-medium">Circular Motion</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary/30">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-red-500 text-white h-6 w-6 rounded-full flex items-center justify-center text-xs">5</div>
                        <span className="font-medium">Electromagnetic Induction</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Button className="w-full mt-4">View Full Learning Path</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConceptMapPage;
