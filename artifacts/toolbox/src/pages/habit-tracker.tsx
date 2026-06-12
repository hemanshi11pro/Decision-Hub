import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Trash2, Flame } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

interface HabitDay { [date: string]: boolean; }
interface Habit { id: string; name: string; emoji: string; days: HabitDay; }

const STORAGE_KEY = "randomtoolbox_habits_v1";
const today = new Date().toISOString().split("T")[0];

function getLast7Days(): string[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });
}

function getDayLabel(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short" }).charAt(0);
}

function getStreak(days: HabitDay): number {
  let streak = 0;
  const d = new Date();
  while (true) {
    const key = d.toISOString().split("T")[0];
    if (days[key]) { streak++; d.setDate(d.getDate() - 1); } else break;
  }
  return streak;
}

const DEFAULT_HABITS: Habit[] = [
  { id: "1", name: "Drink 8 glasses of water", emoji: "💧", days: {} },
  { id: "2", name: "Exercise for 30 minutes", emoji: "🏃", days: {} },
  { id: "3", name: "Read for 20 minutes", emoji: "📚", days: {} },
];

function loadHabits(): Habit[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || DEFAULT_HABITS; } catch { return DEFAULT_HABITS; }
}

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>(() => loadHabits());
  const [newName, setNewName] = useState("");
  const [newEmoji, setNewEmoji] = useState("✅");
  const last7 = getLast7Days();

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(habits)); }, [habits]);

  const toggle = (id: string, date: string) => setHabits(h => h.map(x => x.id === id ? { ...x, days: { ...x.days, [date]: !x.days[date] } } : x));
  const remove = (id: string) => setHabits(h => h.filter(x => x.id !== id));
  const add = () => {
    if (!newName.trim()) return;
    setHabits(h => [...h, { id: Date.now().toString(), name: newName.trim(), emoji: newEmoji || "✅", days: {} }]);
    setNewName(""); setNewEmoji("✅");
  };

  const todayCount = habits.filter(h => h.days[today]).length;

  return (
    <>
      <SEO title="Habit Tracker - Daily Habit Streak Counter" description="Track your daily habits, build streaks, and visualize your progress. Free habit tracker that saves to your browser. No account needed." canonicalUrl="https://randomtoolbox.replit.app/habit-tracker" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg"><Flame className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Habit Tracker</h1>
          </div>
          <p className="text-muted-foreground text-lg">Build streaks, one day at a time.</p>
        </div>
        <div className="flex gap-4 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-2xl border-2 border-orange-100 dark:border-orange-900/30">
          <div className="text-center flex-1">
            <div className="text-3xl font-display font-black text-orange-500">{todayCount}/{habits.length}</div>
            <div className="text-xs text-muted-foreground font-medium">Done Today</div>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center flex-1">
            <div className="text-3xl font-display font-black text-orange-500">{habits.length}</div>
            <div className="text-xs text-muted-foreground font-medium">Total Habits</div>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center flex-1">
            <div className="text-3xl font-display font-black text-orange-500">{Math.max(...habits.map(h => getStreak(h.days)), 0)}</div>
            <div className="text-xs text-muted-foreground font-medium">Best Streak</div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-end">
            <div className="grid gap-1 text-xs text-muted-foreground" style={{ gridTemplateColumns: `1fr repeat(7, 28px)` }}>
              <span />
              {last7.map(d => <span key={d} className="text-center">{getDayLabel(d)}</span>)}
            </div>
          </div>
          <AnimatePresence>
            {habits.map((habit, idx) => {
              const streak = getStreak(habit.days);
              return (
                <motion.div key={habit.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} transition={{ delay: idx * 0.04 }}>
                  <Card className="border-2">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2" style={{ display: "grid", gridTemplateColumns: "1fr repeat(7, 28px) auto" }}>
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-lg">{habit.emoji}</span>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{habit.name}</p>
                            {streak > 0 && <p className="text-xs text-orange-500 font-bold">🔥 {streak} day streak</p>}
                          </div>
                        </div>
                        {last7.map(date => (
                          <button key={date} onClick={() => toggle(habit.id, date)}
                            className={`w-6 h-6 rounded-md mx-auto transition-all border-2 ${habit.days[date] ? "bg-orange-500 border-orange-500" : date === today ? "border-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/20" : "border-border hover:border-muted-foreground"}`}
                            data-testid={`habit-${habit.id}-${date}`}>
                            {habit.days[date] && <svg className="w-3 h-3 text-white mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                          </button>
                        ))}
                        <button onClick={() => remove(habit.id)} className="text-muted-foreground hover:text-red-500 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <Card className="border-2 border-dashed shadow-sm">
          <CardContent className="p-4 space-y-3">
            <h3 className="text-sm font-semibold">Add a New Habit</h3>
            <div className="flex gap-2">
              <Input value={newEmoji} onChange={e => setNewEmoji(e.target.value)} className="h-10 w-16 text-center text-lg" placeholder="✅" />
              <Input value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} placeholder="Habit name (e.g. Meditate for 10 min)" className="h-10 flex-1" data-testid="input-habit-name" />
              <Button onClick={add} disabled={!newName.trim()} className="h-10 bg-orange-500 hover:bg-orange-600 text-white" data-testid="button-add-habit"><Plus className="w-4 h-4" /></Button>
            </div>
          </CardContent>
        </Card>
        <p className="text-xs text-muted-foreground text-center">Your habits are saved locally in your browser.</p>
      </div>
    </>
  );
}
