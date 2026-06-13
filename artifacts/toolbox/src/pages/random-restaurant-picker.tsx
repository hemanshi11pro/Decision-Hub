import { useState, useRef } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowLeft, Utensils } from "lucide-react";
import { Link } from "wouter";

interface Restaurant { name: string; cuisine: string; area: string; }

const ALL_RESTAURANTS: Restaurant[] = [
  { area: "Manhattan", name: "Le Bernardin", cuisine: "French Seafood" },
  { area: "Manhattan", name: "Katz's Delicatessen", cuisine: "Jewish Deli" },
  { area: "Manhattan", name: "Xi'an Famous Foods", cuisine: "Chinese" },
  { area: "Manhattan", name: "Gramercy Tavern", cuisine: "American" },
  { area: "Manhattan", name: "Momofuku Noodle Bar", cuisine: "Asian Fusion" },
  { area: "Brooklyn", name: "Lucali", cuisine: "Pizza" },
  { area: "Brooklyn", name: "Fette Sau", cuisine: "BBQ" },
  { area: "Brooklyn", name: "Roberta's", cuisine: "Pizza" },
  { area: "Brooklyn", name: "Peter Luger Steak House", cuisine: "Steakhouse" },
  { area: "Queens", name: "Sripraphai", cuisine: "Thai" },
  { area: "Queens", name: "Arepa Lady", cuisine: "Colombian" },
  { area: "Hollywood", name: "Musso & Frank Grill", cuisine: "American Classic" },
  { area: "Hollywood", name: "Jitlada", cuisine: "Southern Thai" },
  { area: "Downtown LA", name: "Bavel", cuisine: "Middle Eastern" },
  { area: "Downtown LA", name: "Bestia", cuisine: "Italian" },
  { area: "Venice", name: "Gjelina", cuisine: "Californian" },
  { area: "Venice", name: "Felix Trattoria", cuisine: "Italian" },
  { area: "Shoreditch", name: "Dishoom", cuisine: "Indian" },
  { area: "Shoreditch", name: "Brat", cuisine: "Basque" },
  { area: "Shoreditch", name: "St. JOHN Bread & Wine", cuisine: "British" },
  { area: "Covent Garden", name: "J. Sheekey", cuisine: "Seafood" },
  { area: "Covent Garden", name: "Rules", cuisine: "Traditional British" },
  { area: "Notting Hill", name: "The Ledbury", cuisine: "Modern European" },
  { area: "Notting Hill", name: "Ottolenghi", cuisine: "Mediterranean" },
  { area: "Shibuya", name: "Ichiran Ramen", cuisine: "Ramen" },
  { area: "Shibuya", name: "Gyukatsu Motomura", cuisine: "Beef Katsu" },
  { area: "Shinjuku", name: "Omoide Yokocho Stall", cuisine: "Yakitori" },
  { area: "Shinjuku", name: "Fuunji Tsukemen", cuisine: "Tsukemen" },
  { area: "Harajuku", name: "Kawaii Monster Café", cuisine: "Themed Café" },
  { area: "Harajuku", name: "Maisen", cuisine: "Tonkatsu" },
  { area: "Bandra", name: "The Table", cuisine: "Modern International" },
  { area: "Bandra", name: "Bastian", cuisine: "Seafood" },
  { area: "Bandra", name: "Suzette", cuisine: "French-Indian Fusion" },
  { area: "Colaba", name: "Trishna", cuisine: "Coastal Seafood" },
  { area: "Colaba", name: "Indigo", cuisine: "European" },
  { area: "Juhu", name: "Prithvi Café", cuisine: "Continental" },
  { area: "Connaught Place", name: "Bukhara", cuisine: "North Indian" },
  { area: "Connaught Place", name: "Farzi Café", cuisine: "Modern Indian" },
  { area: "Hauz Khas", name: "The Piano Man Jazz Club", cuisine: "Continental" },
  { area: "Gangnam", name: "Gaon", cuisine: "Korean Fine Dining" },
  { area: "Gangnam", name: "Mingles", cuisine: "Korean Fusion" },
  { area: "Hongdae", name: "Maple Tree House", cuisine: "Korean BBQ" },
  { area: "Itaewon", name: "Vatos Urban Tacos", cuisine: "Korean-Mexican" },
  { area: "Montmartre", name: "Le Relais de la Butte", cuisine: "French Bistro" },
  { area: "Le Marais", name: "L'As du Fallafel", cuisine: "Falafel" },
  { area: "Le Marais", name: "Breizh Café", cuisine: "Crêperie" },
  { area: "Saint-Germain", name: "Bouillon Racine", cuisine: "Art Nouveau Brasserie" },
  { area: "Downtown Dubai", name: "Zuma", cuisine: "Japanese Izakaya" },
  { area: "Downtown Dubai", name: "Nobu", cuisine: "Japanese Peruvian" },
  { area: "Dubai Marina", name: "Buddha Bar", cuisine: "Asian" },
  { area: "Jumeirah", name: "Al Mahara", cuisine: "Seafood" },
  { area: "Jumeirah", name: "Pierchic", cuisine: "Seafood" },
  { area: "Marylebone", name: "Chiltern Firehouse", cuisine: "Modern American" },
  { area: "Mayfair", name: "The Wolseley", cuisine: "European Grand Café" },
  { area: "Soho", name: "Barrafina", cuisine: "Spanish Tapas" },
  { area: "East Village", name: "Veselka", cuisine: "Ukrainian" },
  { area: "Williamsburg", name: "Lilia", cuisine: "Italian" },
  { area: "Mission", name: "Tartine Manufactory", cuisine: "Bakery" },
  { area: "Castro", name: "Nopa", cuisine: "California" },
  { area: "West Village", name: "Corner Bistro", cuisine: "Burgers" },
  { area: "Midtown", name: "Sushi Yasuda", cuisine: "Sushi" },
];

function searchRestaurants(query: string): Restaurant[] {
  const q = query.toLowerCase().trim();
  if (!q) return ALL_RESTAURANTS;
  return ALL_RESTAURANTS.filter(r => r.area.toLowerCase().includes(q));
}

function getRandomUnique(arr: Restaurant[], exclude: Restaurant | null): Restaurant {
  if (arr.length <= 1) return arr[0];
  let pick: Restaurant;
  let attempts = 0;
  do { pick = arr[Math.floor(Math.random() * arr.length)]; attempts++; } while (pick.name === exclude?.name && attempts < 10);
  return pick;
}

const FEATURED_AREAS = ["Manhattan", "Brooklyn", "Shoreditch", "Bandra", "Gangnam", "Shibuya", "Le Marais", "Notting Hill"];

export default function RandomRestaurantPicker() {
  const [areaInput, setAreaInput] = useState("");
  const [result, setResult] = useState<Restaurant | null>(null);
  const [resultKey, setResultKey] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [noMatch, setNoMatch] = useState(false);
  const last = useRef<Restaurant | null>(null);

  const pick = () => {
    const pool = searchRestaurants(areaInput);
    setNoMatch(pool.length === 0);
    const source = pool.length > 0 ? pool : ALL_RESTAURANTS;
    setIsThinking(true);
    setResult(null);
    setTimeout(() => {
      const choice = getRandomUnique(source, last.current);
      last.current = choice;
      setResult(choice);
      setResultKey(k => k + 1);
      setIsThinking(false);
    }, 2500);
  };

  return (
    <>
      <SEO title="Random Restaurant Picker - Find Where to Eat" description="Type your area and let us randomly pick a great restaurant for you. Free, instant, no sign-up required." canonicalUrl="https://randomtoolbox.replit.app/random-restaurant-picker" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg"><MapPin className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Random Restaurant Picker</h1>
          </div>
          <p className="text-muted-foreground text-lg">Type your area and we'll pick your next meal spot.</p>
        </div>
        <Card className="border-2 shadow-lg">
          <CardContent className="p-8 flex flex-col items-center space-y-6">
            <div className="w-full space-y-2">
              <label className="text-sm font-medium">Your Area / Neighbourhood</label>
              <Input
                value={areaInput}
                onChange={e => { setAreaInput(e.target.value); setResult(null); setNoMatch(false); }}
                onKeyDown={e => e.key === "Enter" && pick()}
                placeholder="e.g. Manhattan, Shoreditch, Bandra..."
                className="h-12 text-base"
                data-testid="input-area"
              />
              <div className="flex flex-wrap gap-2 pt-1">
                {FEATURED_AREAS.map(a => (
                  <button key={a} onClick={() => setAreaInput(a)} className="text-xs px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800 hover:bg-orange-100 transition-colors">
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-44 flex items-center justify-center w-full relative">
              <AnimatePresence mode="wait">
                {isThinking ? (
                  <motion.div key="thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="absolute flex flex-col items-center gap-3">
                    <Utensils className="w-12 h-12 text-orange-500 animate-bounce" />
                    <p className="text-muted-foreground font-medium animate-pulse">Searching the area...</p>
                  </motion.div>
                ) : result ? (
                  <motion.div key={`r-${resultKey}`} initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="absolute text-center w-full px-4">
                    {noMatch && <p className="text-xs text-muted-foreground mb-2">Area not found — showing a surprise pick!</p>}
                    <p className="text-sm text-orange-500 uppercase tracking-wider font-bold mb-1">Tonight, try...</p>
                    <h2 className="text-3xl md:text-4xl font-display font-black text-foreground">{result.name}</h2>
                    <p className="text-muted-foreground mt-1 text-lg">{result.cuisine}</p>
                    <p className="text-xs text-muted-foreground mt-1 opacity-60">{result.area}</p>
                  </motion.div>
                ) : (
                  <motion.div key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute text-center text-muted-foreground">
                    <MapPin className="w-16 h-16 opacity-20 mx-auto mb-2" />
                    <p className="opacity-40 font-medium">Enter your area to get started</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Button size="lg" className="w-full max-w-xs h-16 text-xl rounded-2xl shadow-xl bg-orange-500 hover:bg-orange-600 text-white" onClick={pick} disabled={isThinking} data-testid="button-pick-restaurant">
              {isThinking ? "Finding..." : result ? "Pick Another" : "Find Restaurant 🍽️"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
