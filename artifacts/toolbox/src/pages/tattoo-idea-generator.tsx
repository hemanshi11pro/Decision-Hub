import { useState, useRef } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Pen, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

interface TattooIdea { concept: string; desc: string; tip: string; }

type Style = "minimalist" | "traditional" | "geometric" | "watercolor" | "blackwork" | "neo-trad" | "fine-line";
type Placement = "wrist" | "forearm" | "upper-arm" | "shoulder" | "back" | "chest" | "ankle" | "neck" | "finger" | "ribcage";

const IDEAS: Record<Style, TattooIdea[]> = {
  minimalist: [
    { concept: "Single Continuous Line Portrait", desc: "A face or figure drawn in one unbroken line. Clean, elegant, unmistakably modern.", tip: "Works beautifully on the forearm. Choose someone meaningful." },
    { concept: "Tiny Constellation", desc: "A small cluster of stars forming your birth constellation or a favourite one. Timeless and celestial.", tip: "Keep it under 2 inches. The simplicity is the power." },
    { concept: "Bare Mountain Outline", desc: "A single sharp line forming the silhouette of a mountain range. Represents resilience.", tip: "Great on the collarbone or inner wrist." },
    { concept: "Arrow", desc: "Simple, clean arrow pointing forward. A symbol of direction, purpose, and moving on.", tip: "Pair with a word or coordinates for extra meaning." },
    { concept: "Minimalist Wave", desc: "One curved line capturing the motion of a wave. Subtle nod to the ocean and its energy.", tip: "Ankle or inner wrist placement works best." },
    { concept: "Small Crescent Moon", desc: "A delicate crescent, often with a star nearby. Represents cycles, femininity, and mystery.", tip: "Keep it small — behind the ear is magical." },
    { concept: "Heartbeat Line", desc: "An EKG flatline that peaks into a heart or meaningful symbol — representing what makes you feel alive.", tip: "Works on wrist, forearm, or collarbone." },
    { concept: "Tiny Plane or Paper Plane", desc: "A symbol of wanderlust, freedom, and adventure. Simple but deeply personal if travel defines you.", tip: "Inner wrist or behind the ear." },
    { concept: "Roman Numerals", desc: "A date that changed your life. No one needs to know what it means but you.", tip: "Forearm, collarbone, or inner bicep." },
    { concept: "DNA Double Helix", desc: "A clean, scientific symbol of life itself. Understated and beautiful for curious minds.", tip: "Suits the forearm length perfectly." },
  ],
  traditional: [
    { concept: "Swallow in Flight", desc: "A classic sailor tattoo — originally meant a sailor had travelled 5,000 nautical miles. Now a symbol of loyalty and return.", tip: "Bold outlines and vivid colour. Chest or forearm." },
    { concept: "Anchor with Rope", desc: "Stability, home, and staying grounded through storms. A timeless maritime symbol.", tip: "Forearm or calf. Go bold with the outline." },
    { concept: "Panther Head", desc: "Power, courage, and a hint of danger. The panther is a cornerstone of traditional flash art.", tip: "Upper arm or calf. Fill with deep black and red." },
    { concept: "Snake Wrapped Around a Dagger", desc: "Wisdom, transformation, and strength. The eternal conflict of knowledge and action.", tip: "Forearm or shin. Great for dramatic placement." },
    { concept: "Eagle with Banner", desc: "Freedom, strength, and pride. Classic American traditional with a personal banner below it.", tip: "Upper arm or chest. Make the wings span wide." },
    { concept: "Rose with Thorns", desc: "Beauty, love, and the pain that comes with it. The most universal traditional tattoo for a reason.", tip: "Fits anywhere — forearm, thigh, or shoulder." },
    { concept: "Koi Fish", desc: "A Japanese-influenced symbol of perseverance, luck, and transformation against the current.", tip: "Suits the forearm or calf. Let the fins flow." },
    { concept: "Ship in a Storm", desc: "Navigating chaos with courage. A dramatic scene of resilience and adventure.", tip: "Great for larger placements — ribs, back, or thigh." },
  ],
  geometric: [
    { concept: "Mandala", desc: "Perfectly symmetrical, mathematically precise circles radiating outward. Represents wholeness and the universe.", tip: "Upper arm or back placement shows the full symmetry." },
    { concept: "Sacred Geometry Flower of Life", desc: "Overlapping circles forming the fundamental pattern of existence. Ancient, mathematical, and deeply meaningful.", tip: "Chest or back for the full effect." },
    { concept: "Geometric Animal (Fox, Wolf, Bear)", desc: "An animal formed entirely of triangles and geometric shapes. Modern and striking.", tip: "Thigh or upper arm. Choose an animal that represents you." },
    { concept: "Low-Poly Crystal", desc: "A faceted gemstone rendered in crisp geometric planes. Elegant and precise.", tip: "Forearm or shoulder. Keep lines razor-sharp." },
    { concept: "Metatron's Cube", desc: "A complex sacred geometry figure containing every Platonic solid. Represents the fabric of reality.", tip: "Large format — chest or back." },
    { concept: "Geometric Eye", desc: "An all-seeing eye composed of triangles and fine lines. Mysterious and precise.", tip: "Inner forearm or back of hand." },
    { concept: "Solar System in Circles", desc: "Each planet as a concentric ring orbiting the sun. A quiet love letter to the cosmos.", tip: "Along the spine or forearm." },
    { concept: "Shattered Glass Effect", desc: "Geometric shards spreading from a central point like a shattered mirror — beautiful and dramatic.", tip: "Upper arm, thigh, or shoulder blade." },
  ],
  watercolor: [
    { concept: "Watercolor Hummingbird", desc: "A hummingbird with splashes of vivid colour bleeding outward. Represents joy, speed, and adaptability.", tip: "Shoulder or upper back. Let the colours bleed beyond the outline." },
    { concept: "Galaxy Splatter", desc: "Deep purples, blues, and pinks forming a nebula-like explosion of colour. Cosmic and dreamlike.", tip: "Thigh, shoulder, or upper arm. The bigger the better." },
    { concept: "Watercolour Botanical", desc: "A loose, painterly rendering of wildflowers or leaves in muted pastel tones.", tip: "Ribcage, shoulder, or forearm. Keep it soft." },
    { concept: "Melting Sunset", desc: "A horizon with vivid orange, pink, and purple bleeding down like dripping paint.", tip: "Thigh or shoulder blade for maximum canvas space." },
    { concept: "Abstract Face Splash", desc: "A minimalist line-drawn face with explosions of watercolour behind it.", tip: "Upper arm or thigh. The contrast is the magic." },
    { concept: "Watercolour Dragonfly", desc: "Translucent wings rendered in iridescent blues and greens. Represents transformation.", tip: "Shoulder, back, or thigh." },
    { concept: "Rainbow Compass", desc: "A compass rose where each direction bleeds a different colour like paint on wet paper.", tip: "Upper arm or forearm. Symbolic of always finding your way." },
  ],
  blackwork: [
    { concept: "Dotwork Sun", desc: "A sun rendered entirely in tiny dots, creating a gradient from dense black to the skin. Meditative and striking.", tip: "Upper arm or chest. Large format works best." },
    { concept: "Blackwork Botanicals", desc: "Leaves, ferns, and branches in solid black — no shading, just form and negative space.", tip: "Forearm, shin, or ribcage." },
    { concept: "Full Blackout Sleeve Accent", desc: "Areas of pure black skin create contrast against detailed imagery — bold, modern, and dramatic.", tip: "Commitment piece — best paired with a skilled blackwork artist." },
    { concept: "Geometric Blackwork Mandala", desc: "A mandala executed entirely in solid black with no grey tones — architectural and precise.", tip: "Chest, upper arm, or back." },
    { concept: "Woodblock-Style Animal", desc: "An animal rendered in the high-contrast, silhouette style of a Japanese woodblock print.", tip: "Thigh or upper arm. Bold and graphic." },
    { concept: "Tribal Pattern Band", desc: "A band of traditional geometric tribal design wrapping around the arm or leg.", tip: "Upper arm or calf. Research the design's cultural origin." },
    { concept: "Abstract Brushstroke", desc: "A thick, gestural brushstroke in pure black — raw, artistic, and uniquely imperfect.", tip: "Shoulder, forearm, or shin." },
  ],
  "neo-trad": [
    { concept: "Ornate Fox", desc: "A fox rendered with bold traditional outlines but filled with intricate Art Nouveau detail and jewel tones.", tip: "Thigh or upper arm. Request a highly detailed artist." },
    { concept: "Floral Skull", desc: "A skull surrounded by blooming flowers — a meditation on life, death, and beauty.", tip: "Chest, thigh, or shoulder. Room to breathe." },
    { concept: "Ornate Moth", desc: "A moth with wings filled with moonlit patterns and muted tones of navy, gold, and green.", tip: "Upper back, chest, or thigh." },
    { concept: "Art Nouveau Lady", desc: "A portrait of a woman in the flowing, decorative style of Alphonse Mucha — ornate and deeply feminine.", tip: "Thigh or upper arm for the full decorative frame." },
    { concept: "Jeweled Compass", desc: "A compass encrusted with gemstone detail and ornate metalwork. A symbol of direction and self-discovery.", tip: "Upper arm, chest, or thigh." },
    { concept: "Mystical Cat", desc: "A cat surrounded by moons, crystals, and plants — rendered with rich jewel-toned detail.", tip: "Thigh or upper arm." },
    { concept: "Ornate Owl", desc: "An owl with highly detailed feathers and Art Nouveau flourishes around it. Wisdom and mystery.", tip: "Shoulder, chest, or thigh." },
  ],
  "fine-line": [
    { concept: "Delicate Botanical Sleeve", desc: "Ultra-thin lines tracing vines, leaves, and wildflowers up the arm. Delicate and deeply feminine.", tip: "Works best on lighter skin tones. Find a fine-line specialist." },
    { concept: "Fine-Line Portrait", desc: "A hyperrealistic portrait sketched in the finest possible lines — like a pencil drawing on skin.", tip: "Requires an artist who specialises in portraiture. Upper arm or thigh." },
    { concept: "Micro Landscape Scene", desc: "A tiny, detailed landscape — mountains, a lake, a tree at sunrise — rendered in ultra-thin lines.", tip: "Inner forearm or upper arm. Small but intricate." },
    { concept: "Fine-Line Script", desc: "A meaningful word, phrase, or line of poetry in the most delicate possible hand-lettering.", tip: "Ribcage, inner arm, or collarbone. Choose words you'll grow with." },
    { concept: "Anatomical Heart", desc: "A medically accurate human heart drawn in fine, precise lines. Vulnerable, human, and beautiful.", tip: "Chest (near the real one) or inner forearm." },
    { concept: "Ethereal Face", desc: "A dreamy, semi-realistic face with flowing hair and delicate features — like a sketch from a Renaissance sketchbook.", tip: "Thigh or upper arm." },
    { concept: "Constellation Map", desc: "A detailed star map of the sky on a specific date — a birthday, an anniversary, the night you knew.", tip: "Back, ribcage, or forearm. Meaningful and timeless." },
  ],
};

const PLACEMENT_NOTES: Record<Placement, string> = {
  wrist: "High visibility. Great for small, meaningful pieces. Fades faster than other areas.",
  forearm: "Excellent canvas. Versatile for any size. Easy to show or hide.",
  "upper-arm": "Classic placement. Good for medium to large pieces. Easily covered.",
  shoulder: "Great for detailed work. Can extend to sleeve or chest naturally.",
  back: "Largest canvas on the body. Perfect for epic, detailed pieces.",
  chest: "Powerful placement close to the heart. Great for meaningful, centred designs.",
  ankle: "Delicate and elegant. Works best for small, fine pieces.",
  neck: "Bold and visible. Statement placement — love it forever first.",
  finger: "Trendy and subtle. Fades quickly — expect touch-ups every 1–2 years.",
  ribcage: "High pain, high reward. Stunning for text, botanicals, and delicate designs.",
};

function getRandomUnique(arr: TattooIdea[], exclude: TattooIdea | null): TattooIdea {
  if (arr.length <= 1) return arr[0];
  let pick: TattooIdea;
  let attempts = 0;
  do { pick = arr[Math.floor(Math.random() * arr.length)]; attempts++; } while (pick === exclude && attempts < 10);
  return pick;
}

export default function TattooIdeaGenerator() {
  const [style, setStyle] = useState<Style>("minimalist");
  const [placement, setPlacement] = useState<Placement>("forearm");
  const [result, setResult] = useState<TattooIdea | null>(null);
  const [resultKey, setResultKey] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const last = useRef<TattooIdea | null>(null);

  const generate = () => {
    setIsThinking(true);
    setResult(null);
    setTimeout(() => {
      const pool = IDEAS[style];
      const idea = getRandomUnique(pool, last.current);
      last.current = idea;
      setResult(idea);
      setResultKey(k => k + 1);
      setIsThinking(false);
    }, 2000);
  };

  return (
    <>
      <SEO title="Tattoo Idea Generator - Find Your Perfect Tattoo Concept" description="Generate unique tattoo ideas by style and placement. Minimalist, geometric, watercolor, traditional and more. Free tattoo inspiration!" canonicalUrl="https://randomtoolbox.replit.app/tattoo-idea-generator" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg"><Pen className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Tattoo Idea Generator</h1>
          </div>
          <p className="text-muted-foreground text-lg">Pick your style and placement — get a unique tattoo concept.</p>
        </div>
        <Card className="border-2 shadow-lg">
          <CardContent className="p-8 flex flex-col items-center space-y-6">
            <div className="w-full grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Style</label>
                <Select value={style} onValueChange={(v) => { setStyle(v as Style); setResult(null); last.current = null; }}>
                  <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimalist">Minimalist 🖊️</SelectItem>
                    <SelectItem value="traditional">Traditional 🦅</SelectItem>
                    <SelectItem value="geometric">Geometric 🔷</SelectItem>
                    <SelectItem value="watercolor">Watercolor 🎨</SelectItem>
                    <SelectItem value="blackwork">Blackwork ⬛</SelectItem>
                    <SelectItem value="neo-trad">Neo-Traditional 🌹</SelectItem>
                    <SelectItem value="fine-line">Fine Line ✨</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Placement</label>
                <Select value={placement} onValueChange={(v) => { setPlacement(v as Placement); }}>
                  <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wrist">Wrist</SelectItem>
                    <SelectItem value="forearm">Forearm</SelectItem>
                    <SelectItem value="upper-arm">Upper Arm</SelectItem>
                    <SelectItem value="shoulder">Shoulder</SelectItem>
                    <SelectItem value="back">Back</SelectItem>
                    <SelectItem value="chest">Chest</SelectItem>
                    <SelectItem value="ankle">Ankle</SelectItem>
                    <SelectItem value="neck">Neck</SelectItem>
                    <SelectItem value="finger">Finger</SelectItem>
                    <SelectItem value="ribcage">Ribcage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="min-h-[220px] flex items-center justify-center w-full relative">
              <AnimatePresence mode="wait">
                {isThinking ? (
                  <motion.div key="thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="absolute flex flex-col items-center gap-3">
                    <Pen className="w-12 h-12 text-slate-500 animate-pulse" />
                    <p className="text-muted-foreground animate-pulse font-medium">Sketching your idea...</p>
                  </motion.div>
                ) : result ? (
                  <motion.div key={`r-${resultKey}`} initial={{ opacity: 0, scale: 0.9, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className="absolute w-full px-2 space-y-3">
                    <div className="bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-2">
                      <h2 className="text-xl font-display font-bold text-slate-800 dark:text-slate-100">{result.concept}</h2>
                      <p className="text-muted-foreground text-sm leading-relaxed">{result.desc}</p>
                      <div className="flex items-start gap-2 bg-white dark:bg-card rounded-xl p-3 border mt-2">
                        <span className="text-sm">🎨</span>
                        <p className="text-xs font-medium text-muted-foreground">{result.tip}</p>
                      </div>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3">
                      <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">📍 {placement.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())} Placement</p>
                      <p className="text-xs text-muted-foreground">{PLACEMENT_NOTES[placement]}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute text-center text-muted-foreground">
                    <Pen className="w-16 h-16 opacity-20 mx-auto mb-2" />
                    <p className="opacity-40">Pick style & placement to generate an idea</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Button size="lg" className="w-full max-w-xs h-16 text-xl rounded-2xl shadow-xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white" onClick={generate} disabled={isThinking} data-testid="button-generate">
              {isThinking ? "Sketching..." : result ? "New Idea" : "Generate Tattoo Idea"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
