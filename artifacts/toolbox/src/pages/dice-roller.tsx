import { useState, useEffect, useRef } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

function DieFace({ value }: { value: number }) {
  const dots: Record<number, [number, number][]> = {
    1: [[50, 50]],
    2: [[25, 25], [75, 75]],
    3: [[25, 25], [50, 50], [75, 75]],
    4: [[25, 25], [75, 25], [25, 75], [75, 75]],
    5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
    6: [[25, 20], [75, 20], [25, 50], [75, 50], [25, 80], [75, 80]],
  };
  const positions = dots[value] || dots[1];
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="4" y="4" width="92" height="92" rx="16" ry="16" fill="white" stroke="#e2e8f0" strokeWidth="3" className="dark:fill-slate-800 dark:stroke-slate-600" />
      {positions.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="8" fill="#1e293b" className="dark:fill-white" />
      ))}
    </svg>
  );
}

export default function DiceRoller() {
  const [diceCount, setDiceCount] = useState(1);
  const [values, setValues] = useState<number[]>([1]);
  const [rolling, setRolling] = useState(false);
  const [displayed, setDisplayed] = useState<number[]>([1]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const roll = () => {
    if (rolling) return;
    setRolling(true);
    const duration = 2000 + Math.random() * 1500;
    intervalRef.current = setInterval(() => {
      setDisplayed(Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1));
    }, 80);
    setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      const final = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1);
      setValues(final);
      setDisplayed(final);
      setRolling(false);
    }, duration);
  };

  useEffect(() => {
    setDisplayed(Array.from({ length: diceCount }, (_, i) => values[i] ?? 1));
    setValues(Array.from({ length: diceCount }, (_, i) => values[i] ?? 1));
  }, [diceCount]);

  useEffect(() => { return () => { if (intervalRef.current) clearInterval(intervalRef.current); }; }, []);

  const total = values.reduce((a, b) => a + b, 0);

  return (
    <>
      <SEO title="Dice Roller - Free Online Dice Simulator" description="Roll 1, 2, or 3 dice online with realistic animations. Free dice roller for board games, RPGs, and decision making. Instant results." canonicalUrl="https://randomtoolbox.replit.app/dice-roller" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="4"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Dice Roller</h1>
          </div>
          <p className="text-muted-foreground text-lg">Roll the dice and let fate decide.</p>
        </div>
        <Card className="border-2 shadow-lg">
          <CardContent className="p-8 flex flex-col items-center space-y-8">
            <div className="space-y-2 text-center">
              <label className="text-sm font-medium">Number of Dice</label>
              <div className="flex gap-3 justify-center">
                {[1, 2, 3].map(n => (
                  <button key={n} onClick={() => setDiceCount(n)} disabled={rolling}
                    className={`w-12 h-12 rounded-xl font-bold text-lg border-2 transition-all ${diceCount === n ? "bg-green-500 text-white border-green-500 shadow-lg" : "border-border hover:border-green-300 bg-card"}`}
                    data-testid={`button-dice-${n}`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-6 justify-center items-center min-h-[140px]">
              {Array.from({ length: diceCount }).map((_, i) => (
                <motion.div key={i} animate={rolling ? { rotate: [0, 15, -15, 10, -10, 5, 0], scale: [1, 1.1, 0.95, 1.05, 1] } : { rotate: 0, scale: 1 }} transition={{ duration: 0.4, repeat: rolling ? Infinity : 0, ease: "easeInOut" }} className="w-24 h-24 drop-shadow-xl cursor-pointer" onClick={roll} data-testid={`die-${i}`}>
                  <DieFace value={displayed[i] ?? 1} />
                </motion.div>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {!rolling && diceCount > 1 && (
                <motion.div key="total" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-4xl font-display font-black text-green-500">{total}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <Button size="lg" className="w-full max-w-xs h-16 text-xl rounded-2xl shadow-xl bg-green-500 hover:bg-green-600 text-white" onClick={roll} disabled={rolling} data-testid="button-roll">
              {rolling ? "Rolling..." : "Roll the Dice"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
