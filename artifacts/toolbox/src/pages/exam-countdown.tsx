import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Timer, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Link } from "wouter";

type Exam = {
  id: string;
  name: string;
  date: string;
  color: string;
};

const COLORS = [
  "bg-rose-500", "bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-purple-500", "bg-cyan-500"
];

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((difference % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-2 md:gap-4 text-center">
      <div className="bg-background/80 backdrop-blur-sm px-2 py-2 md:px-4 md:py-3 rounded-lg flex-1 border shadow-sm">
        <div className="text-2xl md:text-4xl font-display font-black">{timeLeft.days}</div>
        <div className="text-[10px] md:text-xs uppercase font-bold tracking-wider opacity-70">Days</div>
      </div>
      <div className="bg-background/80 backdrop-blur-sm px-2 py-2 md:px-4 md:py-3 rounded-lg flex-1 border shadow-sm">
        <div className="text-2xl md:text-4xl font-display font-black">{timeLeft.hours}</div>
        <div className="text-[10px] md:text-xs uppercase font-bold tracking-wider opacity-70">Hours</div>
      </div>
      <div className="bg-background/80 backdrop-blur-sm px-2 py-2 md:px-4 md:py-3 rounded-lg flex-1 border shadow-sm">
        <div className="text-2xl md:text-4xl font-display font-black">{timeLeft.mins}</div>
        <div className="text-[10px] md:text-xs uppercase font-bold tracking-wider opacity-70">Mins</div>
      </div>
      <div className="bg-background/80 backdrop-blur-sm px-2 py-2 md:px-4 md:py-3 rounded-lg flex-1 border shadow-sm">
        <div className="text-2xl md:text-4xl font-display font-black">{timeLeft.secs}</div>
        <div className="text-[10px] md:text-xs uppercase font-bold tracking-wider opacity-70">Secs</div>
      </div>
    </div>
  );
}

export default function ExamCountdown() {
  const [exams, setExams] = useState<Exam[]>(() => {
    const saved = localStorage.getItem("exam-countdown");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [color, setColor] = useState(COLORS[0]);

  useEffect(() => {
    localStorage.setItem("exam-countdown", JSON.stringify(exams));
  }, [exams]);

  const addExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !date) return;
    
    setExams([...exams, {
      id: Date.now().toString(),
      name,
      date,
      color
    }]);
    
    setName("");
    setDate("");
    setColor(COLORS[(COLORS.indexOf(color) + 1) % COLORS.length]);
  };

  const removeExam = (id: string) => {
    setExams(exams.filter(e => e.id !== id));
  };

  return (
    <>
      <SEO 
        title="Exam Countdown Timer - Live Tracker"
        description="Track your upcoming exams, tests, and deadlines with our free online exam countdown timer. Live ticking clock down to the seconds."
        canonicalUrl="https://randomtoolbox.replit.app/exam-countdown"
      />
      
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg">
              <Timer className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Exam Countdown</h1>
          </div>
          <p className="text-muted-foreground text-lg">Watch the clock tick down to your big day.</p>
        </div>

        <Card className="border-2 shadow-sm">
          <CardContent className="p-6">
            <form onSubmit={addExam} className="flex flex-col md:flex-row gap-4 items-end">
              <div className="space-y-2 flex-1 w-full">
                <Label htmlFor="name">Exam Name</Label>
                <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Final Calculus Exam" required />
              </div>
              <div className="space-y-2 flex-1 w-full">
                <Label htmlFor="date">Date & Time</Label>
                <Input id="date" type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full md:w-auto bg-rose-600 hover:bg-rose-700 text-white">
                <Plus className="w-4 h-4 mr-2" /> Add Timer
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {exams.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-xl text-muted-foreground">
              <Timer className="w-12 h-12 mx-auto opacity-20 mb-4" />
              <p>No exams added yet. Add one above!</p>
            </div>
          ) : (
            exams.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(exam => (
              <Card key={exam.id} className={`border-2 overflow-hidden relative shadow-md transition-shadow hover:shadow-lg`}>
                <div className={`absolute top-0 left-0 w-2 h-full ${exam.color}`} />
                <CardContent className="p-6 md:p-8 pl-8 md:pl-10">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left w-full md:w-1/3">
                      <h3 className="text-2xl font-display font-bold mb-1">{exam.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {new Date(exam.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="w-full md:w-2/3">
                      <CountdownTimer targetDate={exam.date} />
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="absolute top-2 right-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => removeExam(exam.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
}