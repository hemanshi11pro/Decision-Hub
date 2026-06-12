import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const QUESTIONS = [
  { q: "Your friend calls you crying at 3am. You:", options: ["Answer immediately and stay on the call as long as needed", "Text back 'you ok?' and fall back asleep", "Drive over if they need you to", "Send a voice note with encouraging words"] },
  { q: "Your squad is planning a trip. Your role is:", options: ["The planner — you make the spreadsheet", "The hype person — you get everyone excited", "The 'I'll go wherever' person", "The one who finds the best deals"] },
  { q: "A friend is going through a breakup. You:", options: ["Listen for hours without offering advice unless asked", "Immediately roast the ex with them", "Show up with food and their favorite show ready", "Give honest advice even if it's hard to hear"] },
  { q: "You see a mutual friend doing something wrong. You:", options: ["Tell them directly, privately", "Stay out of it — not your business", "Talk to a trusted friend about it first", "Confront them in the moment"] },
  { q: "Your friend cancels plans last minute again. You:", options: ["Totally fine — you reschedule without drama", "Express that it bothered you, then move on", "Start expecting it and making backup plans", "Give them the benefit of the doubt every time"] },
  { q: "A friend shares exciting news. Your first reaction:", options: ["Scream and celebrate immediately", "Ask them a thousand questions because you want details", "Hug them (or send the biggest reaction text)", "Tell everyone else you know because you're so happy for them"] },
  { q: "Your friendship strength is:", options: ["Loyalty — you'd never betray a friend", "Humor — you always make them laugh", "Reliability — you show up every time", "Empathy — you just *get* people"] },
  { q: "When a friend needs honest feedback you:", options: ["Tell them the truth kindly but clearly", "Soften it so much they might not get the message", "Ask what kind of support they want first", "Let them figure it out — not your place"] },
  { q: "How do you usually make new friends?", options: ["Shared interests or activities", "Through mutual friends", "Randomly — you talk to everyone", "It takes a while but they find you"] },
  { q: "What's your friendship love language?", options: ["Quality time — you're present when together", "Words of affirmation — you hype them up", "Acts of service — you do things for them", "Gifts and surprises — small thoughtful gestures"] },
];

const RESULTS = [
  { type: "The Ride-or-Die", desc: "You are the friend people call when everything goes sideways. Loyal to a fault, always present, never judging. You make people feel safe and seen. Your friendship is the kind people write songs about.", color: "text-red-500 border-red-200 dark:border-red-900/30" },
  { type: "The Hype Person", desc: "You are the energy everyone needs. When someone shares good news, you celebrate harder than they do. Your enthusiasm is contagious and you make every achievement feel worth celebrating.", color: "text-yellow-500 border-yellow-200 dark:border-yellow-900/30" },
  { type: "The Advice Giver", desc: "Friends come to you because you tell the truth — kindly but clearly. You have emotional intelligence and the courage to say what others won't. People trust your perspective more than anyone else's.", color: "text-blue-500 border-blue-200 dark:border-blue-900/30" },
  { type: "The Planner", desc: "You're the reason the group actually goes anywhere. Without you, every hangout would stay in the 'we should do this sometime' phase. You're organized, thoughtful, and dependably show up.", color: "text-green-500 border-green-200 dark:border-green-900/30" },
];

export default function FriendshipQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<typeof RESULTS[0] | null>(null);

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers, idx];
    if (newAnswers.length === QUESTIONS.length) {
      const counts = [0, 0, 0, 0];
      newAnswers.forEach(a => counts[a % 4]++);
      const maxIdx = counts.indexOf(Math.max(...counts));
      setResult(RESULTS[maxIdx]);
      setAnswers(newAnswers);
    } else {
      setAnswers(newAnswers);
      setStep(newAnswers.length);
    }
  };

  const reset = () => { setStep(0); setAnswers([]); setResult(null); };

  return (
    <>
      <SEO title="Friendship Quiz - What Kind of Friend Are You?" description="Take our 10-question friendship quiz and discover your friendship archetype. Are you the Ride-or-Die, the Hype Person, or the Planner?" canonicalUrl="https://randomtoolbox.replit.app/friendship-quiz" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-lg"><Heart className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Friendship Quiz</h1>
          </div>
          <p className="text-muted-foreground text-lg">Find out what kind of friend you really are.</p>
        </div>
        {!result ? (
          <Card className="border-2 shadow-lg">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Question {step + 1} of {QUESTIONS.length}</span>
                  <span>{Math.round(((step) / QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2"><div className="bg-pink-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(step / QUESTIONS.length) * 100}%` }} /></div>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="space-y-4">
                  <h2 className="text-xl font-display font-bold">{QUESTIONS[step].q}</h2>
                  <div className="space-y-3">
                    {QUESTIONS[step].options.map((opt, i) => (
                      <button key={i} onClick={() => handleAnswer(i)} className="w-full text-left p-4 rounded-xl border-2 border-border hover:border-pink-400 hover:bg-pink-50 dark:hover:bg-pink-950/20 transition-all text-sm font-medium" data-testid={`option-${i}`}>{opt}</button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 280, damping: 22 }}>
            <Card className={`border-2 shadow-xl ${result.color}`}>
              <CardContent className="p-10 text-center space-y-4">
                <Heart className="w-16 h-16 mx-auto text-pink-500" />
                <p className="text-sm uppercase tracking-wider font-bold text-muted-foreground">You are</p>
                <h2 className="text-4xl font-display font-black">{result.type}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">{result.desc}</p>
                <Button onClick={reset} variant="outline" className="mt-4">Take Quiz Again</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </>
  );
}
