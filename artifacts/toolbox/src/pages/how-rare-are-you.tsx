import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Gem, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

interface Trait { id: string; label: string; rarity: number; category: string; }

const TRAITS: Trait[] = [
  { id: "lefthanded", label: "I'm left-handed", rarity: 10, category: "Physical" },
  { id: "redhair", label: "I have natural red hair", rarity: 2, category: "Physical" },
  { id: "greeney", label: "I have green eyes", rarity: 3, category: "Physical" },
  { id: "ambidextrous", label: "I can write with both hands", rarity: 1, category: "Physical" },
  { id: "doublejoint", label: "I'm double-jointed", rarity: 20, category: "Physical" },
  { id: "tongue", label: "I can roll my tongue", rarity: 65, category: "Physical" },
  { id: "sixpack", label: "I have a visible six-pack", rarity: 11, category: "Physical" },
  { id: "perfect_pitch", label: "I have perfect pitch (musical)", rarity: 0.01, category: "Talent" },
  { id: "eidetic", label: "I have a photographic memory", rarity: 0.1, category: "Mind" },
  { id: "lucid", label: "I can lucid dream regularly", rarity: 20, category: "Mind" },
  { id: "synesthesia", label: "I have synesthesia (see sounds/feel colours)", rarity: 4, category: "Mind" },
  { id: "mensa", label: "I'm a Mensa member / IQ 130+", rarity: 2, category: "Mind" },
  { id: "sleepfast", label: "I fall asleep in under 5 minutes", rarity: 25, category: "Habits" },
  { id: "naps", label: "I never nap — I find it impossible", rarity: 15, category: "Habits" },
  { id: "bookperyear", label: "I read 50+ books per year", rarity: 5, category: "Habits" },
  { id: "morning", label: "I wake up naturally before 6am every day", rarity: 12, category: "Habits" },
  { id: "nophone", label: "I've gone a full month without social media", rarity: 8, category: "Habits" },
  { id: "multilingua", label: "I speak 3 or more languages fluently", rarity: 3, category: "Skills" },
  { id: "chess", label: "I can play chess at a competitive level", rarity: 5, category: "Skills" },
  { id: "instrument", label: "I play 2 or more musical instruments", rarity: 10, category: "Skills" },
  { id: "marathon", label: "I've run a marathon", rarity: 1, category: "Skills" },
  { id: "coding", label: "I can write code fluently in 3+ languages", rarity: 2, category: "Skills" },
  { id: "skydive", label: "I've gone skydiving", rarity: 0.5, category: "Experience" },
  { id: "abroad", label: "I've lived in 3 or more countries", rarity: 2, category: "Experience" },
  { id: "met_celeb", label: "I've had a real conversation with a famous person", rarity: 10, category: "Experience" },
  { id: "startup", label: "I've started or co-founded a business", rarity: 6, category: "Experience" },
  { id: "published", label: "I've had something published (book, article, song)", rarity: 3, category: "Experience" },
  { id: "vegetarian", label: "I've been vegetarian/vegan for 5+ years", rarity: 5, category: "Lifestyle" },
  { id: "nosocial", label: "I've never had social media accounts", rarity: 5, category: "Lifestyle" },
  { id: "born_summer", label: "I was born between June and August", rarity: 27, category: "Born That Way" },
  { id: "only_child", label: "I'm an only child", rarity: 20, category: "Born That Way" },
  { id: "twin", label: "I'm a twin", rarity: 1.6, category: "Born That Way" },
];

const CATEGORIES = [...new Set(TRAITS.map(t => t.category))];

function computeRarity(selectedIds: string[]): number {
  const selected = TRAITS.filter(t => selectedIds.includes(t.id));
  if (selected.length === 0) return 50;
  const combined = selected.reduce((acc, t) => acc * (t.rarity / 100), 1) * 100;
  return Math.max(0.0001, Math.min(combined, 99.9));
}

function getRarityLabel(pct: number): { title: string; desc: string; color: string; emoji: string } {
  if (pct < 0.01) return { title: "Practically Mythical", desc: "You are a statistical impossibility. Scientists would study you.", color: "text-violet-600 dark:text-violet-400", emoji: "🧬" };
  if (pct < 0.1) return { title: "One in a Million (Literally)", desc: "Your combination of traits is extraordinarily rare. You're a genuine outlier.", color: "text-violet-500", emoji: "💎" };
  if (pct < 1) return { title: "Exceptionally Rare", desc: "Fewer than 1% of people share your particular combination. You stand out.", color: "text-indigo-500", emoji: "🌟" };
  if (pct < 5) return { title: "Very Rare", desc: "You have a genuinely unusual set of traits. The world doesn't make many like you.", color: "text-blue-500", emoji: "✨" };
  if (pct < 15) return { title: "Uncommon", desc: "You're more unique than most. Your combination of traits is not something you see every day.", color: "text-emerald-500", emoji: "🍀" };
  if (pct < 35) return { title: "Interesting Mix", desc: "You have a solid mix of traits that set you apart from the average person.", color: "text-amber-500", emoji: "🔍" };
  return { title: "Common Combination", desc: "Your traits are fairly typical — but that just makes your personality and choices what sets you apart!", color: "text-slate-500", emoji: "😊" };
}

export default function HowRareAreYou() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [resultKey, setResultKey] = useState(0);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    setShowResult(false);
  };

  const calculate = () => { setShowResult(true); setResultKey(k => k + 1); };

  const rarity = computeRarity(selected);
  const label = getRarityLabel(rarity);

  const fmt = (n: number) => n < 0.01 ? n.toFixed(4) : n < 0.1 ? n.toFixed(3) : n < 1 ? n.toFixed(2) : n.toFixed(1);

  return (
    <>
      <SEO title="How Rare Are You? Calculator - Find Your Rarity Percentage" description="Select your unique traits and discover how rare you are statistically. Are you one in a million? Find out now — free!" canonicalUrl="https://randomtoolbox.replit.app/how-rare-are-you" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-lg"><Gem className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">How Rare Are You?</h1>
          </div>
          <p className="text-muted-foreground text-lg">Select every trait that applies to you — then find out how rare you are.</p>
        </div>
        <Card className="border-2 shadow-lg">
          <CardContent className="p-8 space-y-6">
            {CATEGORIES.map(cat => (
              <div key={cat} className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{cat}</h3>
                <div className="flex flex-wrap gap-2">
                  {TRAITS.filter(t => t.category === cat).map(t => {
                    const active = selected.includes(t.id);
                    return (
                      <button key={t.id} onClick={() => toggle(t.id)} className={`px-3 py-2 text-sm rounded-xl border-2 transition-all font-medium ${active ? "bg-violet-600 border-violet-600 text-white" : "border-muted bg-card text-muted-foreground hover:border-violet-300"}`}>
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <Button size="lg" className="w-full h-14 text-lg rounded-xl bg-violet-600 hover:bg-violet-700 text-white" onClick={calculate} data-testid="button-calculate">
              Calculate My Rarity ({selected.length} traits selected)
            </Button>
          </CardContent>
        </Card>
        <AnimatePresence mode="wait">
          {showResult && (
            <motion.div key={`res-${resultKey}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
              <Card className="border-2 border-violet-200 dark:border-violet-800 shadow-xl">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="text-5xl">{label.emoji}</div>
                  <div className={`text-5xl font-display font-black ${label.color}`}>{fmt(rarity)}%</div>
                  <h2 className={`text-2xl font-bold ${label.color}`}>{label.title}</h2>
                  <p className="text-muted-foreground max-w-sm mx-auto">{label.desc}</p>
                  {rarity < 1 && (
                    <p className="text-xs text-muted-foreground">That means roughly <strong>1 in {Math.round(100 / rarity).toLocaleString()}</strong> people share your exact combination of traits.</p>
                  )}
                  <p className="text-xs text-muted-foreground pt-2 border-t border-border">Based on estimated population statistics. For fun only — real rarity is about who you are, not what you're born with.</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
