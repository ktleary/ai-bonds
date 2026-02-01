import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import WhatAISees from './sections/WhatAISees';
import IssuerSpotlight from './sections/IssuerSpotlight';
import LivePriceTable from './sections/LivePriceTable';
import HistoricChart from './sections/HistoricChart';
import Newsletter from './sections/Newsletter';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-navy">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative">
        <Hero className="section" />
        <WhatAISees className="section" />
        <IssuerSpotlight className="section" />
        <LivePriceTable className="section" />
        <HistoricChart className="section" />
        <Newsletter className="section" />
      </main>
    </div>
  );
}

export default App;
