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