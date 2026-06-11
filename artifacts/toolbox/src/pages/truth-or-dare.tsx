import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, ArrowLeft, UserCircle2, Flame, AlertTriangle } from "lucide-react";
import { Link } from "wouter";

const DATA = {
  truth: {
    mild: [
      "What's your biggest fear?", 
      "Who was your first crush?", 
      "What's the most embarrassing thing you've done in front of a mirror?", 
      "What's a secret you've never told anyone in this room?", 
      "Have you ever lied to get out of trouble?",
      "What is your most embarrassing childhood memory?"
    ],
    spicy: [
      "Have you ever had a crush on a friend's partner?", 
      "What's the most rule-breaking thing you've ever done?", 
      "Have you ever sent a text to the wrong person that got you in trouble?", 
      "What's the worst date you've ever been on?", 
      "Have you ever been caught lying to someone close to you?",
      "What is your biggest regret?"
    ],
    extreme: [
      "What's the most embarrassing thing in your search history?", 
      "If you had to cut ties with one person in this room, who would it be?", 
      "Have you ever stolen anything of value?", 
      "What is your deepest dark secret?", 
      "What is the worst thing you have ever done?",
      "What is the biggest lie you are currently living?"
    ]
  },
  dare: {
    mild: [
      "Do 10 jumping jacks.", 
      "Speak in an accent for the next 3 rounds.", 
      "Let someone draw on your hand with a pen.", 
      "Dance to a song chosen by the group without music.", 
      "Try to juggle 3 items.",
      "Say the alphabet backward as fast as you can."
    ],
    spicy: [
      "Text your crush or ex and just say 'Hey'.", 
      "Let the group look through your photos for 30 seconds.", 
      "Eat a spoonful of hot sauce or something spicy.", 
      "Call a random contact and sing them a song.", 
      "Let someone post a harmless status on your social media.",
      "Do your best impression of someone in the room."
    ],
    extreme: [
      "Eat a small piece of raw onion or garlic.", 
      "Let the group give you a funny hairstyle.", 
      "Drink a safe mystery mixture created by the group.", 
      "Wear your clothes backward for the rest of the game.", 
      "Take a cold shower for 1 minute (if possible) or hold an ice cube until it melts.",
      "Let the group text someone from your phone."
    ]
  }
};

type Category = "mild" | "spicy" | "extreme";

export default function TruthOrDare() {
  const [category, setCategory] = useState<Category>("mild");
  const [result, setResult] = useState<{ type: "truth" | "dare", text: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = (type: "truth" | "dare") => {
    setIsGenerating(true);
    setResult(null);
    
    setTimeout(() => {
      const options = DATA[type][category];
      const randomChoice = options[Math.floor(Math.random() * options.length)];
      setResult({ type, text: randomChoice });
      setIsGenerating(false);
    }, 600);
  };

  const getCategoryIcon = () => {
    if (category === "mild") return <UserCircle2 className="w-5 h-5 text-green-500" />;
    if (category === "spicy") return <Flame className="w-5 h-5 text-orange-500" />;
    return <AlertTriangle className="w-5 h-5 text-red-500" />;
  };

  return (
    <>
      <SEO 
        title="Truth or Dare Generator - Random Party Game"
        description="Generate random Truth or Dare questions with our free online tool. Filter by intensity: mild, spicy, or extreme for your next party."
        canonicalUrl="https://randomtoolbox.replit.app/truth-or-dare"
      />
      
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
              <Smile className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Truth or Dare</h1>
          </div>
          <p className="text-muted-foreground text-lg">Spice up your next hangout. Choose your intensity.</p>
        </div>

        <Card className="border-2 shadow-lg border-red-100 dark:border-red-900/30">
          <CardContent className="p-8 md:p-12 flex flex-col items-center text-center space-y-8">
            <div className="w-full max-w-xs space-y-2 text-left">
              <label className="text-sm font-medium flex items-center gap-2">
                Intensity Level
                {getCategoryIcon()}
              </label>
              <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Select intensity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Mild (Family Friendly)</SelectItem>
                  <SelectItem value="spicy">Spicy (Getting Interesting)</SelectItem>
                  <SelectItem value="extreme">Extreme (Proceed with Caution)</SelectItem>
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
                    <div className="w-12 h-12 rounded-full border-4 border-t-red-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute text-center w-full px-4"
                  >
                    <p className={`text-sm uppercase tracking-wider font-bold mb-4 ${result.type === 'truth' ? 'text-blue-500' : 'text-red-500'}`}>
                      {result.type}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                      "{result.text}"
                    </h2>
                  </motion.div>
                ) : (
                  <motion.div
                    key="initial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute text-muted-foreground"
                  >
                    <Smile className="w-16 h-16 opacity-20" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Button 
                size="lg" 
                className="w-full sm:w-48 h-16 text-xl rounded-2xl shadow-xl hover:shadow-blue-500/25 transition-all bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => generate("truth")}
                disabled={isGenerating}
              >
                Truth
              </Button>
              <Button 
                size="lg" 
                className="w-full sm:w-48 h-16 text-xl rounded-2xl shadow-xl hover:shadow-red-500/25 transition-all bg-red-600 hover:bg-red-700 text-white"
                onClick={() => generate("dare")}
                disabled={isGenerating}
              >
                Dare
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}