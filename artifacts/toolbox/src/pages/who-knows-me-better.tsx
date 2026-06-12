import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Users2, ArrowLeft, Copy, Check } from "lucide-react";
import { Link } from "wouter";

const MY_QUESTIONS = [
  "What's my favorite food?", "What's my biggest fear?", "What's my dream job?",
  "What's my most embarrassing habit?", "What's my go-to comfort show or movie?",
  "What do I do when I'm stressed?", "Who is my celebrity crush?",
  "What's my most annoying habit?", "What subject did I struggle most with in school?",
  "What's one thing I've always wanted to try but haven't yet?",
];

export default function WhoKnowsMeBetter() {
  const [step, setStep] = useState<"fill" | "done">("fill");
  const [answers, setAnswers] = useState<string[]>(Array(MY_QUESTIONS.length).fill(""));
  const [copied, setCopied] = useState(false);

  const allFilled = answers.every(a => a.trim().length > 0);

  const copyQuiz = () => {
    const text = MY_QUESTIONS.map((q, i) => `Q${i + 1}: ${q}\nAnswer: ___________`).join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEO title="Who Knows Me Better Quiz - Test Your Friends" description="Create a 'Who Knows Me Better' quiz for your friends. Answer questions about yourself, then challenge your friends to see who knows you best." canonicalUrl="https://randomtoolbox.replit.app/who-knows-me-better" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-lg"><Users2 className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Who Knows Me Better?</h1>
          </div>
          <p className="text-muted-foreground text-lg">Answer questions about yourself, then challenge your friends.</p>
        </div>
        <AnimatePresence mode="wait">
          {step === "fill" ? (
            <motion.div key="fill" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Card className="border-2 shadow-lg">
                <CardContent className="p-8 space-y-5">
                  <p className="text-sm text-muted-foreground font-medium">Step 1 — Answer these about yourself (your friends won't see these answers):</p>
                  {MY_QUESTIONS.map((q, i) => (
                    <div key={i} className="space-y-2">
                      <label className="text-sm font-medium">{i + 1}. {q}</label>
                      <Input value={answers[i]} onChange={e => { const a = [...answers]; a[i] = e.target.value; setAnswers(a); }} placeholder="Your answer..." className="bg-muted/40" data-testid={`answer-${i}`} />
                    </div>
                  ))}
                  <Button className="w-full h-12 text-base mt-4" disabled={!allFilled} onClick={() => setStep("done")} data-testid="button-generate-quiz">
                    Generate My Quiz
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card className="border-2 shadow-lg border-teal-100 dark:border-teal-900/30">
                <CardContent className="p-8 space-y-4">
                  <p className="text-sm text-muted-foreground font-medium">Step 2 — Share these questions with your friends. Whoever gets the most right knows you best!</p>
                  <div className="space-y-3 mt-4">
                    {MY_QUESTIONS.map((q, i) => (
                      <div key={i} className="flex gap-3 items-start p-3 rounded-lg bg-muted/40">
                        <span className="font-bold text-teal-500 text-sm w-6 shrink-0">Q{i + 1}</span>
                        <span className="text-sm font-medium">{q}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button onClick={copyQuiz} variant="outline" className="flex-1" data-testid="button-copy">
                      {copied ? <><Check className="w-4 h-4 mr-2 text-green-500" />Copied!</> : <><Copy className="w-4 h-4 mr-2" />Copy Questions</>}
                    </Button>
                    <Button onClick={() => { setStep("fill"); setAnswers(Array(MY_QUESTIONS.length).fill("")); }} variant="outline" className="flex-1" data-testid="button-reset">Start Over</Button>
                  </div>
                  <div className="mt-4 p-4 rounded-xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900">
                    <p className="text-sm font-bold text-teal-700 dark:text-teal-400 mb-2">Your Answer Key (keep this private!):</p>
                    {MY_QUESTIONS.map((q, i) => (
                      <p key={i} className="text-xs text-muted-foreground"><span className="font-semibold">Q{i + 1}:</span> {answers[i]}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
