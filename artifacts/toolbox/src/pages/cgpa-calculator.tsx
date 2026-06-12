import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Trash2, GraduationCap } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

interface Semester { id: number; name: string; gpa: string; credits: string; }

export default function CGPACalculator() {
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: 1, name: "Semester 1", gpa: "", credits: "" },
    { id: 2, name: "Semester 2", gpa: "", credits: "" },
  ]);
  const [scale, setScale] = useState<4 | 10>(10);
  let nextId = semesters.length + 1;

  const add = () => { setSemesters(s => [...s, { id: nextId++, name: `Semester ${s.length + 1}`, gpa: "", credits: "" }]); };
  const remove = (id: number) => { if (semesters.length <= 1) return; setSemesters(s => s.filter(x => x.id !== id)); };
  const update = (id: number, field: keyof Semester, value: string) => setSemesters(s => s.map(x => x.id === id ? { ...x, [field]: value } : x));

  const valid = semesters.filter(s => s.gpa !== "" && s.credits !== "" && !isNaN(parseFloat(s.gpa)) && !isNaN(parseFloat(s.credits)));
  const totalCredits = valid.reduce((sum, s) => sum + parseFloat(s.credits), 0);
  const weightedSum = valid.reduce((sum, s) => sum + parseFloat(s.gpa) * parseFloat(s.credits), 0);
  const cgpa = totalCredits > 0 ? weightedSum / totalCredits : 0;

  const classify = (g: number, s: 4 | 10) => {
    if (s === 10) {
      if (g >= 9) return { label: "Outstanding", color: "text-green-500" };
      if (g >= 8) return { label: "Distinction", color: "text-blue-500" };
      if (g >= 7) return { label: "First Class", color: "text-indigo-500" };
      if (g >= 6) return { label: "Second Class", color: "text-yellow-500" };
      if (g >= 5) return { label: "Pass", color: "text-orange-500" };
      return { label: "Fail", color: "text-red-500" };
    } else {
      if (g >= 3.7) return { label: "A / Dean's List", color: "text-green-500" };
      if (g >= 3.0) return { label: "B / Good Standing", color: "text-blue-500" };
      if (g >= 2.0) return { label: "C / Satisfactory", color: "text-yellow-500" };
      if (g >= 1.0) return { label: "D / Passing", color: "text-orange-500" };
      return { label: "F / Failing", color: "text-red-500" };
    }
  };

  const { label, color } = valid.length > 0 ? classify(cgpa, scale) : { label: "—", color: "text-muted-foreground" };

  return (
    <>
      <SEO title="CGPA Calculator - Cumulative GPA Calculator" description="Calculate your CGPA across multiple semesters. Supports both 4.0 and 10.0 GPA scales with credit-weighted calculations." canonicalUrl="https://randomtoolbox.replit.app/cgpa-calculator" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-lg"><GraduationCap className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">CGPA Calculator</h1>
          </div>
          <p className="text-muted-foreground text-lg">Calculate your cumulative GPA across all semesters.</p>
        </div>
        <div className="flex gap-3 items-center">
          <span className="text-sm font-medium">Scale:</span>
          {([10, 4] as const).map(s => (
            <button key={s} onClick={() => setScale(s)} className={`px-4 py-2 rounded-lg font-semibold text-sm border-2 transition-all ${scale === s ? "bg-violet-600 text-white border-violet-600" : "border-border hover:border-violet-300"}`}>{s}.0</button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 shadow-lg md:col-span-2">
            <CardContent className="p-6 space-y-3">
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
                <span>Semester</span><span>GPA (/{scale})</span><span>Credits</span>
              </div>
              <AnimatePresence>
                {semesters.map((s) => (
                  <motion.div key={s.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="grid grid-cols-3 gap-2 items-center">
                    <Input value={s.name} onChange={e => update(s.id, "name", e.target.value)} className="h-10 text-sm" />
                    <Input type="number" min="0" max={scale} step="0.01" value={s.gpa} onChange={e => update(s.id, "gpa", e.target.value)} placeholder={`0 - ${scale}`} className="h-10 text-sm" data-testid={`gpa-${s.id}`} />
                    <div className="flex gap-2">
                      <Input type="number" min="0" value={s.credits} onChange={e => update(s.id, "credits", e.target.value)} placeholder="Credits" className="h-10 text-sm flex-1" data-testid={`credits-${s.id}`} />
                      <button onClick={() => remove(s.id)} className="text-muted-foreground hover:text-destructive p-2"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <Button variant="outline" onClick={add} className="w-full border-dashed border-2 mt-2"><Plus className="w-4 h-4 mr-2" />Add Semester</Button>
            </CardContent>
          </Card>
          <div className="space-y-4">
            <Card className="border-2 shadow-lg text-center">
              <CardContent className="p-6 space-y-2">
                <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Your CGPA</p>
                <div className="text-6xl font-display font-black text-violet-500">{valid.length > 0 ? cgpa.toFixed(2) : "—"}</div>
                <div className={`font-semibold ${color}`}>{label}</div>
                <div className="text-sm text-muted-foreground mt-2">{totalCredits} total credits</div>
              </CardContent>
            </Card>
            <Card className="border-2 shadow-lg">
              <CardContent className="p-4 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Grade Scale ({scale}.0)</p>
                {scale === 10
                  ? [["9-10", "Outstanding"], ["8-9", "Distinction"], ["7-8", "First Class"], ["6-7", "Second Class"], ["5-6", "Pass"]].map(([r, l]) => <div key={r} className="flex justify-between text-xs"><span className="font-mono">{r}</span><span>{l}</span></div>)
                  : [["3.7-4.0", "A"], ["3.0-3.7", "B"], ["2.0-3.0", "C"], ["1.0-2.0", "D"], ["<1.0", "F"]].map(([r, l]) => <div key={r} className="flex justify-between text-xs"><span className="font-mono">{r}</span><span>{l}</span></div>)
                }
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
