import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignIn />} />
            <Route path="/email-signin" element={<EmailSignIn />} />
            <Route path="/phone-signin" element={<PhoneSignIn />} />
            
            {/* Protected routes */}
            <Route path="/exam-select" element={
              <ProtectedRoute>
                <ExamSelect />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/study" element={
              <ProtectedRoute>
                <Study />
              </ProtectedRoute>
            } />
            <Route path="/subject/:subjectId" element={
              <ProtectedRoute>
                <SubjectDetail />
              </ProtectedRoute>
            } />
            <Route path="/assessment" element={
              <ProtectedRoute>
                <Assessment />
              </ProtectedRoute>
            } />
            <Route path="/concept-map" element={
              <ProtectedRoute>
                <ConceptMapPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/leaderboard" element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            } />
            <Route path="/practice-tests" element={
              <ProtectedRoute>
                <PracticeTests />
              </ProtectedRoute>
            } />
            <Route path="/test-results/:testId" element={
              <ProtectedRoute>
                <TestResults />
              </ProtectedRoute>
            } />
            <Route path="/study-schedule" element={
              <ProtectedRoute>
                <StudySchedule />
              </ProtectedRoute>
            } />
            <Route path="/resources" element={
              <ProtectedRoute>
                <ResourceLibrary />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
