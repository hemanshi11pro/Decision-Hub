import { useState, useRef } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Users, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const QUESTIONS: Record<string, string[]> = {
  general: [
    "Most likely to become world famous.", "Most likely to forget their own birthday.",
    "Most likely to accidentally text the wrong person something embarrassing.", "Most likely to eat the last slice without asking.",
    "Most likely to still be awake at 3am for no reason.", "Most likely to be on their phone during a movie.",
    "Most likely to get lost in a city they've been to ten times.", "Most likely to start a business and actually make it work.",
    "Most likely to move to another country on a whim.", "Most likely to cry at a commercial.",
    "Most likely to own 5 unfinished hobbies.", "Most likely to forget a very important meeting.",
    "Most likely to adopt too many pets.", "Most likely to become a social media influencer.",
    "Most likely to show up underdressed to a fancy event.", "Most likely to fall asleep first at a sleepover.",
    "Most likely to have a Wikipedia page someday.", "Most likely to talk to a plant like it's a person.",
    "Most likely to win a random competition they entered impulsively.", "Most likely to end up on a reality TV show.",
    "Most likely to still use Internet Explorer.", "Most likely to be obsessed with a niche hobby nobody else cares about.",
    "Most likely to start a podcast.", "Most likely to pretend they've read a book they haven't.",
    "Most likely to ghost someone they still see regularly.", "Most likely to accidentally go viral.",
    "Most likely to switch careers three times before 30.", "Most likely to show up late to their own party.",
    "Most likely to name their WiFi something hilarious.", "Most likely to have an absurdly specific conspiracy theory.",
  ],
  wild: [
    "Most likely to get a tattoo of something they'll regret.", "Most likely to get arrested for something genuinely hilarious.",
    "Most likely to accidentally start a trend.", "Most likely to challenge a stranger to something absurd and win.",
    "Most likely to claim they invented something after it already exists.", "Most likely to disappear for 6 months and come back with a completely different personality.",
    "Most likely to run from the police — for a genuinely dumb reason.", "Most likely to accidentally end up on the news.",
    "Most likely to sell everything and live in a van.", "Most likely to show up to a formal event in pajamas unironically.",
    "Most likely to accidentally be part of a heist without realizing it.", "Most likely to befriend a wild animal.",
    "Most likely to go to Vegas and not remember the whole trip.", "Most likely to challenge a world record that doesn't exist yet.",
    "Most likely to start a cult accidentally.", "Most likely to get into a rap battle at a random place and win.",
    "Most likely to sleepwalk into an adventure.", "Most likely to eat something that definitely wasn't meant to be eaten.",
    "Most likely to accidentally end up in a foreign country with no plan.", "Most likely to be the reason a party gets shut down.",
  ],
  career: [
    "Most likely to become a CEO before 35.", "Most likely to drop everything and become a chef.",
    "Most likely to accidentally become a professional gamer.", "Most likely to be on Forbes 30 Under 30.",
    "Most likely to retire by 40.", "Most likely to turn their side hustle into their main income.",
    "Most likely to work in the same job for 30 years.", "Most likely to make millions and never tell anyone.",
    "Most likely to quit their job to travel the world.", "Most likely to invent something absurdly useful.",
    "Most likely to be a millionaire who still lives frugally.", "Most likely to write a bestselling book.",
    "Most likely to be on a famous podcast as a guest.", "Most likely to be the boss everyone actually likes.",
    "Most likely to end up on a TED stage.", "Most likely to pivot their entire career after 40.",
    "Most likely to work for NASA or a space company.", "Most likely to build an app that blows up overnight.",
    "Most likely to become a professor of something random.", "Most likely to work a job that doesn't exist yet.",
  ],
  romance: [
    "Most likely to have the most romantic proposal.", "Most likely to date someone they met in the strangest way.",
    "Most likely to be in a long-distance relationship.", "Most likely to fall in love on a vacation.",
    "Most likely to confess feelings in the most dramatic way possible.", "Most likely to have a celebrity crush become real.",
    "Most likely to be in a situationship for way too long.", "Most likely to fall for their best friend.",
    "Most likely to get married first.", "Most likely to get married last.",
    "Most likely to have the most ridiculous breakup story.", "Most likely to date someone completely unexpected.",
    "Most likely to send an accidental 'I love you' to the wrong person.", "Most likely to have a rom-com style love story.",
    "Most likely to be picky about who they date — for very specific reasons.", "Most likely to fall in love while arguing with someone.",
    "Most likely to stay friends with all their exes.", "Most likely to write love letters unironically.",
    "Most likely to be in a whirlwind romance that ends in marriage.", "Most likely to have a situationship that everyone sees but them.",
  ],
  friendship: [
    "Most likely to remember everyone's birthday without a reminder.", "Most likely to be the therapist friend who gives great advice.",
    "Most likely to bring snacks without being asked.", "Most likely to be late to everything and still be forgiven.",
    "Most likely to cancel plans at the last minute.", "Most likely to be the most loyal friend in the group.",
    "Most likely to introduce the group to a great movie or show.", "Most likely to plan the best group trips.",
    "Most likely to call at midnight just to chat.", "Most likely to hype everyone up no matter what.",
    "Most likely to spill the group's secrets — by accident.", "Most likely to randomly show up with food when you're having a bad day.",
    "Most likely to be the group photographer at every event.", "Most likely to still be friends with everyone in 20 years.",
    "Most likely to be the one everyone calls in a crisis.", "Most likely to have a different best friend for every situation.",
    "Most likely to know all the group gossip but never start any.", "Most likely to be the peacemaker when everyone argues.",
    "Most likely to drag the whole group into a new obsession.", "Most likely to be the first to leave a party — and the last to text 'I'm home safe'.",
  ],
};

type Category = keyof typeof QUESTIONS;

function getRandomUnique(arr: string[], exclude: string | null): string {
  if (arr.length <= 1) return arr[0];
  let pick: string;
  let attempts = 0;
  do { pick = arr[Math.floor(Math.random() * arr.length)]; attempts++; } while (pick === exclude && attempts < 10);
  return pick;
}

export default function MostLikelyTo() {
  const [category, setCategory] = useState<Category>("general");
  const [result, setResult] = useState<string | null>(null);
  const [resultKey, setResultKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const last = useRef<string | null>(null);

  const next = () => {
    setIsAnimating(true);
    setResult(null);
    setTimeout(() => {
      const pick = getRandomUnique(QUESTIONS[category], last.current);
      last.current = pick;
      setResult(pick);
      setResultKey(k => k + 1);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <>
      <SEO title="Most Likely To Generator - Party Game Questions" description="Generate random 'Most Likely To' questions for parties, group games, and friend meetups. 120+ unique questions across categories." canonicalUrl="https://randomtoolbox.replit.app/most-likely-to" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg"><Users className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Most Likely To</h1>
          </div>
          <p className="text-muted-foreground text-lg">Point at the person in your group who fits best.</p>
        </div>
        <Card className="border-2 shadow-lg border-indigo-100 dark:border-indigo-900/30">
          <CardContent className="p-8 flex flex-col items-center space-y-8">
            <div className="w-full max-w-xs space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={category} onValueChange={(v) => { setCategory(v as Category); setResult(null); last.current = null; }}>
                <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="wild">Wild & Funny</SelectItem>
                  <SelectItem value="career">Career & Life</SelectItem>
                  <SelectItem value="romance">Romance</SelectItem>
                  <SelectItem value="friendship">Friendship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="min-h-[200px] flex items-center justify-center w-full relative">
              <AnimatePresence mode="wait">
                {isAnimating ? (
                  <motion.div key="anim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute">
                    <Users className="w-12 h-12 text-indigo-400 animate-pulse" />
                  </motion.div>
                ) : result ? (
                  <motion.div key={`r-${resultKey}`} initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="absolute text-center w-full px-4">
                    <p className="text-sm text-indigo-500 uppercase tracking-wider font-bold mb-4">Who in your group is...</p>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground leading-snug">{result}</h2>
                  </motion.div>
                ) : (
                  <motion.div key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute text-center text-muted-foreground">
                    <Users className="w-16 h-16 opacity-20 mx-auto mb-2" />
                    <p className="opacity-40 font-medium">Most likely to...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Button size="lg" className="w-full max-w-xs h-16 text-xl rounded-2xl shadow-xl bg-indigo-600 hover:bg-indigo-700 text-white" onClick={next} disabled={isAnimating} data-testid="button-next-question">
              {result ? "Next Question" : "Start Game"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
