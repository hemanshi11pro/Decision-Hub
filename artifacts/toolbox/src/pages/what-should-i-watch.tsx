import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Tv, Play, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const MOVIE_OPTIONS = {
  "any": ["Inception", "The Matrix", "Pulp Fiction", "Spirited Away", "The Office", "Stranger Things", "Breaking Bad", "Parasite", "Get Out", "Everything Everywhere All At Once", "The Dark Knight", "Dune"],
  "action": ["Mad Max: Fury Road", "John Wick", "Die Hard", "Gladiator", "The Avengers", "Terminator", "Mission: Impossible", "Kill Bill", "Edge of Tomorrow"],
  "comedy": ["Superbad", "The Hangover", "Brooklyn Nine-Nine", "Parks and Recreation", "Arrested Development", "Step Brothers", "Hot Fuzz", "Tropic Thunder"],
  "horror": ["Hereditary", "A Quiet Place", "The Shining", "It Follows", "The Conjuring", "Halloween", "Midsommar", "Nope"],
  "romance": ["La La Land", "Pride & Prejudice", "The Notebook", "Before Sunrise", "Notting Hill", "Crazy Rich Asians", "10 Things I Hate About You"],
  "animation": ["Spider-Man: Into the Spider-Verse", "Toy Story", "Wall-E", "My Neighbor Totoro", "Arcane", "Avatar: The Last Airbender", "Demon Slayer"],
  "documentary": ["Free Solo", "Planet Earth", "The Last Dance", "13th", "Jiro Dreams of Sushi", "My Octopus Teacher", "Fire of Love"],
  "thriller": ["Se7en", "Gone Girl", "Prisoners", "Shutter Island", "Zodiac", "Nightcrawler", "The Silence of the Lambs"]
};

export default function WhatShouldIWatch() {
  const [genre, setGenre] = useState<keyof typeof MOVIE_OPTIONS>("any");
  const [result, setResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    setIsSpinning(true);
    setResult(null);
    
    setTimeout(() => {
      const options = MOVIE_OPTIONS[genre];
      const randomChoice = options[Math.floor(Math.random() * options.length)];
      setResult(randomChoice);
      setIsSpinning(false);
    }, 1500);
  };

  return (
    <>
      <SEO 
        title="What Should I Watch? - Random Movie Picker"
        description="Can't decide what to watch? Use our random movie and TV show picker. Filter by genre: action, comedy, horror, romance, and more."
        canonicalUrl="https://randomtoolbox.replit.app/what-should-i-watch"
      />
      
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <Tv className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">What Should I Watch?</h1>
          </div>
          <p className="text-muted-foreground text-lg">Stop scrolling endlessly. Let us pick your next binge.</p>
        </div>

        <Card className="border-2 shadow-lg overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />
          <CardContent className="p-8 md:p-12 flex flex-col items-center text-center space-y-8">
            <div className="w-full max-w-xs space-y-2 text-left">
              <label className="text-sm font-medium">Select Genre</label>
              <Select value={genre} onValueChange={(v) => setGenre(v as keyof typeof MOVIE_OPTIONS)}>
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Surprise Me (Any Genre)</SelectItem>
                  <SelectItem value="action">Action & Adventure</SelectItem>
                  <SelectItem value="comedy">Comedy</SelectItem>
                  <SelectItem value="horror">Horror</SelectItem>
                  <SelectItem value="romance">Romance</SelectItem>
                  <SelectItem value="animation">Animation</SelectItem>
                  <SelectItem value="documentary">Documentary</SelectItem>
                  <SelectItem value="thriller">Thriller</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="h-48 flex items-center justify-center w-full relative">
              <AnimatePresence mode="wait">
                {isSpinning ? (
                  <motion.div
                    key="spinning"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: [1, 0.5, 1], scale: [1, 1.1, 1] }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="absolute"
                  >
                    <div className="w-16 h-16 rounded-full border-4 border-dashed border-blue-500 animate-spin" />
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute text-center w-full"
                  >
                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-2">Grab the popcorn for...</p>
                    <h2 className="text-4xl md:text-5xl font-display font-black text-foreground">
                      {result}
                    </h2>
                  </motion.div>
                ) : (
                  <motion.div
                    key="initial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute text-muted-foreground"
                  >
                    <Tv className="w-16 h-16 opacity-20" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button 
              size="lg" 
              className="w-full max-w-xs h-16 text-xl rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all bg-blue-600 hover:bg-blue-700 text-white"
              onClick={spin}
              disabled={isSpinning}
            >
              {isSpinning ? "Tuning in..." : result ? "Find Another" : <><Play className="w-5 h-5 mr-2 fill-current" /> Pick a Show</>}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}