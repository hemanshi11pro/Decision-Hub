import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { SplitSquareHorizontal, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const QUESTIONS = [
  { option1: "Always have to say everything on your mind", option2: "Never speak again" },
  { option1: "Have the ability to fly", option2: "Be invisible" },
  { option1: "Find true love today", option2: "Win the lottery next year" },
  { option1: "Be forced to sing along to every song you hear", option2: "Be forced to dance to every song you hear" },
  { option1: "Travel 100 years into the past", option2: "Travel 100 years into the future" },
  { option1: "Have fingers for toes", option2: "Have toes for fingers" },
  { option1: "Always be 10 minutes late", option2: "Always be 20 minutes early" },
  { option1: "Lose all your money and valuables", option2: "Lose all the pictures you've ever taken" },
  { option1: "Be famous when you are alive and forgotten when you die", option2: "Be unknown when you are alive but famous after you die" },
  { option1: "Live without the internet", option2: "Live without AC and heating" },
  { option1: "Have a pause button in your life", option2: "Have a rewind button in your life" },
  { option1: "Never eat your favorite food again", option2: "Only eat your favorite food for the rest of your life" }
];

// Mock vote data generator
const generateVotes = () => {
  const v1 = Math.floor(Math.random() * 10000) + 1000;
  const v2 = Math.floor(Math.random() * 10000) + 1000;
  const total = v1 + v2;
  return { v1, v2, p1: Math.round((v1/total)*100), p2: Math.round((v2/total)*100) };
};

export default function WouldYouRather() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState(generateVotes());
  
  // Randomize initial question
  useEffect(() => {
    setCurrentQuestion(Math.floor(Math.random() * QUESTIONS.length));
  }, []);

  const handleVote = (option: 1 | 2) => {
    setHasVoted(true);
    // Add user vote to mock stats
    const newVotes = { ...votes };
    if (option === 1) newVotes.v1 += 1;
    if (option === 2) newVotes.v2 += 1;
    const total = newVotes.v1 + newVotes.v2;
    newVotes.p1 = Math.round((newVotes.v1/total)*100);
    newVotes.p2 = Math.round((newVotes.v2/total)*100);
    setVotes(newVotes);
  };

  const nextQuestion = () => {
    let next;
    do {
      next = Math.floor(Math.random() * QUESTIONS.length);
    } while (next === currentQuestion && QUESTIONS.length > 1);
    
    setHasVoted(false);
    setVotes(generateVotes());
    setCurrentQuestion(next);
  };

  const q = QUESTIONS[currentQuestion];

  return (
    <>
      <SEO 
        title="Would You Rather? - Random Fun Questions"
        description="Play Would You Rather with our random question generator. Vote on tough dilemmas and see what other people chose."
        canonicalUrl="https://randomtoolbox.replit.app/would-you-rather"
      />
      
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-lg">
              <SplitSquareHorizontal className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Would You Rather...</h1>
          </div>
          <p className="text-muted-foreground text-lg">The toughest dilemmas on the internet.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-[400px]">
          <AnimatePresence mode="wait">
            {!hasVoted ? (
              <>
                <motion.div
                  key="opt1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full"
                >
                  <Card 
                    className="h-full border-2 hover:border-teal-500 cursor-pointer transition-all hover-elevate bg-card flex items-center justify-center p-8 text-center"
                    onClick={() => handleVote(1)}
                  >
                    <h3 className="text-2xl md:text-3xl font-display font-bold">{q.option1}</h3>
                  </Card>
                </motion.div>
                
                <motion.div
                  key="opt2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full"
                >
                  <Card 
                    className="h-full border-2 hover:border-teal-500 cursor-pointer transition-all hover-elevate bg-card flex items-center justify-center p-8 text-center"
                    onClick={() => handleVote(2)}
                  >
                    <h3 className="text-2xl md:text-3xl font-display font-bold">{q.option2}</h3>
                  </Card>
                </motion.div>
              </>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="col-span-1 md:col-span-2"
              >
                <Card className="border-2 shadow-lg overflow-hidden">
                  <CardContent className="p-8 space-y-8">
                    <h2 className="text-center font-display font-bold text-2xl text-muted-foreground">Results</h2>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-end">
                          <h3 className="text-xl font-bold pr-4">{q.option1}</h3>
                          <span className="text-3xl font-display font-black text-teal-600 dark:text-teal-400">{votes.p1}%</span>
                        </div>
                        <Progress value={votes.p1} className="h-4 bg-muted [&>div]:bg-teal-500" />
                        <p className="text-sm text-muted-foreground text-right">{votes.v1.toLocaleString()} votes</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-end">
                          <h3 className="text-xl font-bold pr-4">{q.option2}</h3>
                          <span className="text-3xl font-display font-black text-slate-600 dark:text-slate-400">{votes.p2}%</span>
                        </div>
                        <Progress value={votes.p2} className="h-4 bg-muted [&>div]:bg-slate-500" />
                        <p className="text-sm text-muted-foreground text-right">{votes.v2.toLocaleString()} votes</p>
                      </div>
                    </div>

                    <div className="flex justify-center pt-4">
                      <Button size="lg" className="h-14 px-8 text-lg rounded-full" onClick={nextQuestion}>
                        Next Question
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}