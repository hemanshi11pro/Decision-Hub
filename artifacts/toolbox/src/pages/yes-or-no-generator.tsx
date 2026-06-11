import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function YesOrNoGenerator() {
  const [result, setResult] = useState<"YES" | "NO" | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const flip = () => {
    setIsFlipping(true);
    setResult(null);
    
    setTimeout(() => {
      setResult(Math.random() > 0.5 ? "YES" : "NO");
      setIsFlipping(false);
    }, 1200);
  };

  return (
    <>
      <SEO 
        title="Yes or No Generator - Instant Random Answer"
        description="Need a quick yes or no answer? Flip our digital coin for an instant, random yes or no. Perfect for simple decisions."
        canonicalUrl="https://randomtoolbox.replit.app/yes-or-no-generator"
      />
      
      <div className="max-w-2xl mx-auto space-y-8 text-center">
        <div className="text-left">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-lg">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Yes or No Generator</h1>
          </div>
          <p className="text-muted-foreground text-lg">The ultimate oracle for binary decisions.</p>
        </div>

        <div className="py-12 md:py-20 flex flex-col items-center justify-center">
          <button
            onClick={flip}
            disabled={isFlipping}
            className="relative outline-none group"
          >
            <motion.div
              animate={
                isFlipping 
                  ? { rotateY: [0, 180, 360, 540, 720], scale: [1, 1.2, 1] } 
                  : result === "YES" 
                    ? { rotateY: 0, scale: 1 }
                    : result === "NO"
                      ? { rotateY: 180, scale: 1 }
                      : { rotateY: 0, scale: 1 }
              }
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="w-64 h-64 md:w-80 md:h-80 rounded-full shadow-2xl relative preserve-3d cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* YES Side (Front) */}
              <div 
                className={`absolute inset-0 backface-hidden rounded-full flex flex-col items-center justify-center border-8 border-pink-500 bg-pink-500 text-white shadow-[inset_0_0_50px_rgba(0,0,0,0.2)] ${!result && !isFlipping ? 'bg-card border-border text-foreground hover:border-pink-500 hover:text-pink-500 transition-colors' : ''}`}
                style={{ backfaceVisibility: "hidden" }}
              >
                {!result && !isFlipping ? (
                  <span className="text-3xl font-display font-bold opacity-50">Click to Ask</span>
                ) : (
                  <span className="text-6xl md:text-8xl font-display font-black tracking-tighter">YES</span>
                )}
              </div>
              
              {/* NO Side (Back) */}
              <div 
                className="absolute inset-0 backface-hidden rounded-full flex flex-col items-center justify-center border-8 border-slate-800 bg-slate-800 text-white shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <span className="text-6xl md:text-8xl font-display font-black tracking-tighter">NO</span>
              </div>
            </motion.div>
          </button>
          
          <AnimatePresence>
            {result && !isFlipping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 space-y-4"
              >
                <p className="text-lg text-muted-foreground">The universe has spoken.</p>
                <Button variant="outline" size="lg" onClick={flip} className="rounded-full">
                  Ask Another Question
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}