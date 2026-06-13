import { useState, useRef } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

interface Challenge { title: string; desc: string; }

const CHALLENGES: Record<string, Challenge[]> = {
  daily: [
    { title: "Morning Compliment Exchange", desc: "Every morning, text or say one genuine compliment to your partner before either of you checks social media." },
    { title: "Phone-Free Dinner", desc: "For 30 days, put all phones in another room during dinner. Full attention, full presence." },
    { title: "2-Minute Appreciation", desc: "Each evening, tell your partner two specific things you appreciated about them that day — not generic, really specific." },
    { title: "Hug for 7 Seconds", desc: "Research shows 7-second hugs release oxytocin. Give each other at least one long hug every day for a month." },
    { title: "Learn One Thing Together Daily", desc: "Pick a topic (history, science, art) and spend 10 minutes each day reading or watching something about it together." },
    { title: "Surprise Note Day", desc: "Leave one handwritten note for your partner in a random spot every day for a week." },
    { title: "The 10-Minute Walk", desc: "Take a 10-minute evening walk together with no destination and no phones. Just talk or walk in comfortable silence." },
    { title: "Cook One New Recipe a Week", desc: "Every week for a month, cook a dish you've never made before — different cuisine each time." },
    { title: "Gratitude Jar", desc: "Each day, both write one thing you're grateful for about your relationship on a slip of paper. Open and read them together at the end of the month." },
    { title: "Ask a Deep Question", desc: "Each evening, take turns asking each other one question from a 'conversation starter' deck. Go deeper than 'how was your day'." },
  ],
  weekly: [
    { title: "Recreate Your First Date", desc: "Plan a date that recreates your very first date as closely as possible — same place, same food, same outfit if you can." },
    { title: "Swap Playlists", desc: "Each person creates a playlist of 20 songs that feel like 'them' right now. Listen to each other's playlists this week and discuss." },
    { title: "Tech Detox Saturday", desc: "Pick one Saturday to go completely phone and screen-free from 9am to 9pm. Fill the day with physical activities and real conversation." },
    { title: "Bucket List Date", desc: "Pick one item from your shared bucket list and actually schedule it this week." },
    { title: "Role Reversal Day", desc: "For one full day, each of you takes over the other's usual responsibilities around the house." },
    { title: "Love Language Experiment", desc: "Spend one full week actively speaking only your partner's love language — words, touch, acts of service, gifts, or quality time." },
    { title: "30-Day Fitness Challenge", desc: "Pick a shared fitness goal (10,000 steps a day, daily yoga, 20 push-ups) and do it together every day for 30 days." },
    { title: "Weekly Check-In Meeting", desc: "Once a week, sit down and do a relationship 'check-in' — what went well, what could be better, one thing to do next week." },
    { title: "Teach Each Other Something", desc: "Each person teaches the other something they know — a skill, a recipe, a game, a workout. Switch roles each week." },
    { title: "Acts of Service Week", desc: "For one full week, compete to do the most thoughtful acts of service for each other — making coffee, running errands, organising their things." },
  ],
  creative: [
    { title: "Write a Song Together", desc: "Even if neither of you can sing, write a silly or heartfelt song together. Doesn't have to be good — just has to be yours." },
    { title: "Create a Scrapbook Page", desc: "Together, make one scrapbook page about your relationship using photos, ticket stubs, notes, and drawings." },
    { title: "Make a Couple's Bucket List", desc: "Sit down and write 50 things you want to do together in your lifetime. Include big dreams and small everyday moments." },
    { title: "Paint Something Together", desc: "Buy cheap canvases and paint something simultaneously. Frame and hang them." },
    { title: "Film a Day-in-the-Life Vlog", desc: "Film one full day together in vlog-style and edit it into a short video. Watch it together every anniversary." },
    { title: "Write Each Other Letters", desc: "Write a handwritten letter to your partner — seal it and agree not to open it for 6 months or on a milestone occasion." },
    { title: "Choreograph a Dance", desc: "Learn or make up a short dance routine together and perform it — even just for each other." },
    { title: "Design Your Dream Home", desc: "Spend an afternoon making a Pinterest board or sketching out your dream home together — every room, every detail." },
    { title: "Write Your Love Story", desc: "Both of you write the story of how you met and fell in love — independently — then compare." },
    { title: "Start a Joint Creative Project", desc: "Begin something together: a podcast, a blog, a zine, a YouTube channel — commit to doing at least 3 episodes or posts." },
  ],
  adventurous: [
    { title: "Visit 5 New Places This Month", desc: "Each week, visit one place neither of you has been before — a new restaurant, neighbourhood, park, town, or city." },
    { title: "Spontaneous Weekend Trip", desc: "Pack a bag on Friday night without planning. Drive in a random direction and see where you end up by Saturday morning." },
    { title: "Try a Fear Together", desc: "Each person shares something they're slightly afraid of (heights, water, spicy food) and you face them together, one per month." },
    { title: "Sign Up for a Race", desc: "Enter a 5K, charity walk, obstacle course, or cycling race together and train for it over the next month." },
    { title: "Try 5 New Foods in a Week", desc: "Each day of the week, try one food neither of you has eaten before." },
    { title: "Learn a New Skill Together", desc: "Sign up for a class in something you both know nothing about: pottery, salsa dancing, rock climbing, archery." },
    { title: "Sleep Under the Stars", desc: "Book a camping trip or set up in your backyard and sleep outside overnight." },
    { title: "Say Yes to Everything for 24 Hours", desc: "For one day, say yes to every safe, reasonable suggestion your partner makes." },
  ],
  romantic: [
    { title: "Recreate Your Favourite Photo", desc: "Find an old photo of you two and recreate it exactly — same poses, same outfits, same location if possible." },
    { title: "Love Letter Month", desc: "Write each other one love letter per week for a month. Handwritten, sealed, delivered. Keep them all." },
    { title: "Sunrise Watch Together", desc: "Set an alarm and watch the sunrise together. Talk about what you're both looking forward to." },
    { title: "Dress Up for No Reason", desc: "Get dressed like you're going somewhere fancy — then stay home, make a fancy dinner, and enjoy the evening." },
    { title: "Memory Lane Drive", desc: "Drive together to every place that was meaningful in your relationship — first meeting, first date, first kiss, etc." },
    { title: "Create a 'Us' Playlist", desc: "Together, curate the definitive playlist of your relationship — songs that were playing at important moments." },
    { title: "Give Each Other a Spa Night", desc: "Take turns: one partner gives the other a full relaxation night — foot rub, face mask, favourite movie, their choice of dinner." },
    { title: "Stargaze and Dream Together", desc: "Lie outside on blankets, look at the stars, and take turns sharing your biggest dreams for the next 5 years." },
  ],
  silly: [
    { title: "Blindfolded Cooking Challenge", desc: "One person is blindfolded, the other gives verbal instructions only. Cook a simple meal this way. Eat whatever happens." },
    { title: "Impression Contest", desc: "Take turns doing impressions of each other or celebrities. The more accurate (and embarrassing), the better." },
    { title: "Bad Movie Night", desc: "Watch the worst-rated movie you can find. Award points for every unintentionally funny moment." },
    { title: "Who Knows Their Partner Better?", desc: "Each write down 10 questions about yourself. Quiz each other. The one with more correct answers wins a back massage." },
    { title: "Dramatic Reading Night", desc: "Take a normal book or article and take turns reading it aloud as dramatically as possible." },
    { title: "TikTok Dance Challenge", desc: "Pick a trending dance and learn it together in 30 minutes. Film the attempt. Keep the video forever." },
    { title: "Build a LEGO Set Together", desc: "Buy a LEGO set and build it together. No arguing over the instructions allowed — that's the actual challenge." },
    { title: "Karaoke Night at Home", desc: "Pull up a karaoke app, pick songs for each other (including ones you know they'll struggle with), and perform." },
    { title: "Art Museum in Your Living Room", desc: "Draw or paint portraits of each other in 5 minutes. Display them on the wall. Never throw them away." },
    { title: "Reverse Compliments", desc: "Take turns giving each other exaggerated, over-the-top compliments for 5 minutes. Absolutely unhinged flattery only." },
  ],
  spicy: [
    { title: "Strip Spoon Game", desc: "Play spoons with a deck of cards. The twist — whoever loses a round removes one item of clothing. First one fully dressed at the end wins a massage from the other." },
    { title: "Dare Jenga", desc: "Write a spicy dare on each Jenga block. When a block falls, the person who pulled it has to do what it says — or forfeit an item of clothing." },
    { title: "21 Questions — No Limits", desc: "Take turns asking each other 21 questions with zero topic off-limits. You must answer honestly or strip." },
    { title: "Two Truths One Lie — Strip Edition", desc: "Classic two truths and a lie. Guess wrong and you remove something. First one to guess 5 correctly wins." },
    { title: "Blindfold & Guess", desc: "Blindfold one partner. Use your hands, lips, or an object of your choice — they have to guess what it is." },
    { title: "Dare or Dare", desc: "No truths — both partners take turns giving each other dares. Each dare gets progressively bolder. You can skip one dare, but it costs you one item of clothing." },
    { title: "Ice Cube Challenge", desc: "Grab an ice cube. Pass it between you using only your lips without dropping it. Loser of the round does whatever the winner says." },
    { title: "Yes Night", desc: "One partner plans the entire evening and the other has to say yes to every suggestion — as long as both are comfortable. Switch roles next week." },
    { title: "Massage Trade-Off", desc: "Set a timer for 15 minutes. One partner gives a full body massage. Then switch. No stopping early — the whole 15 minutes. What happens after is up to you." },
    { title: "Strip Trivia", desc: "Take turns asking each other trivia questions on any topic. Wrong answer = one item of clothing removed. Correct answer = you pick something for your partner to remove." },
    { title: "Compliment Challenge", desc: "Each partner writes 10 things they love about the other's body. Read them out loud slowly. For every compliment, the person receiving it removes something." },
    { title: "Slow Dance Strip", desc: "Put on the slowest, most romantic song you have. Dance together — every time the song transitions, both of you remove one item. Keep dancing." },
  ],
};

type ChallengeCategory = keyof typeof CHALLENGES;

function getRandomUnique(arr: Challenge[], exclude: Challenge | null): Challenge {
  if (arr.length <= 1) return arr[0];
  let pick: Challenge;
  let attempts = 0;
  do { pick = arr[Math.floor(Math.random() * arr.length)]; attempts++; } while (pick === exclude && attempts < 10);
  return pick;
}

export default function CoupleChallengeIdeas() {
  const [category, setCategory] = useState<ChallengeCategory>("daily");
  const [result, setResult] = useState<Challenge | null>(null);
  const [resultKey, setResultKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const last = useRef<Challenge | null>(null);

  const next = () => {
    setIsAnimating(true);
    setResult(null);
    setTimeout(() => {
      const pick = getRandomUnique(CHALLENGES[category], last.current);
      last.current = pick;
      setResult(pick);
      setResultKey(k => k + 1);
      setIsAnimating(false);
    }, 400);
  };

  const isSpicy = category === "spicy";

  return (
    <>
      <SEO title="Couple Challenge Ideas - Fun Challenges for Couples" description="Get random couple challenge ideas to strengthen your relationship. Daily habits, creative projects, romantic adventures, spicy games, and silly fun." canonicalUrl="https://randomtoolbox.replit.app/couple-challenge-ideas" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg"><Swords className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Couple Challenge Ideas</h1>
          </div>
          <p className="text-muted-foreground text-lg">Strengthen your bond, one challenge at a time.</p>
        </div>
        <Card className="border-2 shadow-lg">
          <CardContent className="p-8 flex flex-col items-center space-y-6">
            <div className="w-full max-w-xs space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={category} onValueChange={(v) => { setCategory(v as ChallengeCategory); setResult(null); last.current = null; }}>
                <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily Habits 🌅</SelectItem>
                  <SelectItem value="weekly">Weekly Challenges 📅</SelectItem>
                  <SelectItem value="creative">Creative Projects 🎨</SelectItem>
                  <SelectItem value="adventurous">Adventurous 🌍</SelectItem>
                  <SelectItem value="romantic">Romantic 🌹</SelectItem>
                  <SelectItem value="silly">Silly & Fun 😂</SelectItem>
                  <SelectItem value="spicy">Spicy 🌶️</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {isSpicy && (
              <p className="text-xs text-muted-foreground text-center border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 rounded-lg px-4 py-2">
                🌶️ <strong>18+ only.</strong> These challenges are intended for consenting adult couples in a committed relationship. Boundaries always come first.
              </p>
            )}
            <div className="min-h-[200px] flex items-center justify-center w-full relative">
              <AnimatePresence mode="wait">
                {isAnimating ? (
                  <motion.div key="anim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute">
                    <Swords className="w-10 h-10 text-purple-400 animate-pulse" />
                  </motion.div>
                ) : result ? (
                  <motion.div key={`r-${resultKey}`} initial={{ opacity: 0, scale: 0.9, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className="absolute w-full px-2">
                    <div className={`border-2 rounded-2xl p-6 space-y-3 ${isSpicy ? "bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/30" : "bg-purple-50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900/30"}`}>
                      <h2 className={`text-xl font-display font-bold ${isSpicy ? "text-red-600 dark:text-red-400" : "text-purple-600 dark:text-purple-400"}`}>{result.title}</h2>
                      <p className="text-muted-foreground text-sm leading-relaxed">{result.desc}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute text-center text-muted-foreground">
                    <Swords className="w-16 h-16 opacity-20 mx-auto mb-2" />
                    <p className="opacity-40">Tap the button to get a challenge</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Button size="lg" className={`w-full max-w-xs h-16 text-xl rounded-2xl shadow-xl text-white ${isSpicy ? "bg-red-500 hover:bg-red-600" : "bg-purple-600 hover:bg-purple-700"}`} onClick={next} disabled={isAnimating} data-testid="button-get-challenge">
              {result ? "Next Challenge" : "Get a Challenge"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
