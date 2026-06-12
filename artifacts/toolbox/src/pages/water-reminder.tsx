import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Droplets, Plus, Minus } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "randomtoolbox_water_v1";

interface WaterData { date: string; count: number; goal: number; }

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function loadData(): WaterData {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as WaterData | null;
    if (saved && saved.date === getToday()) return saved;
    return { date: getToday(), count: 0, goal: 8 };
  } catch {
    return { date: getToday(), count: 0, goal: 8 };
  }
}

function getMessage(count: number, goal: number): { text: string; emoji: string } {
  const pct = goal > 0 ? count / goal : 0;
  if (count === 0) return { text: "Start your day right — drink some water!", emoji: "💧" };
  if (pct < 0.25) return { text: "Good start! Keep going, your body will thank you.", emoji: "🌱" };
  if (pct < 0.5) return { text: "You're warming up! Stay consistent.", emoji: "☀️" };
  if (pct < 0.75) return { text: "Halfway there! You're doing great.", emoji: "🌊" };
  if (pct < 1) return { text: "Almost there! One more push.", emoji: "⚡" };
  if (pct === 1) return { text: "Goal reached! You're a hydration champion today! 🎉", emoji: "🏆" };
  return { text: `Overachiever! ${count} glasses and counting!`, emoji: "💪" };
}

export default function WaterReminder() {
  const [data, setData] = useState<WaterData>(() => loadData());
  const [goalInput, setGoalInput] = useState(String(data.goal));
  const [lastAction, setLastAction] = useState<"add" | "remove" | null>(null);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }, [data]);

  const add = () => { setData(d => ({ ...d, count: d.count + 1 })); setLastAction("add"); };
  const remove = () => { setData(d => ({ ...d, count: Math.max(0, d.count - 1) })); setLastAction("remove"); };
  const applyGoal = () => { const g = parseInt(goalInput) || 8; setData(d => ({ ...d, goal: Math.max(1, g) })); };
  const reset = () => { setData(d => ({ ...d, count: 0 })); };

  const pct = data.goal > 0 ? Math.min(1, data.count / data.goal) : 0;
  const remaining = Math.max(0, data.goal - data.count);
  const { text, emoji } = getMessage(data.count, data.goal);

  return (
    <>
      <SEO title="Water Reminder - Daily Water Intake Tracker" description="Track how many glasses of water you drink today. Set your goal, tap to log each glass, and stay hydrated. Saves automatically." canonicalUrl="https://randomtoolbox.replit.app/water-reminder" />
      <div className="max-w-md mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-lg"><Droplets className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Water Reminder</h1>
          </div>
          <p className="text-muted-foreground text-lg">Stay hydrated. Log each glass as you go.</p>
        </div>
        <Card className="border-2 shadow-lg">
          <CardContent className="p-8 flex flex-col items-center space-y-6">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8"
                  strokeLinecap="round" className="text-cyan-500"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - pct) }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <motion.div key={data.count} initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-5xl font-display font-black text-cyan-500">{data.count}</motion.div>
                <div className="text-sm text-muted-foreground">of {data.goal} glasses</div>
                <div className="text-2xl mt-1">{emoji}</div>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.p key={text} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center text-sm font-medium text-muted-foreground">{text}</motion.p>
            </AnimatePresence>
            {remaining > 0 && <p className="text-xs text-cyan-500 font-semibold">{remaining} glass{remaining !== 1 ? "es" : ""} to go</p>}
            <div className="flex gap-4">
              <Button variant="outline" size="lg" onClick={remove} disabled={data.count === 0} className="w-16 h-16 rounded-2xl text-2xl" data-testid="button-minus"><Minus className="w-5 h-5" /></Button>
              <Button size="lg" onClick={add} className="w-32 h-16 rounded-2xl text-lg bg-cyan-500 hover:bg-cyan-600 text-white shadow-xl" data-testid="button-add">
                <Droplets className="w-5 h-5 mr-2" />+1 Glass
              </Button>
              <Button variant="outline" size="lg" onClick={add} disabled className="w-16 h-16 rounded-2xl opacity-0 pointer-events-none"><Plus className="w-5 h-5" /></Button>
            </div>
            <div className="w-full flex gap-3 items-center pt-2 border-t border-border">
              <label className="text-sm font-medium whitespace-nowrap">Daily Goal:</label>
              <Input type="number" min="1" max="30" value={goalInput} onChange={e => setGoalInput(e.target.value)} className="h-9 w-20 text-center" />
              <Button variant="outline" size="sm" onClick={applyGoal}>Set</Button>
              <Button variant="ghost" size="sm" onClick={reset} className="ml-auto text-muted-foreground text-xs">Reset Today</Button>
            </div>
          </CardContent>
        </Card>
        <p className="text-xs text-muted-foreground text-center">Data saves to your browser and resets at midnight.</p>
      </div>
    </>
  );
}
