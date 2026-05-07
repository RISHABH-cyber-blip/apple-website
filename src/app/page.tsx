'use client';
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import ProgressBar from '@/components/ui/ProgressBar';
import LoadingScreen from '@/components/ui/LoadingScreen';
import CustomCursor from '@/components/ui/CustomCursor';
import HeroSection from '@/components/sections/HeroSection';
import CloserLookSection from '@/components/sections/CloserLookSection';
import CameraZoomSection from '@/components/sections/CameraZoomSection';
import StatsSection from '@/components/sections/StatsSection';
import EnvironmentSection from '@/components/sections/EnvironmentSection';
import LineupSection from '@/components/sections/LineupSection';
import WhyAppleSection from '@/components/sections/WhyAppleSection';
import BatterySection from '@/components/sections/BatterySection';
import PrivacySection from '@/components/sections/PrivacySection';
import EssentialsSection from '@/components/sections/EssentialsSection';
import Footer from '@/components/layout/Footer';
import SectionDivider from '@/components/ui/SectionDivider';
import { useLenis } from '@/lib/hooks/useLenis';

export default function Home() {
  useLenis();

  useEffect(() => {
    document.documentElement.classList.add('loaded');
  }, []);

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <main className="relative bg-black overflow-x-hidden">
        <ProgressBar />
        <Navbar />

        {/* 1 — Scroll-driven 3D hero (600vh sticky) */}
        <HeroSection />

        {/* 2 — Take a Closer Look: feature cards */}
        <SectionDivider />
        <CloserLookSection />

        {/* 3 — Camera Zoom: lens fly-through */}
        <SectionDivider />
        <CameraZoomSection />

        {/* 4 — Animated number stats + marquee ticker */}
        <StatsSection />

        {/* 5 — Environment / eco */}
        <SectionDivider />
        <EnvironmentSection />

        {/* 6 — Explore the Lineup */}
        <SectionDivider />
        <LineupSection />

        {/* 7 — Why Apple: fourmula.ai card steps */}
        <SectionDivider />
        <WhyAppleSection />

        {/* 8 — Chip & Battery: particle canvas */}
        <SectionDivider />
        <BatterySection />

        {/* 9 — Privacy & Peace of Mind */}
        <SectionDivider />
        <PrivacySection />

        {/* 10 — Essentials + Significant Others */}
        <SectionDivider />
        <EssentialsSection />

        <Footer />
      </main>
    </>
  );
}
