import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, RotateCw, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const FOOD_OPTIONS = {
  "no preference": ["Pizza", "Sushi", "Tacos", "Burgers", "Salad", "Ramen", "Pasta", "Fried Chicken", "Steak", "Thai", "Indian", "Chinese", "Sandwiches", "Burritos", "Wings"],
  "vegetarian": ["Margherita Pizza", "Veggie Sushi", "Bean Tacos", "Beyond Burger", "Caesar Salad", "Veggie Ramen", "Pesto Pasta", "Pad Thai (Tofu)", "Palak Paneer", "Falafel Bowl"],
  "vegan": ["Vegan Pizza", "Avocado Roll", "Jackfruit Tacos", "Impossible Burger", "Quinoa Salad", "Miso Vegan Ramen", "Arrabbiata Pasta", "Veggie Curry", "Buddha Bowl", "Vegan Wrap"],
  "halal": ["Halal Pizza", "Sushi", "Halal Tacos", "Halal Burgers", "Salad", "Halal Ramen", "Pasta", "Halal Fried Chicken", "Falafel", "Shawarma", "Biryani"]
};

export default function WhatShouldIEat() {
  const [diet, setDiet] = useState<keyof typeof FOOD_OPTIONS>("no preference");
  const [result, setResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    setIsSpinning(true);
    setResult(null);
    
    // Simulate thinking/spinning
    setTimeout(() => {
      const options = FOOD_OPTIONS[diet];
      const randomChoice = options[Math.floor(Math.random() * options.length)];
      setResult(randomChoice);
      setIsSpinning(false);
    }, 1500);
  };

  return (
    <>
      <SEO 
        title="What Should I Eat? - Free Random Food Picker"
        description="Can't decide what to eat? Spin our free random food picker for instant meal ideas. Filter by dietary preferences: vegetarian, vegan, halal. No sign-up needed!"
        canonicalUrl="https://randomtoolbox.replit.app/what-should-i-eat"
      />
      
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
              <Utensils className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">What Should I Eat?</h1>
          </div>
          <p className="text-muted-foreground text-lg">Let fate decide your next meal. Fast, random, and tailored to your diet.</p>
        </div>

        <Card className="border-2 shadow-lg">
          <CardContent className="p-8 md:p-12 flex flex-col items-center text-center space-y-8">
            <div className="w-full max-w-xs space-y-2 text-left">
              <label className="text-sm font-medium">Dietary Preference</label>
              <Select value={diet} onValueChange={(v) => setDiet(v as keyof typeof FOOD_OPTIONS)}>
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no preference">No Preference (Anything goes!)</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="halal">Halal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="h-48 flex items-center justify-center w-full relative">
              <AnimatePresence mode="wait">
                {isSpinning ? (
                  <motion.div
                    key="spinning"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, rotate: 360 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                    className="absolute"
                  >
                    <RotateCw className="w-16 h-16 text-primary/50" />
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute text-center w-full"
                  >
                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-2">You should eat...</p>
                    <h2 className="text-4xl md:text-6xl font-display font-black text-primary bg-clip-text bg-gradient-to-br from-primary to-orange-500 text-transparent">
                      {result}!
                    </h2>
                  </motion.div>
                ) : (
                  <motion.div
                    key="initial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute text-muted-foreground"
                  >
                    <Utensils className="w-16 h-16 opacity-20" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button 
              size="lg" 
              className="w-full max-w-xs h-16 text-xl rounded-2xl shadow-xl hover:shadow-primary/25 transition-all"
              onClick={spin}
              disabled={isSpinning}
            >
              {isSpinning ? "Thinking..." : result ? "Spin Again" : "Spin the Wheel"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}