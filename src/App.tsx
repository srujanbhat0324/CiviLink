
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ComplaintForm from "./pages/ComplaintForm";
import Reported from "./pages/issues/Reported";
import Resolved from "./pages/issues/Resolved";
import InProgress from "./pages/issues/InProgress";
import Electricity from "./pages/section/Electricity";
import Road from "./pages/section/Road";
import Cleanliness from "./pages/section/Cleanliness";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/complaint" element={<ComplaintForm />} />
          
          {/* Issues Routes */}
          <Route path="/issues/reported" element={<Reported />} />
          <Route path="/issues/resolved" element={<Resolved />} />
          <Route path="/issues/in-progress" element={<InProgress />} />
          
          {/* Section Routes */}
          <Route path="/section/electricity" element={<Electricity />} />
          <Route path="/section/road" element={<Road />} />
          <Route path="/section/cleanliness" element={<Cleanliness />} />
          
          {/* Profile Route */}
          <Route path="/profile" element={<Profile />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
