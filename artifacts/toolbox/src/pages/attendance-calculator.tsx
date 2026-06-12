import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function AttendanceCalculator() {
  const [total, setTotal] = useState("");
  const [attended, setAttended] = useState("");
  const [target, setTarget] = useState("75");
  const [extraAttend, setExtraAttend] = useState("");
  const [extraMiss, setExtraMiss] = useState("");

  const T = parseInt(total) || 0;
  const A = parseInt(attended) || 0;
  const Tgt = parseFloat(target) || 75;

  const pct = T > 0 ? (A / T) * 100 : 0;
  const safe = pct >= Tgt;
  const danger = pct < Tgt && pct >= Tgt - 5;

  const classesNeeded = T > 0 && pct < Tgt
    ? Math.ceil((Tgt * T - 100 * A) / (100 - Tgt))
    : 0;

  const canMiss = T > 0 && pct >= Tgt
    ? Math.floor((100 * A - Tgt * T) / Tgt)
    : 0;

  const EA = parseInt(extraAttend) || 0;
  const EM = parseInt(extraMiss) || 0;
  const afterAttend = T + EA > 0 ? ((A + EA) / (T + EA)) * 100 : 0;
  const afterMiss = T + EM > 0 ? (A / (T + EM)) * 100 : 0;

  const status = pct >= Tgt ? "safe" : pct >= Tgt - 10 ? "warning" : "danger";
  const statusColor = status === "safe" ? "text-green-500" : status === "warning" ? "text-yellow-500" : "text-red-500";
  const StatusIcon = status === "safe" ? CheckCircle : status === "warning" ? AlertCircle : XCircle;

  return (
    <>
      <SEO title="Attendance Calculator - Check Your Attendance Percentage" description="Calculate your current attendance percentage, see how many classes you can miss, and find out how many you need to attend to meet your target." canonicalUrl="https://randomtoolbox.replit.app/attendance-calculator" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Attendance Calculator</h1>
          </div>
          <p className="text-muted-foreground text-lg">Stay on top of your attendance before it's too late.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-2 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold text-lg">Enter Details</h2>
              <div className="space-y-2">
                <label className="text-sm font-medium">Total Classes Held</label>
                <Input type="number" min="0" value={total} onChange={e => setTotal(e.target.value)} placeholder="e.g. 80" className="h-11" data-testid="input-total" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Classes Attended</label>
                <Input type="number" min="0" value={attended} onChange={e => setAttended(e.target.value)} placeholder="e.g. 65" className="h-11" data-testid="input-attended" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Attendance %</label>
                <Input type="number" min="1" max="100" value={target} onChange={e => setTarget(e.target.value)} className="h-11" data-testid="input-target" />
              </div>
            </CardContent>
          </Card>
          <div className="space-y-4">
            {T > 0 && A >= 0 && (
              <Card className="border-2 shadow-lg">
                <CardContent className="p-6 text-center space-y-2">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Current Attendance</p>
                  <div className={`text-6xl font-display font-black ${statusColor}`}>{pct.toFixed(1)}%</div>
                  <div className={`flex items-center justify-center gap-2 font-semibold ${statusColor}`}>
                    <StatusIcon className="w-5 h-5" />
                    {status === "safe" ? "You're Safe" : status === "warning" ? "Getting Risky" : "Critical — Act Now"}
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 mt-3">
                    <div className={`h-3 rounded-full transition-all ${status === "safe" ? "bg-green-500" : status === "warning" ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                </CardContent>
              </Card>
            )}
            {T > 0 && (
              <Card className="border-2 shadow-lg">
                <CardContent className="p-6 space-y-3">
                  {safe ? (
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-sm font-medium">Classes you can still miss</span>
                      <span className="text-xl font-bold text-green-500">{canMiss}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-sm font-medium">Classes needed to reach {Tgt}%</span>
                      <span className="text-xl font-bold text-red-500">{classesNeeded}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm font-medium">Attended / Total</span>
                    <span className="font-bold">{A} / {T}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        {T > 0 && (
          <Card className="border-2 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold">What If Calculator</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">If I attend X more classes</label>
                  <Input type="number" min="0" value={extraAttend} onChange={e => setExtraAttend(e.target.value)} placeholder="e.g. 5" className="h-11" data-testid="input-extra-attend" />
                  {EA > 0 && <p className={`text-sm font-semibold ${afterAttend >= Tgt ? "text-green-500" : "text-red-500"}`}>New: {afterAttend.toFixed(1)}%</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">If I miss X more classes</label>
                  <Input type="number" min="0" value={extraMiss} onChange={e => setExtraMiss(e.target.value)} placeholder="e.g. 3" className="h-11" data-testid="input-extra-miss" />
                  {EM > 0 && <p className={`text-sm font-semibold ${afterMiss >= Tgt ? "text-green-500" : "text-red-500"}`}>New: {afterMiss.toFixed(1)}%</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
