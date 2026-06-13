import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, Copy, Check } from "lucide-react";
import { Link } from "wouter";

interface FormData {
  name: string;
  age: string;
  yearsAhead: string;
  currentFeel: string;
  biggestChallenge: string;
  currentGoal: string;
  hope: string;
  fearToLetGo: string;
  messageTone: "encouraging" | "honest" | "gentle" | "philosophical";
}

function generateLetter(f: FormData): string {
  const futureAge = f.age ? parseInt(f.age) + parseInt(f.yearsAhead || "5") : null;
  const futureAgeStr = futureAge ? ` (${futureAge}-year-old you)` : "";
  const name = f.name || "Dear Future Me";

  const TONES: Record<FormData["messageTone"], { open: string; middle: string; close: string }> = {
    encouraging: {
      open: `Writing this feels strange — talking to someone who is me, but isn't me yet. Someone who has lived through years I haven't seen. I want you to know that wherever you are right now, you made it. Every hard day, every moment of uncertainty — you got through it.`,
      middle: `${f.currentFeel ? `Right now, I feel ${f.currentFeel}. I'm writing this from that place.` : "I'm writing this from a specific chapter of my life — one that feels both heavy and full of possibility."} ${f.biggestChallenge ? `My biggest challenge right now is ${f.biggestChallenge}. I don't know yet how it resolves, but I know that you do. And you're still here, which means something.` : ""} ${f.currentGoal ? `I'm working toward ${f.currentGoal}. Did it happen? Did something even better take its place?` : ""}`,
      close: `${f.hope ? `I hope — truly hope — that ${f.hope}.` : "I hope you're living a life that feels like yours."} ${f.fearToLetGo ? `And the fear around ${f.fearToLetGo}? I hope you've let that go. I'm working on it from here.` : ""}\n\nBe kind to yourself. You've earned it.\n\nWith love,\nPast You ❤️`,
    },
    honest: {
      open: `This is me, writing to you, trying to be honest in a way I sometimes struggle to be in the moment. No filters. Just what I actually think and feel right now.`,
      middle: `${f.currentFeel ? `If I'm being real — I feel ${f.currentFeel}. Some days that feels manageable, and some days it doesn't.` : "Some days are genuinely hard right now, and I'm not sure what the other side of them looks like yet."} ${f.biggestChallenge ? `The thing that's weighing on me most is ${f.biggestChallenge}. I don't know if I'm handling it well. I hope you look back on this version of me with patience, not judgement.` : ""} ${f.currentGoal ? `I want ${f.currentGoal}. I'm not sure if I'm doing enough to get there. Are you?` : ""}`,
      close: `${f.hope ? `Here's what I genuinely hope: ${f.hope}.` : "I hope you're honest with yourself. I hope you made the brave choices."} ${f.fearToLetGo ? `And ${f.fearToLetGo} — I need you to have put that down somewhere along the way.` : ""}\n\nDon't look back too hard. Look forward.\n\nHonestly yours,\nPast You`,
    },
    gentle: {
      open: `I wanted to write you something soft. Something to hold onto on the days when things feel like too much. So here I am — the earlier version of you — sending you warmth across time.`,
      middle: `${f.currentFeel ? `Today I'm feeling ${f.currentFeel}. I'm writing from that feeling, hoping you remember what it was like to be here, and how far you've come from it.` : "I'm writing from a quieter moment — one where I have the space to think about who I want to become."} ${f.biggestChallenge ? `I'm carrying ${f.biggestChallenge} right now. It feels heavy. But you know something I don't — how it turns out. I'm choosing to trust that.` : ""} ${f.currentGoal ? `Something I'm working toward is ${f.currentGoal}. I hope you're proud of how I tried.` : ""}`,
      close: `${f.hope ? `More than anything, I hope that ${f.hope}.` : "I hope you're surrounded by people who love you and know you."} ${f.fearToLetGo ? `The worry about ${f.fearToLetGo} — I hope it's just a memory by now.` : ""}\n\nYou are doing better than you think.\n\nWith all my love,\nPast You 🌸`,
    },
    philosophical: {
      open: `Isn't it strange — this letter? Writing to a self I haven't yet become. You're reading the words of someone who existed, thought, and felt in a moment that has long passed for you. And yet here we are, connected across time by nothing more than ink and intention.`,
      middle: `${f.currentFeel ? `In this moment, I feel ${f.currentFeel}. Strange to think you might read that word and remember exactly what that felt like — or perhaps you've moved so far beyond it that it seems like another person entirely.` : "I'm writing from a particular chapter — one I can't yet see the end of."} ${f.biggestChallenge ? `My greatest challenge right now is ${f.biggestChallenge}. Every challenge reshapes us. I wonder who it made us become.` : ""} ${f.currentGoal ? `I'm reaching toward ${f.currentGoal}. Did we get there? Or did we discover the goal was never the point?` : ""}`,
      close: `${f.hope ? `My deepest hope is this: ${f.hope}. I choose to believe it came true.` : "I hope you've found meaning. Not certainty — just meaning."} ${f.fearToLetGo ? `And ${f.fearToLetGo} — I wonder now, years later, whether it was worth the weight it cost us.` : ""}\n\nWe are always becoming. Be well.\n\nYour earlier self,\nPast You 🌌`,
    },
  };

  const tone = TONES[f.messageTone];
  return `Dear Future ${name}${futureAgeStr},\n\n${tone.open}\n\n${tone.middle}\n\n${tone.close}`;
}

export default function FutureSelfLetter() {
  const [form, setForm] = useState<FormData>({
    name: "", age: "", yearsAhead: "5", currentFeel: "", biggestChallenge: "",
    currentGoal: "", hope: "", fearToLetGo: "", messageTone: "encouraging",
  });
  const [letter, setLetter] = useState("");
  const [showLetter, setShowLetter] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const update = (k: keyof FormData, v: string) => { setForm(f => ({ ...f, [k]: v })); setShowLetter(false); };

  const generate = () => {
    setIsGenerating(true);
    setShowLetter(false);
    setTimeout(() => {
      setLetter(generateLetter(form));
      setShowLetter(true);
      setIsGenerating(false);
    }, 2500);
  };

  const copy = () => { navigator.clipboard.writeText(letter); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <>
      <SEO title="Future Self Letter Generator - Write to Your Future Self" description="Generate a heartfelt letter from your future self. Encouraging, honest, gentle, or philosophical — free letter generator." canonicalUrl="https://randomtoolbox.replit.app/future-self-letter" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg"><Mail className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Future Self Letter</h1>
          </div>
          <p className="text-muted-foreground text-lg">Answer a few questions — get a heartfelt letter from your future self.</p>
        </div>
        <Card className="border-2 shadow-lg">
          <CardContent className="p-8 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Name (optional)</label>
                <Input value={form.name} onChange={e => update("name", e.target.value)} placeholder="Alex" className="h-10" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Current Age</label>
                <Input type="number" value={form.age} onChange={e => update("age", e.target.value)} placeholder="25" className="h-10" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Writing to self in...</label>
                <Select value={form.yearsAhead} onValueChange={v => update("yearsAhead", v)}>
                  <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 year</SelectItem>
                    <SelectItem value="3">3 years</SelectItem>
                    <SelectItem value="5">5 years</SelectItem>
                    <SelectItem value="10">10 years</SelectItem>
                    <SelectItem value="20">20 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tone</label>
                <Select value={form.messageTone} onValueChange={v => update("messageTone", v as FormData["messageTone"])}>
                  <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="encouraging">Encouraging 🌟</SelectItem>
                    <SelectItem value="honest">Honest & Raw 💡</SelectItem>
                    <SelectItem value="gentle">Gentle & Warm 🌸</SelectItem>
                    <SelectItem value="philosophical">Philosophical 🌌</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">How do you feel right now? <span className="text-muted-foreground font-normal">(optional)</span></label>
              <Input value={form.currentFeel} onChange={e => update("currentFeel", e.target.value)} placeholder="e.g. anxious but hopeful, lost, excited..." className="h-10" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Your biggest challenge right now <span className="text-muted-foreground font-normal">(optional)</span></label>
              <Input value={form.biggestChallenge} onChange={e => update("biggestChallenge", e.target.value)} placeholder="e.g. figuring out my career, a difficult relationship..." className="h-10" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">What are you working toward? <span className="text-muted-foreground font-normal">(optional)</span></label>
              <Input value={form.currentGoal} onChange={e => update("currentGoal", e.target.value)} placeholder="e.g. getting healthier, building something meaningful..." className="h-10" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your biggest hope <span className="text-muted-foreground font-normal">(optional)</span></label>
                <Textarea value={form.hope} onChange={e => update("hope", e.target.value)} placeholder="e.g. I'll have found real peace..." className="resize-none h-20 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">A fear you want to release <span className="text-muted-foreground font-normal">(optional)</span></label>
                <Textarea value={form.fearToLetGo} onChange={e => update("fearToLetGo", e.target.value)} placeholder="e.g. being judged, not being enough..." className="resize-none h-20 text-sm" />
              </div>
            </div>
            <Button size="lg" className="w-full h-14 text-lg rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white" onClick={generate} disabled={isGenerating} data-testid="button-generate">
              {isGenerating ? "Writing your letter..." : showLetter ? "Regenerate Letter" : "Generate My Letter ✉️"}
            </Button>
          </CardContent>
        </Card>
        <AnimatePresence mode="wait">
          {isGenerating && (
            <motion.div key="gen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-3 py-6">
              <Mail className="w-6 h-6 text-indigo-500 animate-pulse" />
              <p className="text-muted-foreground animate-pulse font-medium">Your future self is writing...</p>
            </motion.div>
          )}
          {showLetter && (
            <motion.div key="letter" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 250, damping: 22 }}>
              <Card className="border-2 border-indigo-200 dark:border-indigo-800 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-bold text-lg text-indigo-600 dark:text-indigo-400">Your Letter</h2>
                    <Button variant="ghost" size="sm" onClick={copy} className="h-8 gap-1.5 text-xs">
                      {copied ? <><Check className="w-3.5 h-3.5 text-green-500" />Copied!</> : <><Copy className="w-3.5 h-3.5" />Copy Letter</>}
                    </Button>
                  </div>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {letter.split("\n\n").map((para, i) => (
                      <p key={i} className="text-sm leading-relaxed text-foreground mb-4 last:mb-0 whitespace-pre-line">{para}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
