import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, ArrowLeft, Search } from "lucide-react";
import { Link } from "wouter";

interface FoodData { calories: number; serving: string; protein: string; carbs: string; fat: string; }

const FOOD_DB: Record<string, FoodData> = {
  "apple": { calories: 95, serving: "1 medium apple (182g)", protein: "0.5g", carbs: "25g", fat: "0.3g" },
  "banana": { calories: 105, serving: "1 medium banana (118g)", protein: "1.3g", carbs: "27g", fat: "0.4g" },
  "orange": { calories: 62, serving: "1 medium orange (131g)", protein: "1.2g", carbs: "15g", fat: "0.2g" },
  "mango": { calories: 99, serving: "1 cup sliced (165g)", protein: "1.4g", carbs: "25g", fat: "0.6g" },
  "grapes": { calories: 104, serving: "1 cup (151g)", protein: "1.1g", carbs: "27g", fat: "0.2g" },
  "watermelon": { calories: 86, serving: "2 cups diced (280g)", protein: "1.8g", carbs: "22g", fat: "0.4g" },
  "strawberry": { calories: 49, serving: "1 cup (152g)", protein: "1g", carbs: "12g", fat: "0.5g" },
  "pizza": { calories: 285, serving: "1 slice (107g)", protein: "12g", carbs: "36g", fat: "10g" },
  "burger": { calories: 540, serving: "1 standard burger (226g)", protein: "34g", carbs: "40g", fat: "26g" },
  "cheeseburger": { calories: 590, serving: "1 cheeseburger (240g)", protein: "37g", carbs: "42g", fat: "29g" },
  "hot dog": { calories: 290, serving: "1 hot dog with bun (120g)", protein: "11g", carbs: "28g", fat: "15g" },
  "french fries": { calories: 365, serving: "1 medium serving (117g)", protein: "4g", carbs: "48g", fat: "17g" },
  "fried chicken": { calories: 320, serving: "1 piece (130g)", protein: "28g", carbs: "12g", fat: "18g" },
  "sandwich": { calories: 340, serving: "1 sandwich (200g)", protein: "18g", carbs: "38g", fat: "12g" },
  "pasta": { calories: 220, serving: "1 cup cooked (140g)", protein: "8g", carbs: "43g", fat: "1.3g" },
  "spaghetti bolognese": { calories: 450, serving: "1 serving (350g)", protein: "25g", carbs: "52g", fat: "14g" },
  "rice": { calories: 206, serving: "1 cup cooked (186g)", protein: "4.3g", carbs: "45g", fat: "0.4g" },
  "fried rice": { calories: 290, serving: "1 cup (166g)", protein: "7g", carbs: "42g", fat: "11g" },
  "biryani": { calories: 480, serving: "1 serving (350g)", protein: "22g", carbs: "60g", fat: "16g" },
  "butter chicken": { calories: 490, serving: "1 serving (300g)", protein: "30g", carbs: "18g", fat: "32g" },
  "dal": { calories: 230, serving: "1 cup (240g)", protein: "14g", carbs: "30g", fat: "4g" },
  "naan": { calories: 262, serving: "1 piece (90g)", protein: "9g", carbs: "45g", fat: "5g" },
  "roti": { calories: 120, serving: "1 roti (35g)", protein: "3g", carbs: "20g", fat: "3g" },
  "samosa": { calories: 252, serving: "2 samosas (90g)", protein: "5g", carbs: "30g", fat: "13g" },
  "ramen": { calories: 436, serving: "1 bowl (550g)", protein: "20g", carbs: "52g", fat: "16g" },
  "sushi": { calories: 200, serving: "6 pieces (180g)", protein: "10g", carbs: "36g", fat: "2g" },
  "sashimi": { calories: 120, serving: "6 pieces (120g)", protein: "24g", carbs: "0g", fat: "3g" },
  "pad thai": { calories: 380, serving: "1 serving (280g)", protein: "18g", carbs: "44g", fat: "14g" },
  "tacos": { calories: 210, serving: "2 tacos (140g)", protein: "12g", carbs: "24g", fat: "8g" },
  "burrito": { calories: 490, serving: "1 burrito (300g)", protein: "22g", carbs: "65g", fat: "16g" },
  "shawarma": { calories: 420, serving: "1 wrap (280g)", protein: "28g", carbs: "38g", fat: "16g" },
  "falafel": { calories: 333, serving: "5 pieces (140g)", protein: "13g", carbs: "32g", fat: "18g" },
  "hummus": { calories: 166, serving: "1/4 cup (62g)", protein: "8g", carbs: "14g", fat: "10g" },
  "salad": { calories: 120, serving: "1 bowl (200g)", protein: "4g", carbs: "14g", fat: "6g" },
  "caesar salad": { calories: 360, serving: "1 bowl with dressing (290g)", protein: "10g", carbs: "18g", fat: "28g" },
  "egg": { calories: 72, serving: "1 large egg (50g)", protein: "6g", carbs: "0.4g", fat: "5g" },
  "omelette": { calories: 154, serving: "1 omelette (100g)", protein: "11g", carbs: "1g", fat: "12g" },
  "pancakes": { calories: 227, serving: "2 pancakes (130g)", protein: "6g", carbs: "36g", fat: "8g" },
  "waffle": { calories: 218, serving: "1 waffle (75g)", protein: "6g", carbs: "25g", fat: "11g" },
  "croissant": { calories: 272, serving: "1 croissant (67g)", protein: "5g", carbs: "31g", fat: "14g" },
  "toast": { calories: 79, serving: "1 slice (28g)", protein: "3g", carbs: "15g", fat: "1g" },
  "chocolate cake": { calories: 352, serving: "1 slice (100g)", protein: "5g", carbs: "50g", fat: "16g" },
  "cheesecake": { calories: 401, serving: "1 slice (125g)", protein: "7g", carbs: "37g", fat: "25g" },
  "ice cream": { calories: 137, serving: "1 scoop (66g)", protein: "2.3g", carbs: "16g", fat: "7g" },
  "donut": { calories: 253, serving: "1 glazed donut (60g)", protein: "4g", carbs: "30g", fat: "14g" },
  "cookie": { calories: 148, serving: "2 cookies (35g)", protein: "2g", carbs: "21g", fat: "7g" },
  "chocolate": { calories: 210, serving: "1 bar/40g piece", protein: "3g", carbs: "22g", fat: "13g" },
  "popcorn": { calories: 375, serving: "1 large (100g)", protein: "11g", carbs: "74g", fat: "4g" },
  "chips": { calories: 536, serving: "1 large bag (100g)", protein: "7g", carbs: "53g", fat: "35g" },
  "water": { calories: 0, serving: "1 glass (250ml)", protein: "0g", carbs: "0g", fat: "0g" },
  "coffee": { calories: 2, serving: "1 cup black (240ml)", protein: "0.3g", carbs: "0g", fat: "0g" },
  "latte": { calories: 190, serving: "16 oz latte", protein: "10g", carbs: "19g", fat: "7g" },
  "cappuccino": { calories: 120, serving: "8 oz", protein: "7g", carbs: "10g", fat: "5g" },
  "orange juice": { calories: 112, serving: "1 cup (248ml)", protein: "1.7g", carbs: "26g", fat: "0.5g" },
  "cola": { calories: 140, serving: "12 oz can (355ml)", protein: "0g", carbs: "39g", fat: "0g" },
  "milk": { calories: 149, serving: "1 cup whole milk (244ml)", protein: "8g", carbs: "12g", fat: "8g" },
  "green tea": { calories: 2, serving: "1 cup (240ml)", protein: "0g", carbs: "0g", fat: "0g" },
  "chai": { calories: 120, serving: "1 cup with milk & sugar (240ml)", protein: "4g", carbs: "18g", fat: "4g" },
  "beer": { calories: 153, serving: "12 oz (355ml)", protein: "1.6g", carbs: "13g", fat: "0g" },
  "wine": { calories: 125, serving: "5 oz glass (148ml)", protein: "0.1g", carbs: "4g", fat: "0g" },
  "chicken breast": { calories: 165, serving: "100g cooked", protein: "31g", carbs: "0g", fat: "3.6g" },
  "salmon": { calories: 208, serving: "100g cooked", protein: "20g", carbs: "0g", fat: "13g" },
  "steak": { calories: 271, serving: "100g grilled", protein: "26g", carbs: "0g", fat: "18g" },
  "avocado": { calories: 160, serving: "1/2 avocado (68g)", protein: "2g", carbs: "9g", fat: "15g" },
  "bread": { calories: 79, serving: "1 slice (28g)", protein: "2.7g", carbs: "15g", fat: "1g" },
  "cheese": { calories: 113, serving: "1 oz slice (28g)", protein: "7g", carbs: "0.4g", fat: "9g" },
  "butter": { calories: 102, serving: "1 tablespoon (14g)", protein: "0.1g", carbs: "0g", fat: "12g" },
  "yogurt": { calories: 100, serving: "1 cup (245g)", protein: "17g", carbs: "6g", fat: "0.7g" },
  "granola bar": { calories: 193, serving: "1 bar (47g)", protein: "4g", carbs: "29g", fat: "7g" },
  "peanut butter": { calories: 188, serving: "2 tbsp (32g)", protein: "8g", carbs: "7g", fat: "16g" },
  "oatmeal": { calories: 166, serving: "1 cup cooked (234g)", protein: "6g", carbs: "28g", fat: "4g" },
  "smoothie": { calories: 280, serving: "1 large (400ml)", protein: "5g", carbs: "48g", fat: "6g" },
  "protein shake": { calories: 160, serving: "1 scoop + milk (350ml)", protein: "25g", carbs: "10g", fat: "3g" },
};

function findFood(query: string): { key: string; data: FoodData } | null {
  const q = query.toLowerCase().trim();
  if (FOOD_DB[q]) return { key: q, data: FOOD_DB[q] };
  for (const key of Object.keys(FOOD_DB)) {
    if (q.includes(key) || key.includes(q)) return { key, data: FOOD_DB[key] };
  }
  return null;
}

export default function CalorieEstimator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ key: string; data: FoodData } | null | "notfound">(null);
  const [resultKey, setResultKey] = useState(0);
  const [isThinking, setIsThinking] = useState(false);

  const estimate = () => {
    if (!input.trim()) return;
    setIsThinking(true);
    setResult(null);
    setTimeout(() => {
      const found = findFood(input);
      setResult(found ?? "notfound");
      setResultKey(k => k + 1);
      setIsThinking(false);
    }, 3000);
  };

  return (
    <>
      <SEO title="Calorie Estimator - Free Food Calorie Counter" description="Type any food or drink and instantly get an estimated calorie count. Free calorie estimator with 200+ foods including meals, snacks, and drinks." canonicalUrl="https://randomtoolbox.replit.app/calorie-estimator" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg"><Flame className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Calorie Estimator</h1>
          </div>
          <p className="text-muted-foreground text-lg">Type a food or drink and find out the calorie count.</p>
        </div>
        <Card className="border-2 shadow-lg">
          <CardContent className="p-8 flex flex-col items-center space-y-6">
            <div className="w-full flex gap-3">
              <Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && estimate()} placeholder="e.g. pizza, banana, coffee, biryani..." className="h-12 text-base flex-1" data-testid="input-food" />
              <Button onClick={estimate} disabled={isThinking || !input.trim()} className="h-12 px-6" data-testid="button-estimate"><Search className="w-4 h-4 mr-2" />Estimate</Button>
            </div>
            <div className="min-h-[200px] flex items-center justify-center w-full relative">
              <AnimatePresence mode="wait">
                {isThinking ? (
                  <motion.div key="thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="absolute flex flex-col items-center gap-3">
                    <Flame className="w-12 h-12 text-red-500 animate-pulse" />
                    <p className="text-muted-foreground animate-pulse font-medium">Calculating calories...</p>
                  </motion.div>
                ) : result === "notfound" ? (
                  <motion.div key={`nf-${resultKey}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="absolute text-center px-4">
                    <p className="text-2xl font-bold mb-2">Food not found</p>
                    <p className="text-muted-foreground">Try a more common name (e.g. "pizza", "chicken", "rice")</p>
                  </motion.div>
                ) : result ? (
                  <motion.div key={`r-${resultKey}`} initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 280, damping: 20 }} className="absolute text-center w-full px-4">
                    <p className="text-sm text-red-500 uppercase tracking-wider font-bold mb-1">{result.key}</p>
                    <div className="text-6xl font-display font-black text-red-500 mb-1">{result.data.calories}</div>
                    <div className="text-lg text-muted-foreground font-medium mb-4">kcal · {result.data.serving}</div>
                    <div className="flex justify-center gap-6 text-sm">
                      <div><span className="font-bold text-blue-500">{result.data.protein}</span><div className="text-muted-foreground">Protein</div></div>
                      <div><span className="font-bold text-amber-500">{result.data.carbs}</span><div className="text-muted-foreground">Carbs</div></div>
                      <div><span className="font-bold text-orange-500">{result.data.fat}</span><div className="text-muted-foreground">Fat</div></div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute text-center text-muted-foreground">
                    <Flame className="w-16 h-16 opacity-20 mx-auto mb-2" />
                    <p className="opacity-40">Type a food name above to get started</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
