import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TOOLS, CATEGORIES } from "@/lib/constants";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory ? tool.category === activeCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const groupedTools = useMemo(() => {
    const groups: Record<string, typeof TOOLS> = {};
    CATEGORIES.forEach(cat => groups[cat] = []);
    filteredTools.forEach(tool => {
      if (groups[tool.category]) {
        groups[tool.category].push(tool);
      }
    });
    return groups;
  }, [filteredTools]);

  return (
    <>
      <SEO 
        title="Home - Free Random Generators & Tools"
        description="RandomToolbox offers 15+ free online random generators and decision tools. Spin wheels, calculate GPA, flip coins, and more. No sign-up required."
        canonicalUrl="https://randomtoolbox.replit.app/"
      />
      
      <div className="flex flex-col gap-12">
        <section className="text-center space-y-6 max-w-3xl mx-auto pt-8 md:pt-16 pb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-extrabold tracking-tight"
          >
            Your Digital Playground for <span className="text-primary">Random Fun.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            Decide what to eat, play party games, or calculate your GPA. Instant answers, zero clutter.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-xl mx-auto mt-8"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search tools... (e.g. truth or dare, gpa)" 
                className="pl-10 h-14 text-lg rounded-full bg-card shadow-sm border-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mt-6"
          >
            <Badge 
              variant={activeCategory === null ? "default" : "secondary"} 
              className="cursor-pointer text-sm px-4 py-1.5 rounded-full"
              onClick={() => setActiveCategory(null)}
            >
              All Tools
            </Badge>
            {CATEGORIES.map(category => (
              <Badge 
                key={category}
                variant={activeCategory === category ? "default" : "secondary"} 
                className="cursor-pointer text-sm px-4 py-1.5 rounded-full"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </motion.div>
        </section>

        <div className="space-y-16">
          {CATEGORIES.map(category => {
            const tools = groupedTools[category];
            if (!tools || tools.length === 0) return null;
            
            return (
              <section key={category} className="space-y-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-display font-bold">{category}</h2>
                  <div className="h-px bg-border flex-1 ml-4" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tools.map((tool, index) => {
                    const Icon = (Icons as any)[tool.icon] || Icons.Box;
                    return (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link href={tool.path} className="block h-full hover-elevate rounded-2xl group">
                          <Card className="h-full transition-all duration-300 border-2 hover:border-primary/50 bg-card rounded-2xl overflow-hidden relative">
                            <div className={`absolute top-0 left-0 w-full h-1 ${tool.color}`} />
                            <CardHeader className="pb-2">
                              <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-white ${tool.color} shadow-sm group-hover:scale-110 transition-transform`}>
                                <Icon className="w-6 h-6" />
                              </div>
                              <CardTitle className="text-xl font-display group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <CardDescription className="text-base">{tool.description}</CardDescription>
                              <div className="mt-6 flex items-center text-sm font-medium text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                Open Tool <ChevronRight className="w-4 h-4 ml-1" />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            );
          })}
          
          {filteredTools.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">No tools found</h3>
              <p className="text-muted-foreground mt-2">Try a different search term or category.</p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => { setSearchQuery(""); setActiveCategory(null); }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}