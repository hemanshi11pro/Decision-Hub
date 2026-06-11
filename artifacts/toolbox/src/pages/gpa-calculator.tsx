import { useState, useMemo } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Link } from "wouter";

type Course = {
  id: string;
  name: string;
  credits: number;
  grade: string;
};

const GRADE_SCALE: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "F": 0.0
};

export default function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "", credits: 3, grade: "A" },
    { id: "2", name: "", credits: 3, grade: "B" },
    { id: "3", name: "", credits: 4, grade: "A-" }
  ]);

  const addCourse = () => {
    setCourses([...courses, { id: Date.now().toString(), name: "", credits: 3, grade: "A" }]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const { gpa, totalCredits } = useMemo(() => {
    let totalPoints = 0;
    let credits = 0;

    courses.forEach(c => {
      const g = GRADE_SCALE[c.grade] || 0;
      totalPoints += g * c.credits;
      credits += c.credits;
    });

    return {
      gpa: credits > 0 ? (totalPoints / credits).toFixed(2) : "0.00",
      totalCredits: credits
    };
  }, [courses]);

  return (
    <>
      <SEO 
        title="GPA Calculator - Calculate Weighted College/High School GPA"
        description="Free online GPA calculator. Add your classes, credits, and grades to instantly calculate your weighted GPA on a 4.0 scale."
        canonicalUrl="https://randomtoolbox.replit.app/gpa-calculator"
      />
      
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-lg">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">GPA Calculator</h1>
          </div>
          <p className="text-muted-foreground text-lg">Calculate your GPA easily on a standard 4.0 scale.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="hidden md:grid grid-cols-12 gap-4 mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  <div className="col-span-5">Course Name</div>
                  <div className="col-span-3">Credits</div>
                  <div className="col-span-3">Grade</div>
                  <div className="col-span-1"></div>
                </div>

                <div className="space-y-4">
                  {courses.map((course, index) => (
                    <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-muted/30 p-4 md:p-0 md:bg-transparent rounded-lg border md:border-none">
                      <div className="md:col-span-5">
                        <label className="text-xs font-medium md:hidden mb-1 block">Course</label>
                        <Input 
                          placeholder={`Course ${index + 1}`} 
                          value={course.name}
                          onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="text-xs font-medium md:hidden mb-1 block">Credits</label>
                        <Input 
                          type="number" 
                          min="0"
                          step="0.5"
                          value={course.credits}
                          onChange={(e) => updateCourse(course.id, "credits", parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="text-xs font-medium md:hidden mb-1 block">Grade</label>
                        <Select value={course.grade} onValueChange={(v) => updateCourse(course.id, "grade", v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(GRADE_SCALE).map(g => (
                              <SelectItem key={g} value={g}>{g}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-1 flex justify-end">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeCourse(course.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-6 border-dashed border-2" onClick={addCourse}>
                  <Plus className="w-4 h-4 mr-2" /> Add Course
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card className="border-2 shadow-lg bg-sky-50 dark:bg-sky-950/20 sticky top-24 border-sky-100 dark:border-sky-900/50">
              <CardHeader>
                <CardTitle className="text-center font-display">Results</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Total GPA</h3>
                  <div className="text-6xl font-display font-black text-sky-600 dark:text-sky-400">
                    {gpa}
                  </div>
                </div>
                <div className="pt-4 border-t border-sky-200 dark:border-sky-800">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">Total Credits</h3>
                  <div className="text-2xl font-bold text-foreground">
                    {totalCredits}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}