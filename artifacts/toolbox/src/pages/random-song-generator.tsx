import { useState, useRef } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Music, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

interface Song { title: string; artist: string; year: number; }
type SongDB = Record<string, Record<string, Song[]>>;

const SONGS: SongDB = {
  english: {
    happy: [
      { title: "Happy", artist: "Pharrell Williams", year: 2013 }, { title: "Can't Stop the Feeling!", artist: "Justin Timberlake", year: 2016 },
      { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", year: 2014 }, { title: "Good as Hell", artist: "Lizzo", year: 2016 },
      { title: "Shake It Off", artist: "Taylor Swift", year: 2014 }, { title: "Walking on Sunshine", artist: "Katrina and the Waves", year: 1985 },
      { title: "I Gotta Feeling", artist: "The Black Eyed Peas", year: 2009 }, { title: "Levitating", artist: "Dua Lipa", year: 2020 },
      { title: "Dancing Queen", artist: "ABBA", year: 1976 }, { title: "Don't Stop Me Now", artist: "Queen", year: 1978 },
      { title: "Cruel Summer", artist: "Taylor Swift", year: 2019 }, { title: "As It Was", artist: "Harry Styles", year: 2022 },
    ],
    sad: [
      { title: "Someone Like You", artist: "Adele", year: 2011 }, { title: "The Night We Met", artist: "Lord Huron", year: 2015 },
      { title: "Skinny Love", artist: "Bon Iver", year: 2008 }, { title: "Liability", artist: "Lorde", year: 2017 },
      { title: "Let Her Go", artist: "Passenger", year: 2012 }, { title: "Fix You", artist: "Coldplay", year: 2005 },
      { title: "When the Party's Over", artist: "Billie Eilish", year: 2018 }, { title: "Million Years Ago", artist: "Adele", year: 2015 },
      { title: "Hurt", artist: "Johnny Cash", year: 2002 }, { title: "Creep", artist: "Radiohead", year: 1992 },
      { title: "drivers license", artist: "Olivia Rodrigo", year: 2021 }, { title: "Exile", artist: "Taylor Swift ft. Bon Iver", year: 2020 },
    ],
    romantic: [
      { title: "Perfect", artist: "Ed Sheeran", year: 2017 }, { title: "All of Me", artist: "John Legend", year: 2013 },
      { title: "Can't Help Falling in Love", artist: "Elvis Presley", year: 1961 }, { title: "At Last", artist: "Etta James", year: 1960 },
      { title: "Make You Feel My Love", artist: "Adele", year: 2008 }, { title: "Thinking Out Loud", artist: "Ed Sheeran", year: 2014 },
      { title: "Love Story", artist: "Taylor Swift", year: 2008 }, { title: "Your Song", artist: "Elton John", year: 1970 },
      { title: "Just the Way You Are", artist: "Bruno Mars", year: 2010 }, { title: "A Thousand Years", artist: "Christina Perri", year: 2011 },
      { title: "Lover", artist: "Taylor Swift", year: 2019 }, { title: "Halo", artist: "Beyoncé", year: 2008 },
    ],
    energetic: [
      { title: "Blinding Lights", artist: "The Weeknd", year: 2019 }, { title: "HUMBLE.", artist: "Kendrick Lamar", year: 2017 },
      { title: "Power", artist: "Kanye West", year: 2010 }, { title: "Till I Collapse", artist: "Eminem", year: 2002 },
      { title: "Jump", artist: "Kris Kross", year: 1992 }, { title: "Welcome to the Jungle", artist: "Guns N' Roses", year: 1987 },
      { title: "Eye of the Tiger", artist: "Survivor", year: 1982 }, { title: "Lose Yourself", artist: "Eminem", year: 2002 },
      { title: "Thunder", artist: "Imagine Dragons", year: 2017 }, { title: "Believer", artist: "Imagine Dragons", year: 2017 },
    ],
    chill: [
      { title: "Redbone", artist: "Childish Gambino", year: 2016 }, { title: "Electric Feel", artist: "MGMT", year: 2007 },
      { title: "Tenerife Sea", artist: "Ed Sheeran", year: 2014 }, { title: "Golden Hour", artist: "JVKE", year: 2022 },
      { title: "Slow Dancing in the Dark", artist: "Joji", year: 2018 }, { title: "Cherry Wine", artist: "Hozier", year: 2014 },
      { title: "Coffee", artist: "beabadoobee", year: 2019 }, { title: "Motion Sickness", artist: "Phoebe Bridgers", year: 2017 },
    ],
    party: [
      { title: "Party Rock Anthem", artist: "LMFAO", year: 2011 }, { title: "Work", artist: "Rihanna", year: 2016 },
      { title: "Yeah!", artist: "Usher ft. Lil Jon & Ludacris", year: 2004 }, { title: "Timber", artist: "Pitbull ft. Kesha", year: 2013 },
      { title: "Turn Down for What", artist: "DJ Snake & Lil Jon", year: 2013 }, { title: "Levels", artist: "Avicii", year: 2011 },
      { title: "Animals", artist: "Martin Garrix", year: 2013 }, { title: "Summer", artist: "Calvin Harris", year: 2014 },
    ],
    heartbreak: [
      { title: "Rolling in the Deep", artist: "Adele", year: 2010 }, { title: "Go Your Own Way", artist: "Fleetwood Mac", year: 1977 },
      { title: "Since U Been Gone", artist: "Kelly Clarkson", year: 2004 }, { title: "good 4 u", artist: "Olivia Rodrigo", year: 2021 },
      { title: "Gives You Hell", artist: "The All-American Rejects", year: 2008 }, { title: "Before He Cheats", artist: "Carrie Underwood", year: 2005 },
      { title: "We Are Never Ever Getting Back Together", artist: "Taylor Swift", year: 2012 },
    ],
    motivational: [
      { title: "Stronger", artist: "Kanye West", year: 2007 }, { title: "Hall of Fame", artist: "The Script ft. will.i.am", year: 2012 },
      { title: "Not Afraid", artist: "Eminem", year: 2010 }, { title: "Roar", artist: "Katy Perry", year: 2013 },
      { title: "Run the World (Girls)", artist: "Beyoncé", year: 2011 }, { title: "Fight Song", artist: "Rachel Platten", year: 2014 },
      { title: "Unstoppable", artist: "Sia", year: 2016 }, { title: "Brave", artist: "Sara Bareilles", year: 2013 },
    ],
  },
  hindi: {
    happy: [
      { title: "Badtameez Dil", artist: "Shalmali Kholgade", year: 2013 }, { title: "Lungi Dance", artist: "Honey Singh", year: 2013 },
      { title: "Gallan Goodiyaan", artist: "Shilpa Rao", year: 2015 }, { title: "Dil Dhadakne Do", artist: "Priyanka Chopra", year: 2015 },
      { title: "Kar Gayi Chull", artist: "Badshah", year: 2016 }, { title: "Shape of You (Hindi)", artist: "Ed Sheeran", year: 2017 },
      { title: "Bom Diggy Diggy", artist: "Zack Knight", year: 2018 }, { title: "Swag Se Swagat", artist: "Vishal-Shekhar", year: 2017 },
    ],
    sad: [
      { title: "Tujhe Bhula Diya", artist: "Mohit Chauhan", year: 2010 }, { title: "Judaai", artist: "Arijit Singh", year: 2014 },
      { title: "Hamari Adhuri Kahani", artist: "Arijit Singh", year: 2015 }, { title: "Teri Meri", artist: "Rahat Fateh Ali Khan", year: 2010 },
      { title: "Dil Diyan Gallan", artist: "Atif Aslam", year: 2017 }, { title: "Channa Mereya", artist: "Arijit Singh", year: 2016 },
      { title: "Ae Dil Hai Mushkil", artist: "Arijit Singh", year: 2016 }, { title: "Agar Tum Saath Ho", artist: "Alka Yagnik", year: 2015 },
    ],
    romantic: [
      { title: "Tum Hi Ho", artist: "Arijit Singh", year: 2013 }, { title: "Raabta", artist: "Arijit Singh", year: 2017 },
      { title: "Gerua", artist: "Arijit Singh", year: 2015 }, { title: "Ik Vaari Aa", artist: "Arijit Singh", year: 2016 },
      { title: "Pehla Nasha", artist: "Udit Narayan", year: 1992 }, { title: "Sunn Raha Hai", artist: "Ankit Tiwari", year: 2013 },
      { title: "Kuch Toh Hua Hai", artist: "KK", year: 2004 },
    ],
    energetic: [
      { title: "Bhaag DK Bose", artist: "Ram Sampath", year: 2011 }, { title: "Malhari", artist: "Vishal Dadlani", year: 2015 },
      { title: "Zinda", artist: "Siddharth Mahadevan", year: 2011 }, { title: "War (Title Track)", artist: "Vishal-Shekhar", year: 2019 },
      { title: "Radha", artist: "Sunidhi Chauhan", year: 2012 }, { title: "Dhan Te Nan", artist: "Sukhwinder Singh", year: 2008 },
    ],
    chill: [
      { title: "Kabira", artist: "Tochi Raina", year: 2012 }, { title: "Bulleya", artist: "Papon", year: 2016 },
      { title: "Khaabon Ke Parinday", artist: "Mohit Chauhan", year: 2011 }, { title: "Kun Faya Kun", artist: "A.R. Rahman", year: 2011 },
    ],
    party: [
      { title: "Cheap Thrills", artist: "Sia (Hindi version)", year: 2016 }, { title: "Saturday Saturday", artist: "Badshah", year: 2014 },
      { title: "Dj Wale Babu", artist: "Badshah", year: 2015 }, { title: "Abhi Toh Party Shuru Hui Hai", artist: "Badshah", year: 2015 },
    ],
    heartbreak: [
      { title: "Woh Lamhe", artist: "Atif Aslam", year: 2006 }, { title: "O Meri Jaan", artist: "KK", year: 2008 },
      { title: "Alvida", artist: "KK", year: 2006 }, { title: "Jaane Kyun", artist: "Farhan Akhtar", year: 2008 },
    ],
    motivational: [
      { title: "Lakshya", artist: "Shankar-Ehsaan-Loy", year: 2004 }, { title: "Jai Ho", artist: "A.R. Rahman", year: 2009 },
      { title: "Chak De India", artist: "Sukhwinder Singh", year: 2007 }, { title: "Kar Har Maidaan Fateh", artist: "Sukhwinder Singh", year: 2017 },
    ],
  },
  korean: {
    happy: [
      { title: "Dynamite", artist: "BTS", year: 2020 }, { title: "How You Like That", artist: "BLACKPINK", year: 2020 },
      { title: "Candy", artist: "NCT DREAM", year: 2022 }, { title: "Love Dive", artist: "IVE", year: 2022 },
      { title: "ELEVEN", artist: "IVE", year: 2021 }, { title: "Attention", artist: "NewJeans", year: 2022 },
      { title: "Hype Boy", artist: "NewJeans", year: 2022 }, { title: "DICE", artist: "NMIXX", year: 2022 },
    ],
    sad: [
      { title: "8 Letters", artist: "WHY DON'T WE", year: 2018 }, { title: "Spring Day", artist: "BTS", year: 2017 },
      { title: "Winter Bear", artist: "V (BTS)", year: 2019 }, { title: "Breathe", artist: "LEE HI", year: 2016 },
      { title: "Through the Night", artist: "IU", year: 2017 }, { title: "Lonely", artist: "f(x)", year: 2014 },
    ],
    romantic: [
      { title: "My Everything", artist: "Ariana Grande (K-pop cover)", year: 2014 }, { title: "You Are", artist: "GOT7", year: 2017 },
      { title: "Palette", artist: "IU ft. G-Dragon", year: 2017 }, { title: "Love Poem", artist: "IU", year: 2019 },
      { title: "Beautiful", artist: "Crush", year: 2016 }, { title: "Some", artist: "SISTAR", year: 2014 },
    ],
    energetic: [
      { title: "FIRE", artist: "BTS", year: 2016 }, { title: "DDU-DU DDU-DU", artist: "BLACKPINK", year: 2018 },
      { title: "Power", artist: "EXO", year: 2017 }, { title: "BOOMBAYAH", artist: "BLACKPINK", year: 2016 },
      { title: "Growl", artist: "EXO", year: 2013 }, { title: "MIROH", artist: "Stray Kids", year: 2019 },
    ],
    chill: [
      { title: "Blueming", artist: "IU", year: 2019 }, { title: "Autumn Morning", artist: "BTS", year: 2016 },
      { title: "Snooze", artist: "Agust D ft. Ryuichi Sakamoto", year: 2023 }, { title: "White Night", artist: "BTS", year: 2017 },
    ],
    party: [
      { title: "Gangnam Style", artist: "PSY", year: 2012 }, { title: "Gentleman", artist: "PSY", year: 2013 },
      { title: "Cheer Up", artist: "TWICE", year: 2016 }, { title: "TT", artist: "TWICE", year: 2016 },
      { title: "LIKEY", artist: "TWICE", year: 2017 }, { title: "Alcohol-Free", artist: "TWICE", year: 2021 },
    ],
    heartbreak: [
      { title: "Rain", artist: "BTS", year: 2015 }, { title: "Jonghyun - Lonely", artist: "SHINee", year: 2017 },
      { title: "Breathe", artist: "LEE HI", year: 2016 }, { title: "Done", artist: "Block B", year: 2012 },
    ],
    motivational: [
      { title: "Not Today", artist: "BTS", year: 2017 }, { title: "Boombastic (Stray Kids)", artist: "Stray Kids", year: 2019 },
      { title: "God's Menu", artist: "Stray Kids", year: 2020 }, { title: "HERO", artist: "Monsta X", year: 2015 },
    ],
  },
  spanish: {
    happy: [
      { title: "Despacito", artist: "Luis Fonsi ft. Daddy Yankee", year: 2017 }, { title: "Waka Waka", artist: "Shakira", year: 2010 },
      { title: "Bailando", artist: "Enrique Iglesias", year: 2014 }, { title: "Lean On", artist: "Major Lazer (Spanish ver)", year: 2015 },
      { title: "Con Calma", artist: "Daddy Yankee", year: 2019 }, { title: "Macarena", artist: "Los del Rio", year: 1993 },
    ],
    romantic: [
      { title: "Bésame Mucho", artist: "Trio Los Panchos", year: 1944 }, { title: "Historia de un Amor", artist: "Carlos Gardel", year: 1956 },
      { title: "Quizás, Quizás, Quizás", artist: "Trio Matamoros", year: 1947 }, { title: "La Bamba", artist: "Ritchie Valens", year: 1958 },
    ],
    party: [
      { title: "Mi Gente", artist: "J Balvin", year: 2017 }, { title: "Gasolina", artist: "Daddy Yankee", year: 2004 },
      { title: "Shakira Hips Don't Lie", artist: "Shakira ft. Wyclef Jean", year: 2005 },
    ],
    sad: [
      { title: "Quiero Que Vuelvas", artist: "Alejandro Fernández", year: 2004 }, { title: "No Me Ames", artist: "Marc Anthony & Jennifer Lopez", year: 1999 },
      { title: "Vivir Mi Vida", artist: "Marc Anthony", year: 2013 },
    ],
  },
  japanese: {
    happy: [
      { title: "Paprika", artist: "Foorin", year: 2018 }, { title: "One Last Kiss", artist: "Hikaru Utada", year: 2021 },
      { title: "Lemon", artist: "Kenshi Yonezu", year: 2018 }, { title: "Koi", artist: "Gen Hoshino", year: 2016 },
    ],
    sad: [
      { title: "Pretender", artist: "Official HIGE DANdism", year: 2019 }, { title: "Gurenge", artist: "LiSA", year: 2019 },
      { title: "I Love...", artist: "Official HIGE DANdism", year: 2019 },
    ],
    romantic: [
      { title: "First Love", artist: "Hikaru Utada", year: 1999 }, { title: "Everything", artist: "MISIA", year: 2000 },
      { title: "Yuki no Hana", artist: "Nakashima Mika", year: 2003 },
    ],
    chill: [
      { title: "Flamingo", artist: "Kenshi Yonezu", year: 2018 }, { title: "Subtitle", artist: "Official HIGE DANdism", year: 2021 },
      { title: "Bless Your Breath", artist: "Macaroni Enpitsu", year: 2019 },
    ],
  },
};

const LANGUAGES = ["english", "hindi", "korean", "spanish", "japanese"];
const MOODS = ["happy", "sad", "romantic", "energetic", "chill", "party", "heartbreak", "motivational"];

function getRandomUnique(arr: Song[], exclude: Song | null): Song {
  if (arr.length <= 1) return arr[0];
  let pick: Song;
  let attempts = 0;
  do { pick = arr[Math.floor(Math.random() * arr.length)]; attempts++; } while (pick === exclude && attempts < 10);
  return pick;
}

export default function RandomSongGenerator() {
  const [language, setLanguage] = useState("english");
  const [mood, setMood] = useState("happy");
  const [result, setResult] = useState<Song | null>(null);
  const [resultKey, setResultKey] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const last = useRef<Song | null>(null);

  const spin = () => {
    setIsSpinning(true);
    setResult(null);
    setTimeout(() => {
      const pool = SONGS[language]?.[mood] ?? SONGS.english.happy;
      const song = getRandomUnique(pool, last.current);
      last.current = song;
      setResult(song);
      setResultKey(k => k + 1);
      setIsSpinning(false);
    }, 2000);
  };

  const handleLangChange = (v: string) => { setLanguage(v); setResult(null); last.current = null; };
  const handleMoodChange = (v: string) => { setMood(v); setResult(null); last.current = null; };

  return (
    <>
      <SEO title="Random Song Generator - Discover Music by Mood" description="Generate random popular songs by language and mood. English, Hindi, Korean, Spanish and more. Find your next song for any vibe." canonicalUrl="https://randomtoolbox.replit.app/random-song-generator" />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools</Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg"><Music className="w-6 h-6" /></div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Random Song Generator</h1>
          </div>
          <p className="text-muted-foreground text-lg">Pick a language and mood — we'll find your next track.</p>
        </div>
        <Card className="border-2 shadow-lg">
          <CardContent className="p-8 flex flex-col items-center space-y-6">
            <div className="w-full grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <Select value={language} onValueChange={handleLangChange}>
                  <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>{LANGUAGES.map(l => <SelectItem key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mood</label>
                <Select value={mood} onValueChange={handleMoodChange}>
                  <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>{MOODS.map(m => <SelectItem key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="h-48 flex items-center justify-center w-full relative">
              <AnimatePresence mode="wait">
                {isSpinning ? (
                  <motion.div key="spinning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="absolute flex flex-col items-center gap-3">
                    <Music className="w-12 h-12 text-purple-500 animate-bounce" />
                    <p className="text-muted-foreground animate-pulse font-medium">Finding the perfect track...</p>
                  </motion.div>
                ) : result ? (
                  <motion.div key={`r-${resultKey}`} initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="absolute text-center w-full px-4">
                    <p className="text-sm text-purple-500 uppercase tracking-wider font-bold mb-2">Now Playing</p>
                    <h2 className="text-2xl md:text-3xl font-display font-black text-foreground mb-2">{result.title}</h2>
                    <p className="text-lg text-muted-foreground">{result.artist}</p>
                    <p className="text-sm text-muted-foreground mt-1">{result.year}</p>
                  </motion.div>
                ) : (
                  <motion.div key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute text-center text-muted-foreground">
                    <Music className="w-16 h-16 opacity-20 mx-auto mb-2" />
                    <p className="opacity-40">Select your mood and spin</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Button size="lg" className="w-full max-w-xs h-16 text-xl rounded-2xl shadow-xl bg-purple-600 hover:bg-purple-700 text-white" onClick={spin} disabled={isSpinning} data-testid="button-spin-song">
              {isSpinning ? "Finding..." : result ? "Next Song" : "Spin for a Song"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
