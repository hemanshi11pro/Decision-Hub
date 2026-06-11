import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const CHALLENGES = {
  solo: [
    "Do 20 pushups right now.",
    "Hold a plank for 1 minute.",
    "Draw a self-portrait with your non-dominant hand in 2 minutes.",
    "Try to touch your toes without bending your knees for 30 seconds.",
    "Learn to say 'Hello' and 'Thank you' in 3 new languages right now.",
    "Balance a book on your head for 1 minute while walking around.",
    "Write a short poem about the object closest to your right hand.",
    "Find an item in your house you haven't used in a year and throw it away/donate it."
  ],
  group: [
    "Have a staring contest with the person to your left.",
    "Play rock-paper-scissors tournament, loser does 10 squats.",
    "Everyone must speak in questions for the next 3 minutes.",
    "Try to build the tallest tower out of items in the room in 2 minutes.",
    "Do a group synchronized dance routine for 30 seconds.",
    "Play 'the floor is lava' for the next 2 minutes.",
    "Everyone must compliment the person to their right.",
    "See who can hold their breath the longest."
  ],
  outdoor: [
    "Find a leaf that is bigger than your hand.",
    "Spot 3 different types of birds.",
    "Find a rock shaped like a heart.",
    "Do a cartwheel on the grass.",
    "Walk backward for 20 steps safely.",
    "Find 5 different colors in nature.",
    "Take a picture of the weirdest looking cloud.",
    "Balance on a curb or log for 30 seconds."
  ]
};

type Category = keyof typeof CHALLENGES;

export default function ChallengeGenerator() {
  const [category, setCategory] = useState<Category>("solo");
  const [result, setResult] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = () => {
    setIsGenerating(true);
    setResult(null);
    
    setTimeout(() => {
      const options = CHALLENGES[category];
      const randomChoice = options[Math.floor(Math.random() * options.length)];
      setResult(randomChoice);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <>
      <SEO 
        title="Random Challenge Generator - Fun Tasks & Dares"
        description="Generate random, fun challenges to do by yourself, with friends, or outdoors. Spice up your day with a quick challenge!"
        canonicalUrl="https://randomtoolbox.replit.app/challenge-generator"
      />
      
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
              <Swords className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Challenge Generator</h1>
          </div>
          <p className="text-muted-foreground text-lg">Bored? Get a random fun task to complete right now.</p>
        </div>

        <Card className="border-2 shadow-lg border-green-100 dark:border-green-900/30">
          <CardContent className="p-8 md:p-12 flex flex-col items-center text-center space-y-8">
            <div className="w-full max-w-xs space-y-2 text-left">
              <label className="text-sm font-medium">Challenge Type</label>
              <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solo">Solo (Just you)</SelectItem>
                  <SelectItem value="group">Group (With friends)</SelectItem>
                  <SelectItem value="outdoor">Outdoor (Go outside)</SelectItem>
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
                    <div className="w-12 h-12 rounded-full border-4 border-t-green-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute text-center w-full px-4"
                  >
                    <p className="text-sm text-green-600 dark:text-green-400 uppercase tracking-wider font-bold mb-4">Your Challenge</p>
                    <h2 className="text-3xl font-display font-bold text-foreground">
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
                    <Swords className="w-16 h-16 opacity-20 mb-4" />
                    <p className="font-medium">Are you ready?</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button 
              size="lg" 
              className="w-full max-w-xs h-16 text-xl rounded-2xl shadow-xl hover:shadow-green-500/25 transition-all bg-green-600 hover:bg-green-700 text-white"
              onClick={generate}
              disabled={isGenerating}
            >
              {result ? "Give Me Another" : "Give Me A Challenge"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}