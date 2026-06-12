import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Trash2, Clock } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

interface Task { id: number; name: string; duration: string; }
interface Block { name: string; startTime: string; endTime: string; color: string; }

const COLORS = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500", "bg-pink-500", "bg-teal-500", "bg-red-500", "bg-indigo-500", "bg-yellow-500", "bg-cyan-500"];

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(m: number): string {
  const h = Math.floor(m / 60) % 24;
  const min = m % 60;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

function formatTime12(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

let idCounter = 3;

export default function TimeBlockingPlanner() {
  const [startTime, setStartTime] = useState("09:00");
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "Morning Emails", duration: "30" },
    { id: 2, name: "Deep Work Block", duration: "90" },
  ]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [generated, setGenerated] = useState(false);

  const addTask = () => setTasks(t => [...t, { id: idCounter++, name: "", duration: "30" }]);
  const removeTask = (id: number) => setTasks(t => t.filter(x => x.id !== id));
  const updateTask = (id: number, field: keyof Task, value: string) => setTasks(t => t.map(x => x.id === id ? { ...x, [field]: value } : x));

  const generate = () => {
    const validTasks = tasks.filter(t => t.name.trim() && parseInt(t.duration) > 0);
    if (validTasks.length === 0) return;
    let current = timeToMinutes(startTime);
    const newBlocks: Block[] = validTasks.map((task, i) => {
      const dur = parseInt(task.duration) || 30;
      const start = minutesToTime(current);
      current += dur;
      return { name: task.name, startTime: start, endTime: minutesToTime(current), color: COLORS[i % COLORS.length] };
    });
    setBlocks(newBlocks);
    setGenerated(true);
  };

  return (
    <>
      <SEO title="Time Blocking Planner - Plan Your Day Visually" description="Create a time-blocked schedule for your day. Add tasks with durations and get a visual timeline. Free daily planner tool." canonicalUrl="https://randomtoolbox.replit.app/time-blocking-planner" />
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg"><Clock className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Time Blocking Planner</h1>
          </div>
          <p className="text-muted-foreground text-lg">Turn your task list into a color-coded day schedule.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Day Start Time</label>
                <Input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="h-11 max-w-[160px]" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Tasks</label>
                  <Button variant="outline" size="sm" onClick={addTask}><Plus className="w-3.5 h-3.5 mr-1" />Add</Button>
                </div>
                <div className="grid grid-cols-5 gap-2 text-xs text-muted-foreground font-semibold px-1">
                  <span className="col-span-3">Task Name</span><span className="col-span-2">Duration (min)</span>
                </div>
                <AnimatePresence>
                  {tasks.map(task => (
                    <motion.div key={task.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="grid grid-cols-5 gap-2 items-center">
                      <Input value={task.name} onChange={e => updateTask(task.id, "name", e.target.value)} placeholder="Task name" className="h-9 text-sm col-span-3" />
                      <div className="col-span-2 flex gap-1">
                        <Input type="number" min="5" value={task.duration} onChange={e => updateTask(task.id, "duration", e.target.value)} className="h-9 text-sm" data-testid={`dur-${task.id}`} />
                        <button onClick={() => removeTask(task.id)} className="text-muted-foreground hover:text-red-500 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <Button onClick={generate} className="w-full h-12 text-base bg-blue-500 hover:bg-blue-600 text-white" disabled={tasks.every(t => !t.name.trim())} data-testid="button-generate">Generate Schedule</Button>
            </CardContent>
          </Card>
          <AnimatePresence>
            {generated && blocks.length > 0 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <Card className="border-2 shadow-lg">
                  <CardContent className="p-6 space-y-2">
                    <h2 className="font-semibold mb-3">Your Day</h2>
                    {blocks.map((block, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex gap-3 items-stretch">
                        <div className="flex flex-col items-center">
                          <span className="text-xs text-muted-foreground w-16 text-right">{formatTime12(block.startTime)}</span>
                        </div>
                        <div className={`w-1 ${block.color} rounded-full`} />
                        <div className={`flex-1 px-3 py-2 rounded-lg ${block.color} bg-opacity-15 border border-opacity-30`} style={{ backgroundColor: "" }}>
                          <div className={`${block.color} bg-opacity-10 rounded-lg px-3 py-2`}>
                            <p className="text-sm font-semibold">{block.name}</p>
                            <p className="text-xs text-muted-foreground">{formatTime12(block.startTime)} – {formatTime12(block.endTime)}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <div className="flex gap-3 items-center pt-1">
                      <span className="text-xs text-muted-foreground w-16 text-right">{formatTime12(blocks[blocks.length - 1]?.endTime)}</span>
                      <div className="w-1 bg-border rounded-full h-4" />
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
