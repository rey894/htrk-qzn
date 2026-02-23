import { useState, lazy, Suspense } from "react";
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
import Index from "./pages/Index";
import About from "./pages/About";
import Governance from "./pages/Governance";
import Mayor from "./pages/governance/Mayor";
import SangguniangBayan from "./pages/governance/SangguniangBayan";
import Offices from "./pages/governance/Offices";
import News from "./pages/News";
import DevelopmentAgenda from "./pages/governance/DevelopmentAgenda";
import Services from "./pages/Services";
import Investment from "./pages/Investment";
import Tourism from "./pages/Tourism";
import CivicActivities from "./pages/tourism/CivicActivities";
import WhatToDo from "./pages/tourism/WhatToDo";
import DestinationDetail from "./pages/tourism/DestinationDetail";
import Transparency from "./pages/Transparency";
import FullDisclosure from "./pages/transparency/FullDisclosure";
import NotFound from "./pages/NotFound";
import Accessibility from "./pages/Accessibility";
import Sitemap from "./pages/Sitemap";
import LGSF from "./pages/transparency/LGSF";
import BayanihanGrant from "./pages/transparency/BayanihanGrant";
import InvitationToBid from "./pages/transparency/InvitationToBid";
import NoticeOfAward from "./pages/transparency/NoticeOfAward";
import NoticeToProceed from "./pages/transparency/NoticeToProceed";
import ContractAgreement from "./pages/transparency/ContractAgreement";
import SagipSaka from "./pages/transparency/SagipSaka";
const Auth = lazy(() => import("./pages/Auth"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
import TravelGuide from "./pages/TravelGuide";
import FestivalCalendar from "./pages/FestivalCalendar";
import DataPrivacy from "./pages/DataPrivacy";

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
            <Route path="auth" element={<Suspense fallback={<PageLoader />}><Auth /></Suspense>} />
            <Route path="admin" element={<Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense>} />
            <Route path="*" element={<NotFound />} />
          </Route>
                </Routes>
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
            <BrowserRouter>
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
