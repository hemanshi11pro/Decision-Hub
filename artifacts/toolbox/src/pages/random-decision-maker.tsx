import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Dices, ArrowLeft, Plus, X, Shuffle } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function RandomDecisionMaker() {
  const [options, setOptions] = useState<string[]>(["Option 1", "Option 2"]);
  const [result, setResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const addOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const removeOption = (index: number) => {
    if (options.length <= 2) {
      toast.error("You need at least 2 options to make a decision.");
      return;
    }
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const spin = () => {
    const validOptions = options.filter(o => o.trim() !== "");
    if (validOptions.length < 2) {
      toast.error("Please fill in at least 2 options.");
      return;
    }

    setIsSpinning(true);
    setResult(null);
    
    setTimeout(() => {
      const randomChoice = validOptions[Math.floor(Math.random() * validOptions.length)];
      setResult(randomChoice);
      setIsSpinning(false);
    }, 1500);
  };

  return (
    <>
      <SEO 
        title="Random Decision Maker - Free Online Chooser"
        description="Type in your options and let our random decision maker choose a winner for you. Perfect for settling debates or making quick choices."
        canonicalUrl="https://randomtoolbox.replit.app/random-decision-maker"
      />
      
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
              <Dices className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Random Decision Maker</h1>
          </div>
          <p className="text-muted-foreground text-lg">Can't decide? Let the computer take the blame.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <Card className="border-2 shadow-lg md:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">Your Options</h2>
                <Badge variant="secondary">{options.length}</Badge>
              </div>
              
              <div className="space-y-3">
                <AnimatePresence>
                  {options.map((option, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex gap-2"
                    >
                      <Input
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="bg-muted/50"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeOption(index)}
                        className="text-muted-foreground hover:text-destructive shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <Button variant="outline" className="w-full border-dashed border-2" onClick={addOption}>
                <Plus className="w-4 h-4 mr-2" /> Add Option
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-lg md:col-span-3 bg-gradient-to-br from-purple-500/5 to-transparent relative overflow-hidden">
            <CardContent className="p-8 md:p-12 flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-8">
              <div className="flex-1 flex items-center justify-center w-full relative">
                <AnimatePresence mode="wait">
                  {isSpinning ? (
                    <motion.div
                      key="spinning"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1, rotate: [0, 10, -10, 10, 0] }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="absolute"
                    >
                      <Dices className="w-24 h-24 text-purple-500" />
                    </motion.div>
                  ) : result ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="absolute text-center w-full"
                    >
                      <p className="text-sm text-purple-600 dark:text-purple-400 uppercase tracking-wider font-bold mb-4">The winner is</p>
                      <h2 className="text-4xl md:text-5xl font-display font-black text-foreground break-words px-4">
                        {result}
                      </h2>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="initial"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute text-muted-foreground flex flex-col items-center"
                    >
                      <Shuffle className="w-16 h-16 opacity-20 mb-4" />
                      <p className="font-medium text-lg">Ready to decide</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button 
                size="lg" 
                className="w-full max-w-sm h-16 text-xl rounded-2xl shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all bg-purple-600 hover:bg-purple-700 text-white"
                onClick={spin}
                disabled={isSpinning}
              >
                {isSpinning ? "Choosing..." : result ? "Choose Again" : "Decide For Me"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

// Needed Badge component for this file
import { Badge } from "@/components/ui/badge";