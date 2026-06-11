import { useState, useRef } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, ArrowLeft, UserCircle2, Flame, AlertTriangle } from "lucide-react";
import { Link } from "wouter";

const DATA = {
  truth: {
    mild: [
      "What's your biggest irrational fear?",
      "Who was your very first crush?",
      "What's the most embarrassing thing you've ever done in public?",
      "Have you ever lied to get out of trouble with a parent or teacher?",
      "What's your most embarrassing childhood memory?",
      "What's the longest you've gone without brushing your teeth?",
      "Have you ever cheated on a test or assignment?",
      "What's the most childish thing you still do?",
      "What's a habit you have that you're embarrassed to admit?",
      "Have you ever pretended to be sick to avoid something you didn't want to do?",
      "What's the worst gift you've ever received and pretended to love?",
      "Have you ever eavesdropped on a private conversation?",
      "What's a show or movie you secretly love but would never admit publicly?",
      "What's the most awkward thing you've said to a crush?",
      "Have you ever walked into the wrong bathroom and kept walking like nothing happened?",
      "What's the dumbest thing you've ever believed as a kid?",
      "Have you ever forgotten an important event like a birthday or anniversary?",
      "What's one thing you'd never want your parents to find out?",
      "Have you ever laughed at something you absolutely shouldn't have?",
      "What's the most embarrassing autocorrect fail you've sent?",
      "Have you ever pretended to laugh at a joke you didn't understand?",
      "What's the worst haircut you've ever voluntarily gotten?",
      "Have you ever accidentally called a teacher 'Mom' or 'Dad'?",
      "What's something you lied about on your social media?",
      "Have you ever ugly-cried in public?",
      "What's the most embarrassing thing you've searched for online?",
      "Have you ever walked out of a store and realized you forgot to pay for something?",
      "What's the weirdest thing you do when you're home alone?",
      "Have you ever liked someone's photo from years back while stalking their profile?",
      "What's a talent you pretend to have but definitely don't?",
    ],
    spicy: [
      "Have you ever had a crush on a friend's partner?",
      "What's the most rule-breaking thing you've ever done and never got caught for?",
      "What's the most scandalous text you've ever sent to the wrong person?",
      "Have you ever been in love with two people at the same time?",
      "What's your biggest regret involving another person?",
      "Have you ever been caught lying to someone close to you, and how?",
      "What's the worst date you've ever been on — and why?",
      "Have you ever ghosted someone you genuinely liked?",
      "What's something you've done that you'd be mortified if your family found out?",
      "Have you ever faked being in a relationship to make someone jealous?",
      "What's the boldest thing you've ever done for someone you had a crush on?",
      "Have you ever read someone's private messages without their knowledge?",
      "What's the most money you've wasted on something truly stupid?",
      "Have you ever said 'I love you' to someone you didn't actually love?",
      "What's a secret you've kept from your best friend?",
      "Have you ever developed feelings for someone you knew you shouldn't?",
      "What's the most embarrassing thing you've done while trying to impress someone?",
      "Have you ever slid into someone's DMs and immediately regretted it?",
      "What's the wildest excuse you've used to get out of a commitment?",
      "Have you ever talked badly about someone who was in the same room?",
      "What's the most drunk you've ever been, and what did you do?",
      "Have you ever cancelled plans last minute for no real reason?",
      "Have you ever developed feelings for someone at work or school you shouldn't have?",
      "What's the biggest mistake you've made in a relationship?",
      "Have you ever lied about where you were to someone you were dating?",
      "What's the most impulsive decision you've ever made about someone?",
      "Have you ever stayed in a bad relationship way too long?",
      "What's something you've done that you've never told anyone?",
      "Have you ever kissed someone you definitely shouldn't have?",
      "What's the most jealous you've ever been, and why?",
    ],
    extreme: [
      "What's the most embarrassing thing currently on your phone — show or describe it?",
      "If you had to cut ties with one person in this room permanently, who would it be?",
      "Have you ever stolen something significant — what was it?",
      "What's the darkest or most messed up thought you've ever had?",
      "What's the biggest lie you are currently living that people around you believe?",
      "What's the most selfish thing you've ever done to another person?",
      "Have you ever been attracted to someone you absolutely shouldn't be — who?",
      "What's the worst thing you've done to an ex — and do they know?",
      "Have you ever betrayed someone's trust and never told them?",
      "What's the thing you'd be most ashamed of if it ended up on the news?",
      "What's something you've done that you still feel genuinely guilty about?",
      "Have you ever tried to sabotage someone else's relationship or success?",
      "What's the most inappropriate crush you've ever had?",
      "What is the one secret that, if revealed, would change how people see you?",
      "Have you ever seriously considered doing something illegal — what stopped you?",
      "What's the biggest lie you've told and never come clean about?",
      "Have you ever manipulated someone into liking you romantically?",
      "What's something you pretend to believe in that you actually think is nonsense?",
      "Have you ever done something completely out of character that only you know about?",
      "What's a moral line you've crossed that you've justified to yourself?",
      "Have you ever blamed someone else for something that was entirely your fault?",
      "What's the most you've ever exaggerated or straight-up lied about on a date?",
      "What's something you've said behind someone's back that you'd never say to their face?",
      "Have you ever intentionally made someone feel bad about themselves?",
      "What's the pettiest thing you've ever done out of spite?",
      "Have you ever taken credit for someone else's work in a big way?",
      "What's the most money you've borrowed and never returned?",
      "Have you ever faked an emotion to get something you wanted?",
      "What's a side of you that nobody in this room knows about?",
      "Have you ever done something kind purely so someone would owe you a favor?",
    ],
  },
  dare: {
    mild: [
      "Do 20 jumping jacks right now without stopping.",
      "Speak in an accent for the next 3 rounds — everyone votes if you slip.",
      "Let someone draw anything they want on your arm with a pen.",
      "Do your best impression of someone in this room — the group guesses who.",
      "Say the alphabet backward as fast as you can.",
      "Eat a spoonful of something you dislike from the kitchen.",
      "Let the group go through your phone gallery for 30 seconds.",
      "Do your best runway walk across the room.",
      "Talk in slow motion for the next 2 minutes.",
      "Make up a rap about the person to your left — at least 4 lines.",
      "Let someone style your hair however they want for the next round.",
      "Do 15 push-ups without stopping.",
      "Speak only in questions for the next 3 rounds.",
      "Act out a movie scene using only gestures — the group guesses the film.",
      "Hold an ice cube in your hand until it melts — no dropping.",
      "Read the last text you received out loud, regardless of what it says.",
      "Let the group go through your most recent DMs for 20 seconds.",
      "Call a family member and tell them you have exciting news — then say nevermind.",
      "Spin in a circle 10 times, then try to walk in a straight line.",
      "Let someone give you a dramatic makeover using whatever's available.",
      "Sing the chorus of a popular song entirely in a different genre.",
      "Describe yourself in 5 words that are unambiguously honest.",
      "Attempt a handstand or cartwheel, even if it's a disaster.",
      "Narrate everything you're doing for the next 3 minutes like a nature documentary.",
      "Show the group your most recent photo in your camera roll — no hiding.",
      "Try to lick your elbow — don't argue, just try.",
      "Do your best celebrity impression until the group guesses who it is.",
      "Let the group text anyone in your contacts from your phone.",
      "Make a face for every letter of the alphabet.",
      "Compliment every single person in the room with genuine specificity.",
    ],
    spicy: [
      "Text your crush or most recent ex and just say 'Hey, been thinking about you' — show us.",
      "Let the group look through your camera roll for 60 seconds.",
      "Call a random contact and sing them a full verse and chorus of a song.",
      "Let someone post a story to your Instagram from your phone.",
      "Do your best impression of how each person in the room texts.",
      "Read your most recent internet search history out loud.",
      "Send a voice note to the person you last texted saying 'we need to talk'.",
      "Let the group write and send a text to anyone in your contacts for you.",
      "Describe your ideal type in front of everyone while looking at the room.",
      "Let someone smell your shoes.",
      "Tell everyone your honest first impression of each person in the room.",
      "Screenshot your screen time and show the group what you're addicted to.",
      "Show the last three things you have liked on social media.",
      "Do an Irish exit from the room, come back in 60 seconds, and explain where you 'went'.",
      "Swap phones with someone and let them read your notifications for 30 seconds.",
      "Text your most recent ex a single compliment — and show the group.",
      "Let someone go through your Spotify listening history.",
      "Share the most embarrassing note or voice memo you have saved on your phone.",
      "Read the last five things you typed into a search engine out loud.",
      "Do your best 'bad flirting' impression on someone across the room.",
      "Let someone pick a contact from your phone and send them a 'miss you' text.",
      "Act out your most embarrassing moment without speaking — group guesses.",
      "Put your status as 'in my feels' on WhatsApp and leave it for an hour.",
      "Show someone your most embarrassing conversation without them showing the group.",
      "Tell the group what you genuinely think about each person's social media presence.",
      "Let the group choose one item in your room to throw away right now.",
      "Call a sibling or close friend and tell them a secret about yourself.",
      "Let someone paint one of your nails any color they choose.",
      "Show the most embarrassing app on your phone and explain why it's there.",
      "Confess the most recent lie you've told to someone in this room.",
    ],
    extreme: [
      "Drink a mystery mixture the group makes from whatever's in the kitchen — must be safe but disgusting.",
      "Let the group go through all of your social media DMs for 2 minutes.",
      "Wear your clothes backward or inside out for the rest of the game.",
      "Call your most recent ex and keep them on the line for at least 2 minutes with the group listening.",
      "Let the group write a post on your main social media — they decide the content and you must post it.",
      "Eat a full raw onion slice without making a face.",
      "Let the group shave or style your eyebrows however they choose.",
      "Lick the floor or a shoe — the group picks which.",
      "Send your most embarrassing photo to a random contact the group selects.",
      "Go outside and yell something embarrassing that the group decides — loud enough for neighbors to hear.",
      "Give up your phone password to the group for 5 minutes.",
      "Let the group send a voice note to your most recent contact using your voice.",
      "Eat a spoonful of the spiciest thing available without chasing it with water for 60 seconds.",
      "Remove one article of clothing and leave it off for the rest of the game.",
      "Call your mom, dad, or guardian and tell them you have 'life news' to share.",
      "Let someone completely control your next social media post — caption, photo, everything.",
      "Read your most personal or embarrassing journal entry or note aloud.",
      "Change your profile picture to whatever the group picks for 24 hours.",
      "Confess the most awkward or embarrassing thing you've done in front of a partner.",
      "Sit outside alone in the dark for 3 minutes — no phone.",
      "Let the group send a voice message to your boss or professor from your phone.",
      "Put something the group decides as your 'about me' on WhatsApp for 24 hours.",
      "Let someone go live on your Instagram or TikTok for 30 seconds saying whatever they want.",
      "Allow the group to set a new ringtone on your phone that stays for the rest of the evening.",
      "Eat whatever the group creates from the fridge in under 2 minutes.",
      "Do 1 minute of stand-up comedy about yourself — no self-pity, just brutal honesty.",
      "Let someone post a review of you as if you were a product — then share it.",
      "Put your phone on silent and leave it with the group for 10 minutes.",
      "Let the group pick one social media profile to unfollow on your behalf.",
      "Share your screen with the group while you go through your camera roll for 60 seconds.",
    ],
  },
};

type Category = "mild" | "spicy" | "extreme";

function getRandomUnique(arr: string[], exclude: string | null): string {
  if (arr.length === 1) return arr[0];
  let pick: string;
  do {
    pick = arr[Math.floor(Math.random() * arr.length)];
  } while (pick === exclude);
  return pick;
}

export default function TruthOrDare() {
  const [category, setCategory] = useState<Category>("mild");
  const [result, setResult] = useState<{ type: "truth" | "dare"; text: string } | null>(null);
  const [resultKey, setResultKey] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const lastTruth = useRef<string | null>(null);
  const lastDare = useRef<string | null>(null);

  const generate = (type: "truth" | "dare") => {
    setIsGenerating(true);
    setResult(null);

    setTimeout(() => {
      const options = DATA[type][category];
      const lastRef = type === "truth" ? lastTruth : lastDare;
      const pick = getRandomUnique(options, lastRef.current);
      lastRef.current = pick;
      setResult({ type, text: pick });
      setResultKey(k => k + 1);
      setIsGenerating(false);
    }, 600);
  };

  const getCategoryIcon = () => {
    if (category === "mild") return <UserCircle2 className="w-5 h-5 text-green-500" />;
    if (category === "spicy") return <Flame className="w-5 h-5 text-orange-500" />;
    return <AlertTriangle className="w-5 h-5 text-red-500" />;
  };

  return (
    <>
      <SEO
        title="Truth or Dare Generator - Random Party Game"
        description="Generate random Truth or Dare questions with our free online tool. Filter by intensity: mild, spicy, or extreme for your next party. 300+ unique questions."
        canonicalUrl="https://randomtoolbox.replit.app/truth-or-dare"
      />

      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
              <Smile className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Truth or Dare</h1>
          </div>
          <p className="text-muted-foreground text-lg">Spice up your next hangout. Choose your intensity.</p>
        </div>

        <Card className="border-2 shadow-lg border-red-100 dark:border-red-900/30">
          <CardContent className="p-8 md:p-12 flex flex-col items-center text-center space-y-8">
            <div className="w-full max-w-xs space-y-2 text-left">
              <label className="text-sm font-medium flex items-center gap-2">
                Intensity Level
                {getCategoryIcon()}
              </label>
              <Select value={category} onValueChange={(v) => { setCategory(v as Category); setResult(null); }}>
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Select intensity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Mild (Family Friendly)</SelectItem>
                  <SelectItem value="spicy">Spicy (Getting Interesting)</SelectItem>
                  <SelectItem value="extreme">Extreme (Proceed with Caution)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="min-h-[200px] flex items-center justify-center w-full relative">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="generating"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute"
                  >
                    <div className="w-12 h-12 rounded-full border-4 border-t-red-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key={`result-${resultKey}`}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute text-center w-full px-4"
                  >
                    <p className={`text-sm uppercase tracking-wider font-bold mb-4 ${result.type === "truth" ? "text-blue-500" : "text-red-500"}`}>
                      {result.type}
                    </p>
                    <h2 className="text-xl md:text-2xl font-display font-bold text-foreground leading-snug">
                      "{result.text}"
                    </h2>
                  </motion.div>
                ) : (
                  <motion.div
                    key="initial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute text-muted-foreground"
                  >
                    <Smile className="w-16 h-16 opacity-20" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Button
                size="lg"
                className="w-full sm:w-48 h-16 text-xl rounded-2xl shadow-xl hover:shadow-blue-500/25 transition-all bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => generate("truth")}
                disabled={isGenerating}
                data-testid="button-truth"
              >
                Truth
              </Button>
              <Button
                size="lg"
                className="w-full sm:w-48 h-16 text-xl rounded-2xl shadow-xl hover:shadow-red-500/25 transition-all bg-red-600 hover:bg-red-700 text-white"
                onClick={() => generate("dare")}
                disabled={isGenerating}
                data-testid="button-dare"
              >
                Dare
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
