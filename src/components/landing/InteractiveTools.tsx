
import { Card, CardContent } from "@/components/ui-custom/Card";
import { BookOpen, BarChart4, PenTool } from "lucide-react";

export function InteractiveTools() {
  const tools = [
    {
      icon: BarChart4,
      title: "GRAPHING",
      description: "Generate, edit, and analyze graphs and plots to visualize mathematical concepts",
      tag: "@graph",
    },
    {
      icon: BookOpen,
      title: "VIDEO GENERATION",
      description: "Generate personalized video lessons to visualize concepts and improve understanding",
      tag: "@video",
    },
    {
      icon: PenTool,
      title: "WHITEBOARD",
      description: "Draw and diagram your ideas and notes to better visualize complex JEE topics",
      tag: "@whiteboard",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">Interactive Tools</h2>
            <div className="flex gap-4">
              <button className="px-6 py-2 rounded-lg bg-blue-500 text-white">
                Interactive Tools
              </button>
              <button className="px-6 py-2 rounded-lg bg-background/20 text-foreground">
                Examples
              </button>
            </div>
          </div>
          
          <p className="mb-8 text-muted-foreground">
            Learn exactly how you want to alongside Feynman, with every learning tool you might need at your disposal.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Card key={index} className="bg-background/40 backdrop-blur-sm border-none hover:bg-background/60 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-start">
                    <tool.icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-sm font-semibold mb-2 text-blue-500">{tool.title}</h3>
                  <p className="text-sm text-foreground mb-4">
                    {tool.description}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Tag {tool.tag} to use this tool
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 p-4 rounded-lg bg-background/20 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-block p-1 border border-muted rounded">
                <BookOpen className="h-4 w-4" />
              </span>
              <span>DeepTutor</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Feynman may make mistakes. Check important info and please report any bugs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
