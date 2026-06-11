import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { ListChecks, ArrowLeft, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function ChoicePicker() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isPicking, setIsPicking] = useState(false);

  const pickChoice = () => {
    // Parse by newline or comma
    const choices = text
      .split(/[\n,]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (choices.length < 2) {
      toast.error("Please provide at least 2 choices separated by commas or new lines.");
      return;
    }

    setIsPicking(true);
    setResult(null);
    
    // Rapid switching effect before stopping
    let counter = 0;
    const interval = setInterval(() => {
      setResult(choices[Math.floor(Math.random() * choices.length)]);
      counter++;
      if (counter > 15) {
        clearInterval(interval);
        setResult(choices[Math.floor(Math.random() * choices.length)]);
        setIsPicking(false);
      }
    }, 100);
  };

  return (
    <>
      <SEO 
        title="Choice Picker - Random List Picker"
        description="Paste a list of items and let our random choice picker select one for you instantly. Works with comma-separated or newline lists."
        canonicalUrl="https://randomtoolbox.replit.app/choice-picker"
      />
      
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <ListChecks className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Choice Picker</h1>
          </div>
          <p className="text-muted-foreground text-lg">Paste a massive list, get one random winner.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-2 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Your Choices</label>
                <p className="text-xs text-muted-foreground">Separate items with commas or put each on a new line.</p>
              </div>
              <Textarea 
                placeholder="Apple, Banana, Orange&#10;or&#10;Apple&#10;Banana&#10;Orange" 
                className="min-h-[300px] resize-y text-base font-medium"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button 
                className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-700 text-white" 
                onClick={pickChoice}
                disabled={isPicking || text.trim() === ""}
              >
                <RefreshCw className={`w-5 h-5 mr-2 ${isPicking ? 'animate-spin' : ''}`} />
                {isPicking ? 'Picking...' : 'Pick Random Choice'}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-lg bg-card relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
            <CardContent className="p-8 text-center w-full">
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-semibold uppercase tracking-wider mb-2">
                      Selected
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-black text-foreground break-words px-4">
                      {result}
                    </h2>
                  </motion.div>
                ) : (
                  <motion.div
                    key="initial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-muted-foreground flex flex-col items-center"
                  >
                    <ListChecks className="w-16 h-16 opacity-20 mb-4" />
                    <p className="text-lg">Waiting for choices...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}