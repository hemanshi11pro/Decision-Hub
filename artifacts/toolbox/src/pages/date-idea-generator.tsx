import { useState, useRef } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarHeart, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

interface DateIdea { title: string; desc: string; tips: string; }

const IDEAS: Record<string, Record<string, DateIdea[]>> = {
  free: {
    romantic: [
      { title: "Sunset Picnic", desc: "Pack a blanket, some snacks, and find a hilltop or park to watch the sunset together. Bring a journal and write down your favourite memories from the year.", tips: "Bring fairy lights for after-dark atmosphere." },
      { title: "Stargazing Night", desc: "Drive away from city lights, lie on blankets, and watch the stars. Download a star-map app to identify constellations together.", tips: "Bring hot chocolate and a playlist of acoustic music." },
      { title: "Morning Walk + Homemade Breakfast", desc: "Take an early morning walk together, then come home and cook breakfast as a team — pancakes, eggs, the full deal.", tips: "Play music and make it a kitchen dance party." },
    ],
    adventurous: [
      { title: "Sunrise Hike", desc: "Set the alarm early, drive to a trail, and hike to a viewpoint just in time for sunrise. The effort makes it unforgettable.", tips: "Pack warm layers and thermos coffee." },
      { title: "Urban Exploration", desc: "Pick a neighbourhood neither of you knows well. Walk without a plan, find hidden alleys, murals, and local gems.", tips: "Whoever spots something cool first chooses the next turn." },
    ],
    cozy: [
      { title: "Movie Marathon Night", desc: "Build a blanket fort, make popcorn, and pick 3 movies with a theme — same director, same actor, or a genre you've never explored.", tips: "Each person picks one movie and you agree on the third together." },
      { title: "Board Game Night", desc: "Break out board games or card games and make it a proper tournament. Loser does the dishes.", tips: "Try a cooperative game where you work together, not against each other." },
    ],
    fun: [
      { title: "Photo Challenge Walk", desc: "Each person gets 5 photography prompts (e.g. 'something yellow', 'a door', 'a stranger from behind'). Walk around and shoot. Compare at the end.", tips: "Use your phone — no fancy camera needed." },
      { title: "Cook a Recipe You've Never Tried", desc: "Find a recipe from a cuisine you've never made before. Go grocery shopping together, then cook it side by side.", tips: "Watch a YouTube tutorial before you start if it's ambitious." },
    ],
    cultural: [
      { title: "Free Museum Day", desc: "Many museums are free on certain days. Pick one, spend a few hours exploring, and grab cheap food nearby.", tips: "Read one exhibit out loud to each other." },
      { title: "Library Date", desc: "Go to the library, each pick a book for the other based on what you think they'd like. Sit and read together for an hour.", tips: "Get a hot drink from a nearby café first." },
    ],
    outdoorsy: [
      { title: "Bike Ride Exploration", desc: "Rent or use bikes to explore a trail, riverside path, or neighbourhood you haven't cycled through before.", tips: "Stop wherever looks interesting — the detours are the best part." },
      { title: "Beach Day (or Lake Day)", desc: "Pack a bag with sunscreen, snacks, and something to play (frisbee, cards) and spend the day by the water.", tips: "Go on a weekday to avoid crowds." },
    ],
  },
  budget: {
    romantic: [
      { title: "Candlelit Dinner at Home", desc: "Cook a special 2-course dinner together with candles, nice plates, and music. Make it feel like a real restaurant night.", tips: "Dress up properly — it changes the whole vibe." },
      { title: "Drive-In Movie", desc: "Find a drive-in cinema nearby or even set up a projector outdoors. Bring car snacks and blankets.", tips: "Arrive early to get the best spot." },
    ],
    adventurous: [
      { title: "Kayaking or Paddleboarding", desc: "Rent kayaks or paddleboards for a few hours at a local lake or river. No experience needed — falling in is half the fun.", tips: "Book morning slots when the water is calmer." },
      { title: "Escape Room", desc: "Book an escape room for 1 hour. It's surprisingly revealing about how you two work together under pressure.", tips: "Trust each other's instincts — it's not about being smartest." },
    ],
    cozy: [
      { title: "Spa Night at Home", desc: "Buy a face mask set, make DIY sugar scrubs, do each other's nails, and watch something comforting.", tips: "Set the mood with dim lights and a diffuser." },
      { title: "Café Hopping", desc: "Visit 3 different cafés in a neighbourhood. Get one thing at each: coffee, pastry, then dessert.", tips: "Rate each stop out of 10 for a fun comparison." },
    ],
    fun: [
      { title: "Mini Golf", desc: "Find a local mini golf course and make every hole more interesting with a challenge (loser pays for ice cream, etc.).", tips: "Keep score but don't take it too seriously." },
      { title: "Bowling Night", desc: "Classic, slightly competitive, always fun. Add a challenge: winner picks the next activity for the weekend.", tips: "Play a couple's handicap round if skill levels differ." },
    ],
    cultural: [
      { title: "Local Theatre or Comedy Show", desc: "Check local event listings for affordable shows — improv, open-mic comedy, or student theatre productions.", tips: "Open mic nights are often free or under $10." },
      { title: "Cooking Class", desc: "Sign up for a beginner cooking class together — pasta, sushi, or pastry. Learn something new and eat the results.", tips: "Look for Groupon deals to save money." },
    ],
    outdoorsy: [
      { title: "Botanical Garden Visit", desc: "Walk through a botanical garden or arboretum. It's quiet, beautiful, and underrated as a date idea.", tips: "Go in spring or autumn for the best colours." },
      { title: "Farmers Market Morning", desc: "Explore a local farmers market, try free samples, and pick ingredients for a meal you'll cook together later.", tips: "Get there early for the freshest picks." },
    ],
  },
  moderate: {
    romantic: [
      { title: "Fine Dining Experience", desc: "Book a nice restaurant you've been wanting to try. Put phones away, dress up, and just enjoy the evening.", tips: "Try the tasting menu if they have one." },
      { title: "Couples Spa Day", desc: "Book a couples massage followed by access to pools, sauna, or steam rooms. Deeply relaxing.", tips: "Arrive early to use the facilities before your treatment." },
    ],
    adventurous: [
      { title: "Rock Climbing (Indoor)", desc: "Try an indoor climbing gym together. Great for trust-building and way more fun than it sounds.", tips: "The gym will provide all gear — just show up." },
      { title: "White Water Rafting", desc: "Book a guided white water rafting trip for half a day. Equal parts terrifying and bonding.", tips: "Waterproof everything in your pockets." },
    ],
    cozy: [
      { title: "Wine or Cocktail Tasting", desc: "Attend a wine tasting event or book a cocktail-making class. Learn something, taste things, and laugh a lot.", tips: "Eat beforehand — sipping on an empty stomach is everyone's enemy." },
      { title: "Hotel Staycation", desc: "Book one night at a nice local hotel you'd normally walk past. Order room service and use all the amenities.", tips: "Check if they have a rooftop pool or bar for sunset drinks." },
    ],
    fun: [
      { title: "Axe Throwing", desc: "Book an axe-throwing session. Surprisingly safe, wildly satisfying, and extremely competitive.", tips: "Loser buys dessert after." },
      { title: "Theme Park Day", desc: "Spend a full day at a theme park and ride everything — including the terrifying ones.", tips: "Buy tickets online in advance for better prices." },
    ],
    cultural: [
      { title: "Concert Night", desc: "Buy tickets for an upcoming concert — go for an artist or genre you've both been curious about, not just the obvious choice.", tips: "Arrive early to explore the venue and grab merch." },
      { title: "Food Tour", desc: "Book a guided food tour of a neighbourhood. Sample 6–8 dishes and learn the history of the area.", tips: "Wear comfortable shoes — there's a lot of walking." },
    ],
    outdoorsy: [
      { title: "Sailing or Boat Trip", desc: "Rent a small sailboat for a few hours or join a group sailing tour. The open water puts things in perspective.", tips: "Check the weather — a calm, sunny day makes it magical." },
      { title: "Horse Riding", desc: "Book a guided horse-riding trail ride. No experience needed, and it's a genuinely unforgettable afternoon.", tips: "Wear long pants and closed-toe shoes." },
    ],
  },
  splurge: {
    romantic: [
      { title: "Private Chef Experience", desc: "Book a private chef to cook a 4-course dinner in your home or a rented space. Incredibly intimate.", tips: "Tell the chef about any favourite dishes or dietary restrictions." },
      { title: "Weekend Getaway", desc: "Book a last-minute weekend trip to a city or coastal town neither of you has been to. Flights, nice hotel, explore everything.", tips: "Avoid over-planning — leave room for spontaneous decisions." },
    ],
    adventurous: [
      { title: "Skydiving", desc: "Book a tandem skydive. Terrifying for the first 5 seconds, euphoric for the remaining 55.", tips: "Do it on a clear day for the best views during the freefall." },
      { title: "Helicopter Tour", desc: "Book a scenic helicopter tour over the city, coastline, or mountains. Views that are impossible to forget.", tips: "Sunset flights are often the most dramatic." },
    ],
    cozy: [
      { title: "Luxury Spa Retreat", desc: "Book a full-day retreat at a high-end spa: massages, facials, pools, sauna, healthy lunch — the full luxury experience.", tips: "Most places offer a couples package for a better rate." },
      { title: "Private Yacht Charter", desc: "Charter a private boat or yacht for a few hours. Sunset on the water with just the two of you.", tips: "Bring champagne and a curated playlist." },
    ],
    fun: [
      { title: "Formula 1 Grand Prix Trip", desc: "Travel to a nearby F1 race weekend — even the practice sessions are incredible in person.", tips: "Get paddock club passes if budget allows — the access is surreal." },
      { title: "Hot Air Balloon Ride", desc: "Float above the countryside at sunrise in a hot air balloon. One of the most romantic experiences on earth.", tips: "Book sunrise slots — the light is magical and crowds are smaller." },
    ],
    cultural: [
      { title: "Broadway or West End Show", desc: "Travel to NYC or London for a world-class theatre production. Orchestra seats for an unforgettable night.", tips: "Book 6+ months out for hit shows." },
      { title: "Gastronomic Dinner", desc: "Book a table at a Michelin-starred restaurant for a once-in-a-lifetime tasting menu experience.", tips: "Dress smartly and avoid heavy perfume — it interferes with the food aromas." },
    ],
    outdoorsy: [
      { title: "African Safari", desc: "Book a guided safari in Kenya, Tanzania, or South Africa. Seeing wildlife in their natural habitat is life-changing.", tips: "The Masai Mara during migration (July–October) is extraordinary." },
      { title: "Island Hopping Trip", desc: "Spend a week island-hopping in Greece, Thailand, or the Maldives. New island, new discovery, every day.", tips: "Mix one party island with two quieter ones for balance." },
    ],
  },
};

type Budget = "free" | "budget" | "moderate" | "splurge";
type Vibe = "romantic" | "adventurous" | "cozy" | "fun" | "cultural" | "outdoorsy";

function getRandomUnique(arr: DateIdea[], exclude: DateIdea | null): DateIdea {
  if (arr.length <= 1) return arr[0];
  let pick: DateIdea;
  let attempts = 0;
  do { pick = arr[Math.floor(Math.random() * arr.length)]; attempts++; } while (pick === exclude && attempts < 10);
  return pick;
}

export default function DateIdeaGenerator() {
  const [budget, setBudget] = useState<Budget>("budget");
  const [vibe, setVibe] = useState<Vibe>("romantic");
  const [result, setResult] = useState<DateIdea | null>(null);
  const [resultKey, setResultKey] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const last = useRef<DateIdea | null>(null);

  const generate = () => {
    setIsThinking(true);
    setResult(null);
    setTimeout(() => {
      const pool = IDEAS[budget]?.[vibe] ?? IDEAS.budget.romantic;
      const idea = getRandomUnique(pool, last.current);
      last.current = idea;
      setResult(idea);
      setResultKey(k => k + 1);
      setIsThinking(false);
    }, 2000);
  };

  return (
    <>
      <SEO title="Date Idea Generator - Find Your Perfect Date" description="Generate perfect date ideas by budget and vibe. From free romantic picnics to luxury adventures. Find your next great date!" canonicalUrl="https://randomtoolbox.replit.app/date-idea-generator" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg"><CalendarHeart className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Date Idea Generator</h1>
          </div>
          <p className="text-muted-foreground text-lg">Pick your budget and vibe — we'll plan the date.</p>
        </div>
        <Card className="border-2 shadow-lg">
          <CardContent className="p-8 flex flex-col items-center space-y-6">
            <div className="w-full grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Budget</label>
                <Select value={budget} onValueChange={(v) => { setBudget(v as Budget); setResult(null); last.current = null; }}>
                  <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free 🆓</SelectItem>
                    <SelectItem value="budget">Budget-Friendly 💵</SelectItem>
                    <SelectItem value="moderate">Moderate 💳</SelectItem>
                    <SelectItem value="splurge">Splurge 💎</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Vibe</label>
                <Select value={vibe} onValueChange={(v) => { setVibe(v as Vibe); setResult(null); last.current = null; }}>
                  <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="romantic">Romantic 🌹</SelectItem>
                    <SelectItem value="adventurous">Adventurous 🧗</SelectItem>
                    <SelectItem value="cozy">Cozy 🛋️</SelectItem>
                    <SelectItem value="fun">Fun & Silly 🎉</SelectItem>
                    <SelectItem value="cultural">Cultural 🎭</SelectItem>
                    <SelectItem value="outdoorsy">Outdoorsy 🌿</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="min-h-[200px] flex items-center justify-center w-full relative">
              <AnimatePresence mode="wait">
                {isThinking ? (
                  <motion.div key="thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="absolute flex flex-col items-center gap-3">
                    <CalendarHeart className="w-12 h-12 text-rose-500 animate-bounce" />
                    <p className="text-muted-foreground animate-pulse font-medium">Finding the perfect date idea...</p>
                  </motion.div>
                ) : result ? (
                  <motion.div key={`r-${resultKey}`} initial={{ opacity: 0, scale: 0.9, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className="absolute w-full px-2">
                    <div className="bg-rose-50 dark:bg-rose-950/20 border-2 border-rose-100 dark:border-rose-900/30 rounded-2xl p-6 space-y-3">
                      <h2 className="text-2xl font-display font-bold text-rose-600 dark:text-rose-400">{result.title}</h2>
                      <p className="text-muted-foreground text-sm leading-relaxed">{result.desc}</p>
                      <div className="flex items-start gap-2 bg-white dark:bg-card rounded-xl p-3 border">
                        <span className="text-base">💡</span>
                        <p className="text-sm font-medium text-muted-foreground">{result.tips}</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute text-center text-muted-foreground">
                    <CalendarHeart className="w-16 h-16 opacity-20 mx-auto mb-2" />
                    <p className="opacity-40">Pick your vibe and generate a date idea</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Button size="lg" className="w-full max-w-xs h-16 text-xl rounded-2xl shadow-xl bg-rose-500 hover:bg-rose-600 text-white" onClick={generate} disabled={isThinking} data-testid="button-generate">
              {isThinking ? "Planning..." : result ? "Another Idea" : "Generate Date Idea"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
