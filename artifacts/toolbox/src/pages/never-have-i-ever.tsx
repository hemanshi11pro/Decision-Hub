import { useState, useRef } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const DATA: Record<string, string[]> = {
  general: [
    "Never have I ever accidentally sent a text to the person it was about.",
    "Never have I ever fallen asleep in public.",
    "Never have I ever lied about my age.",
    "Never have I ever forgotten a friend's birthday.",
    "Never have I ever walked into a glass door.",
    "Never have I ever laughed at a joke I didn't understand.",
    "Never have I ever pretended to be sick to skip work or school.",
    "Never have I ever been caught talking to myself.",
    "Never have I ever Googled my own name.",
    "Never have I ever re-gifted a present someone gave me.",
    "Never have I ever talked to a pet like it understood every word.",
    "Never have I ever lied on my resume.",
    "Never have I ever mispronounced a word in front of a crowd.",
    "Never have I ever binge-watched an entire season in one day.",
    "Never have I ever returned something I already used.",
    "Never have I ever pretended to know a song I'd never heard.",
    "Never have I ever gone a full week without showering.",
    "Never have I ever called someone by the wrong name more than once.",
    "Never have I ever cried during a commercial.",
    "Never have I ever fallen asleep during a phone call.",
    "Never have I ever forgotten where I parked my car.",
    "Never have I ever worn mismatched shoes out of the house.",
    "Never have I ever ignored a call and then said I didn't see it.",
    "Never have I ever gotten lost in a city I live in.",
    "Never have I ever used someone's Netflix without them knowing.",
    "Never have I ever pretended to be on the phone to avoid talking to someone.",
    "Never have I ever bought something just because it was on sale.",
    "Never have I ever fibbed about reading a book I was supposed to read.",
    "Never have I ever eaten food I dropped on the floor.",
    "Never have I ever lied about my weight or height.",
    "Never have I ever accidentally liked an old photo while stalking someone's profile.",
    "Never have I ever set multiple alarms and snoozed every single one.",
    "Never have I ever acted like I remembered someone I completely forgot.",
    "Never have I ever screamed into a pillow to release stress.",
    "Never have I ever talked to Siri, Alexa, or Google like they were a friend.",
    "Never have I ever held a door open for someone who was way too far away.",
    "Never have I ever been told I was wrong and secretly knew they were right.",
    "Never have I ever rehearsed what I was going to say before a phone call.",
    "Never have I ever made a pros and cons list for a very silly decision.",
    "Never have I ever eaten an entire snack bag in one sitting and felt no regret.",
    "Never have I ever quit a show just because the intro was too long.",
    "Never have I ever stayed in a bad movie just because I paid for the ticket.",
    "Never have I ever pretended to laugh at a joke I found offensive.",
    "Never have I ever panic-cleaned before guests arrived.",
    "Never have I ever stolen a hotel towel or toiletry.",
    "Never have I ever added filler words to a text to not seem too eager.",
    "Never have I ever double-tapped someone's photo from years back while stalking.",
    "Never have I ever put clothes in the dryer to 'unwrinkle' them instead of ironing.",
    "Never have I ever gone back to an ex for a brief, very regrettable reason.",
    "Never have I ever ended a friendship over something that seems trivial now.",
    "Never have I ever said 'I'm 5 minutes away' when I hadn't left yet.",
    "Never have I ever used a fake name at a coffee shop.",
    "Never have I ever snuck food into a movie theater.",
    "Never have I ever pretended to be busy to avoid plans I didn't want to go to.",
    "Never have I ever said 'I'll start Monday' and then pushed it to the next Monday.",
    "Never have I ever clicked 'I have read the terms and conditions' without reading them.",
    "Never have I ever accidentally called a teacher 'Mom' or 'Dad'.",
    "Never have I ever googled a symptom and convinced myself I had a rare disease.",
    "Never have I ever put the wrong year on a form at the start of a new year.",
    "Never have I ever hit reply-all when I should have hit reply.",
    "Never have I ever cried in a bathroom at a party.",
    "Never have I ever made a playlist for a person I had a crush on.",
    "Never have I ever used a word in a sentence without fully knowing what it meant.",
    "Never have I ever been blocked by someone on social media.",
    "Never have I ever taken credit for something I didn't do.",
    "Never have I ever read a book backward just to find out how it ends.",
    "Never have I ever drunk-texted someone and blamed autocorrect.",
    "Never have I ever turned the volume down on music when parking.",
    "Never have I ever imagined winning an argument in the shower.",
    "Never have I ever gone to bed before 9pm on a Friday and felt great about it.",
    "Never have I ever immediately regretted something I said out loud.",
    "Never have I ever eaten something way past its expiry date and been totally fine.",
  ],
  funny: [
    "Never have I ever blamed a fart on a pet.",
    "Never have I ever tripped and played it off like I meant to do it.",
    "Never have I ever waved at someone who wasn't waving at me.",
    "Never have I ever worn underwear inside out.",
    "Never have I ever dropped my phone on my face while lying in bed.",
    "Never have I ever talked to myself in the mirror.",
    "Never have I ever sat on the toilet for so long my leg went completely numb.",
    "Never have I ever called out a spoiler and then forgotten I hadn't seen the movie.",
    "Never have I ever made eye contact with someone through a window and not known what to do.",
    "Never have I ever waved back at someone and realized they weren't waving at me — in slow motion.",
    "Never have I ever walked confidently into the wrong bathroom.",
    "Never have I ever accidentally sent a meme to the group chat it was about.",
    "Never have I ever forgotten the punchline of my own joke mid-telling.",
    "Never have I ever pretended to understand someone's accent and just nodded along.",
    "Never have I ever slipped on a banana peel — or something equally embarrassing.",
    "Never have I ever used the bathroom at someone's house and come back to a social catastrophe.",
    "Never have I ever done something embarrassing and immediately played dead in my head.",
    "Never have I ever started laughing at a funeral or very serious moment.",
    "Never have I ever opened a bag of chips in the quietest room possible.",
    "Never have I ever tried to look cool while falling and failed completely.",
    "Never have I ever confidently given wrong directions to a stranger.",
    "Never have I ever walked into a room and completely forgotten why.",
    "Never have I ever laughed so hard I started crying and couldn't explain why.",
    "Never have I ever seen my own reflection and scared myself.",
    "Never have I ever tried to dance in public and cleared the floor.",
    "Never have I ever talked to my Roomba like it had feelings.",
    "Never have I ever sneezed while eating and created something unforgettable.",
    "Never have I ever accidentally set an alarm for PM instead of AM.",
    "Never have I ever mispronounced 'quinoa' out loud in a restaurant.",
    "Never have I ever tried to type something in the dark and sent pure gibberish.",
    "Never have I ever bent down to pet a dog that was not interested in being petted.",
    "Never have I ever run into a parked car while looking at my phone.",
    "Never have I ever held in a sneeze in a quiet room and made a truly cursed noise.",
    "Never have I ever accidentally FaceTimed someone instead of just calling them.",
    "Never have I ever embarrassed a friend in public by saying exactly the wrong thing.",
    "Never have I ever tried to use a contactless card that flat-out refused to work.",
    "Never have I ever had an argument with autocorrect and lost.",
    "Never have I ever pressed 'like' on a post I was actively judging.",
    "Never have I ever tried to eat a food item that exploded on me immediately.",
    "Never have I ever used the wrong cup as a microphone at the worst possible time.",
    "Never have I ever lost a staring contest with an animal.",
    "Never have I ever made up a fake phone number on a form without thinking about it.",
    "Never have I ever laughed at my own joke before I finished telling it.",
    "Never have I ever tried to sneak a snack quietly and failed spectacularly.",
    "Never have I ever pulled a 'push' door in front of a crowd.",
    "Never have I ever sneezed so hard I gave myself a headache.",
    "Never have I ever been shushed by a stranger in public.",
    "Never have I ever attempted a hairstyle from a tutorial and ended up with something entirely different.",
    "Never have I ever stood up to leave a table and knocked absolutely everything over.",
    "Never have I ever made a dramatic exit only to immediately come back because I forgot something.",
    "Never have I ever given a thumbs up when I meant to press like and felt immediate regret.",
    "Never have I ever rehearsed a conversation in my head for days and then completely blanked.",
    "Never have I ever mixed up a word in a language I claim to speak fluently.",
    "Never have I ever tried to act sober when I was absolutely not.",
    "Never have I ever had a one-sided argument with a vending machine.",
    "Never have I ever rearranged items in a store to make it look better and then walked away.",
    "Never have I ever done a victory dance before checking the score.",
    "Never have I ever confidently said 'I never forget a face' and then immediately blanked on someone's face.",
    "Never have I ever celebrated prematurely at something and had it immediately go wrong.",
    "Never have I ever sprinted to catch a train only to watch it leave as I arrived.",
    "Never have I ever accidentally liked someone's photo from four years ago while stalking in incognito.",
    "Never have I ever talked at length about a movie I've never actually seen.",
    "Never have I ever done a backflip in my mind and fallen flat in reality.",
    "Never have I ever tried to open a locked car with my house key repeatedly.",
    "Never have I ever screamed at a spider louder than any human should.",
    "Never have I ever taken a photo of food, hated it, and re-plated it for a better shot.",
    "Never have I ever been absolutely convinced I smelled something burning and there was nothing.",
    "Never have I ever apologized to an inanimate object I bumped into.",
  ],
  adventurous: [
    "Never have I ever gone skydiving.",
    "Never have I ever sneaked into a movie or concert.",
    "Never have I ever traveled to another country alone.",
    "Never have I ever gone skinny dipping.",
    "Never have I ever eaten a bug on purpose.",
    "Never have I ever gone on a spontaneous road trip with no plan.",
    "Never have I ever hitchhiked.",
    "Never have I ever camped completely alone in the wilderness.",
    "Never have I ever run a marathon or extreme race.",
    "Never have I ever bungee jumped.",
    "Never have I ever tried a food from a street vendor in a foreign country without knowing what it was.",
    "Never have I ever ridden a motorcycle at very high speed.",
    "Never have I ever climbed a mountain.",
    "Never have I ever gone cliff diving.",
    "Never have I ever surfed a wave taller than I am.",
    "Never have I ever gotten a tattoo on impulse.",
    "Never have I ever quit a job with no backup plan.",
    "Never have I ever slept on a beach overnight.",
    "Never have I ever taken a solo trip to a country where I didn't speak the language.",
    "Never have I ever gone white-water rafting.",
    "Never have I ever tried an extreme sport I was terrified of.",
    "Never have I ever broken into an abandoned building just to explore.",
    "Never have I ever pulled an all-nighter in a city I barely knew.",
    "Never have I ever hitchhiked across a state or country.",
    "Never have I ever eaten something live or still moving.",
    "Never have I ever spent the night in a place I wasn't supposed to.",
    "Never have I ever gone scuba diving.",
    "Never have I ever zip-lined over a jungle or canyon.",
    "Never have I ever slept under the stars with no tent.",
    "Never have I ever gone paragliding.",
    "Never have I ever done a polar plunge or ice bath.",
    "Never have I ever taken an improv class or performed stand-up comedy.",
    "Never have I ever moved to a new city where I knew nobody.",
    "Never have I ever adopted a pet on a complete whim.",
    "Never have I ever booked a flight 24 hours before departure.",
    "Never have I ever tried to learn a new language from scratch in a foreign country.",
    "Never have I ever gone deep-sea fishing.",
    "Never have I ever wrestled or competed in a contact sport.",
    "Never have I ever started a fire without a lighter or matches.",
    "Never have I ever gone caving or spelunking.",
    "Never have I ever eaten from a dumpster or wild foraged food.",
    "Never have I ever crossed an international border on foot.",
    "Never have I ever ridden a camel, elephant, or other large animal.",
    "Never have I ever gotten completely lost in a foreign country and found my way back.",
    "Never have I ever lived in a tent for more than a week.",
    "Never have I ever swam with sharks or large ocean creatures.",
    "Never have I ever abseiled down a cliff face.",
    "Never have I ever done a polar bear swim in freezing water.",
    "Never have I ever free-dived without scuba gear.",
    "Never have I ever driven across a country in less than 24 hours.",
    "Never have I ever gone snowboarding or skiing for the first time on a black run.",
    "Never have I ever walked a tightrope or done aerial arts.",
    "Never have I ever entered a competition knowing I probably wouldn't win.",
    "Never have I ever run a 5K without any training.",
    "Never have I ever eaten exclusively local food in a foreign country for a week.",
    "Never have I ever gone dumpster diving for treasure.",
    "Never have I ever gone ghost hunting at a reportedly haunted location.",
    "Never have I ever stayed awake for 48 hours straight.",
    "Never have I ever tried a fighting sport like boxing, MMA, or jiu-jitsu.",
    "Never have I ever skinny-dipped in the ocean.",
    "Never have I ever gone on a blind adventure where someone else planned everything.",
    "Never have I ever tried ayahuasca or another plant-based ceremony.",
    "Never have I ever jumped from a great height into water.",
    "Never have I ever eaten a meal I had to hunt or catch myself.",
    "Never have I ever gotten a piercing in an unexpected place.",
    "Never have I ever ridden a bull or mechanical bull.",
    "Never have I ever gone on a silent retreat for more than 24 hours.",
  ],
  romantic: [
    "Never have I ever had a crush on a teacher or professor.",
    "Never have I ever stalked an ex on social media.",
    "Never have I ever gone on a blind date.",
    "Never have I ever kissed someone on the first date.",
    "Never have I ever practiced kissing on my hand.",
    "Never have I ever used a cheesy pickup line unironically.",
    "Never have I ever been stood up on a date.",
    "Never have I ever dated two people at the same time.",
    "Never have I ever confessed feelings and been completely rejected.",
    "Never have I ever slid into someone's DMs and had it actually work.",
    "Never have I ever made a grand romantic gesture that backfired.",
    "Never have I ever faked being in a relationship to make someone jealous.",
    "Never have I ever cried over a breakup in public.",
    "Never have I ever re-read old messages from an ex late at night.",
    "Never have I ever fallen for someone I knew I couldn't have.",
    "Never have I ever been in a situationship that I convinced myself wasn't a situationship.",
    "Never have I ever drunk-texted an ex and genuinely regretted it.",
    "Never have I ever dated someone just because they liked me first.",
    "Never have I ever had feelings for my best friend.",
    "Never have I ever written a love letter I never sent.",
    "Never have I ever Googled 'how to tell if someone likes you' about a specific person.",
    "Never have I ever matched with someone on a dating app and never spoken to them.",
    "Never have I ever caught feelings for someone I was only supposed to be friends with.",
    "Never have I ever been in a long-distance relationship.",
    "Never have I ever given someone a fake number.",
    "Never have I ever danced with someone at a party and felt something.",
    "Never have I ever broken up with someone over text.",
    "Never have I ever made up with an ex just to break up again.",
    "Never have I ever gone back to someone I said I was completely done with.",
    "Never have I ever lied about my relationship status.",
    "Never have I ever stayed in a relationship way too long because I was scared to be alone.",
    "Never have I ever written someone's name in a heart somewhere.",
    "Never have I ever created a fictional scenario of me and a celebrity in my head.",
    "Never have I ever screenshotted a conversation to show a friend for analysis.",
    "Never have I ever said 'I love you' first.",
    "Never have I ever ghosted someone I was dating.",
    "Never have I ever been ghosted by someone I was actually falling for.",
    "Never have I ever regretted breaking up with someone.",
    "Never have I ever made a playlist for someone I liked.",
    "Never have I ever had a crush on a friend's sibling.",
    "Never have I ever kissed someone on a dare and felt more than I expected.",
    "Never have I ever liked someone so much it made me nervous to speak.",
    "Never have I ever looked up an ex's new partner on social media.",
    "Never have I ever caught feelings for a coworker.",
    "Never have I ever ended things right before they got serious out of fear.",
    "Never have I ever gotten jealous over someone who wasn't officially mine.",
    "Never have I ever sent a risky text and immediately regretted it.",
    "Never have I ever had a crush on someone I met online who I never met in person.",
    "Never have I ever pretended not to care about someone I cared deeply about.",
    "Never have I ever slow-danced with someone and had a genuine moment.",
    "Never have I ever liked someone purely because they smelled incredible.",
    "Never have I ever confessed feelings in a letter, note, or voice message.",
    "Never have I ever had someone confess their feelings to me at the worst possible time.",
    "Never have I ever kissed a stranger at a party.",
    "Never have I ever had a 'what are we' conversation that didn't go well.",
    "Never have I ever fallen in love at first sight, or something that felt very close to it.",
    "Never have I ever dated someone significantly older or younger than me.",
    "Never have I ever been in a relationship my parents or friends disapproved of.",
    "Never have I ever spent Valentine's Day completely alone by choice.",
    "Never have I ever matched with someone I already knew in real life on a dating app.",
    "Never have I ever ended something good because the timing was terrible.",
    "Never have I ever lost a friend because romantic feelings got in the way.",
    "Never have I ever cried in the car on the way home from a date.",
    "Never have I ever had a first kiss that was absolutely nothing like I imagined.",
    "Never have I ever canceled a date at the last minute because I panicked.",
    "Never have I ever liked someone's old photos on purpose just to let them know.",
  ],
};

type Category = keyof typeof DATA;

function getRandomUnique(arr: string[], exclude: string | null): string {
  if (arr.length === 1) return arr[0];
  let pick: string;
  do {
    pick = arr[Math.floor(Math.random() * arr.length)];
  } while (pick === exclude);
  return pick;
}

export default function NeverHaveIEver() {
  const [category, setCategory] = useState<Category>("general");
  const [result, setResult] = useState<string | null>(null);
  const [resultKey, setResultKey] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const lastResult = useRef<string | null>(null);

  const generate = () => {
    setIsGenerating(true);
    setResult(null);

    setTimeout(() => {
      const options = DATA[category];
      const pick = getRandomUnique(options, lastResult.current);
      lastResult.current = pick;
      setResult(pick);
      setResultKey(k => k + 1);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <>
      <SEO
        title="Never Have I Ever Generator - Free Party Game"
        description="Generate random 'Never have I ever' questions for your next party. 500+ unique questions across funny, adventurous, romantic, or general categories."
        canonicalUrl="https://randomtoolbox.replit.app/never-have-i-ever"
      />

      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-lg">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Never Have I Ever</h1>
          </div>
          <p className="text-muted-foreground text-lg">Spill the tea. Find out what your friends have done.</p>
        </div>

        <Card className="border-2 shadow-lg border-yellow-100 dark:border-yellow-900/30">
          <CardContent className="p-8 md:p-12 flex flex-col items-center text-center space-y-8">
            <div className="w-full max-w-xs space-y-2 text-left">
              <label className="text-sm font-medium">Category</label>
              <Select value={category} onValueChange={(v) => { setCategory(v as Category); setResult(null); lastResult.current = null; }}>
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="funny">Funny</SelectItem>
                  <SelectItem value="adventurous">Adventurous</SelectItem>
                  <SelectItem value="romantic">Romantic</SelectItem>
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
                    <div className="w-12 h-12 rounded-full border-4 border-t-yellow-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key={`result-${resultKey}`}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute text-center w-full px-4"
                  >
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground leading-tight">
                      "{result}"
                    </h2>
                  </motion.div>
                ) : (
                  <motion.div
                    key="initial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute text-muted-foreground flex flex-col items-center"
                  >
                    <MessageCircle className="w-16 h-16 opacity-20 mb-4" />
                    <p className="font-display text-xl font-bold opacity-30">Never have I ever...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button
              size="lg"
              className="w-full max-w-xs h-16 text-xl rounded-2xl shadow-xl hover:shadow-yellow-500/25 transition-all bg-yellow-500 hover:bg-yellow-600 text-white"
              onClick={generate}
              disabled={isGenerating}
              data-testid="button-generate"
            >
              {result ? "Next Question" : "Start Playing"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
