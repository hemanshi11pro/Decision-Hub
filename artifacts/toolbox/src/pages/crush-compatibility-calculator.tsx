import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

function hashNames(a: string, b: string): number {
  const s = (a + b).toLowerCase().replace(/\s/g, "");
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % 41) + 55; // 55–95%
}

function getMessage(pct: number): { title: string; desc: string; color: string } {
  if (pct >= 90) return { title: "Soulmates in the Making! ✨", desc: "The stars have spoken — this connection is rare and electric. You two could be something truly special.", color: "text-rose-500" };
  if (pct >= 80) return { title: "Incredibly Compatible 💫", desc: "A strong and natural connection. You understand each other in ways that take most people years to build.", color: "text-pink-500" };
  if (pct >= 70) return { title: "Strong Chemistry ❤️", desc: "There's real chemistry here. Worth exploring — the potential is definitely there.", color: "text-red-500" };
  if (pct >= 60) return { title: "Good Vibes Only 😊", desc: "A solid connection with a lot of room to grow. The foundation looks promising!", color: "text-orange-500" };
  if (pct >= 50) return { title: "Worth Exploring 🌸", desc: "There's something between you — it's subtle but real. Sometimes the best stories start slow.", color: "text-amber-500" };
  return { title: "Opposites Attract? 🎲", desc: "They say opposites attract! Maybe your differences are exactly what makes it interesting.", color: "text-violet-500" };
}

function CountUp({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useState(() => {
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  });

  return <>{count}</>;
}

export default function CrushCompatibilityCalculator() {
  const [yourName, setYourName] = useState("");
  const [crushName, setCrushName] = useState("");
  const [result, setResult] = useState<{ pct: number; msg: ReturnType<typeof getMessage> } | null>(null);
  const [resultKey, setResultKey] = useState(0);
  const [isThinking, setIsThinking] = useState(false);

  const calculate = () => {
    if (!yourName.trim() || !crushName.trim()) return;
    setIsThinking(true);
    setResult(null);
    setTimeout(() => {
      const pct = hashNames(yourName, crushName);
      setResult({ pct, msg: getMessage(pct) });
      setResultKey(k => k + 1);
      setIsThinking(false);
    }, 3000);
  };

  return (
    <>
      <SEO title="Crush Compatibility Calculator - How Compatible Are You?" description="Enter two names and discover your romantic compatibility percentage. A fun love calculator for entertainment. Try it for free!" canonicalUrl="https://randomtoolbox.replit.app/crush-compatibility-calculator" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg"><Heart className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Crush Compatibility</h1>
          </div>
          <p className="text-muted-foreground text-lg">Find out how compatible you are — just for fun! 🌸</p>
        </div>
        <Card className="border-2 shadow-lg border-rose-100 dark:border-rose-900/30">
          <CardContent className="p-8 flex flex-col items-center space-y-6">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Name</label>
                <Input value={yourName} onChange={e => setYourName(e.target.value)} placeholder="Enter your name" className="h-12 text-base" data-testid="input-your-name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Their Name</label>
                <Input value={crushName} onChange={e => setCrushName(e.target.value)} placeholder="Enter their name" className="h-12 text-base" onKeyDown={e => e.key === "Enter" && calculate()} data-testid="input-crush-name" />
              </div>
            </div>
            <div className="min-h-[200px] flex items-center justify-center w-full relative">
              <AnimatePresence mode="wait">
                {isThinking ? (
                  <motion.div key="thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="absolute flex flex-col items-center gap-3">
                    <Heart className="w-12 h-12 text-rose-500 animate-pulse" />
                    <p className="text-muted-foreground animate-pulse font-medium">Calculating your compatibility...</p>
                  </motion.div>
                ) : result ? (
                  <motion.div key={`r-${resultKey}`} initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="absolute text-center w-full px-4">
                    <div className={`text-7xl font-display font-black ${result.msg.color}`}>
                      <CountUp target={result.pct} />%
                    </div>
                    <h2 className={`text-xl font-bold mt-2 ${result.msg.color}`}>{result.msg.title}</h2>
                    <p className="text-muted-foreground mt-2 text-sm max-w-sm mx-auto">{result.msg.desc}</p>
                  </motion.div>
                ) : (
                  <motion.div key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute text-center text-muted-foreground">
                    <Heart className="w-16 h-16 opacity-20 mx-auto mb-2" />
                    <p className="opacity-40">Enter both names to begin</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Button size="lg" className="w-full max-w-xs h-16 text-xl rounded-2xl shadow-xl bg-rose-500 hover:bg-rose-600 text-white" onClick={calculate} disabled={isThinking || !yourName.trim() || !crushName.trim()} data-testid="button-calculate">
              {isThinking ? "Calculating..." : result ? "Recalculate" : "Calculate ❤️"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">This is purely for fun and entertainment — love is more than math! 😊</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
