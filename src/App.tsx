
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import { Loader2 } from "lucide-react";

// Lazy load all pages except Index for faster initial load
const Assessment = lazy(() => import("./pages/Assessment"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center">
    <Loader2 className="h-12 w-12 animate-spin text-primary" />
    <p className="mt-4 text-muted-foreground">Loading page...</p>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={
              <Suspense fallback={<PageLoader />}>
                <Auth />
              </Suspense>
            } />
            <Route path="/assessment" element={
              <Suspense fallback={<PageLoader />}>
                <ProtectedRoute>
                  <Assessment />
                </ProtectedRoute>
              </Suspense>
            } />
            <Route path="/dashboard" element={
              <Suspense fallback={<PageLoader />}>
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </Suspense>
            } />
            <Route path="/profile" element={
              <Suspense fallback={<PageLoader />}>
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              </Suspense>
            } />
            <Route path="*" element={
              <Suspense fallback={<PageLoader />}>
                <NotFound />
              </Suspense>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
