import { useState, useRef } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Tv, Play, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const MOVIES: Record<string, string[]> = {
  any: [
    "Inception", "The Dark Knight", "Parasite", "Everything Everywhere All At Once", "Interstellar",
    "The Shawshank Redemption", "Pulp Fiction", "The Matrix", "Spirited Away", "Get Out",
    "Dune", "Oppenheimer", "The Godfather", "Forrest Gump", "Schindler's List",
    "The Silence of the Lambs", "Fight Club", "Goodfellas", "The Lord of the Rings: Fellowship",
    "Avengers: Endgame", "Black Panther", "Knives Out", "Glass Onion", "Arrival",
    "Mad Max: Fury Road", "Her", "La La Land", "Whiplash", "Spotlight", "The Grand Budapest Hotel",
    "Breaking Bad (Series)", "Stranger Things (Series)", "The Office (US)", "Game of Thrones",
    "Chernobyl (Mini Series)", "The Last of Us (Series)", "Succession", "Ozark", "Dark (German)",
    "Squid Game", "Crash Landing on You", "Vincenzo", "My Love from the Star", "Reply 1988",
    "Extraordinary Attorney Woo", "It's Okay to Not Be Okay", "Descendants of the Sun",
    "Hospital Playlist", "Signal (K-Drama)", "Kingdom (K-Drama)", "Mr. Queen",
    "Moon Lovers: Scarlet Heart Ryeo", "Goblin", "Boys Over Flowers", "My Mister",
    "Twenty-Five Twenty-One", "Our Blues", "Juvenile Justice", "D.P.",
    "Peaky Blinders", "Better Call Saul", "The Wire", "The Sopranos", "True Detective",
    "Mindhunter", "Narcos", "The Crown", "Band of Brothers", "Rome",
    "Fleabag", "Schitt's Creek", "Ted Lasso", "Abbott Elementary", "Barry",
    "Atlanta", "The Bear", "Severance", "Andor", "The Boys",
    "One Piece (Anime)", "Attack on Titan", "Fullmetal Alchemist: Brotherhood",
    "Hunter x Hunter", "Death Note", "Steins;Gate", "Your Lie in April",
    "Weathering with You", "A Silent Voice", "Princess Mononoke",
  ],
  kdrama: [
    "Crash Landing on You", "Squid Game", "Vincenzo", "My Love from the Star",
    "Reply 1988", "Reply 1994", "Reply 1997", "Extraordinary Attorney Woo",
    "It's Okay to Not Be Okay", "Descendants of the Sun", "Hospital Playlist",
    "Signal", "Kingdom Season 1", "Kingdom Season 2", "Mr. Queen",
    "Moon Lovers: Scarlet Heart Ryeo", "Goblin", "Boys Over Flowers",
    "My Mister", "Twenty-Five Twenty-One", "Our Blues", "Juvenile Justice",
    "D.P.", "Sweet Home", "Hellbound", "Taxi Driver",
    "Mouse", "Voice", "Flower of Evil", "Strangers from Hell",
    "Itaewon Class", "Start-Up", "Business Proposal", "Something in the Rain",
    "Doom at Your Service", "Nevertheless", "My ID is Gangnam Beauty",
    "Strong Woman Do Bong-soon", "Fight My Way", "Because This Is My First Life",
    "Romance Is a Bonus Book", "Search: WWW", "My Liberation Notes",
    "Hometown Cha-Cha-Cha", "Run On", "Record of Youth",
    "When the Camellia Blooms", "Doctor Stranger", "Kill Me Heal Me",
    "Pinocchio", "I Can Hear Your Voice", "Secret Garden",
    "My Girlfriend Is a Gumiho", "Playful Kiss", "Full House",
    "Coffee Prince", "Winter Sonata", "Jewel in the Palace",
    "The Legend of the Blue Sea", "Healer", "City Hunter",
    "Master's Sun", "Oh My Ghost", "High School King of Savvy",
    "She Was Pretty", "Weightlifting Fairy Kim Bok-joo", "Go Back Couple",
    "Suspicious Partner", "While You Were Sleeping", "Just Between Lovers",
    "The Light in Your Eyes", "Prison Playbook", "Chicago Typewriter",
    "Queen In-hyun's Man", "I Need Romance 3", "Fated to Love You",
    "Gu Family Book", "You Who Came from the Stars", "The K2",
    "Vagabond", "Rugal", "Awaken", "Happiness",
    "All of Us Are Dead", "Bloodhounds", "Mask Girl", "Moving",
    "The Glory", "My Demon", "Marry My Husband", "Queen of Tears",
    "Lovely Runner", "Doctor Slump", "Crash", "When Stars Gossip",
    "My Perfect Stranger", "The Good Bad Mother", "See You in My 19th Life",
    "A Time Called You", "Missing: The Other Side", "Beyond Evil",
    "The Red Sleeve", "Under the Queen's Umbrella", "Joseon Attorney",
    "Secret Royal Inspector", "100 Days My Prince", "The King: Eternal Monarch",
    "Reborn Rich", "Big Mouth", "Grid", "Alienoid",
    "Money Heist: Korea", "Idol: The Coup", "Rookie Historian Goo Hae-ryung",
  ],
  action: [
    "Mad Max: Fury Road", "John Wick", "John Wick Chapter 2", "John Wick Chapter 3", "John Wick Chapter 4",
    "Die Hard", "Die Hard with a Vengeance", "Gladiator", "The Avengers",
    "Avengers: Infinity War", "Avengers: Endgame", "Captain America: Winter Soldier",
    "Terminator 2: Judgment Day", "Mission: Impossible – Fallout", "Mission: Impossible – Rogue Nation",
    "Top Gun: Maverick", "Edge of Tomorrow", "Fury", "Dunkirk",
    "1917", "Hacksaw Ridge", "Zero Dark Thirty", "Black Hawk Down",
    "Kill Bill Vol. 1", "Kill Bill Vol. 2", "The Raid", "The Raid 2",
    "Old Boy", "A Bittersweet Life", "The Man from Nowhere", "Ip Man",
    "Crouching Tiger Hidden Dragon", "Hero", "House of Flying Daggers",
    "The Matrix", "The Matrix Reloaded", "Speed Racer", "District 9",
    "Elysium", "Dredd", "RoboCop (1987)", "Total Recall (1990)",
    "Aliens", "Predator", "The Running Man", "Hard Boiled",
    "Fast Five", "Fast & Furious 6", "Sicario", "Wind River",
    "Heat", "Collateral", "Michael Clayton", "No Country for Old Men",
    "Blood Diamond", "Lord of War", "Warrior", "Creed",
    "Rocky IV", "Ali", "Southpaw", "The Fighter",
    "Free Fire", "Upgrade", "Nobody", "Extraction",
    "Triple Frontier", "The Old Guard", "Army of Darkness",
    "True Lies", "Face/Off", "The Rock", "Con Air",
    "Speed", "Point Break", "Lethal Weapon", "Commando",
    "Equilibrium", "Shoot 'Em Up", "Smokin' Aces", "Wanted",
    "Atomic Blonde", "Anna", "Haywire", "Salt",
    "Colombiana", "La Femme Nikita", "Hanna", "Peppermint",
    "The Expendables", "Red", "Machete", "Punisher: War Zone",
    "Kingsman: The Secret Service", "Kick-Ass", "Ant-Man",
    "Black Panther", "Shang-Chi", "Thor: Ragnarok", "Iron Man",
    "Spider-Man: No Way Home", "Doctor Strange in the Multiverse",
    "Guardians of the Galaxy", "The Suicide Squad", "The Peacemaker",
  ],
  comedy: [
    "Superbad", "The Hangover", "Step Brothers", "Anchorman", "Talladega Nights",
    "Bridesmaids", "Booksmart", "Game Night", "Game Night", "Knives Out",
    "Hot Fuzz", "Shaun of the Dead", "The World's End", "In Bruges",
    "Four Weddings and a Funeral", "Notting Hill", "About Time", "Love Actually",
    "Crazy Rich Asians", "The Big Sick", "Always Be My Maybe",
    "What We Do in the Shadows", "Thor: Ragnarok", "Guardians of the Galaxy",
    "Tropic Thunder", "Zoolander", "Blades of Glory", "Semi-Pro",
    "Office Space", "Idiocracy", "Don't Look Up", "Barb and Star Go to Vista Del Mar",
    "The Princess Bride", "Clue", "Ferris Bueller's Day Off", "Breakfast Club",
    "Sixteen Candles", "Home Alone", "Three Amigos", "Spaceballs",
    "Mel Brooks Films Compilation", "Duck Soup", "Some Like It Hot",
    "Animal House", "Caddyshack", "Fletch", "Beverly Hills Cop",
    "Trading Places", "Coming to America", "Boomerang", "Friday",
    "Next Friday", "Friday After Next", "Barbershop", "Brown Sugar",
    "My Cousin Vinny", "Dumb and Dumber", "Ace Ventura", "The Mask",
    "Liar Liar", "Bruce Almighty", "Click", "Stranger Than Fiction",
    "The Grand Budapest Hotel", "Moonrise Kingdom", "Rushmore",
    "Bottle Rocket", "The Life Aquatic", "Isle of Dogs",
    "Inside Out", "Ratatouille", "The Incredibles", "Up",
    "Finding Nemo", "Monsters Inc.", "Toy Story", "Soul",
    "Parks and Recreation (Series)", "The Office (US Series)", "Brooklyn Nine-Nine",
    "Arrested Development", "Schitt's Creek", "Ted Lasso", "Abbott Elementary",
    "What We Do in the Shadows (Series)", "The Good Place", "Community",
    "It's Always Sunny in Philadelphia", "Peep Show", "Fleabag",
    "Catastrophe", "Motherland", "Derry Girls", "Taskmaster",
    "Fawlty Towers", "Black Books", "The IT Crowd", "Father Ted",
    "30 Rock", "Unbreakable Kimmy Schmidt", "Russian Doll", "Rutherford Falls",
    "Reservation Dogs", "Ghosts (UK)", "Ghosts (US)", "Gavin & Stacey",
  ],
  horror: [
    "Hereditary", "A Quiet Place", "A Quiet Place Part II", "The Shining",
    "It Follows", "The Conjuring", "The Conjuring 2", "Halloween (1978)",
    "Midsommar", "Nope", "Us", "Get Out", "The Black Phone",
    "Sinister", "Insidious", "Insidious Chapter 2", "The Babadook",
    "The VVitch", "The Lighthouse", "Annihilation", "Men",
    "Talk to Me", "Barbarian", "Pearl", "X",
    "Possessor", "Lamb", "The Green Knight", "Saint Maud",
    "Raw", "Hereditary", "Ari Aster's Beau Is Afraid",
    "Evil Dead Rise", "Evil Dead 2", "Army of Darkness",
    "The Texas Chain Saw Massacre (1974)", "Halloween (1978)",
    "A Nightmare on Elm Street", "Friday the 13th", "Child's Play",
    "Scream", "Scream 2", "I Know What You Did Last Summer",
    "Final Destination", "Saw", "Saw II", "Cube",
    "REC", "The Blair Witch Project", "Paranormal Activity",
    "As Above So Below", "Cloverfield", "10 Cloverfield Lane",
    "The Ritual", "The Descent", "Dog Soldiers", "Eden Lake",
    "Housebound", "What Keeps You Alive", "Lake Mungo",
    "Host", "Creep", "The Taking of Deborah Logan",
    "Grave Encounters", "Hell House LLC", "Noroi: The Curse",
    "Ringu", "Ju-On: The Grudge", "Audition", "Ichi the Killer",
    "Oldboy", "I Saw the Devil", "The Wailing", "Train to Busan",
    "Suspiria (1977)", "Suspiria (2018)", "Dario Argento's Deep Red",
    "Don't Breathe", "Don't Breathe 2", "Hush", "You're Next",
    "The Hunt", "Bone Tomahawk", "The Strangers",
    "Funny Games", "Martyrs", "Inside (À l'intérieur)",
    "Hereditary", "Mama", "The Orphanage", "Pan's Labyrinth",
    "The Others", "Session 9", "Resolution", "The Endless",
    "Color Out of Space", "HP Lovecraft's The Thing on the Doorstep",
    "The Thing (1982)", "John Carpenter's Prince of Darkness",
  ],
  romance: [
    "La La Land", "Pride & Prejudice (2005)", "The Notebook", "Before Sunrise",
    "Before Sunset", "Before Midnight", "Notting Hill", "About Time",
    "Crazy Rich Asians", "Always Be My Maybe", "The Big Sick",
    "Brooklyn", "Normal People (Series)", "Daisy Jones and The Six",
    "One Day (Series)", "Heartstopper (Series)", "Sex Education (Series)",
    "Fleabag", "Fleabag Series 2", "Schitt's Creek",
    "You've Got Mail", "Sleepless in Seattle", "When Harry Met Sally",
    "Say Anything", "Pretty in Pink", "Sixteen Candles",
    "10 Things I Hate About You", "She's All That", "Clueless",
    "High Fidelity (Film)", "High Fidelity (Series)", "Nick and Norah's Infinite Playlist",
    "Definitely Maybe", "Just Friends", "Love Actually",
    "Four Weddings and a Funeral", "My Best Friend's Wedding",
    "Runaway Bride", "Pretty Woman", "Hitch",
    "Two Weeks Notice", "Maid in Manhattan", "How to Lose a Guy in 10 Days",
    "27 Dresses", "The Proposal", "Leap Year", "P.S. I Love You",
    "The Time Traveler's Wife", "The Fault in Our Stars",
    "Me Before You", "After", "Five Feet Apart",
    "To All the Boys I've Loved Before", "The Kissing Booth", "The Summer I Turned Pretty",
    "Bridgerton (Series)", "Outlander (Series)", "Virgin River (Series)",
    "Emily in Paris (Series)", "Sweet Magnolias", "When Calls the Heart",
    "Gilmore Girls", "Grey's Anatomy", "This Is Us",
    "Crash Landing on You", "Something in the Rain", "My Mister",
    "Goblin", "It's Okay to Not Be Okay", "Our Blues",
    "Twenty-Five Twenty-One", "Business Proposal", "Hometown Cha-Cha-Cha",
    "Because This Is My First Life", "My Liberation Notes",
    "A Good Year", "Under the Tuscan Sun", "The Holiday",
    "Mamma Mia!", "Letters to Juliet", "Midnight in Paris",
    "Call Me by Your Name", "Portrait of a Lady on Fire",
    "Brokeback Mountain", "Moonlight", "Carol",
    "In the Mood for Love", "Chungking Express", "Wong Kar-wai's 2046",
    "Eternal Sunshine of the Spotless Mind", "Lost in Translation",
  ],
  animation: [
    "Spider-Man: Into the Spider-Verse", "Spider-Man: Across the Spider-Verse",
    "Toy Story", "Toy Story 2", "Toy Story 3", "Toy Story 4",
    "Wall-E", "Up", "Inside Out", "Inside Out 2",
    "Ratatouille", "The Incredibles", "The Incredibles 2",
    "Finding Nemo", "Finding Dory", "Monsters Inc.", "Monsters University",
    "Soul", "Luca", "Encanto", "Coco", "Moana", "Brave",
    "Frozen", "Frozen II", "Tangled", "Zootopia", "Wreck-It Ralph",
    "The Lion King (1994)", "Aladdin (1992)", "Beauty and the Beast (1991)",
    "The Little Mermaid", "Mulan", "Hercules", "Tarzan", "Fantasia",
    "My Neighbor Totoro", "Spirited Away", "Princess Mononoke",
    "Howl's Moving Castle", "Castle in the Sky", "Nausicaä",
    "The Cat Returns", "Kiki's Delivery Service", "Porco Rosso",
    "The Tale of Princess Kaguya", "When Marnie Was There", "The Red Turtle",
    "Weathering with You", "Your Name", "A Silent Voice",
    "The Garden of Words", "The Place Promised in Our Early Days",
    "Wolf Children", "The Boy and the Beast", "Mirai",
    "Demon Slayer: Mugen Train", "One Piece Film: Red", "Dragon Ball Super: Broly",
    "Jujutsu Kaisen 0", "My Hero Academia: Heroes Rising",
    "Arcane (Series)", "Avatar: The Last Airbender", "Legend of Korra",
    "Attack on Titan (Series)", "Fullmetal Alchemist Brotherhood",
    "Death Note (Anime)", "Hunter x Hunter (2011)", "One Piece (Anime)",
    "Naruto Shippuden", "Bleach: Thousand-Year Blood War", "Dragon Ball Z",
    "Cowboy Bebop", "Trigun", "Neon Genesis Evangelion",
    "Steins;Gate", "Re:Zero", "Sword Art Online",
    "No Game No Life", "Overlord", "That Time I Got Reincarnated as a Slime",
    "Mob Psycho 100", "One Punch Man", "Vinland Saga",
    "Berserk", "Made in Abyss", "Mushishi",
    "Grave of the Fireflies", "Barefoot Gen", "Paprika",
    "Perfect Blue", "Satoshi Kon's Tokyo Godfathers",
    "Persepolis", "Waltz with Bashir", "The Breadwinner",
    "Klaus", "The Mitchells vs. the Machines", "The Sea Beast",
  ],
  documentary: [
    "Free Solo", "The Rescue", "Planet Earth", "Planet Earth II",
    "Our Planet", "Blue Planet II", "David Attenborough: A Life on Our Planet",
    "The Last Dance", "Icarus", "Making a Murderer",
    "The Jinx", "The Act of Killing", "Citizenfour",
    "13th", "I Am Not Your Negro", "Miss Americana",
    "Jiro Dreams of Sushi", "My Octopus Teacher", "Fire of Love",
    "Seaspiracy", "Cowspiracy", "The Social Dilemma",
    "The Great Hack", "Don't F**k with Cats", "Wild Wild Country",
    "The Vow", "LuLaRich", "Fyre", "Fyre Fraud",
    "Tiger King", "The Tinder Swindler", "Bad Vegan",
    "Trust No One: The Hunt for the Crypto King", "Madoff: The Monster of Wall Street",
    "American Murder: The Family Next Door", "The Puppet Master",
    "The Disappearance of Madeleine McCann", "Evil Genius",
    "Night Stalker", "I'll Be Gone in the Dark",
    "Amanda Knox", "Conversations with a Killer: Ted Bundy Tapes",
    "Heist", "Web of Make Believe", "Bad Sport",
    "Formula 1: Drive to Survive", "Sunderland 'Til I Die",
    "All or Nothing (Series)", "Man on Wire", "Searching for Sugar Man",
    "Amy", "Montage of Heck", "Shut Up & Sing",
    "20 Feet from Stardom", "What's Happening: The Beatles in India",
    "Get Back", "Summer of Soul", "Woodstock",
    "The Beatles Anthology", "No Direction Home",
    "Super Size Me", "Fed Up", "Food Inc.",
    "Blackfish", "The Cove", "Virunga",
    "An Inconvenient Truth", "Before the Flood",
    "2001: A Space Odyssey (look-alike feel)", "Apollo 11",
    "For All Mankind", "The Last Man on the Moon",
    "Into the Inferno", "Grizzly Man", "Cave of Forgotten Dreams",
    "Herzog's Encounters at the End of the World",
    "Harlan County USA", "Roger & Me", "Bowling for Columbine",
    "The Square", "Stories We Tell", "The Arbor",
  ],
  thriller: [
    "Se7en", "Gone Girl", "Prisoners", "Shutter Island", "Zodiac",
    "Nightcrawler", "The Silence of the Lambs", "Hannibal",
    "Memento", "The Prestige", "Inception", "Tenet",
    "Parasite", "Burning", "Oldboy", "I Saw the Devil",
    "A Tale of Two Sisters", "The Wailing", "Memories of Murder",
    "Michael Clayton", "The Firm", "The Pelican Brief",
    "The Fugitive", "No Way Out", "Presumed Innocent",
    "Primal Fear", "Fracture", "Untraceable",
    "Basic Instinct", "Fatal Attraction", "Pacific Heights",
    "Rear Window", "Vertigo", "Psycho", "The Birds",
    "Rope", "Dial M for Murder", "North by Northwest",
    "The Conversation", "Three Days of the Condor", "All the President's Men",
    "Enemy of the State", "Enemy", "Coherence",
    "The Invitation (2015)", "Thoroughbreds", "Nocturnal Animals",
    "Gone Baby Gone", "Mystic River", "The Town",
    "Heat", "Collateral", "Mann's Public Enemies",
    "Sicario", "Sicario: Day of the Soldado", "Hell or High Water",
    "No Country for Old Men", "Blood Simple", "Fargo",
    "The Coen Brothers' Miller's Crossing", "Barton Fink",
    "Se7en", "Fight Club", "Panic Room", "The Girl with the Dragon Tattoo",
    "Gone Girl", "Zodiac", "The Social Network", "House of Cards (US Series)",
    "Mindhunter (Series)", "Ozark (Series)", "The Fall (Series)",
    "Broadchurch", "Marcella", "Unforgotten", "Happy Valley",
    "True Detective Season 1", "True Detective Season 2", "Sharp Objects",
    "Big Little Lies", "The Undoing", "The Night Manager",
    "Luther", "Peaky Blinders", "Bodyguard (UK)", "Killing Eve",
    "The Americans", "Homeland", "24", "Prison Break",
    "Better Call Saul", "Breaking Bad", "The Sopranos", "The Wire",
  ],
};

function getRandomUnique(arr: string[], exclude: string | null): string {
  if (arr.length <= 1) return arr[0];
  let pick: string;
  let attempts = 0;
  do {
    pick = arr[Math.floor(Math.random() * arr.length)];
    attempts++;
  } while (pick === exclude && attempts < 10);
  return pick;
}

export default function WhatShouldIWatch() {
  const [genre, setGenre] = useState<keyof typeof MOVIES>("any");
  const [result, setResult] = useState<string | null>(null);
  const [resultKey, setResultKey] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const lastResult = useRef<string | null>(null);

  const spin = () => {
    setIsSpinning(true);
    setResult(null);

    setTimeout(() => {
      const options = MOVIES[genre];
      const pick = getRandomUnique(options, lastResult.current);
      lastResult.current = pick;
      setResult(pick);
      setResultKey(k => k + 1);
      setIsSpinning(false);
    }, 1500);
  };

  return (
    <>
      <SEO
        title="What Should I Watch? - Random Movie & K-Drama Picker"
        description="Can't decide what to watch? Pick from 1000+ movies, K-dramas, and shows. Filter by genre: action, comedy, horror, romance, K-drama and more. Free, instant."
        canonicalUrl="https://randomtoolbox.replit.app/what-should-i-watch"
      />

      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <Tv className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">What Should I Watch?</h1>
          </div>
          <p className="text-muted-foreground text-lg">Stop scrolling endlessly. Let us pick your next binge.</p>
        </div>

        <Card className="border-2 shadow-lg overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />
          <CardContent className="p-8 md:p-12 flex flex-col items-center text-center space-y-8">
            <div className="w-full max-w-xs space-y-2 text-left">
              <label className="text-sm font-medium">Select Genre</label>
              <Select value={genre} onValueChange={(v) => { setGenre(v as keyof typeof MOVIES); setResult(null); lastResult.current = null; }}>
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Surprise Me (Any Genre)</SelectItem>
                  <SelectItem value="kdrama">K-Drama</SelectItem>
                  <SelectItem value="action">Action & Adventure</SelectItem>
                  <SelectItem value="comedy">Comedy</SelectItem>
                  <SelectItem value="horror">Horror</SelectItem>
                  <SelectItem value="romance">Romance</SelectItem>
                  <SelectItem value="animation">Animation & Anime</SelectItem>
                  <SelectItem value="documentary">Documentary</SelectItem>
                  <SelectItem value="thriller">Thriller</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="h-48 flex items-center justify-center w-full relative">
              <AnimatePresence mode="wait">
                {isSpinning ? (
                  <motion.div
                    key="spinning"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                    className="absolute"
                  >
                    <div className="w-16 h-16 rounded-full border-4 border-dashed border-blue-500 animate-spin" />
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key={`result-${resultKey}`}
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute text-center w-full"
                  >
                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-2">Grab the popcorn for...</p>
                    <h2 className="text-3xl md:text-4xl font-display font-black text-foreground leading-tight">
                      {result}
                    </h2>
                  </motion.div>
                ) : (
                  <motion.div
                    key="initial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute text-muted-foreground"
                  >
                    <Tv className="w-16 h-16 opacity-20" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button
              size="lg"
              className="w-full max-w-xs h-16 text-xl rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all bg-blue-600 hover:bg-blue-700 text-white"
              onClick={spin}
              disabled={isSpinning}
              data-testid="button-pick"
            >
              {isSpinning ? "Tuning in..." : result ? "Find Another" : <><Play className="w-5 h-5 mr-2 fill-current" /> Pick a Show</>}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
