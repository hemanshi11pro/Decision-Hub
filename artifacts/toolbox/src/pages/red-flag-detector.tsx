import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ArrowLeft, Flag } from "lucide-react";
import { Link } from "wouter";

type Context = "romantic" | "friendship" | "workplace" | "family";

interface FlagRule { keywords: string[]; flag: string; severity: "red" | "yellow" | "green"; advice: string; }

const FLAGS: FlagRule[] = [
  { keywords: ["never apologize", "never says sorry", "won't apologize", "doesn't apologize", "no apology"], flag: "Refuses to apologise", severity: "red", advice: "The inability to apologise reflects poor emotional maturity. A healthy relationship requires accountability from both sides." },
  { keywords: ["check my phone", "checks my phone", "goes through my phone", "reads my messages", "looks through my messages"], flag: "Invading your privacy", severity: "red", advice: "Going through your phone without consent is a serious breach of trust and a controlling behaviour pattern." },
  { keywords: ["jealous", "gets jealous", "so jealous", "very jealous", "always jealous"], flag: "Extreme jealousy", severity: "yellow", advice: "Some jealousy is normal, but extreme jealousy often leads to controlling behaviour. Worth having an honest conversation about boundaries." },
  { keywords: ["isolate", "keeps me away", "doesn't want me to see", "stops me seeing", "away from friends", "away from family"], flag: "Isolating you from others", severity: "red", advice: "Isolation from friends and family is one of the clearest warning signs of a controlling or abusive dynamic. Trust your instincts here." },
  { keywords: ["gaslight", "makes me question", "makes me feel crazy", "am i crazy", "imagining things", "tells me i'm overreacting", "overreacting"], flag: "Gaslighting", severity: "red", advice: "Gaslighting is a manipulation tactic. If you're constantly questioning your own perception, that's a serious sign something is wrong." },
  { keywords: ["disappear", "goes silent", "silent treatment", "ignores me", "ignores for days", "cold shoulder"], flag: "Silent treatment / stonewalling", severity: "yellow", advice: "Stonewalling as a conflict tactic is emotionally harmful. Healthy relationships resolve issues through communication, not silence." },
  { keywords: ["love bomb", "too fast", "too intense", "so intense so fast", "moving too fast", "overwhelming affection"], flag: "Love bombing", severity: "yellow", advice: "Overwhelming affection early in a relationship can be a manipulation tactic. Healthy connection builds gradually." },
  { keywords: ["never wrong", "always right", "can't be wrong", "doesn't admit mistakes", "no mistakes"], flag: "Can never be wrong", severity: "red", advice: "People who can't admit mistakes create one-sided relationships where all blame flows to the other person." },
  { keywords: ["hot and cold", "blows hot and cold", "inconsistent", "one day nice one day mean", "unpredictable mood"], flag: "Hot and cold behaviour", severity: "yellow", advice: "Inconsistent behaviour creates anxiety and keeps you constantly seeking approval. It's often a sign of emotional immaturity or manipulation." },
  { keywords: ["threats", "threatens", "threatened to", "will leave if", "says they'll hurt"], flag: "Using threats", severity: "red", advice: "Any form of threatening behaviour — emotional or physical — is a serious red flag that should never be normalised." },
  { keywords: ["control", "controls", "tells me what to wear", "tells me who i can see", "controls who i see", "controls what i do"], flag: "Controlling behaviour", severity: "red", advice: "Control over your appearance, friendships, or choices is not love — it's a power dynamic that tends to escalate." },
  { keywords: ["talks about ex", "always mentions ex", "obsessed with ex", "compares me to ex", "still talks to ex constantly"], flag: "Obsession with ex", severity: "yellow", advice: "Constant comparisons or obsessing over an ex can signal unresolved feelings or unhealthy attachment patterns." },
  { keywords: ["flirts with everyone", "flirts with others", "overly flirty", "flirts in front of me"], flag: "Disrespectful flirting in front of you", severity: "yellow", advice: "Flirting in front of a partner shows a lack of respect. Discuss what boundaries you both need." },
  { keywords: ["lies", "always lies", "caught lying", "lied to me", "lies constantly", "never honest"], flag: "Consistent dishonesty", severity: "red", advice: "A pattern of lying destroys the foundation of trust that every relationship is built on." },
  { keywords: ["my fault", "blames me", "everything is my fault", "always my fault", "blames everything on me"], flag: "Constant blame-shifting", severity: "red", advice: "Blame-shifting is a manipulation tactic that erodes your self-esteem over time. You are not responsible for everything that goes wrong." },
  { keywords: ["disrespects", "rude to me", "talks down to me", "speaks badly", "puts me down", "belittles"], flag: "Disrespect and belittling", severity: "red", advice: "Being spoken down to or belittled is emotional abuse. Respect is the minimum you deserve in any relationship." },
  { keywords: ["no friends", "has no friends", "everyone hates them", "everyone left them"], flag: "No maintained friendships", severity: "yellow", advice: "Someone who has no lasting friendships may struggle with the skills needed for healthy long-term relationships. Not a dealbreaker, but worth noticing." },
  { keywords: ["not listen", "doesn't listen", "never listens", "interrupts", "talks over me"], flag: "Doesn't listen to you", severity: "yellow", advice: "Being consistently unheard is emotionally exhausting. Mutual listening is fundamental to any healthy connection." },
  { keywords: ["secret", "keeps secrets", "hides things", "won't tell me", "very secretive"], flag: "Excessive secrecy", severity: "yellow", advice: "Everyone deserves privacy, but a pattern of hiding things can indicate dishonesty or a double life." },
  { keywords: ["disrespects boundaries", "ignores my boundaries", "pushes my boundaries", "doesn't respect no"], flag: "Ignoring your boundaries", severity: "red", advice: "Repeatedly ignoring your stated boundaries is a serious issue. Your 'no' must be respected, always." },
];

const GREEN_SIGNALS = ["communicates", "listens", "apologises", "respects", "supports", "honest", "trust", "kind", "patient", "understanding", "compromise"];

interface AnalysisResult { detectedFlags: FlagRule[]; greenSignals: string[]; overallLevel: "clean" | "caution" | "warning" | "danger"; }

function analyseText(text: string, _context: Context): AnalysisResult {
  const lower = text.toLowerCase();
  const detectedFlags = FLAGS.filter(rule => rule.keywords.some(kw => lower.includes(kw)));
  const greenSignals = GREEN_SIGNALS.filter(s => lower.includes(s));

  const redCount = detectedFlags.filter(f => f.severity === "red").length;
  const yellowCount = detectedFlags.filter(f => f.severity === "yellow").length;

  let overallLevel: AnalysisResult["overallLevel"] = "clean";
  if (redCount >= 2 || (redCount >= 1 && yellowCount >= 2)) overallLevel = "danger";
  else if (redCount === 1 || yellowCount >= 3) overallLevel = "warning";
  else if (yellowCount >= 1) overallLevel = "caution";

  return { detectedFlags, greenSignals, overallLevel };
}

const LEVEL_CONFIG = {
  clean: { label: "No Red Flags Detected", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800", emoji: "🟢" },
  caution: { label: "A Few Yellow Flags", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800", emoji: "🟡" },
  warning: { label: "Warning Signs Present", color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800", emoji: "🟠" },
  danger: { label: "Multiple Red Flags", color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800", emoji: "🔴" },
};

export default function RedFlagDetector() {
  const [text, setText] = useState("");
  const [context, setContext] = useState<Context>("romantic");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [resultKey, setResultKey] = useState(0);
  const [isThinking, setIsThinking] = useState(false);

  const analyse = () => {
    if (!text.trim()) return;
    setIsThinking(true);
    setResult(null);
    setTimeout(() => {
      setResult(analyseText(text, context));
      setResultKey(k => k + 1);
      setIsThinking(false);
    }, 2000);
  };

  return (
    <>
      <SEO title="Red Flag Detector - Spot Warning Signs in Relationships" description="Describe a situation and our red flag detector will identify potential warning signs. Free relationship health check tool." canonicalUrl="https://randomtoolbox.replit.app/red-flag-detector" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg"><Flag className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Red Flag Detector</h1>
          </div>
          <p className="text-muted-foreground text-lg">Describe a behaviour or situation — we'll flag the warning signs.</p>
        </div>
        <Card className="border-2 shadow-lg">
          <CardContent className="p-8 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Context</label>
              <Select value={context} onValueChange={(v) => setContext(v as Context)}>
                <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="romantic">Romantic Relationship 💕</SelectItem>
                  <SelectItem value="friendship">Friendship 🤝</SelectItem>
                  <SelectItem value="workplace">Workplace 💼</SelectItem>
                  <SelectItem value="family">Family 👨‍👩‍👦</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Describe the situation or behaviour</label>
              <Textarea value={text} onChange={e => { setText(e.target.value); setResult(null); }} placeholder="e.g. They get very jealous when I talk to other people, and never say sorry when we argue. They also check my phone sometimes..." className="min-h-[120px] text-base resize-none" data-testid="textarea-input" />
              <p className="text-xs text-muted-foreground">Be as specific as possible for the best analysis.</p>
            </div>
            <Button size="lg" className="w-full h-14 text-lg rounded-xl bg-red-500 hover:bg-red-600 text-white" onClick={analyse} disabled={isThinking || !text.trim()} data-testid="button-analyse">
              {isThinking ? "Analysing..." : "Detect Red Flags"}
            </Button>
          </CardContent>
        </Card>
        <AnimatePresence mode="wait">
          {isThinking && (
            <motion.div key="thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-3 py-6">
              <AlertTriangle className="w-6 h-6 text-red-500 animate-pulse" />
              <p className="text-muted-foreground animate-pulse font-medium">Analysing the situation...</p>
            </motion.div>
          )}
          {result && (
            <motion.div key={`r-${resultKey}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 250, damping: 22 }} className="space-y-4">
              <div className={`rounded-2xl border-2 p-5 ${LEVEL_CONFIG[result.overallLevel].bg}`}>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-2xl">{LEVEL_CONFIG[result.overallLevel].emoji}</span>
                  <h2 className={`text-xl font-bold ${LEVEL_CONFIG[result.overallLevel].color}`}>{LEVEL_CONFIG[result.overallLevel].label}</h2>
                </div>
                <p className="text-sm text-muted-foreground">{result.detectedFlags.length === 0 ? "We didn't detect any specific red flags in what you described. That's a good sign!" : `We found ${result.detectedFlags.length} potential warning sign${result.detectedFlags.length !== 1 ? "s" : ""} in what you described.`}</p>
              </div>
              {result.detectedFlags.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Detected Flags</h3>
                  {result.detectedFlags.map((f, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className={`rounded-xl border p-4 ${f.severity === "red" ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20" : "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20"}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span>{f.severity === "red" ? "🚩" : "⚠️"}</span>
                        <span className={`font-bold text-sm ${f.severity === "red" ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"}`}>{f.flag}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{f.advice}</p>
                    </motion.div>
                  ))}
                </div>
              )}
              {result.greenSignals.length > 0 && (
                <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20 p-4">
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2">✅ Positive signals found</p>
                  <div className="flex flex-wrap gap-2">{result.greenSignals.map(s => <span key={s} className="text-xs px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-700 dark:text-emerald-300 capitalize">{s}</span>)}</div>
                </div>
              )}
              <p className="text-xs text-muted-foreground text-center">This tool is for reflection only. For serious concerns, speak to a counsellor or trusted person in your life.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
