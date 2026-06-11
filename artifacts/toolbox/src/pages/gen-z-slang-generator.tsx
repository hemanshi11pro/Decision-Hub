import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ArrowLeft, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { GEN_Z_SLANG } from "@/lib/constants";

export default function GenZSlangGenerator() {
  const [term, setTerm] = useState(GEN_Z_SLANG[Math.floor(Math.random() * GEN_Z_SLANG.length)]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      let next;
      do {
        next = GEN_Z_SLANG[Math.floor(Math.random() * GEN_Z_SLANG.length)];
      } while (next.term === term.term);
      
      setTerm(next);
      setIsGenerating(false);
    }, 400);
  };

  return (
    <>
      <SEO 
        title="Gen Z Slang Generator - Learn Internet Slang"
        description="Confused by Gen Z slang? Generate a random slang term with its definition and example sentence to stay up-to-date with internet culture."
        canonicalUrl="https://randomtoolbox.replit.app/gen-z-slang-generator"
      />
      
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-lg">
              <Zap className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Gen Z Slang Generator</h1>
          </div>
          <p className="text-muted-foreground text-lg">Decode the internet, no cap.</p>
        </div>

        <Card className="border-2 shadow-lg border-cyan-100 dark:border-cyan-900/30 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 to-blue-500" />
          <CardContent className="p-8 md:p-12 flex flex-col items-center space-y-8">
            
            <div className="min-h-[250px] w-full relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={term.term}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full space-y-6 text-center pt-4"
                >
                  <h2 className="text-5xl md:text-6xl font-display font-black text-foreground lowercase decoration-wavy decoration-cyan-400 underline underline-offset-8">
                    {term.term}
                  </h2>
                  
                  <div className="bg-muted/50 p-6 rounded-2xl text-left space-y-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Definition</span>
                      <p className="text-lg font-medium">{term.definition}</p>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Example</span>
                      <p className="text-lg italic text-muted-foreground">"{term.example}"</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <Button 
              size="lg" 
              className="w-full max-w-xs h-14 text-lg rounded-full shadow-lg bg-cyan-600 hover:bg-cyan-700 text-white"
              onClick={generate}
              disabled={isGenerating}
            >
              <RefreshCw className={`w-5 h-5 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
              Teach Me Another
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}