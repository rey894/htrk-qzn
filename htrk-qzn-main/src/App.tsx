import { lazy, Suspense, useState } from "react";
import Maintenance from "./pages/Maintenance";
import { MaintenanceGuard } from "@/components/MaintenanceGuard";
import { LoadingScreen, INTRO_SEEN_KEY } from "@/components/LoadingScreen";
import { FloatingEmergencyHotlines } from "@/components/FloatingEmergencyHotlines";
import { AnimatedLayout } from "@/components/AnimatedLayout";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Route-level code splitting to keep the initial bundle small.
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Governance = lazy(() => import("./pages/Governance"));
const Mayor = lazy(() => import("./pages/governance/Mayor"));
const SangguniangBayan = lazy(() => import("./pages/governance/SangguniangBayan"));
const Offices = lazy(() => import("./pages/governance/Offices"));
const News = lazy(() => import("./pages/News"));
const DevelopmentAgenda = lazy(() => import("./pages/governance/DevelopmentAgenda"));
const Services = lazy(() => import("./pages/Services"));
const Investment = lazy(() => import("./pages/Investment"));
const Tourism = lazy(() => import("./pages/Tourism"));
const CivicActivities = lazy(() => import("./pages/tourism/CivicActivities"));
const WhatToDo = lazy(() => import("./pages/tourism/WhatToDo"));
const DestinationDetail = lazy(() => import("./pages/tourism/DestinationDetail"));
const Transparency = lazy(() => import("./pages/Transparency"));
const FullDisclosure = lazy(() => import("./pages/transparency/FullDisclosure"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const LGSF = lazy(() => import("./pages/transparency/LGSF"));
const BayanihanGrant = lazy(() => import("./pages/transparency/BayanihanGrant"));
const InvitationToBid = lazy(() => import("./pages/transparency/InvitationToBid"));
const NoticeOfAward = lazy(() => import("./pages/transparency/NoticeOfAward"));
const NoticeToProceed = lazy(() => import("./pages/transparency/NoticeToProceed"));
const ContractAgreement = lazy(() => import("./pages/transparency/ContractAgreement"));
const SagipSaka = lazy(() => import("./pages/transparency/SagipSaka"));
const Auth = lazy(() => import("./pages/Auth"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const TravelGuide = lazy(() => import("./pages/TravelGuide"));
const FestivalCalendar = lazy(() => import("./pages/FestivalCalendar"));
const DataPrivacy = lazy(() => import("./pages/DataPrivacy"));

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const routerBasename = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "/";

function AppContent() {
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  const [introDone, setIntroDone] = useState(() => {
    try {
      return sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
    } catch {
      return false;
    }
  });

  const showLoadingScreen = isHomepage && !introDone;

  return (
    <>
      {showLoadingScreen && (
        <LoadingScreen onComplete={() => setIntroDone(true)} />
      )}
      <MaintenanceGuard>
        <FloatingEmergencyHotlines />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/" element={<AnimatedLayout />}>
              <Route index element={<Index />} />
              <Route path="about" element={<About />} />
              <Route path="governance" element={<Governance />} />
              <Route path="governance/mayor" element={<Mayor />} />
              <Route path="governance/sangguniang-bayan" element={<SangguniangBayan />} />
              <Route path="governance/offices" element={<Offices />} />
              <Route path="governance/department-heads" element={<Offices />} />
              <Route path="news" element={<News />} />
              <Route path="governance/development-agenda" element={<DevelopmentAgenda />} />
              <Route path="services" element={<Services />} />
              <Route path="investment" element={<Investment />} />
              <Route path="tourism" element={<Tourism />} />
              <Route path="tourism/civic-activities" element={<CivicActivities />} />
              <Route path="tourism/festivals" element={<FestivalCalendar />} />
              <Route path="tourism/what-to-do" element={<WhatToDo />} />
              <Route path="tourism/destination/:id" element={<DestinationDetail />} />
              <Route path="travel-guide" element={<TravelGuide />} />
              <Route path="transparency" element={<Transparency />} />
              <Route path="transparency/full-disclosure" element={<FullDisclosure />} />
              <Route path="transparency/lgsf" element={<LGSF />} />
              <Route path="transparency/bayanihan-grant" element={<BayanihanGrant />} />
              <Route path="transparency/invitation-to-bid" element={<InvitationToBid />} />
              <Route path="transparency/notice-of-award" element={<NoticeOfAward />} />
              <Route path="transparency/notice-to-proceed" element={<NoticeToProceed />} />
              <Route path="transparency/contract-agreement" element={<ContractAgreement />} />
              <Route path="transparency/sagip-saka" element={<SagipSaka />} />
              <Route path="accessibility" element={<Accessibility />} />
              <Route path="sitemap" element={<Sitemap />} />
              <Route path="data-privacy" element={<DataPrivacy />} />
              <Route path="auth" element={<Auth />} />
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </MaintenanceGuard>
    </>
  );
}

const App = () => {
  try {
    return (
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename={routerBasename}>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </HelmetProvider>
      </QueryClientProvider>
    );
  } catch (error) {
    console.error('App initialization error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full text-center space-y-4">
          <h1 className="text-2xl font-bold">Application Error</h1>
          <p className="text-muted-foreground">
            Failed to initialize the application. Please refresh the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
};

export default App;
