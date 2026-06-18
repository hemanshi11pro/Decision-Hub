import Privacy from "@/Privacy";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/layout";

import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import WhatShouldIEat from "@/pages/what-should-i-eat";
import WhatShouldIWatch from "@/pages/what-should-i-watch";
import RandomDecisionMaker from "@/pages/random-decision-maker";
import YesOrNoGenerator from "@/pages/yes-or-no-generator";
import ChoicePicker from "@/pages/choice-picker";
import TruthOrDare from "@/pages/truth-or-dare";
import NeverHaveIEver from "@/pages/never-have-i-ever";
import ChallengeGenerator from "@/pages/challenge-generator";
import WouldYouRather from "@/pages/would-you-rather";
import GenZSlangGenerator from "@/pages/gen-z-slang-generator";
import GPACalculator from "@/pages/gpa-calculator";
import StudyPlanner from "@/pages/study-planner";
import ExamCountdown from "@/pages/exam-countdown";
import PercentageCalculator from "@/pages/percentage-calculator";

import RandomRestaurantPicker from "@/pages/random-restaurant-picker";
import CalorieEstimator from "@/pages/calorie-estimator";
import RandomSongGenerator from "@/pages/random-song-generator";
import DiceRoller from "@/pages/dice-roller";
import MostLikelyTo from "@/pages/most-likely-to";
import FriendshipQuiz from "@/pages/friendship-quiz";
import WhoKnowsMeBetter from "@/pages/who-knows-me-better";
import AttendanceCalculator from "@/pages/attendance-calculator";
import CGPACalculator from "@/pages/cgpa-calculator";
import MarksPredictor from "@/pages/marks-predictor";
import RevisionScheduler from "@/pages/revision-scheduler";
import ToDoListGenerator from "@/pages/todo-list-generator";
import HabitTracker from "@/pages/habit-tracker";
import TimeBlockingPlanner from "@/pages/time-blocking-planner";
import MorningRoutinePlanner from "@/pages/morning-routine-planner";
import WaterReminder from "@/pages/water-reminder";
import LovePercentageCalculator from "@/pages/love-percentage-calculator";
import DateIdeaGenerator from "@/pages/date-idea-generator";
import CoupleChallengeIdeas from "@/pages/couple-challenge-ideas";
import UsernameGenerator from "@/pages/username-generator";

import TattooIdeaGenerator from "@/pages/tattoo-idea-generator";
import HowRareAreYou from "@/pages/how-rare-are-you";
import RedFlagDetector from "@/pages/red-flag-detector";
import ExcuseGenerator from "@/pages/excuse-generator";
import FutureSelfLetter from "@/pages/future-self-letter";
import DreamInterpreter from "@/pages/dream-interpreter";
import WouldYouSurvive from "@/pages/would-you-survive";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/what-should-i-eat" component={WhatShouldIEat} />
        <Route path="/what-should-i-watch" component={WhatShouldIWatch} />
        <Route path="/random-decision-maker" component={RandomDecisionMaker} />
        <Route path="/yes-or-no-generator" component={YesOrNoGenerator} />
        <Route path="/choice-picker" component={ChoicePicker} />

        <Route path="/truth-or-dare" component={TruthOrDare} />
        <Route path="/never-have-i-ever" component={NeverHaveIEver} />
        <Route path="/challenge-generator" component={ChallengeGenerator} />
        <Route path="/would-you-rather" component={WouldYouRather} />
        <Route path="/gen-z-slang-generator" component={GenZSlangGenerator} />

        <Route path="/gpa-calculator" component={GPACalculator} />
        <Route path="/study-planner" component={StudyPlanner} />
        <Route path="/exam-countdown" component={ExamCountdown} />
        <Route path="/percentage-calculator" component={PercentageCalculator} />

        <Route
          path="/random-restaurant-picker"
          component={RandomRestaurantPicker}
        />
        <Route path="/calorie-estimator" component={CalorieEstimator} />
        <Route path="/random-song-generator" component={RandomSongGenerator} />
        <Route path="/dice-roller" component={DiceRoller} />
        <Route path="/most-likely-to" component={MostLikelyTo} />
        <Route path="/friendship-quiz" component={FriendshipQuiz} />
        <Route path="/who-knows-me-better" component={WhoKnowsMeBetter} />
        <Route path="/attendance-calculator" component={AttendanceCalculator} />
        <Route path="/cgpa-calculator" component={CGPACalculator} />
        <Route path="/marks-predictor" component={MarksPredictor} />
        <Route path="/revision-scheduler" component={RevisionScheduler} />
        <Route path="/todo-list-generator" component={ToDoListGenerator} />
        <Route path="/habit-tracker" component={HabitTracker} />
        <Route path="/time-blocking-planner" component={TimeBlockingPlanner} />
        <Route
          path="/morning-routine-planner"
          component={MorningRoutinePlanner}
        />
        <Route path="/water-reminder" component={WaterReminder} />
        <Route
          path="/love-percentage-calculator"
          component={LovePercentageCalculator}
        />
        <Route path="/date-idea-generator" component={DateIdeaGenerator} />
        <Route
          path="/couple-challenge-ideas"
          component={CoupleChallengeIdeas}
        />
        <Route path="/username-generator" component={UsernameGenerator} />

        <Route path="/tattoo-idea-generator" component={TattooIdeaGenerator} />
        <Route path="/how-rare-are-you" component={HowRareAreYou} />
        <Route path="/red-flag-detector" component={RedFlagDetector} />
        <Route path="/excuse-generator" component={ExcuseGenerator} />
        <Route path="/future-self-letter" component={FutureSelfLetter} />
        <Route path="/dream-interpreter" component={DreamInterpreter} />
        <Route path="/would-you-survive" component={WouldYouSurvive} />
        <Route path="/privacy" component={Privacy} />

        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
