import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";

interface Question { text: string; options: { label: string; points: number }[]; }
interface Scenario { name: string; emoji: string; desc: string; questions: Question[]; results: { min: number; max: number; title: string; desc: string; color: string }[]; }

const SCENARIOS: Record<string, Scenario> = {
  zombie: {
    name: "Zombie Apocalypse", emoji: "🧟", desc: "The dead have risen. Cities are overrun. You have 60 seconds to make decisions that will determine if you see tomorrow.",
    questions: [
      { text: "The outbreak hits your city. What's your immediate move?", options: [{ label: "Barricade yourself at home", points: 3 }, { label: "Head to a hospital (supplies)", points: 1 }, { label: "Find a group immediately", points: 2 }, { label: "Try to drive out of the city", points: 4 }] },
      { text: "You find a survivor group. Their leader seems unstable. Do you:", options: [{ label: "Take the supplies and leave", points: 3 }, { label: "Challenge their leadership openly", points: 1 }, { label: "Stay and watch for now", points: 4 }, { label: "Join fully — numbers matter", points: 2 }] },
      { text: "Your best weapon option:", options: [{ label: "A gun (loud, effective)", points: 2 }, { label: "A machete (silent, lethal)", points: 4 }, { label: "A baseball bat", points: 3 }, { label: "Just run — I don't fight", points: 1 }] },
      { text: "You find canned food — enough for 3 days. A stranger's child appears, clearly starving:", options: [{ label: "Share half", points: 3 }, { label: "Give it all to the child", points: 1 }, { label: "Take the child in and share", points: 4 }, { label: "You can't afford charity. Keep it all.", points: 2 }] },
      { text: "A horde is incoming. Your shelter is compromised. You have 5 minutes:", options: [{ label: "Fortify and fight", points: 2 }, { label: "Escape via the roof", points: 4 }, { label: "Create a distraction and run", points: 3 }, { label: "Freeze — this is it", points: 0 }] },
    ],
    results: [
      { min: 0, max: 8, title: "Day 1 Casualty", desc: "You're brave — but bravery alone doesn't survive the apocalypse. You'd likely be overrun in the first 24 hours. Your instincts were off and your decisions too impulsive or too slow.", color: "text-red-500" },
      { min: 9, max: 12, title: "Survivor — Barely", desc: "You'd make it through the first week, but you'd struggle. Some good instincts, but some dangerous calls. You'd need a much more experienced group to carry you through.", color: "text-orange-500" },
      { min: 13, max: 16, title: "Solid Survivor", desc: "You think tactically and stay calm under pressure. You'd survive weeks, maybe months. Your biggest risk is trusting the wrong people.", color: "text-amber-500" },
      { min: 17, max: 20, title: "Apocalypse Leader", desc: "You're exactly who groups would rally around. Sharp instincts, calm decisions, and a balance of compassion and ruthlessness. If anyone survives, it's people like you.", color: "text-emerald-500" },
    ],
  },
  titanic: {
    name: "The Titanic", emoji: "🚢", desc: "April 14, 1912. The ship has struck the iceberg. Water is rushing in. You have minutes to act.",
    questions: [
      { text: "You hear the ship hit something. Alarms sound. What do you do first?", options: [{ label: "Rush to the lifeboats immediately", points: 4 }, { label: "Ask crew what's happening", points: 3 }, { label: "Pack your valuables first", points: 1 }, { label: "Wait in your cabin — probably nothing", points: 0 }] },
      { text: "A crew member blocks your path to the upper deck lifeboat area. You:", options: [{ label: "Find another route immediately", points: 4 }, { label: "Argue your way through", points: 2 }, { label: "Follow their instructions", points: 1 }, { label: "Help others around you and figure it out", points: 3 }] },
      { text: "You reach the deck. A lifeboat is being loaded — it's half full and about to lower. A crew member says 'wait for the next one':", options: [{ label: "Get in this one — don't wait", points: 4 }, { label: "Trust the crew and wait", points: 1 }, { label: "Help fill it, then find another", points: 3 }, { label: "Help the elderly aboard first", points: 2 }] },
      { text: "You're in the water. It's 2°C. A lifeboat is 50 metres away but already full:", options: [{ label: "Swim to it and hold on to the edge", points: 4 }, { label: "Tread water and call for help", points: 2 }, { label: "Find floating debris to hold onto", points: 3 }, { label: "Give up — the cold will take me", points: 0 }] },
      { text: "The ship is nearly under. What's your mental state?", options: [{ label: "Completely calm — focus on survival", points: 4 }, { label: "Scared but functioning", points: 3 }, { label: "Paralysed with panic", points: 0 }, { label: "Resigned — whatever happens", points: 1 }] },
    ],
    results: [
      { min: 0, max: 6, title: "Lost at Sea", desc: "The cold water would claim you within 15 minutes of entering the sea. Panic or hesitation cost you precious time on deck.", color: "text-blue-700" },
      { min: 7, max: 12, title: "Very Unlikely to Survive", desc: "You made some moves in the right direction but key hesitations likely meant no lifeboat. History tells us chances were slim without quick action.", color: "text-indigo-500" },
      { min: 13, max: 16, title: "Might Have Made It", desc: "You acted quickly and kept your head. There's a chance you secured a lifeboat seat or grabbed debris. History is full of such survivors — you might have been one.", color: "text-amber-500" },
      { min: 17, max: 20, title: "Survivor", desc: "Calm, quick, and decisive. You'd have made it to a lifeboat in the first wave — among the fortunate few who survived that night. Your instincts were exactly right.", color: "text-emerald-500" },
    ],
  },
  mars: {
    name: "Mars Mission Emergency", emoji: "🚀", desc: "You're 6 months into a solo Mars mission. Your habitat has been partially breached. Earth is 20 minutes away by radio. Solve it or die.",
    questions: [
      { text: "Pressure alarm: your habitat module is losing oxygen. First move:", options: [{ label: "Locate the breach and seal it manually", points: 4 }, { label: "Radio Earth for instructions", points: 2 }, { label: "Get into your suit immediately", points: 3 }, { label: "Run diagnostics — maybe it's a false alarm", points: 1 }] },
      { text: "Your solar panels are damaged by a dust storm. Power is at 15% and dropping:", options: [{ label: "Shut down all non-essential systems", points: 4 }, { label: "Charge your suit's battery as priority", points: 3 }, { label: "Try to repair panels in the storm", points: 2 }, { label: "Wait for the storm to pass", points: 1 }] },
      { text: "You have food for 400 days but a rescue mission won't arrive for 600. Do you:", options: [{ label: "Begin rationing immediately at 2/3 meals", points: 4 }, { label: "Attempt to grow food in the lab", points: 3 }, { label: "Radio Earth and wait for a plan", points: 2 }, { label: "Eat normally — something will change", points: 0 }] },
      { text: "Your water recycler is failing. You have 30 litres in reserve. You:", options: [{ label: "Repair it immediately — it's priority one", points: 4 }, { label: "Ration to 1L/day and hope", points: 2 }, { label: "Use it to try extracting ice from the soil", points: 3 }, { label: "Radio Earth and wait 40 minutes for a reply", points: 1 }] },
      { text: "You experience severe loneliness and psychological stress at day 250. You:", options: [{ label: "Stick to your routine — structure is survival", points: 4 }, { label: "Log everything and analyse your mental state", points: 3 }, { label: "Radio Earth just to hear a human voice", points: 2 }, { label: "Let yourself fall apart — you're only human", points: 0 }] },
    ],
    results: [
      { min: 0, max: 8, title: "Mission Failure", desc: "The mission would end within the first 100 days. A series of poor decisions in a zero-margin environment proved fatal. Mars is unforgiving.", color: "text-red-500" },
      { min: 9, max: 12, title: "Partial Survival", desc: "You'd last significantly longer than most, but critical resource management failures would end the mission before rescue arrived.", color: "text-orange-500" },
      { min: 13, max: 16, title: "Long-Term Survivor", desc: "You have the discipline, problem-solving instinct, and mental fortitude to make it close to rescue. A few better decisions and you'd have made it.", color: "text-amber-500" },
      { min: 17, max: 20, title: "Mars Survivor", desc: "Exceptional. You prioritised correctly, kept your head under pressure, and adapted to each crisis. You'd survive the 600 days and return home. You're built for this.", color: "text-emerald-500" },
    ],
  },
  desert: {
    name: "Desert Island", emoji: "🏝️", desc: "Your plane went down. You're alone on an uninhabited island in the Pacific. No radio. No rescue confirmed. Survive until help comes.",
    questions: [
      { text: "You've just washed ashore. What's your first priority?", options: [{ label: "Find fresh water", points: 4 }, { label: "Build a shelter", points: 3 }, { label: "Signal for help from the beach", points: 2 }, { label: "Explore the island", points: 1 }] },
      { text: "You find a freshwater stream. You're extremely thirsty. Do you:", options: [{ label: "Drink immediately — hydration is survival", points: 2 }, { label: "Boil it first even though it takes time", points: 4 }, { label: "Filter it through your clothing first", points: 3 }, { label: "Collect it in a container and wait", points: 1 }] },
      { text: "You spot a ship on the horizon. You have:", options: [{ label: "A signal fire already prepared and lit", points: 4 }, { label: "You wave from the beach", points: 2 }, { label: "You use your clothing as a flag", points: 3 }, { label: "Nothing prepared — you panic", points: 0 }] },
      { text: "Food is scarce after a week. You find insects, berries, and a fish in a tide pool:", options: [{ label: "Eat the insects — protein dense and safe", points: 4 }, { label: "Try to catch more fish", points: 3 }, { label: "Eat the berries carefully", points: 2 }, { label: "Wait and hope — not eating that", points: 0 }] },
      { text: "Three weeks in, your mental health is deteriorating. You:", options: [{ label: "Create a daily routine and stick to it", points: 4 }, { label: "Write in the sand to process your thoughts", points: 3 }, { label: "Keep yourself busy with survival tasks", points: 3 }, { label: "Give in to despair — it's over", points: 0 }] },
    ],
    results: [
      { min: 0, max: 7, title: "Day 3 Loss", desc: "Dehydration or a poor decision in the critical first 72 hours would end things fast. The fundamentals of survival matter most — water first, always.", color: "text-yellow-700" },
      { min: 8, max: 12, title: "A Few Weeks", desc: "You'd survive the initial shock but struggle with long-term resource management and mental endurance. A close-call rescue scenario.", color: "text-orange-500" },
      { min: 13, max: 16, title: "Survivor Material", desc: "Good instincts, right priorities. You'd make it several weeks and likely signal a passing ship or aircraft effectively. You'd be found.", color: "text-amber-500" },
      { min: 17, max: 20, title: "Natural Survivalist", desc: "You know exactly what matters and in what order. Fresh water, shelter, signal, food, and mental fortitude. You'd not only survive — you'd thrive.", color: "text-emerald-500" },
    ],
  },
};

type ScenarioKey = keyof typeof SCENARIOS;

export default function WouldYouSurvive() {
  const [scenario, setScenario] = useState<ScenarioKey>("zombie");
  const [started, setStarted] = useState(false);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const current = SCENARIOS[scenario];
  const totalQ = current.questions.length;

  const start = () => { setStarted(true); setQuestionIdx(0); setScore(0); setDone(false); setSelected(null); };
  const reset = () => { setStarted(false); setDone(false); setScore(0); setQuestionIdx(0); setSelected(null); };
  const changeScenario = (v: string) => { setScenario(v as ScenarioKey); reset(); };

  const choose = (pts: number, idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setTimeout(() => {
      const newScore = score + pts;
      if (questionIdx + 1 >= totalQ) { setScore(newScore); setDone(true); }
      else { setScore(newScore); setQuestionIdx(q => q + 1); setSelected(null); }
    }, 600);
  };

  const maxScore = current.questions.reduce((acc, q) => acc + Math.max(...q.options.map(o => o.points)), 0);
  const pct = Math.round((score / maxScore) * 100);
  const resultBlock = current.results.find(r => score >= r.min && score <= r.max) ?? current.results[current.results.length - 1];

  return (
    <>
      <SEO title="Would You Survive? Simulator - Survival Quiz" description="Zombie apocalypse, Titanic, Mars mission, desert island — take our survival simulator quiz and find out if you'd make it. Free online quiz!" canonicalUrl="https://randomtoolbox.replit.app/would-you-survive" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg"><Shield className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Would You Survive?</h1>
          </div>
          <p className="text-muted-foreground text-lg">Choose a scenario and make decisions. Find out if you'd make it out alive.</p>
        </div>

        {!started && !done && (
          <Card className="border-2 shadow-lg">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Choose Your Scenario</label>
                <Select value={scenario} onValueChange={changeScenario}>
                  <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zombie">🧟 Zombie Apocalypse</SelectItem>
                    <SelectItem value="titanic">🚢 The Titanic</SelectItem>
                    <SelectItem value="mars">🚀 Mars Mission Emergency</SelectItem>
                    <SelectItem value="desert">🏝️ Desert Island</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-muted/50 rounded-2xl p-5 space-y-2">
                <div className="text-4xl">{current.emoji}</div>
                <h2 className="font-display font-bold text-xl">{current.name}</h2>
                <p className="text-sm text-muted-foreground">{current.desc}</p>
                <p className="text-xs text-muted-foreground">{totalQ} decisions — no going back.</p>
              </div>
              <Button size="lg" className="w-full h-14 text-lg rounded-xl bg-green-600 hover:bg-green-700 text-white" onClick={start} data-testid="button-start">
                Start Simulation <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </CardContent>
          </Card>
        )}

        {started && !done && (
          <Card className="border-2 shadow-lg">
            <CardContent className="p-8 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-green-600">{current.emoji} {current.name}</span>
                <span className="text-sm text-muted-foreground">Question {questionIdx + 1} / {totalQ}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div className="bg-green-500 h-2 rounded-full" animate={{ width: `${((questionIdx) / totalQ) * 100}%` }} transition={{ duration: 0.3 }} />
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={questionIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-4">
                  <h2 className="text-lg font-bold leading-snug">{current.questions[questionIdx].text}</h2>
                  <div className="space-y-3">
                    {current.questions[questionIdx].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => choose(opt.points, i)}
                        disabled={selected !== null}
                        className={`w-full text-left p-4 rounded-xl border-2 text-sm font-medium transition-all ${selected === i ? opt.points >= 3 ? "border-green-500 bg-green-50 dark:bg-green-950/30" : opt.points >= 1 ? "border-amber-400 bg-amber-50 dark:bg-amber-950/30" : "border-red-400 bg-red-50 dark:bg-red-950/30" : "border-border hover:border-green-300 hover:bg-muted/50"}`}
                        data-testid={`option-${i}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        )}

        {done && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 250, damping: 22 }}>
            <Card className="border-2 shadow-xl">
              <CardContent className="p-8 text-center space-y-5">
                <div className="text-6xl">{current.emoji}</div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Survival Score</p>
                  <div className={`text-6xl font-display font-black ${resultBlock.color}`}>{pct}%</div>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <motion.div className="bg-green-500 h-3 rounded-full" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: 0.3, ease: "easeOut" }} />
                </div>
                <h2 className={`text-2xl font-bold ${resultBlock.color}`}>{resultBlock.title}</h2>
                <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">{resultBlock.desc}</p>
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" onClick={start} className="flex-1">Try Again</Button>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white" onClick={reset}>Change Scenario</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </>
  );
}
