import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "./components/ui/toaster";
import StatusBar from "./components/StatusBar";
import Navbar from "./components/Navbar";
import PromoBanner from "./components/PromoBanner";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DesignDemos from "./pages/DesignDemos";
import Pricing from "./pages/Pricing";
import Features from "./pages/Features";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import Admin from "./pages/Admin";
import Team from "./pages/Team";
import { ExperienceProvider, useExperience } from "./context/ExperienceContext";
import ExperienceEffects from "./components/ExperienceEffects";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const frame = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
};

function PageRoutes() {
  const { pathname } = useLocation();
  const { motionEnabled } = useExperience();
  return <motion.main id="main-content" tabIndex={-1} key={pathname} initial={motionEnabled ? { opacity: 0, y: 10 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: motionEnabled ? 0.3 : 0 }}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/demos" element={<DesignDemos />} />
      <Route path="/team" element={<Team />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/features" element={<Features />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/account" element={<Account />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<div className="empty-state"><span className="eyebrow">404 / SIGNAL LOST</span><h1>Off the grid.</h1><Link className="button-primary" to="/">Return to base</Link></div>} />
    </Routes>
  </motion.main>;
}

function App() {
  return (
    <div className="App">
      <ExperienceProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <ExperienceEffects />
            <a href="#main-content" className="skip-link">Skip to content</a>
            <StatusBar />
            <Navbar />
            <PromoBanner />
            <PageRoutes />
            <Footer />
            <Toaster />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
      </ExperienceProvider>
    </div>
  );
}

export default App;
