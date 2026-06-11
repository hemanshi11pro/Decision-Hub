import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const DATA = {
  general: [
    "Never have I ever accidentally sent a text to the person it was about.",
    "Never have I ever fallen asleep in public.",
    "Never have I ever lied about my age.",
    "Never have I ever forgotten a friend's birthday.",
    "Never have I ever walked into a glass door.",
    "Never have I ever laughed at a joke I didn't understand."
  ],
  funny: [
    "Never have I ever blamed a fart on a pet.",
    "Never have I ever tripped and played it off like I meant to do it.",
    "Never have I ever waved at someone who wasn't waving at me.",
    "Never have I ever worn underwear inside out.",
    "Never have I ever dropped my phone on my face while in bed.",
    "Never have I ever talked to myself in the mirror."
  ],
  adventurous: [
    "Never have I ever gone skydiving.",
    "Never have I ever sneaked into a movie or concert.",
    "Never have I ever traveled to another country alone.",
    "Never have I ever gone skinny dipping.",
    "Never have I ever eaten a bug.",
    "Never have I ever gone on a spontaneous road trip."
  ],
  romantic: [
    "Never have I ever had a crush on a teacher or professor.",
    "Never have I ever stalked an ex on social media.",
    "Never have I ever gone on a blind date.",
    "Never have I ever kissed someone on the first date.",
    "Never have I ever practiced kissing on my hand.",
    "Never have I ever used a cheesy pickup line unironically."
  ]
};

type Category = keyof typeof DATA;

export default function NeverHaveIEver() {
  const [category, setCategory] = useState<Category>("general");
  const [result, setResult] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = () => {
    setIsGenerating(true);
    setResult(null);
    
    setTimeout(() => {
      const options = DATA[category];
      const randomChoice = options[Math.floor(Math.random() * options.length)];
      setResult(randomChoice);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <>
      <SEO 
        title="Never Have I Ever Generator - Free Party Game"
        description="Generate random 'Never have I ever' questions for your next party. Choose from funny, adventurous, romantic, or general categories."
        canonicalUrl="https://randomtoolbox.replit.app/never-have-i-ever"
      />
      
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-lg">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Never Have I Ever</h1>
          </div>
          <p className="text-muted-foreground text-lg">Spill the tea. Find out what your friends have done.</p>
        </div>

        <Card className="border-2 shadow-lg border-yellow-100 dark:border-yellow-900/30">
          <CardContent className="p-8 md:p-12 flex flex-col items-center text-center space-y-8">
            <div className="w-full max-w-xs space-y-2 text-left">
              <label className="text-sm font-medium">Category</label>
              <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="funny">Funny</SelectItem>
                  <SelectItem value="adventurous">Adventurous</SelectItem>
                  <SelectItem value="romantic">Romantic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="min-h-[200px] flex items-center justify-center w-full relative">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="generating"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute"
                  >
                    <div className="w-12 h-12 rounded-full border-4 border-t-yellow-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute text-center w-full px-4"
                  >
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                      "{result}"
                    </h2>
                  </motion.div>
                ) : (
                  <motion.div
                    key="initial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute text-muted-foreground flex flex-col items-center"
                  >
                    <MessageCircle className="w-16 h-16 opacity-20 mb-4" />
                    <p className="font-display text-xl font-bold opacity-30">Never have I ever...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button 
              size="lg" 
              className="w-full max-w-xs h-16 text-xl rounded-2xl shadow-xl hover:shadow-yellow-500/25 transition-all bg-yellow-500 hover:bg-yellow-600 text-white"
              onClick={generate}
              disabled={isGenerating}
            >
              {result ? "Next Question" : "Start Playing"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}