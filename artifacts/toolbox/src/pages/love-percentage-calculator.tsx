import { useState, useEffect, useRef } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

function hashNames(a: string, b: string): number {
  const s = ([a, b].sort().join("")).toLowerCase().replace(/\s/g, "");
  let hash = 5381;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) + hash + s.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % 51) + 48; // 48–98%
}

function getArchetype(pct: number): { label: string; desc: string; emoji: string } {
  if (pct >= 90) return { label: "Cosmic Pair", desc: "You're written in the stars. Rare, electric, and undeniably meant to find each other.", emoji: "✨" };
  if (pct >= 80) return { label: "Power Couple", desc: "Dynamic, unstoppable, and inspiring to everyone around you. Goals, honestly.", emoji: "👑" };
  if (pct >= 70) return { label: "Best Friends First", desc: "Your love is built on a deep foundation of friendship. The strongest kind.", emoji: "🌟" };
  if (pct >= 60) return { label: "Slow Burn", desc: "The kind of love that grows stronger every single day. Worth every moment.", emoji: "🔥" };
  if (pct >= 50) return { label: "Passionate Rivals", desc: "You challenge each other constantly. Some of the best love stories start this way.", emoji: "⚡" };
  return { label: "Total Opposites", desc: "As different as night and day — but sometimes that's exactly the spark you need.", emoji: "🎭" };
}

function AnimatedPercent({ target }: { target: number }) {
  const [val, setVal] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setVal(0);
    let curr = 0;
    timerRef.current = setInterval(() => {
      curr += 2;
      if (curr >= target) { setVal(target); if (timerRef.current) clearInterval(timerRef.current); }
      else setVal(curr);
    }, 30);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [target]);

  return <>{val}</>;
}

export default function LovePercentageCalculator() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<{ pct: number; arch: ReturnType<typeof getArchetype> } | null>(null);
  const [resultKey, setResultKey] = useState(0);
  const [isThinking, setIsThinking] = useState(false);

  const calculate = () => {
    if (!name1.trim() || !name2.trim()) return;
    setIsThinking(true);
    setResult(null);
    setTimeout(() => {
      const pct = hashNames(name1, name2);
      setResult({ pct, arch: getArchetype(pct) });
      setResultKey(k => k + 1);
      setIsThinking(false);
    }, 2500);
  };

  return (
    <>
      <SEO title="Love Percentage Calculator - Love Meter for Two Names" description="Enter two names and find your love percentage. Discover your relationship archetype with our fun love calculator. Pure entertainment!" canonicalUrl="https://randomtoolbox.replit.app/love-percentage-calculator" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-lg"><Sparkles className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Love Percentage Calculator</h1>
          </div>
          <p className="text-muted-foreground text-lg">Find out your love score — just for fun! 💕</p>
        </div>
        <Card className="border-2 shadow-lg border-pink-100 dark:border-pink-900/30">
          <CardContent className="p-8 flex flex-col items-center space-y-6">
            <div className="w-full flex flex-col sm:flex-row items-center gap-4">
              <Input value={name1} onChange={e => setName1(e.target.value)} placeholder="First name" className="h-12 text-base flex-1" data-testid="input-name1" />
              <span className="text-2xl font-bold text-pink-400">❤️</span>
              <Input value={name2} onChange={e => setName2(e.target.value)} placeholder="Second name" className="h-12 text-base flex-1" onKeyDown={e => e.key === "Enter" && calculate()} data-testid="input-name2" />
            </div>
            <div className="min-h-[220px] flex items-center justify-center w-full relative">
              <AnimatePresence mode="wait">
                {isThinking ? (
                  <motion.div key="thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="absolute flex flex-col items-center gap-3">
                    <div className="text-5xl animate-pulse">💕</div>
                    <p className="text-muted-foreground animate-pulse font-medium">Consulting the love oracle...</p>
                  </motion.div>
                ) : result ? (
                  <motion.div key={`r-${resultKey}`} initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="absolute text-center w-full px-4">
                    <div className="text-7xl font-display font-black text-pink-500"><AnimatedPercent target={result.pct} />%</div>
                    <div className="my-3 w-full bg-muted rounded-full h-3">
                      <motion.div className="bg-gradient-to-r from-pink-400 to-rose-500 h-3 rounded-full" initial={{ width: 0 }} animate={{ width: `${result.pct}%` }} transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }} />
                    </div>
                    <div className="text-3xl mb-1">{result.arch.emoji}</div>
                    <h2 className="text-xl font-bold text-pink-500">{result.arch.label}</h2>
                    <p className="text-muted-foreground mt-2 text-sm max-w-sm mx-auto">{result.arch.desc}</p>
                  </motion.div>
                ) : (
                  <motion.div key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute text-center text-muted-foreground">
                    <div className="text-5xl opacity-20 mb-2">💕</div>
                    <p className="opacity-40">Enter two names above</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Button size="lg" className="w-full max-w-xs h-16 text-xl rounded-2xl shadow-xl bg-pink-500 hover:bg-pink-600 text-white" onClick={calculate} disabled={isThinking || !name1.trim() || !name2.trim()} data-testid="button-calculate">
              {isThinking ? "Calculating..." : result ? "Try Again 💕" : "Calculate Love %"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">For entertainment only — love is more than math! 🌸</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
