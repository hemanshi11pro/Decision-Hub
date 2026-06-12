import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { ListChecks, ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "wouter";

interface Task { text: string; done: boolean; }

const TEMPLATES: { keywords: string[]; tasks: string[] }[] = [
  { keywords: ["birthday", "party", "celebrate"], tasks: ["Set a date and guest list", "Choose a venue or decide home vs. out", "Send invitations (digital or physical)", "Plan the menu / order food", "Order or bake the birthday cake", "Buy decorations (balloons, banners, etc.)", "Arrange music or playlist", "Plan activities or games", "Buy a gift if needed", "Take lots of photos on the day"] },
  { keywords: ["study", "exam", "finals", "test", "revision"], tasks: ["List all topics and syllabus chapters", "Gather notes, textbooks, and resources", "Create a day-wise revision schedule", "Start with the hardest/most weighted topics", "Make summary notes or flashcards", "Practice past papers or sample questions", "Join a study group or find a study buddy", "Set daily study hours and stick to them", "Review weak areas the night before", "Get good sleep before the exam day"] },
  { keywords: ["trip", "travel", "vacation", "holiday"], tasks: ["Decide destination and travel dates", "Set a travel budget", "Book flights or transportation", "Book accommodation (hotel, Airbnb, hostel)", "Research things to do at the destination", "Create a day-wise itinerary", "Pack clothes suitable for the weather", "Arrange travel insurance", "Notify your bank about travel", "Make copies of important documents"] },
  { keywords: ["youtube", "channel", "content", "video"], tasks: ["Define your niche and target audience", "Research popular topics in your niche", "Set up your YouTube channel with branding", "Get basic equipment (mic, camera, lighting)", "Script and plan your first 5 videos", "Film and edit your first video", "Write an SEO-optimized title and description", "Design thumbnails that stand out", "Post consistently (at least 1x per week)", "Engage with every comment in early days"] },
  { keywords: ["fitness", "gym", "workout", "lose weight", "exercise"], tasks: ["Set a specific fitness goal (lose X kg, run 5k, etc.)", "Choose a workout program or hire a trainer", "Schedule workout times in your calendar", "Prepare a healthy meal plan for the week", "Buy any needed gear (shoes, gym clothes)", "Track workouts in an app or journal", "Take before photos for motivation", "Find a workout partner for accountability", "Plan rest days and active recovery", "Review progress weekly and adjust"] },
  { keywords: ["business", "startup", "freelance", "side hustle"], tasks: ["Define your product or service clearly", "Research your target market and competitors", "Register your business (if applicable)", "Create a simple business plan", "Set up a website or social media presence", "Determine your pricing strategy", "Find your first 3 potential clients or customers", "Build a portfolio or sample work", "Set up invoicing and payment methods", "Launch and promote to your network"] },
  { keywords: ["clean", "room", "house", "apartment", "organize"], tasks: ["Declutter and put away misplaced items", "Dust all surfaces and shelves", "Wipe down windows and mirrors", "Vacuum and mop floors", "Clean the bathroom thoroughly", "Wash and change bed sheets", "Clean kitchen appliances and counters", "Take out trash and replace bags", "Organize storage areas (closet, pantry)", "Do a quick 10-min tidying routine daily"] },
  { keywords: ["read", "book", "reading"], tasks: ["Choose your next book to read", "Set a daily reading goal (e.g., 20 pages)", "Find a quiet reading spot you enjoy", "Set a specific reading time (e.g., 9pm daily)", "Take notes or highlights on key ideas", "Write a short summary after each chapter", "Share what you're reading with someone", "Track your reading in an app like Goodreads", "Plan your next 3 books to read", "Join a book club or reading challenge"] },
  { keywords: ["website", "app", "build", "develop", "code"], tasks: ["Define the core purpose and features", "Sketch wireframes or a rough design", "Choose your tech stack", "Set up the project repository", "Build the backend/API first", "Create the frontend UI", "Integrate and test all features", "Fix bugs and do a code review", "Deploy to a hosting platform", "Share for feedback and iterate"] },
  { keywords: ["move", "moving", "new house", "new apartment"], tasks: ["Create a moving timeline and checklist", "Sort belongings into keep, donate, trash", "Get packing supplies (boxes, tape, bubble wrap)", "Notify utilities and services of address change", "Update your address with bank, post office, etc.", "Book a moving truck or hire movers", "Pack room by room and label every box", "Clean the old place before leaving", "Unpack essentials first (bedroom, bathroom)", "Do a final check of the old place"] },
];

function generateTasks(input: string): string[] {
  const q = input.toLowerCase();
  for (const template of TEMPLATES) {
    if (template.keywords.some(k => q.includes(k))) return template.tasks;
  }
  // Generic fallback
  return [
    `Research everything about: ${input}`, "Break it into smaller milestones", "Set a deadline for each milestone",
    "Gather any tools, materials, or resources needed", "Start with the smallest possible first step",
    "Track your progress daily", "Ask for help or advice if stuck", "Review and adjust your plan weekly",
    "Celebrate small wins along the way", "Complete and reflect on what you learned",
  ];
}

export default function ToDoListGenerator() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [resultKey, setResultKey] = useState(0);
  const [isThinking, setIsThinking] = useState(false);

  const generate = () => {
    if (!input.trim()) return;
    setIsThinking(true);
    setTasks([]);
    setTimeout(() => {
      setTasks(generateTasks(input).map(t => ({ text: t, done: false })));
      setResultKey(k => k + 1);
      setIsThinking(false);
    }, 2000);
  };

  const toggle = (i: number) => setTasks(t => t.map((x, idx) => idx === i ? { ...x, done: !x.done } : x));
  const done = tasks.filter(t => t.done).length;

  return (
    <>
      <SEO title="To-Do List Generator - AI-Powered Task Checklist" description="Type your goal or project and instantly get a ready-made to-do checklist. Birthday party, study plan, trip planning, business launch and more." canonicalUrl="https://randomtoolbox.replit.app/todo-list-generator" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg"><ListChecks className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">To-Do List Generator</h1>
          </div>
          <p className="text-muted-foreground text-lg">Type your goal and get an instant actionable checklist.</p>
        </div>
        <Card className="border-2 shadow-lg">
          <CardContent className="p-8 space-y-4">
            <div className="flex gap-3">
              <Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && generate()} placeholder="e.g. Plan a birthday party, study for finals, start a YouTube channel..." className="h-12 text-base flex-1" data-testid="input-goal" />
              <Button onClick={generate} disabled={isThinking || !input.trim()} className="h-12 px-6 bg-amber-500 hover:bg-amber-600 text-white" data-testid="button-generate">
                <Sparkles className="w-4 h-4 mr-2" />Generate
              </Button>
            </div>
            <AnimatePresence mode="wait">
              {isThinking ? (
                <motion.div key="thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="py-12 flex flex-col items-center gap-3">
                  <ListChecks className="w-10 h-10 text-amber-500 animate-pulse" />
                  <p className="text-muted-foreground animate-pulse">Building your checklist...</p>
                </motion.div>
              ) : tasks.length > 0 ? (
                <motion.div key={`tasks-${resultKey}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{done} / {tasks.length} completed</span>
                    <div className="w-32 bg-muted rounded-full h-1.5"><div className="bg-amber-500 h-1.5 rounded-full transition-all" style={{ width: `${(done / tasks.length) * 100}%` }} /></div>
                  </div>
                  {tasks.map((task, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                      onClick={() => toggle(i)} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${task.done ? "bg-muted/40 border-muted" : "bg-card border-border hover:border-amber-300"}`} data-testid={`task-${i}`}>
                      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${task.done ? "bg-amber-500 border-amber-500" : "border-border"}`}>
                        {task.done && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                      </div>
                      <span className={`text-sm font-medium ${task.done ? "line-through text-muted-foreground" : ""}`}>{task.text}</span>
                    </motion.div>
                  ))}
                  <Button variant="outline" className="w-full" onClick={generate} data-testid="button-regenerate">Regenerate List</Button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
