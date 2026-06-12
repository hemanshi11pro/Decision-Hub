import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Trash2, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

interface Subject { id: number; name: string; maxMarks: string; obtained: string; done: boolean; }

let id = 1;

export default function MarksPredictor() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: id++, name: "Subject 1", maxMarks: "100", obtained: "", done: true },
    { id: id++, name: "Subject 2", maxMarks: "100", obtained: "", done: false },
  ]);
  const [targetPct, setTargetPct] = useState("60");

  const add = (done: boolean) => setSubjects(s => [...s, { id: id++, name: `Subject ${s.length + 1}`, maxMarks: "100", obtained: "", done }]);
  const remove = (sid: number) => setSubjects(s => s.filter(x => x.id !== sid));
  const update = (sid: number, field: keyof Subject, value: string | boolean) => setSubjects(s => s.map(x => x.id === sid ? { ...x, [field]: value } : x));

  const done = subjects.filter(s => s.done && s.obtained !== "" && s.maxMarks !== "");
  const remaining = subjects.filter(s => !s.done && s.maxMarks !== "");
  const totalMax = subjects.reduce((sum, s) => sum + (parseFloat(s.maxMarks) || 0), 0);
  const totalObtained = done.reduce((sum, s) => sum + (parseFloat(s.obtained) || 0), 0);
  const remainingMax = remaining.reduce((sum, s) => sum + (parseFloat(s.maxMarks) || 0), 0);
  const predictedObtained = done.reduce((sum, s) => sum + (parseFloat(s.obtained) || 0), 0) + remaining.reduce((sum, s) => sum + (parseFloat(s.obtained) || (parseFloat(s.maxMarks) * 0.6)), 0);
  const currentPct = totalMax - remainingMax > 0 ? (totalObtained / (totalMax - remainingMax)) * 100 : 0;
  const target = parseFloat(targetPct) || 0;
  const needed = totalMax > 0 ? Math.max(0, target * totalMax / 100 - totalObtained) : 0;
  const neededPct = remainingMax > 0 ? (needed / remainingMax) * 100 : 0;
  const feasible = neededPct <= 100;

  return (
    <>
      <SEO title="Marks Predictor - Predict Your Final Score" description="Enter your marks for completed subjects and predict your final percentage. Find out minimum marks needed in remaining subjects." canonicalUrl="https://randomtoolbox.replit.app/marks-predictor" />
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg"><TrendingUp className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Marks Predictor</h1>
          </div>
          <p className="text-muted-foreground text-lg">Know where you stand and what you need to score.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Card className="border-2 shadow-lg">
              <CardContent className="p-6 space-y-3">
                <h2 className="font-semibold text-green-600 dark:text-green-400">Completed Subjects</h2>
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground font-semibold uppercase"><span>Name</span><span>Max</span><span>Scored</span></div>
                <AnimatePresence>
                  {subjects.filter(s => s.done).map(s => (
                    <motion.div key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-3 gap-2 items-center">
                      <Input value={s.name} onChange={e => update(s.id, "name", e.target.value)} className="h-9 text-sm" />
                      <Input type="number" value={s.maxMarks} onChange={e => update(s.id, "maxMarks", e.target.value)} className="h-9 text-sm" />
                      <div className="flex gap-1">
                        <Input type="number" value={s.obtained} onChange={e => update(s.id, "obtained", e.target.value)} placeholder="Got" className="h-9 text-sm flex-1" data-testid={`done-obtained-${s.id}`} />
                        <button onClick={() => remove(s.id)} className="text-muted-foreground hover:text-red-500 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <Button variant="outline" size="sm" onClick={() => add(true)} className="w-full border-dashed"><Plus className="w-3 h-3 mr-1" />Add Done Subject</Button>
              </CardContent>
            </Card>
            <Card className="border-2 shadow-lg">
              <CardContent className="p-6 space-y-3">
                <h2 className="font-semibold text-blue-600 dark:text-blue-400">Remaining Subjects</h2>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground font-semibold uppercase"><span>Name</span><span>Max Marks</span></div>
                <AnimatePresence>
                  {subjects.filter(s => !s.done).map(s => (
                    <motion.div key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-2 items-center">
                      <Input value={s.name} onChange={e => update(s.id, "name", e.target.value)} className="h-9 text-sm" />
                      <div className="flex gap-1">
                        <Input type="number" value={s.maxMarks} onChange={e => update(s.id, "maxMarks", e.target.value)} className="h-9 text-sm flex-1" />
                        <button onClick={() => remove(s.id)} className="text-muted-foreground hover:text-red-500 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <Button variant="outline" size="sm" onClick={() => add(false)} className="w-full border-dashed"><Plus className="w-3 h-3 mr-1" />Add Remaining Subject</Button>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            <Card className="border-2 shadow-lg">
              <CardContent className="p-6 space-y-4 text-center">
                <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Current Score</p>
                <div className="text-5xl font-display font-black text-emerald-500">{currentPct.toFixed(1)}%</div>
                <div className="text-muted-foreground text-sm">{totalObtained.toFixed(0)} / {(totalMax - remainingMax).toFixed(0)} marks done</div>
              </CardContent>
            </Card>
            <Card className="border-2 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Percentage</label>
                  <Input type="number" min="0" max="100" value={targetPct} onChange={e => setTargetPct(e.target.value)} className="h-11 text-center text-lg font-bold" />
                </div>
                {remainingMax > 0 && (
                  <div className={`p-4 rounded-xl border-2 text-center ${feasible ? "border-green-200 bg-green-50 dark:border-green-900/30 dark:bg-green-950/20" : "border-red-200 bg-red-50 dark:border-red-900/30 dark:bg-red-950/20"}`}>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Minimum needed in remaining subjects</p>
                    <div className={`text-4xl font-display font-black ${feasible ? "text-green-500" : "text-red-500"}`}>{neededPct.toFixed(1)}%</div>
                    <p className="text-sm text-muted-foreground mt-1">= {needed.toFixed(0)} out of {remainingMax.toFixed(0)} marks</p>
                    {!feasible && <p className="text-xs text-red-500 mt-2 font-medium">Target may not be achievable in remaining subjects alone.</p>}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
