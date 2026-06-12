import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sunrise } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

interface Activity { id: string; label: string; emoji: string; defaultDuration: number; }

const ACTIVITIES: Activity[] = [
  { id: "wakeup", label: "Wake up & stretch", emoji: "🌅", defaultDuration: 5 },
  { id: "water", label: "Drink water", emoji: "💧", defaultDuration: 5 },
  { id: "meditation", label: "Meditation", emoji: "🧘", defaultDuration: 10 },
  { id: "exercise", label: "Exercise / Workout", emoji: "🏃", defaultDuration: 30 },
  { id: "shower", label: "Shower", emoji: "🚿", defaultDuration: 15 },
  { id: "skincare", label: "Skincare routine", emoji: "🧴", defaultDuration: 10 },
  { id: "breakfast", label: "Breakfast", emoji: "🥗", defaultDuration: 20 },
  { id: "journaling", label: "Journaling", emoji: "📓", defaultDuration: 10 },
  { id: "news", label: "Read news / articles", emoji: "📰", defaultDuration: 15 },
  { id: "pack", label: "Pack bag / Get ready", emoji: "🎒", defaultDuration: 10 },
  { id: "gratitude", label: "Gratitude practice", emoji: "🙏", defaultDuration: 5 },
  { id: "reading", label: "Morning reading", emoji: "📚", defaultDuration: 20 },
];

interface Block { emoji: string; label: string; startTime: string; endTime: string; }

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime12(total: number): string {
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

export default function MorningRoutinePlanner() {
  const [wakeTime, setWakeTime] = useState("06:30");
  const [selected, setSelected] = useState<Set<string>>(new Set(["wakeup", "water", "shower", "breakfast"]));
  const [durations, setDurations] = useState<Record<string, number>>(() => Object.fromEntries(ACTIVITIES.map(a => [a.id, a.defaultDuration])));
  const [routine, setRoutine] = useState<Block[]>([]);
  const [generated, setGenerated] = useState(false);

  const toggle = (id: string) => setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const updateDur = (id: string, val: string) => setDurations(d => ({ ...d, [id]: parseInt(val) || 5 }));

  const build = () => {
    const orderedActivities = ACTIVITIES.filter(a => selected.has(a.id));
    let current = timeToMinutes(wakeTime);
    const blocks: Block[] = orderedActivities.map(a => {
      const start = minutesToTime12(current);
      current += durations[a.id] || a.defaultDuration;
      return { emoji: a.emoji, label: a.label, startTime: start, endTime: minutesToTime12(current) };
    });
    setRoutine(blocks);
    setGenerated(true);
  };

  const totalMinutes = ACTIVITIES.filter(a => selected.has(a.id)).reduce((sum, a) => sum + (durations[a.id] || a.defaultDuration), 0);
  const endTime = minutesToTime12(timeToMinutes(wakeTime) + totalMinutes);

  return (
    <>
      <SEO title="Morning Routine Planner - Build Your Perfect Morning" description="Select your morning activities, set your wake-up time, and get a timed morning routine schedule. Free morning routine builder." canonicalUrl="https://randomtoolbox.replit.app/morning-routine-planner" />
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-lg"><Sunrise className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Morning Routine Planner</h1>
          </div>
          <p className="text-muted-foreground text-lg">Build your perfect morning, one block at a time.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 shadow-lg">
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">Wake-Up Time</label>
                <Input type="time" value={wakeTime} onChange={e => setWakeTime(e.target.value)} className="h-11 max-w-[180px]" />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium">Choose Activities</label>
                <div className="space-y-2">
                  {ACTIVITIES.map(a => (
                    <div key={a.id} className={`flex items-center gap-3 p-2.5 rounded-xl border-2 cursor-pointer transition-all ${selected.has(a.id) ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-950/20" : "border-border hover:border-yellow-200"}`} onClick={() => toggle(a.id)}>
                      <div className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all ${selected.has(a.id) ? "bg-yellow-500 border-yellow-500" : "border-border"}`}>
                        {selected.has(a.id) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                      </div>
                      <span className="text-lg">{a.emoji}</span>
                      <span className="text-sm font-medium flex-1">{a.label}</span>
                      {selected.has(a.id) && (
                        <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                          <Input type="number" min="1" value={durations[a.id]} onChange={e => updateDur(a.id, e.target.value)} className="h-7 w-16 text-xs text-center p-1" />
                          <span className="text-xs text-muted-foreground">min</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {selected.size > 0 && <p className="text-xs text-muted-foreground">Total: {totalMinutes} min · Done by {endTime}</p>}
              <Button onClick={build} disabled={selected.size === 0} className="w-full h-12 text-base bg-yellow-500 hover:bg-yellow-600 text-white" data-testid="button-build-routine">Build My Routine</Button>
            </CardContent>
          </Card>
          <AnimatePresence>
            {generated && routine.length > 0 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <Card className="border-2 shadow-lg">
                  <CardContent className="p-6 space-y-2">
                    <h2 className="font-semibold mb-3">Your Morning Routine</h2>
                    {routine.map((block, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
                        <span className="text-2xl w-8">{block.emoji}</span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold">{block.label}</p>
                          <p className="text-xs text-muted-foreground">{block.startTime} – {block.endTime}</p>
                        </div>
                      </motion.div>
                    ))}
                    <div className="pt-2 text-xs text-muted-foreground font-medium">✅ All done by {routine[routine.length - 1]?.endTime}</div>
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
