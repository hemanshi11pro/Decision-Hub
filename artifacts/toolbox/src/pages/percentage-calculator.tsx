import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Percent, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function PercentageCalculator() {
  // Mode 1: What is X% of Y?
  const [m1X, setM1X] = useState("");
  const [m1Y, setM1Y] = useState("");
  const m1Result = m1X && m1Y ? (parseFloat(m1X) / 100) * parseFloat(m1Y) : null;

  // Mode 2: X is what % of Y?
  const [m2X, setM2X] = useState("");
  const [m2Y, setM2Y] = useState("");
  const m2Result = m2X && m2Y && parseFloat(m2Y) !== 0 ? (parseFloat(m2X) / parseFloat(m2Y)) * 100 : null;

  // Mode 3: X is Y% of what?
  const [m3X, setM3X] = useState("");
  const [m3Y, setM3Y] = useState("");
  const m3Result = m3X && m3Y && parseFloat(m3Y) !== 0 ? parseFloat(m3X) / (parseFloat(m3Y) / 100) : null;

  const formatNumber = (num: number | null) => {
    if (num === null) return "—";
    return Number.isInteger(num) ? num.toString() : num.toFixed(2);
  };

  return (
    <>
      <SEO 
        title="Percentage Calculator - Quick Math Solver"
        description="Free online percentage calculator. Solve problems like 'What is X% of Y?', 'X is what % of Y?', and calculate percentage changes instantly."
        canonicalUrl="https://randomtoolbox.replit.app/percentage-calculator"
      />
      
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <Percent className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Percentage Calculator</h1>
          </div>
          <p className="text-muted-foreground text-lg">Instant answers for everyday percentage math.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="border-2 shadow-sm border-l-4 border-l-emerald-500">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-4 text-lg">
                <span className="font-medium whitespace-nowrap">What is</span>
                <Input type="number" placeholder="X" value={m1X} onChange={e => setM1X(e.target.value)} className="w-24 text-center font-bold text-lg" />
                <span className="font-medium whitespace-nowrap">% of</span>
                <Input type="number" placeholder="Y" value={m1Y} onChange={e => setM1Y(e.target.value)} className="w-32 text-center font-bold text-lg" />
                <span className="font-medium text-2xl mx-2">?</span>
                <div className="flex-1 w-full md:w-auto text-center md:text-right">
                  <span className="text-3xl md:text-4xl font-display font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-4 py-2 rounded-xl inline-block min-w-[120px]">
                    {formatNumber(m1Result)}
                  </span>
                </div>
              </div>
              {m1Result !== null && (
                <p className="text-sm text-muted-foreground mt-4 text-center md:text-left">
                  Formula: ({m1X} / 100) × {m1Y} = {formatNumber(m1Result)}
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-2 shadow-sm border-l-4 border-l-emerald-500">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-4 text-lg">
                <Input type="number" placeholder="X" value={m2X} onChange={e => setM2X(e.target.value)} className="w-32 text-center font-bold text-lg" />
                <span className="font-medium whitespace-nowrap">is what % of</span>
                <Input type="number" placeholder="Y" value={m2Y} onChange={e => setM2Y(e.target.value)} className="w-32 text-center font-bold text-lg" />
                <span className="font-medium text-2xl mx-2">?</span>
                <div className="flex-1 w-full md:w-auto text-center md:text-right">
                  <span className="text-3xl md:text-4xl font-display font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-4 py-2 rounded-xl inline-block min-w-[120px]">
                    {formatNumber(m2Result)}%
                  </span>
                </div>
              </div>
              {m2Result !== null && (
                <p className="text-sm text-muted-foreground mt-4 text-center md:text-left">
                  Formula: ({m2X} / {m2Y}) × 100 = {formatNumber(m2Result)}%
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-2 shadow-sm border-l-4 border-l-emerald-500">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-4 text-lg">
                <Input type="number" placeholder="X" value={m3X} onChange={e => setM3X(e.target.value)} className="w-32 text-center font-bold text-lg" />
                <span className="font-medium whitespace-nowrap">is</span>
                <Input type="number" placeholder="Y" value={m3Y} onChange={e => setM3Y(e.target.value)} className="w-24 text-center font-bold text-lg" />
                <span className="font-medium whitespace-nowrap">% of what?</span>
                <div className="flex-1 w-full md:w-auto text-center md:text-right">
                  <span className="text-3xl md:text-4xl font-display font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-4 py-2 rounded-xl inline-block min-w-[120px]">
                    {formatNumber(m3Result)}
                  </span>
                </div>
              </div>
              {m3Result !== null && (
                <p className="text-sm text-muted-foreground mt-4 text-center md:text-left">
                  Formula: {m3X} / ({m3Y} / 100) = {formatNumber(m3Result)}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}