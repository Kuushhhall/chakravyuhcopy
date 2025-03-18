
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import EmailSignIn from "./pages/EmailSignIn";
import PhoneSignIn from "./pages/PhoneSignIn";
import ExamSelect from "./pages/ExamSelect";
import Dashboard from "./pages/Dashboard";
import Study from "./pages/Study";
import SubjectDetail from "./pages/SubjectDetail";
import Assessment from "./pages/Assessment";
import ConceptMapPage from "./pages/ConceptMapPage";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import PracticeTests from "./pages/PracticeTests";
import TestResults from "./pages/TestResults";
import StudySchedule from "./pages/StudySchedule";
import ResourceLibrary from "./pages/ResourceLibrary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignIn />} />
          <Route path="/email-signin" element={<EmailSignIn />} />
          <Route path="/phone-signin" element={<PhoneSignIn />} />
          <Route path="/exam-select" element={<ExamSelect />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/study" element={<Study />} />
          <Route path="/subject/:subjectId" element={<SubjectDetail />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/concept-map" element={<ConceptMapPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/practice-tests" element={<PracticeTests />} />
          <Route path="/test-results/:testId" element={<TestResults />} />
          <Route path="/study-schedule" element={<StudySchedule />} />
          <Route path="/resources" element={<ResourceLibrary />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
