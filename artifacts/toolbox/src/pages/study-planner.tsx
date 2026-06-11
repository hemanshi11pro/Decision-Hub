import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Link } from "wouter";

type Session = {
  id: string;
  subject: string;
  day: string;
  time: string;
  duration: number;
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function StudyPlanner() {
  const [sessions, setSessions] = useState<Session[]>(() => {
    const saved = localStorage.getItem("study-planner");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [subject, setSubject] = useState("");
  const [day, setDay] = useState("Monday");
  const [time, setTime] = useState("17:00");
  const [duration, setDuration] = useState("60");

  useEffect(() => {
    localStorage.setItem("study-planner", JSON.stringify(sessions));
  }, [sessions]);

  const addSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;
    
    setSessions([...sessions, {
      id: Date.now().toString(),
      subject,
      day,
      time,
      duration: parseInt(duration) || 60
    }]);
    
    setSubject("");
  };

  const removeSession = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  return (
    <>
      <SEO 
        title="Weekly Study Planner - Organize Your Schedule"
        description="Free online study planner. Organize your weekly study sessions by subject, day, and time. Automatically saves to your browser."
        canonicalUrl="https://randomtoolbox.replit.app/study-planner"
      />
      
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-lg">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Study Planner</h1>
          </div>
          <p className="text-muted-foreground text-lg">Map out your week and stick to your goals.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="border-2 sticky top-24">
              <CardContent className="p-6">
                <form onSubmit={addSession} className="space-y-4">
                  <h3 className="font-semibold text-lg border-b pb-2 mb-4">Add Session</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g., Math, Biology" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="day">Day</Label>
                    <select 
                      id="day"
                      value={day} 
                      onChange={e => setDay(e.target.value)}
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" value={time} onChange={e => setTime(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Mins</Label>
                      <Input id="duration" type="number" min="15" step="15" value={duration} onChange={e => setDuration(e.target.value)} required />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white pt-2 mt-2">
                    <Plus className="w-4 h-4 mr-2" /> Add to Schedule
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
              {DAYS.map(d => {
                const daySessions = sessions.filter(s => s.day === d).sort((a, b) => a.time.localeCompare(b.time));
                
                return (
                  <div key={d} className="space-y-4">
                    <h3 className="font-display font-bold text-center py-2 border-b-2 border-violet-100 dark:border-violet-900/50">{d.slice(0,3)}</h3>
                    <div className="space-y-3">
                      {daySessions.map(session => (
                        <Card key={session.id} className="border bg-violet-50/50 dark:bg-violet-950/20 relative group hover:border-violet-300 dark:hover:border-violet-700 transition-colors">
                          <CardContent className="p-3">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="absolute top-1 right-1 w-6 h-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
                              onClick={() => removeSession(session.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                            <p className="font-semibold text-sm truncate pr-4 text-violet-900 dark:text-violet-100">{session.subject}</p>
                            <div className="flex items-center justify-between mt-2 text-xs text-violet-600 dark:text-violet-400">
                              <span>{session.time}</span>
                              <span>{session.duration}m</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      {daySessions.length === 0 && (
                        <div className="text-center p-4 border border-dashed rounded-lg text-muted-foreground/50 text-xs">
                          No sessions
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}