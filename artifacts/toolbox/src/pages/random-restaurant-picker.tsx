import { useState, useRef } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowLeft, Utensils } from "lucide-react";
import { Link } from "wouter";

const DB: Record<string, Record<string, Record<string, { name: string; cuisine: string }[]>>> = {
  USA: {
    "New York City": {
      Manhattan: [
        { name: "Le Bernardin", cuisine: "French Seafood" },
        { name: "Katz's Delicatessen", cuisine: "Jewish Deli" },
        { name: "Xi'an Famous Foods", cuisine: "Chinese" },
        { name: "Gramercy Tavern", cuisine: "American" },
        { name: "Momofuku Noodle Bar", cuisine: "Asian Fusion" },
        { name: "The Dutch", cuisine: "American Bistro" },
      ],
      Brooklyn: [
        { name: "Lucali", cuisine: "Pizza" },
        { name: "Fette Sau", cuisine: "BBQ" },
        { name: "Roberta's", cuisine: "Pizza" },
        { name: "Peter Luger Steak House", cuisine: "Steakhouse" },
        { name: "Olmsted", cuisine: "New American" },
      ],
      Queens: [
        { name: "Sripraphai", cuisine: "Thai" },
        { name: "Nusara", cuisine: "Thai" },
        { name: "Arepa Lady", cuisine: "Colombian" },
        { name: "Spicy Lanka", cuisine: "Sri Lankan" },
        { name: "Fu Run", cuisine: "Dongbei Chinese" },
      ],
    },
    "Los Angeles": {
      Hollywood: [
        { name: "Musso & Frank Grill", cuisine: "American Classic" },
        { name: "Night + Market", cuisine: "Thai" },
        { name: "Jitlada", cuisine: "Southern Thai" },
        { name: "Yamashiro", cuisine: "Asian Fusion" },
        { name: "Providence", cuisine: "Seafood" },
      ],
      Downtown: [
        { name: "Bavel", cuisine: "Middle Eastern" },
        { name: "Majordomo", cuisine: "Korean-American" },
        { name: "Bestia", cuisine: "Italian" },
        { name: "Grand Central Market", cuisine: "Food Hall" },
        { name: "Broken Spanish", cuisine: "Modern Mexican" },
      ],
      Venice: [
        { name: "Gjelina", cuisine: "Californian" },
        { name: "Felix Trattoria", cuisine: "Italian" },
        { name: "Salt Air", cuisine: "Seafood" },
        { name: "The Butcher's Daughter", cuisine: "Plant-Based" },
        { name: "Gjusta", cuisine: "Bakery & Deli" },
      ],
    },
  },
  UK: {
    London: {
      Shoreditch: [
        { name: "Dishoom", cuisine: "Indian" },
        { name: "Brat", cuisine: "Basque" },
        { name: "St. JOHN Bread & Wine", cuisine: "British" },
        { name: "Leroy", cuisine: "European Bistro" },
        { name: "Brawn", cuisine: "French-British" },
      ],
      "Covent Garden": [
        { name: "J. Sheekey", cuisine: "Seafood" },
        { name: "Clos Maggiore", cuisine: "French" },
        { name: "Rules", cuisine: "Traditional British" },
        { name: "Frenchie", cuisine: "Modern French" },
        { name: "Barrafina", cuisine: "Spanish Tapas" },
      ],
      "Notting Hill": [
        { name: "The Ledbury", cuisine: "Modern European" },
        { name: "Farmacy", cuisine: "Vegan" },
        { name: "Ottolenghi", cuisine: "Mediterranean" },
        { name: "Lucky 7", cuisine: "American Diner" },
        { name: "Electric Diner", cuisine: "European" },
      ],
    },
  },
  Japan: {
    Tokyo: {
      Shibuya: [
        { name: "Ichiran Ramen", cuisine: "Ramen" },
        { name: "Torikizoku", cuisine: "Yakitori" },
        { name: "Gyukatsu Motomura", cuisine: "Beef Katsu" },
        { name: "Saryo Tsujiri", cuisine: "Japanese Sweets" },
        { name: "Genki Sushi", cuisine: "Conveyor Belt Sushi" },
      ],
      Shinjuku: [
        { name: "Omoide Yokocho Stall", cuisine: "Yakitori" },
        { name: "Fuunji Tsukemen", cuisine: "Tsukemen" },
        { name: "Keika Kumamoto Ramen", cuisine: "Ramen" },
        { name: "Tsunahachi", cuisine: "Tempura" },
        { name: "Nakajima", cuisine: "Sardine Kaiseki" },
      ],
      Harajuku: [
        { name: "Kawaii Monster Café", cuisine: "Themed Café" },
        { name: "Marion Crepes", cuisine: "Crepes" },
        { name: "Eggs 'n Things", cuisine: "American Brunch" },
        { name: "Maisen", cuisine: "Tonkatsu" },
        { name: "Harajuku Gyoza-ro", cuisine: "Gyoza" },
      ],
    },
  },
  India: {
    Mumbai: {
      Bandra: [
        { name: "The Table", cuisine: "Modern International" },
        { name: "Bastian", cuisine: "Seafood" },
        { name: "Pali Bhavan", cuisine: "Regional Indian" },
        { name: "Hitchki", cuisine: "Mumbaikar Street Food" },
        { name: "Suzette", cuisine: "French-Indian Fusion" },
      ],
      Colaba: [
        { name: "Leopold Café", cuisine: "Multi-Cuisine" },
        { name: "Trishna", cuisine: "Coastal Seafood" },
        { name: "Indigo", cuisine: "European" },
        { name: "Café Mondegar", cuisine: "Goan" },
        { name: "Ling's Pavilion", cuisine: "Chinese" },
      ],
      Juhu: [
        { name: "Prithvi Café", cuisine: "Continental" },
        { name: "Soam", cuisine: "Gujarati" },
        { name: "Mahesh Lunch Home", cuisine: "Coastal Seafood" },
        { name: "Ankur", cuisine: "North Indian" },
        { name: "Yauatcha", cuisine: "Dim Sum" },
      ],
    },
    Delhi: {
      "Connaught Place": [
        { name: "Bukhara", cuisine: "North Indian" },
        { name: "Saravana Bhavan", cuisine: "South Indian" },
        { name: "Wenger's", cuisine: "Bakery & Deli" },
        { name: "Kwality Restaurant", cuisine: "Classic Indian" },
        { name: "Farzi Café", cuisine: "Modern Indian" },
      ],
      "Hauz Khas": [
        { name: "Naivedyam", cuisine: "South Indian" },
        { name: "The Piano Man Jazz Club", cuisine: "Continental" },
        { name: "Imperfecto", cuisine: "Mediterranean" },
        { name: "Smoke House Deli", cuisine: "European" },
        { name: "OTB Kitchen", cuisine: "Asian" },
      ],
    },
  },
  "South Korea": {
    Seoul: {
      Gangnam: [
        { name: "Hanilkwan", cuisine: "Traditional Korean" },
        { name: "Gaon", cuisine: "Korean Fine Dining" },
        { name: "Jungsik", cuisine: "Modern Korean" },
        { name: "Bicena", cuisine: "Korean" },
        { name: "Mingles", cuisine: "Korean Fusion" },
      ],
      Hongdae: [
        { name: "Maple Tree House", cuisine: "Korean BBQ" },
        { name: "Tosokchon Samgyetang", cuisine: "Korean Chicken Soup" },
        { name: "Palsaik Samgyeopsal", cuisine: "Korean Pork BBQ" },
        { name: "Miss Lee", cuisine: "Korean Street Food" },
        { name: "Gopchang Jeongol", cuisine: "Korean Offal Hot Pot" },
      ],
      Itaewon: [
        { name: "Vatos Urban Tacos", cuisine: "Korean-Mexican" },
        { name: "Plant Café", cuisine: "Vegan" },
        { name: "Linus' BBQ", cuisine: "American BBQ" },
        { name: "Le Saint-Ex", cuisine: "French" },
        { name: "Usquaebach", cuisine: "Scottish Pub Food" },
      ],
    },
  },
  France: {
    Paris: {
      Montmartre: [
        { name: "Le Relais de la Butte", cuisine: "French Bistro" },
        { name: "Chez Plumeau", cuisine: "French" },
        { name: "La Maison Rose", cuisine: "French Café" },
        { name: "Refuge des Fondus", cuisine: "Fondue" },
        { name: "Au Lapin Agile", cuisine: "Cabaret Café" },
      ],
      "Le Marais": [
        { name: "L'As du Fallafel", cuisine: "Falafel" },
        { name: "Breizh Café", cuisine: "Crêperie" },
        { name: "Robert et Louise", cuisine: "French Steakhouse" },
        { name: "Jacques Genin", cuisine: "Patisserie" },
        { name: "Café de Flore", cuisine: "French Café" },
      ],
      "Saint-Germain": [
        { name: "Bouillon Racine", cuisine: "Art Nouveau Brasserie" },
        { name: "Polidor", cuisine: "Traditional French" },
        { name: "Les Deux Magots", cuisine: "Parisian Café" },
        { name: "Lapérouse", cuisine: "Classic French" },
        { name: "Brasserie Lipp", cuisine: "Alsatian" },
      ],
    },
  },
  Dubai: {
    Dubai: {
      Downtown: [
        { name: "Zuma", cuisine: "Japanese Izakaya" },
        { name: "Nusr-Et", cuisine: "Steakhouse" },
        { name: "Nobu", cuisine: "Japanese Peruvian" },
        { name: "Social by Heinz Beck", cuisine: "Mediterranean" },
        { name: "Armani/Ristorante", cuisine: "Italian" },
      ],
      Marina: [
        { name: "Pier 7 Restaurants", cuisine: "Multi-Cuisine" },
        { name: "Asia Asia", cuisine: "Pan-Asian" },
        { name: "Buddha Bar", cuisine: "Asian" },
        { name: "Indego by Vineet", cuisine: "Modern Indian" },
        { name: "West 14th", cuisine: "Steakhouse" },
      ],
      Jumeirah: [
        { name: "Al Mahara", cuisine: "Seafood" },
        { name: "Pierchic", cuisine: "Seafood" },
        { name: "Al Hadheerah", cuisine: "Arabian" },
        { name: "Ossiano", cuisine: "Mediterranean" },
        { name: "Rockfish", cuisine: "Seafood" },
      ],
    },
  },
};

function getRandomUnique<T>(arr: T[], exclude: T | null): T {
  if (arr.length <= 1) return arr[0];
  let pick: T;
  let attempts = 0;
  do { pick = arr[Math.floor(Math.random() * arr.length)]; attempts++; } while (pick === exclude && attempts < 10);
  return pick;
}

export default function RandomRestaurantPicker() {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [result, setResult] = useState<{ name: string; cuisine: string } | null>(null);
  const [resultKey, setResultKey] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const last = useRef<{ name: string; cuisine: string } | null>(null);

  const countries = Object.keys(DB);
  const cities = country ? Object.keys(DB[country] || {}) : [];
  const areas = country && city ? Object.keys(DB[country]?.[city] || {}) : [];

  const handleCountry = (v: string) => { setCountry(v); setCity(""); setArea(""); setResult(null); };
  const handleCity = (v: string) => { setCity(v); setArea(""); setResult(null); };
  const handleArea = (v: string) => { setArea(v); setResult(null); };

  const pick = () => {
    if (!country || !city || !area) return;
    setIsThinking(true);
    setResult(null);
    setTimeout(() => {
      const options = DB[country][city][area];
      const choice = getRandomUnique(options, last.current);
      last.current = choice;
      setResult(choice);
      setResultKey(k => k + 1);
      setIsThinking(false);
    }, 3000);
  };

  const canPick = country && city && area;

  return (
    <>
      <SEO title="Random Restaurant Picker - Find Where to Eat Near You" description="Can't pick a restaurant? Select your city and area, and we'll randomly pick a great restaurant for you. Free, instant, no sign-up." canonicalUrl="https://randomtoolbox.replit.app/random-restaurant-picker" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg"><MapPin className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Random Restaurant Picker</h1>
          </div>
          <p className="text-muted-foreground text-lg">Select your location and we'll find your next meal spot.</p>
        </div>
        <Card className="border-2 shadow-lg">
          <CardContent className="p-8 flex flex-col items-center space-y-6">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <Select value={country} onValueChange={handleCountry}>
                  <SelectTrigger className="h-11"><SelectValue placeholder="Select country" /></SelectTrigger>
                  <SelectContent>{countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <Select value={city} onValueChange={handleCity} disabled={!country}>
                  <SelectTrigger className="h-11"><SelectValue placeholder="Select city" /></SelectTrigger>
                  <SelectContent>{cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Area</label>
                <Select value={area} onValueChange={handleArea} disabled={!city}>
                  <SelectTrigger className="h-11"><SelectValue placeholder="Select area" /></SelectTrigger>
                  <SelectContent>{areas.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                </Select>
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
                    <p className="text-sm text-orange-500 uppercase tracking-wider font-bold mb-2">Tonight, try...</p>
                    <h2 className="text-3xl md:text-4xl font-display font-black text-foreground">{result.name}</h2>
                    <p className="text-muted-foreground mt-2 text-lg">{result.cuisine}</p>
                  </motion.div>
                ) : (
                  <motion.div key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute text-center text-muted-foreground">
                    <MapPin className="w-16 h-16 opacity-20 mx-auto mb-2" />
                    <p className="opacity-40 font-medium">Select a location to get started</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Button size="lg" className="w-full max-w-xs h-16 text-xl rounded-2xl shadow-xl bg-orange-500 hover:bg-orange-600 text-white" onClick={pick} disabled={!canPick || isThinking} data-testid="button-pick-restaurant">
              {isThinking ? "Finding..." : result ? "Pick Another" : "Find Restaurant"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
