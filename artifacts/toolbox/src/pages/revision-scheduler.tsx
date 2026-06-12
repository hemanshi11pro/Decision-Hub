import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Trash2, BookOpen, Copy, Check } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

interface ScheduleDay { date: string; label: string; topics: string[]; }

export default function RevisionScheduler() {
  const [topics, setTopics] = useState<string[]>([""]);
  const [examDate, setExamDate] = useState("");
  const [schedule, setSchedule] = useState<ScheduleDay[] | null>(null);
  const [copied, setCopied] = useState(false);

  const addTopic = () => setTopics(t => [...t, ""]);
  const removeTopic = (i: number) => setTopics(t => t.filter((_, idx) => idx !== i));
  const updateTopic = (i: number, v: string) => setTopics(t => t.map((x, idx) => idx === i ? v : x));

  const generate = () => {
    const validTopics = topics.filter(t => t.trim().length > 0);
    if (!examDate || validTopics.length === 0) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const exam = new Date(examDate);
    exam.setHours(0, 0, 0, 0);
    const daysLeft = Math.max(1, Math.floor((exam.getTime() - today.getTime()) / 86400000));

    // Spaced repetition intervals: day 0, +2, +4, +7, +14
    const intervals = [0, 2, 4, 7, 14];
    const dayMap: Record<number, string[]> = {};

    validTopics.forEach((topic, i) => {
      const startDay = i % Math.max(1, Math.min(daysLeft, validTopics.length));
      intervals.forEach(offset => {
        const day = startDay + offset;
        if (day < daysLeft) {
          if (!dayMap[day]) dayMap[day] = [];
          dayMap[day].push(topic);
        }
      });
    });

    const sched: ScheduleDay[] = [];
    for (let d = 0; d < Math.min(daysLeft, 30); d++) {
      const date = new Date(today);
      date.setDate(today.getDate() + d);
      const dayTopics = dayMap[d] || [];
      if (dayTopics.length > 0 || d === 0) {
        sched.push({
          date: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
          label: d === 0 ? "Today" : d === 1 ? "Tomorrow" : `Day ${d + 1}`,
          topics: dayTopics.length > 0 ? dayTopics : ["Review your notes / rest day"],
        });
      }
    }
    setSchedule(sched);
  };

  const copySchedule = () => {
    if (!schedule) return;
    const text = schedule.map(d => `${d.date} (${d.label}):\n${d.topics.map(t => `  - ${t}`).join("\n")}`).join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEO title="Revision Scheduler - Spaced Repetition Study Planner" description="Generate a spaced repetition revision schedule for your exams. Enter topics and exam date, get a day-by-day study plan." canonicalUrl="https://randomtoolbox.replit.app/revision-scheduler" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-lg"><BookOpen className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Revision Scheduler</h1>
          </div>
          <p className="text-muted-foreground text-lg">Spaced repetition study plan generated in seconds.</p>
        </div>
        <Card className="border-2 shadow-lg">
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Exam Date</label>
              <Input type="date" value={examDate} onChange={e => setExamDate(e.target.value)} className="h-12 max-w-xs" min={new Date().toISOString().split("T")[0]} data-testid="input-exam-date" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Topics to Revise</label>
                <Button variant="outline" size="sm" onClick={addTopic}><Plus className="w-3.5 h-3.5 mr-1" />Add Topic</Button>
              </div>
              <AnimatePresence>
                {topics.map((t, i) => (
                  <motion.div key={i} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex gap-2">
                    <Input value={t} onChange={e => updateTopic(i, e.target.value)} placeholder={`Topic ${i + 1} (e.g. Thermodynamics)`} className="h-10" data-testid={`topic-${i}`} />
                    {topics.length > 1 && <button onClick={() => removeTopic(i)} className="text-muted-foreground hover:text-red-500 p-2"><Trash2 className="w-4 h-4" /></button>}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <Button size="lg" className="w-full h-14 text-lg rounded-xl bg-sky-500 hover:bg-sky-600 text-white" onClick={generate} disabled={!examDate || topics.every(t => !t.trim())} data-testid="button-generate">Generate Schedule</Button>
          </CardContent>
        </Card>
        <AnimatePresence>
          {schedule && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-display font-bold">Your Revision Schedule</h2>
                <Button variant="outline" size="sm" onClick={copySchedule}>{copied ? <><Check className="w-4 h-4 mr-1 text-green-500" />Copied</> : <><Copy className="w-4 h-4 mr-1" />Copy</>}</Button>
              </div>
              <div className="space-y-3">
                {schedule.map((day, i) => (
                  <Card key={i} className="border-2">
                    <CardContent className="p-4 flex gap-4 items-start">
                      <div className="text-center min-w-[60px]">
                        <p className="text-xs text-muted-foreground">{day.date}</p>
                        <p className="text-sm font-bold text-sky-500">{day.label}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {day.topics.map((topic, j) => (
                          <span key={j} className="px-3 py-1 rounded-full text-sm font-medium bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400">{topic}</span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center">Topics repeat at spaced intervals (0, 2, 4, 7, 14 days) for better retention.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
