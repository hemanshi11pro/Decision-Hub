import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "wouter";

interface Symbol { keyword: string[]; meaning: string; theme: string; }
interface Interpretation { themes: string[]; meanings: string[]; insight: string; dreamType: string; }

const DREAM_SYMBOLS: Symbol[] = [
  { keyword: ["fly", "flying", "float", "floating", "soar", "soaring"], meaning: "A sense of freedom, ambition, or escape from limitations. You may be rising above challenges or feeling liberated from constraints in your waking life.", theme: "Freedom & Ambition" },
  { keyword: ["fall", "falling", "drop", "dropping", "plunge"], meaning: "Often signals anxiety, loss of control, or fear of failure. Your subconscious may be processing insecurity about a situation where you feel unstable.", theme: "Anxiety & Loss of Control" },
  { keyword: ["chase", "chased", "run", "running", "escape", "flee", "fleeing", "follow", "following"], meaning: "You may be avoiding a difficult conversation, emotion, or responsibility in waking life. The pursuer often represents something you're unwilling to confront.", theme: "Avoidance & Confrontation" },
  { keyword: ["teeth", "tooth", "losing teeth", "teeth fall"], meaning: "One of the most universal dream symbols — often tied to anxiety about appearance, communication, powerlessness, or fear of embarrassment or loss.", theme: "Anxiety & Self-Image" },
  { keyword: ["water", "ocean", "sea", "river", "lake", "flood", "waves", "drowning", "swim", "swimming"], meaning: "Water represents your emotional state. Calm water suggests peace; turbulent water reflects emotional turmoil. Drowning may symbolise feeling overwhelmed.", theme: "Emotions & the Subconscious" },
  { keyword: ["house", "home", "room", "building", "door", "stairs", "basement", "attic"], meaning: "A house in a dream typically represents the self — different rooms represent different aspects of your personality or life. An unfamiliar room often signals unexplored potential.", theme: "The Self & Inner Life" },
  { keyword: ["death", "dead", "dying", "funeral", "grave", "cemetery"], meaning: "Rarely literal — dreams of death usually represent transformation, endings, and new beginnings. Something in your life may be coming to a close to make way for something new.", theme: "Change & Transformation" },
  { keyword: ["snake", "snakes", "serpent"], meaning: "Snakes are complex symbols: wisdom, healing, fear, temptation, or hidden threats. Context matters — a biting snake may signal betrayal, while a peaceful one suggests transformation.", theme: "Hidden Forces & Transformation" },
  { keyword: ["school", "exam", "test", "classroom", "teacher", "fail", "failing", "unprepared"], meaning: "Exam dreams often reflect real-life performance anxiety or fear of judgment. You may feel tested or evaluated in a current situation.", theme: "Performance Anxiety & Pressure" },
  { keyword: ["baby", "infant", "pregnant", "pregnancy", "birth", "newborn"], meaning: "New beginnings, new projects, or responsibilities. May reflect a creative idea still developing, or anxiety about nurturing something important.", theme: "New Beginnings & Responsibility" },
  { keyword: ["fire", "flame", "burning", "blaze"], meaning: "Fire represents passion, transformation, or destruction. A controlled flame suggests creative energy; uncontrolled fire may signal anger, chaos, or fear.", theme: "Passion & Transformation" },
  { keyword: ["money", "cash", "rich", "wealth", "lottery", "coins", "lose money", "poor"], meaning: "Dreams about money reflect your real feelings about security, self-worth, and power. Losing money often symbolises fear of loss; gaining it may reflect growing confidence.", theme: "Security & Self-Worth" },
  { keyword: ["naked", "nude", "undressed", "exposed", "clothes"], meaning: "Vulnerability, authenticity, and fear of exposure. You may feel emotionally exposed or worried about being judged or seen as you truly are.", theme: "Vulnerability & Authenticity" },
  { keyword: ["wedding", "marriage", "bride", "groom", "ceremony"], meaning: "A union of aspects within yourself, a commitment, or anxiety about real relationship milestones. Not always about romance — it can represent merging ideas or parts of life.", theme: "Commitment & Union" },
  { keyword: ["car", "driving", "drive", "crash", "accident", "vehicle", "brakes"], meaning: "Your sense of direction and control in life. Losing control of a car suggests feeling overwhelmed. A smooth drive reflects confidence in your path.", theme: "Direction & Control" },
  { keyword: ["lost", "lost in", "can't find", "maze", "wandering", "confused direction"], meaning: "Feeling uncertain about your path in life, struggling to make a decision, or navigating a complex situation without a clear map.", theme: "Uncertainty & Direction" },
  { keyword: ["ex", "old partner", "former partner", "past love", "ex-boyfriend", "ex-girlfriend"], meaning: "Dreams about exes don't necessarily mean you miss them — they often represent a quality, feeling, or chapter of life you're processing or releasing.", theme: "Past & Closure" },
  { keyword: ["animal", "dog", "cat", "wolf", "lion", "bird", "horse", "spider"], meaning: "Animals represent instincts, emotions, or aspects of your personality. The specific animal's associations matter: a wolf might signal instinct or threat, a bird freedom.", theme: "Instinct & Nature" },
  { keyword: ["dark", "darkness", "shadow", "night", "black", "unknown"], meaning: "The unknown, unconscious mind, or hidden fears. Darkness in dreams often represents aspects of yourself or your life that remain unexamined or mysterious.", theme: "The Unknown & Unconscious" },
  { keyword: ["phone", "call", "message", "text", "unable to call", "broken phone"], meaning: "Communication difficulties or feeling disconnected. An inability to use a phone in a dream often reflects feeling unable to reach out or be heard in waking life.", theme: "Communication & Connection" },
  { keyword: ["travel", "journey", "train", "plane", "airport", "trip", "road"], meaning: "A journey in life — personal growth, transition, or moving toward goals. Missing a train or plane often reflects fear of missing opportunities.", theme: "Journey & Transition" },
  { keyword: ["fight", "violence", "attack", "hit", "war", "battle", "argument"], meaning: "Internal conflict or repressed anger. The person you're fighting with in a dream often represents a part of yourself or a relationship that needs resolution.", theme: "Conflict & Repressed Anger" },
];

const DREAM_TYPES = [
  { keywords: ["chased", "chase", "falling", "fail", "exam", "teeth", "naked", "lost"], type: "Anxiety Dream", desc: "Your subconscious is processing stress, pressure, or unresolved worry." },
  { keywords: ["flying", "soar", "float", "rich", "success", "happy", "joy"], type: "Wish-Fulfilment Dream", desc: "Your mind is exploring desires, hopes, and things you long for." },
  { keywords: ["death", "dead", "transform", "change", "fire", "birth", "wedding"], type: "Transformation Dream", desc: "You're processing significant change, endings, or new beginnings in your life." },
  { keywords: ["shadow", "dark", "unknown", "stranger", "hidden", "secret"], type: "Shadow Dream", desc: "Your unconscious is surfacing hidden aspects of yourself or unacknowledged fears." },
];

const INSIGHTS = [
  "Dreams don't predict the future — they process the past and present.",
  "Recurring dream symbols often point to unresolved patterns worth exploring.",
  "The most emotionally intense part of the dream is usually the most important to examine.",
  "Keeping a dream journal within 5 minutes of waking dramatically improves recall.",
  "The characters in your dreams often represent aspects of yourself, not the actual people.",
  "Nightmares, while unpleasant, are your mind's way of practising emotional resilience.",
  "Dreams are most vivid during REM sleep, which peaks in the final hours of sleep.",
  "The 'feeling' of the dream often matters more than the literal imagery.",
];

function interpretDream(text: string): Interpretation {
  const lower = text.toLowerCase();
  const matched: { symbol: Symbol; count: number }[] = [];

  for (const symbol of DREAM_SYMBOLS) {
    const count = symbol.keyword.filter(kw => lower.includes(kw)).length;
    if (count > 0) matched.push({ symbol, count });
  }

  matched.sort((a, b) => b.count - a.count);
  const top = matched.slice(0, 3);
  const themes = top.map(m => m.symbol.theme);
  const meanings = top.map(m => m.symbol.meaning);

  let dreamType = "Processing Dream — Your mind is consolidating experiences and emotions from your waking life.";
  for (const dt of DREAM_TYPES) {
    if (dt.keywords.some(kw => lower.includes(kw))) {
      dreamType = `${dt.type} — ${dt.desc}`;
      break;
    }
  }

  const insight = INSIGHTS[Math.floor(Math.random() * INSIGHTS.length)];

  if (top.length === 0) {
    return {
      themes: ["Personal Narrative"],
      meanings: ["This dream contains imagery that's unique to your personal experience. The most meaningful interpretation comes from what emotions it evoked in you — how did you feel during and after the dream?"],
      insight,
      dreamType: "Personal Dream — Deeply tied to your unique experiences, memories, and associations.",
    };
  }

  return { themes, meanings, insight, dreamType };
}

export default function DreamInterpreter() {
  const [dreamText, setDreamText] = useState("");
  const [result, setResult] = useState<Interpretation | null>(null);
  const [resultKey, setResultKey] = useState(0);
  const [isInterpreting, setIsInterpreting] = useState(false);

  const interpret = () => {
    if (!dreamText.trim()) return;
    setIsInterpreting(true);
    setResult(null);
    setTimeout(() => {
      setResult(interpretDream(dreamText));
      setResultKey(k => k + 1);
      setIsInterpreting(false);
    }, 3000);
  };

  return (
    <>
      <SEO title="Dream Interpreter - What Does Your Dream Mean?" description="Describe your dream and get an interpretation based on dream symbolism psychology. Free dream analysis tool — what is your subconscious saying?" canonicalUrl="https://randomtoolbox.replit.app/dream-interpreter" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg"><Moon className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Dream Interpreter</h1>
          </div>
          <p className="text-muted-foreground text-lg">Describe your dream — we'll explore what your subconscious might be saying.</p>
        </div>
        <Card className="border-2 shadow-lg">
          <CardContent className="p-8 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Describe your dream</label>
              <Textarea
                value={dreamText}
                onChange={e => { setDreamText(e.target.value); setResult(null); }}
                placeholder="e.g. I was flying over my old neighbourhood when suddenly I started falling. There was a snake below me and I woke up before I hit the ground..."
                className="min-h-[150px] text-base resize-none"
                data-testid="textarea-dream"
              />
              <p className="text-xs text-muted-foreground">Include emotions, colours, people, and anything that stood out.</p>
            </div>
            <Button size="lg" className="w-full h-14 text-lg rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white" onClick={interpret} disabled={isInterpreting || !dreamText.trim()} data-testid="button-interpret">
              {isInterpreting ? "Interpreting..." : result ? "Interpret Again" : "Interpret My Dream 🌙"}
            </Button>
          </CardContent>
        </Card>
        <AnimatePresence mode="wait">
          {isInterpreting && (
            <motion.div key="interp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3 py-8">
              <Moon className="w-10 h-10 text-indigo-500 animate-pulse" />
              <p className="text-muted-foreground animate-pulse font-medium">Reading the symbols in your dream...</p>
            </motion.div>
          )}
          {result && !isInterpreting && (
            <motion.div key={`r-${resultKey}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 250, damping: 22 }} className="space-y-4">
              <div className="bg-indigo-50 dark:bg-indigo-950/20 border-2 border-indigo-200 dark:border-indigo-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">Dream Type</span>
                </div>
                <p className="text-sm font-medium text-foreground">{result.dreamType}</p>
              </div>
              {result.themes.map((theme, i) => (
                <motion.div key={theme} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-card border-2 border-border rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm font-bold text-indigo-500 uppercase tracking-wide">{theme}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{result.meanings[i]}</p>
                </motion.div>
              ))}
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3 flex items-start gap-2">
                <span className="text-base">💡</span>
                <p className="text-sm text-muted-foreground italic">{result.insight}</p>
              </div>
              <p className="text-xs text-muted-foreground text-center">Dream interpretation is for reflection only. The most meaningful interpretation is always your own.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
