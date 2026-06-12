import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { AtSign, ArrowLeft, Copy, Check } from "lucide-react";
import { Link } from "wouter";

type Style = "cute" | "aesthetic" | "gamer" | "professional" | "funny" | "dark";

const WORD_BANKS: Record<Style, { prefixes: string[]; middles: string[]; suffixes: string[] }> = {
  cute: {
    prefixes: ["tiny", "soft", "bunny", "peach", "sugar", "fluffy", "sweet", "mini", "starry", "cozy", "dreamy", "pastel", "honey", "bubbly", "kawaii", "rosie", "dainty", "velvet"],
    middles: ["moon", "cloud", "petal", "berry", "button", "pudding", "mochi", "latte", "boba", "blossom", "sprinkle", "pixie", "dew", "ribbon", "puff", "cupcake", "charm"],
    suffixes: ["xo", "bb", "uwu", "owo", "333", "kitty", "pie", "bun", "angel", "star", "xx", "love", "~", "bloom", "plum"],
  },
  aesthetic: {
    prefixes: ["void", "lunar", "velvet", "golden", "neon", "silver", "crystal", "vapor", "mist", "aurora", "dusk", "ivory", "obsidian", "sage", "indigo", "sable", "haze"],
    middles: ["wave", "shore", "tide", "drift", "bloom", "dusk", "aura", "glow", "haze", "echo", "vale", "rift", "veil", "noir", "solace", "lune", "aether"],
    suffixes: ["404", "vvv", "999", "iii", "_", ".", "core", "wave", "mode", "vibes", "era", "realm", "aura", "hex"],
  },
  gamer: {
    prefixes: ["xX", "dark", "shadow", "void", "ghost", "death", "blaze", "iron", "storm", "hyper", "cyber", "rogue", "frost", "acid", "vector", "prime", "ultra"],
    middles: ["Slayer", "Knight", "Wolf", "Fox", "Blade", "Strike", "Hunter", "Sniper", "Reaper", "Titan", "Ranger", "Viper", "Drake", "Phoenix", "Spectre", "Phantom"],
    suffixes: ["_YT", "Gaming", "360", "Pro", "HD", "666", "777", "OP", "GG", "Xx", "TTV", "_1", "_Official", "Elite", "God"],
  },
  professional: {
    prefixes: ["the", "its", "real", "official", "im", "just", "hey", "hi"],
    middles: ["Alex", "Jordan", "Morgan", "Taylor", "Casey", "Riley", "Quinn", "Avery", "Blake", "Drew", "Logan", "Cameron", "Skyler", "Finley", "Rowan"],
    suffixes: ["Writes", "Codes", "Builds", "Creates", "Works", "Consults", "Speaks", "Leads", "Studio", "Agency", "HQ", "Co", "Labs", "Collective"],
  },
  funny: {
    prefixes: ["not", "literally", "actual", "certified", "professional", "sir", "lord", "master", "captain", "agent", "dr"],
    middles: ["PotatoFace", "PancakeMan", "NoodleArm", "GigaBrain", "UltraChad", "BonelessChicken", "ChaosGoblin", "ToastLord", "PickleEnjoyer", "RiceBall", "YeetMachine", "SleepyGremlin", "ChaosMuppet"],
    suffixes: ["_NotABot", "420", "69", "9000", "Jr", "Sr", "III", "Esq", "XD", "lol", "bruh", "haha", "nope"],
  },
  dark: {
    prefixes: ["void", "dark", "shadow", "black", "obsidian", "crimson", "abyssal", "fallen", "cursed", "dusk", "midnight", "hollow", "grim", "vex", "hex", "doomed"],
    middles: ["Specter", "Raven", "Eclipse", "Wraith", "Phantom", "Cryptic", "Abyss", "Nightmare", "Dread", "Sorrow", "Curse", "Elegy", "Requiem", "Erebus", "Nemesis"],
    suffixes: ["XIII", "666", "_void", "_null", "doom", "fallen", "dead", "lost", "x", "zero", "null", "_", "666", "999"],
  },
};

function generateUsernames(style: Style, keyword: string, count: number): string[] {
  const bank = WORD_BANKS[style];
  const results: Set<string> = new Set();
  const kw = keyword.trim().toLowerCase().replace(/\s+/g, "_");
  let attempts = 0;

  while (results.size < count && attempts < 100) {
    attempts++;
    const type = Math.floor(Math.random() * 5);
    let username = "";

    if (type === 0) {
      const p = bank.prefixes[Math.floor(Math.random() * bank.prefixes.length)];
      const m = kw || bank.middles[Math.floor(Math.random() * bank.middles.length)];
      username = `${p}${m}`;
    } else if (type === 1) {
      const m = kw || bank.middles[Math.floor(Math.random() * bank.middles.length)];
      const s = bank.suffixes[Math.floor(Math.random() * bank.suffixes.length)];
      username = `${m}${s}`;
    } else if (type === 2) {
      const p = bank.prefixes[Math.floor(Math.random() * bank.prefixes.length)];
      const m = kw || bank.middles[Math.floor(Math.random() * bank.middles.length)];
      const s = bank.suffixes[Math.floor(Math.random() * bank.suffixes.length)];
      username = `${p}${m}${s}`;
    } else if (type === 3) {
      const m1 = bank.middles[Math.floor(Math.random() * bank.middles.length)];
      const m2 = kw || bank.middles[Math.floor(Math.random() * bank.middles.length)];
      username = `${m1}${m2}`;
    } else {
      const p = bank.prefixes[Math.floor(Math.random() * bank.prefixes.length)];
      const s = bank.suffixes[Math.floor(Math.random() * bank.suffixes.length)];
      const m = kw || bank.middles[Math.floor(Math.random() * bank.middles.length)];
      const num = Math.random() > 0.5 ? Math.floor(Math.random() * 999) : "";
      username = `${p}_${m}${num}`;
    }

    if (username.length >= 4 && username.length <= 20) results.add(username);
  }

  return Array.from(results).slice(0, count);
}

export default function UsernameGenerator() {
  const [keyword, setKeyword] = useState("");
  const [style, setStyle] = useState<Style>("aesthetic");
  const [usernames, setUsernames] = useState<string[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [resultKey, setResultKey] = useState(0);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generate = () => {
    setIsThinking(true);
    setUsernames([]);
    setTimeout(() => {
      setUsernames(generateUsernames(style, keyword, 6));
      setResultKey(k => k + 1);
      setIsThinking(false);
    }, 1500);
  };

  const copy = (username: string, idx: number) => {
    navigator.clipboard.writeText(username);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const STYLE_LABELS: Record<Style, string> = {
    cute: "Cute & Sweet 🌸", aesthetic: "Aesthetic ✨", gamer: "Gamer 🎮",
    professional: "Professional 💼", funny: "Funny & Witty 😂", dark: "Dark & Edgy 🖤",
  };

  return (
    <>
      <SEO title="Username Generator - Create Unique Usernames Free" description="Generate unique usernames by style: cute, aesthetic, gamer, professional, funny, or dark. Find the perfect handle for any platform." canonicalUrl="https://randomtoolbox.replit.app/username-generator" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-lg"><AtSign className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Username Generator</h1>
          </div>
          <p className="text-muted-foreground text-lg">Generate unique, style-matched usernames instantly.</p>
        </div>
        <Card className="border-2 shadow-lg">
          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Keyword (optional)</label>
                <Input value={keyword} onChange={e => setKeyword(e.target.value)} onKeyDown={e => e.key === "Enter" && generate()} placeholder="e.g. moon, fire, chaos..." className="h-11" data-testid="input-keyword" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Style</label>
                <Select value={style} onValueChange={(v) => setStyle(v as Style)}>
                  <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>{(Object.entries(STYLE_LABELS) as [Style, string][]).map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <Button size="lg" className="w-full h-14 text-lg rounded-xl bg-violet-600 hover:bg-violet-700 text-white" onClick={generate} disabled={isThinking} data-testid="button-generate">
              {isThinking ? "Generating..." : usernames.length > 0 ? "Generate New Batch" : "Generate Usernames"}
            </Button>
            <div className="min-h-[200px]">
              <AnimatePresence mode="wait">
                {isThinking ? (
                  <motion.div key="thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="py-12 flex flex-col items-center gap-3">
                    <AtSign className="w-10 h-10 text-violet-500 animate-pulse" />
                    <p className="text-muted-foreground animate-pulse">Creating unique usernames...</p>
                  </motion.div>
                ) : usernames.length > 0 ? (
                  <motion.div key={`u-${resultKey}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    {usernames.map((u, i) => (
                      <motion.div key={u} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-center justify-between p-4 rounded-xl border-2 border-violet-100 dark:border-violet-900/30 bg-violet-50 dark:bg-violet-950/20">
                        <div className="flex items-center gap-2">
                          <span className="text-violet-400 font-bold">@</span>
                          <span className="font-mono font-bold text-base">{u}</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => copy(u, i)} className="h-8 w-8 p-0" data-testid={`copy-${i}`}>
                          {copiedIdx === i ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                        </Button>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    <AtSign className="w-12 h-12 opacity-20 mx-auto mb-2" />
                    <p className="opacity-40">Your usernames will appear here</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
