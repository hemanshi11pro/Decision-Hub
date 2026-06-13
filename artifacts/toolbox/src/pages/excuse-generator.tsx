import { useState, useRef } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ArrowLeft, Copy, Check } from "lucide-react";
import { Link } from "wouter";

type Situation = "late" | "skip_work" | "cancel_plans" | "miss_call" | "not_texting" | "homework" | "skip_gym" | "avoid_event";
type Style = "believable" | "funny" | "dramatic" | "genius";

interface Excuse { text: string; rating: string; }

const EXCUSES: Record<Situation, Record<Style, Excuse[]>> = {
  late: {
    believable: [
      { text: "My alarm went off but I didn't hear it because my phone was on silent from a late meeting yesterday — I'm so sorry, I'm on my way now.", rating: "🟢 Very Believable" },
      { text: "There was a massive accident on the highway. Traffic was completely at a standstill for 45 minutes. I should have left earlier, I know.", rating: "🟢 Very Believable" },
      { text: "I had a last-minute call I couldn't ignore — it ran way longer than expected. I've been trying to wrap up as fast as I can.", rating: "🟢 Very Believable" },
    ],
    funny: [
      { text: "I was completely on time, but then a dog started following me and I couldn't just leave him. He's fine now. I am late.", rating: "😂 Chaotic" },
      { text: "I set 14 alarms. I slept through 13 of them. The 14th I turned off because I thought it was a mistake.", rating: "😂 Relatable Disaster" },
      { text: "I got dressed, got in my car, and then realised I wasn't wearing shoes. I cannot explain this.", rating: "😂 Legendary Excuse" },
    ],
    dramatic: [
      { text: "My morning collapsed spectacularly. I won't go into detail but it involved a broken mirror, a missing key, and a seagull. I'll explain later.", rating: "🎭 Dramatic but Real Energy" },
      { text: "I was running perfectly on time until the universe decided otherwise. I'm 12 minutes away and full of regret.", rating: "🎭 Poetic" },
    ],
    genius: [
      { text: "I was actually here early, but I was waiting in the parking lot preparing mentally. Time management is complex.", rating: "🧠 Unhinged Logic" },
      { text: "Technically I'm not late — I'm operating on a different time zone in my head. I'm working on synchronising.", rating: "🧠 Bold Move" },
    ],
  },
  skip_work: {
    believable: [
      { text: "I woke up with a really bad migraine — the kind that makes it impossible to look at a screen. I've taken something and I'm going to rest. I'll be available by email if anything urgent comes up.", rating: "🟢 Classic and Solid" },
      { text: "My [family member] had a medical appointment and the person who was supposed to take them cancelled last minute. I need to step in today.", rating: "🟢 Sympathetic" },
      { text: "I've been battling something since last night — fever, chills, the works. I don't want to bring anything into the office. I'll work from home as much as I can.", rating: "🟢 Responsible Energy" },
    ],
    funny: [
      { text: "I can't come in today. My cat has scheduled a very important nap and I'm the designated surface. I have no choice in this matter.", rating: "😂 Valid Reason Actually" },
      { text: "I am working from home today. My home is my bed. I am the most productive person in this bed right now.", rating: "😂 At Least You're Honest" },
    ],
    dramatic: [
      { text: "My body has voted unanimously to not participate in today. The motion passed 37-0 (I counted my organs). Rest is required.", rating: "🎭 Actually Iconic" },
      { text: "After careful consultation with myself, I have concluded that today is a recovery day. I will emerge stronger on [day].", rating: "🎭 Corporate but Chaotic" },
    ],
    genius: [
      { text: "I'm actually doing remote strategy today — just not in a location with WiFi. Consider it a thinking retreat. Results TBD.", rating: "🧠 Ambitious" },
      { text: "I'm taking a mental health day. This is legally and morally equivalent to a sick day. I will be back tomorrow with 40% more output.", rating: "🧠 Research-Backed (Sort Of)" },
    ],
  },
  cancel_plans: {
    believable: [
      { text: "I'm so sorry — something came up at home that I can't get out of. I really didn't want to cancel, can we reschedule for next week?", rating: "🟢 Warm and Vague (Safe)" },
      { text: "I've been feeling rough all day and I don't want to push through and be bad company. Rain check? I'll make it up to you.", rating: "🟢 Honest and Kind" },
      { text: "A family thing came up unexpectedly and I have to be there. I hate doing this — can we do [alternative day] instead?", rating: "🟢 Sympathetic" },
    ],
    funny: [
      { text: "I was fully committed to coming, but I sat on the couch for 'just five minutes' and now I'm part of the couch. It's structural at this point.", rating: "😂 Tragically Relatable" },
      { text: "I can't make it — I've entered a paralysis state where I'm physically incapable of putting shoes on. It happens.", rating: "😂 We've All Been There" },
    ],
    dramatic: [
      { text: "Something has come up that requires my full presence and I am devastated to miss this. You are my people. I will grieve this cancellation.", rating: "🎭 Theatrical but Endearing" },
      { text: "Life has, once again, arrived uninvited and redirected my evening. I'm sorry. Save me a story.", rating: "🎭 Poetic Cancellation" },
    ],
    genius: [
      { text: "I'm actually doing you a favour — I wasn't going to be at my best tonight and you deserve my A-game. Next time. 100%.", rating: "🧠 Oddly Complimentary" },
      { text: "I'm cancelling in the interest of mystery. Absence makes the heart grow fonder. You'll appreciate me more next time.", rating: "🧠 Bold Reframe" },
    ],
  },
  miss_call: {
    believable: [
      { text: "So sorry I missed you — I was in a meeting with my phone face-down and only just saw the missed call. Calling you back now/What's up?", rating: "🟢 Clean and Simple" },
      { text: "I was driving and couldn't pick up safely. Everything okay? Let me know when you're free to talk.", rating: "🟢 Responsible and Caring" },
      { text: "My phone was on silent from earlier and I only just noticed! Sorry — is everything alright?", rating: "🟢 Relatable" },
    ],
    funny: [
      { text: "I was in the middle of something extremely important (eating a snack and watching something) and couldn't pause. All good on my end. What's up?", rating: "😂 At Least It's True" },
      { text: "I saw the call. I was mentally preparing to answer. By the time I was ready, it had stopped ringing. I'm working on my response time.", rating: "😂 Phone Anxiety Haver" },
    ],
    dramatic: [
      { text: "I was unreachable for a moment — life pulled me away. But I'm here now. What did you need?", rating: "🎭 Mysteriously Calm" },
    ],
    genius: [
      { text: "I actually let it ring on purpose to create suspense. Classic engagement strategy. Now you're thinking about me. It worked.", rating: "🧠 Actually Unhinged" },
    ],
  },
  not_texting: {
    believable: [
      { text: "Sorry, I've been completely swamped — it's been one of those weeks where the days just vanish. How are you?", rating: "🟢 Universal Truth" },
      { text: "My phone has been a mess lately and I keep meaning to reply and then getting pulled into something. Not ignoring you at all!", rating: "🟢 Believable" },
      { text: "I saw your message and opened it to reply, then got distracted and forgot to actually send anything. Classic me — sorry!", rating: "🟢 Honest and Familiar" },
    ],
    funny: [
      { text: "I entered a flow state at approximately 2pm and only just re-emerged. I am back in society. How are you.", rating: "😂 Dramatic but Valid" },
      { text: "I was going to text but then I didn't, and then time passed, and now here we are. I'm sorry. It's very on-brand for me.", rating: "😂 Self-Aware" },
    ],
    dramatic: [
      { text: "The days have been a blur and I've been moving on instinct alone. I've surfaced. Tell me everything.", rating: "🎭 They'll Forgive You" },
    ],
    genius: [
      { text: "I was giving your last message the weight it deserved. You can't rush a proper response. Here I am. Worth the wait.", rating: "🧠 Surprisingly Smooth" },
    ],
  },
  homework: {
    believable: [
      { text: "I had a family emergency last night and couldn't finish it. I have everything drafted — can I submit it by end of day?", rating: "🟢 Sympathy Points" },
      { text: "I was at the library until late and my laptop battery died. I didn't have my charger and couldn't finish. It won't happen again.", rating: "🟢 Specific = Believable" },
      { text: "I was dealing with a pretty bad migraine and couldn't look at screens. I have most of it done — can I hand it in tomorrow?", rating: "🟢 Sympathetic" },
    ],
    funny: [
      { text: "My Wi-Fi went down at 11:47pm, which is technically not my fault. I'm going to need you to see this from my perspective.", rating: "😂 Classic" },
      { text: "I did the homework. It just didn't make it here. The homework is in a better place now. Can I redo it?", rating: "😂 Chaotic" },
    ],
    dramatic: [
      { text: "The assignment was completed. Between completion and now, a series of unfortunate events unfolded. I cannot elaborate further. Extension please.", rating: "🎭 Bold Strategy" },
    ],
    genius: [
      { text: "I completed a rough draft but wanted to submit work that truly reflected my understanding. Quality over deadline. I'll have it to you by [time].", rating: "🧠 Actually Might Work" },
    ],
  },
  skip_gym: {
    believable: [
      { text: "My knee has been bugging me since yesterday and I don't want to make it worse. Rest day today, back on it tomorrow.", rating: "🟢 Responsible" },
      { text: "Genuinely exhausted — slept terribly and I know if I push through I'll just half-do the session. Better to sleep and come back strong.", rating: "🟢 Evidence-Based" },
    ],
    funny: [
      { text: "My body and I had a meeting about the gym today and the vote was 0 in favour. Democracy in action.", rating: "😂 Respecting the Process" },
      { text: "I'm doing an active rest day. The activity is lying down. The rest is also lying down. It's a comprehensive programme.", rating: "😂 Ironclad Logic" },
    ],
    dramatic: [
      { text: "My muscles reached out and asked for a day off. I believe in listening to the body. Tomorrow I will return. Stronger. Perhaps.", rating: "🎭 Athlete Mindset" },
    ],
    genius: [
      { text: "Rest is training. I'm training today. Hard.", rating: "🧠 Actually True Though" },
    ],
  },
  avoid_event: {
    believable: [
      { text: "I'm so sorry — I already have something I committed to months ago that I completely forgot about until now. I feel terrible about it.", rating: "🟢 Classic Double-Book" },
      { text: "My [partner/parent/friend] isn't well and I need to stay close to home this weekend. I hope it's an amazing event!", rating: "🟢 Family Always Works" },
      { text: "I've been fighting something all week and I don't want to show up and be around people while I'm under the weather.", rating: "🟢 Considerate Framing" },
    ],
    funny: [
      { text: "I have a prior engagement with my couch that has been on the books for weeks. It would be rude to cancel at this stage.", rating: "😂 The Couch Deserves Respect" },
      { text: "My social battery is at 3% and I've been advised not to use it in large gatherings. Doctor's orders (I am the doctor).", rating: "😂 Reasonable Actually" },
    ],
    dramatic: [
      { text: "I cannot make it, and I want you to know this breaks something in me. Please take photos. I will study them and pretend I was there.", rating: "🎭 Deeply Sincere" },
    ],
    genius: [
      { text: "My absence this time will make my presence at the next one even more celebrated. Think of it as scarcity marketing for my friendship.", rating: "🧠 Branding Strategy" },
    ],
  },
};

function getRandomUnique(arr: Excuse[], exclude: Excuse | null): Excuse {
  if (arr.length <= 1) return arr[0];
  let pick: Excuse;
  let attempts = 0;
  do { pick = arr[Math.floor(Math.random() * arr.length)]; attempts++; } while (pick === exclude && attempts < 10);
  return pick;
}

export default function ExcuseGenerator() {
  const [situation, setSituation] = useState<Situation>("cancel_plans");
  const [style, setStyle] = useState<Style>("believable");
  const [result, setResult] = useState<Excuse | null>(null);
  const [resultKey, setResultKey] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [copied, setCopied] = useState(false);
  const last = useRef<Excuse | null>(null);

  const generate = () => {
    setIsThinking(true);
    setResult(null);
    setTimeout(() => {
      const pool = EXCUSES[situation]?.[style] ?? EXCUSES.cancel_plans.believable;
      const pick = getRandomUnique(pool, last.current);
      last.current = pick;
      setResult(pick);
      setResultKey(k => k + 1);
      setIsThinking(false);
    }, 1800);
  };

  const copy = () => {
    if (result) { navigator.clipboard.writeText(result.text); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  };

  return (
    <>
      <SEO title="Excuse Generator - Get the Perfect Excuse Instantly" description="Generate the perfect excuse for any situation. Believable, funny, dramatic, or genius — free excuse generator for every awkward moment." canonicalUrl="https://randomtoolbox.replit.app/excuse-generator" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg"><MessageSquare className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Excuse Generator</h1>
          </div>
          <p className="text-muted-foreground text-lg">Pick a situation and style — get the perfect excuse instantly.</p>
        </div>
        <Card className="border-2 shadow-lg">
          <CardContent className="p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Situation</label>
                <Select value={situation} onValueChange={(v) => { setSituation(v as Situation); setResult(null); last.current = null; }}>
                  <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="late">I'm running late ⏰</SelectItem>
                    <SelectItem value="skip_work">Skipping work/class 🏠</SelectItem>
                    <SelectItem value="cancel_plans">Cancelling plans 💨</SelectItem>
                    <SelectItem value="miss_call">Missed a call 📵</SelectItem>
                    <SelectItem value="not_texting">Not texting back 📱</SelectItem>
                    <SelectItem value="homework">Didn't do homework 📚</SelectItem>
                    <SelectItem value="skip_gym">Skipping the gym 🏋️</SelectItem>
                    <SelectItem value="avoid_event">Avoiding an event 🎉</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Excuse Style</label>
                <Select value={style} onValueChange={(v) => { setStyle(v as Style); setResult(null); last.current = null; }}>
                  <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="believable">Believable 🟢</SelectItem>
                    <SelectItem value="funny">Funny 😂</SelectItem>
                    <SelectItem value="dramatic">Dramatic 🎭</SelectItem>
                    <SelectItem value="genius">Genius Logic 🧠</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="min-h-[160px] flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                {isThinking ? (
                  <motion.div key="thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute flex flex-col items-center gap-3">
                    <MessageSquare className="w-10 h-10 text-amber-500 animate-pulse" />
                    <p className="text-muted-foreground animate-pulse font-medium">Crafting your excuse...</p>
                  </motion.div>
                ) : result ? (
                  <motion.div key={`r-${resultKey}`} initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className="absolute w-full space-y-3">
                    <div className="bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-100 dark:border-amber-900/30 rounded-2xl p-5">
                      <p className="text-foreground text-base leading-relaxed font-medium">"{result.text}"</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">{result.rating}</span>
                      <Button variant="ghost" size="sm" onClick={copy} className="h-8 gap-1.5 text-xs">
                        {copied ? <><Check className="w-3.5 h-3.5 text-green-500" />Copied!</> : <><Copy className="w-3.5 h-3.5" />Copy Excuse</>}
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute text-center text-muted-foreground">
                    <MessageSquare className="w-12 h-12 opacity-20 mx-auto mb-2" />
                    <p className="opacity-40 text-sm">Your excuse will appear here</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Button size="lg" className="w-full h-14 text-lg rounded-xl bg-amber-500 hover:bg-amber-600 text-white" onClick={generate} disabled={isThinking} data-testid="button-generate">
              {isThinking ? "Crafting..." : result ? "Generate Another" : "Generate Excuse"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
