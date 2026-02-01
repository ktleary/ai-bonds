import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BookOpen, Activity, Database, Brain, Clock } from 'lucide-react';
import { bonds, formatPrice, formatChange, formatYield } from '../data/bonds';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  className?: string;
}

const Hero = ({ className = '' }: HeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const microBarRef = useRef<HTMLDivElement>(null);

  // Live ticker bonds (top 5)
  const liveBonds = bonds.slice(0, 5);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const ticker = tickerRef.current;
    const microBar = microBarRef.current;

    if (!section || !headline || !ticker || !microBar) return;

    const ctx = gsap.context(() => {
      // Initial entrance animation (on page load)
      const tl = gsap.timeline({ delay: 0.2 });
      
      tl.fromTo(
        headline.querySelectorAll('.animate-item'),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      )
      .fromTo(
        ticker,
        { x: '6vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        microBar.querySelectorAll('.stat-item'),
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
        '-=0.3'
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      scrollTl
        .fromTo(
          headline,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          ticker,
          { x: 0, opacity: 1 },
          { x: '8vw', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          microBar,
          { y: 0, opacity: 1 },
          { y: '6vh', opacity: 0.2, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`relative min-h-screen w-full flex items-center pt-16 ${className}`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-navy-light/30 via-navy to-navy pointer-events-none" />
      
      <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-[1600px] mx-auto">
          {/* Left: Headline */}
          <div ref={headlineRef} className="space-y-6">
            <div className="animate-item flex items-center gap-2 text-cyan text-sm font-mono">
              <Activity className="w-4 h-4" />
              <span>Real-time market data</span>
            </div>
            
            <h1 className="animate-item font-heading font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[0.95] tracking-tight">
              AI Bond
              <br />
              <span className="text-cyan">Tracker</span>
            </h1>
            
            <p className="animate-item text-lg text-slate max-w-lg leading-relaxed">
              Real-time prices, AI summaries, and historic spreads for the world&apos;s largest tech issuers.
            </p>
            
            <div className="animate-item flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => document.getElementById('bonds')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary flex items-center gap-2"
              >
                Explore bonds
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="btn-outline flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                View methodology
              </button>
            </div>
          </div>

          {/* Right: Live Ticker Card */}
          <div ref={tickerRef} className="card-terminal p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="pulse-dot" />
                <h3 className="font-heading font-semibold text-foreground">Live Ticker</h3>
              </div>
              <span className="text-xs text-slate font-mono">Updated: Just now</span>
            </div>
            
            <div className="space-y-1">
              {/* Header */}
              <div className="grid grid-cols-5 gap-2 text-xs text-slate font-mono pb-2 border-b border-cyan/20">
                <span>Issuer</span>
                <span>Coupon</span>
                <span className="text-right">Price</span>
                <span className="text-right">Yield</span>
                <span className="text-right">Chg</span>
              </div>
              
              {/* Rows */}
              {liveBonds.map((bond, index) => (
                <div
                  key={bond.id}
                  className="grid grid-cols-5 gap-2 py-3 text-sm font-mono border-b border-cyan/10 last:border-0 table-row-hover transition-colors cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="text-foreground font-medium">{bond.issuer}</span>
                  <span className="text-slate">{bond.coupon.toFixed(2)}%</span>
                  <span className="text-right text-foreground">{formatPrice(bond.price)}</span>
                  <span className="text-right text-slate">{formatYield(bond.yield)}</span>
                  <span className={`text-right ${bond.change >= 0 ? 'text-positive' : 'text-negative'}`}>
                    {formatChange(bond.change)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-cyan/20 flex items-center justify-between">
              <span className="text-xs text-slate">{bonds.length} bonds tracked</span>
              <button 
                onClick={() => document.getElementById('bonds')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-xs text-cyan hover:underline flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Micro Bar */}
        <div
          ref={microBarRef}
          className="mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[1600px] mx-auto"
        >
          <div className="stat-item flex items-center gap-3 p-4 rounded-lg bg-navy-light/50 border border-cyan/10">
            <Clock className="w-5 h-5 text-cyan" />
            <div>
              <p className="text-xs text-slate">Data latency</p>
              <p className="text-sm font-mono text-foreground">&lt;60 seconds</p>
            </div>
          </div>
          <div className="stat-item flex items-center gap-3 p-4 rounded-lg bg-navy-light/50 border border-cyan/10">
            <Database className="w-5 h-5 text-cyan" />
            <div>
              <p className="text-xs text-slate">Coverage</p>
              <p className="text-sm font-mono text-foreground">{bonds.length} bonds</p>
            </div>
          </div>
          <div className="stat-item flex items-center gap-3 p-4 rounded-lg bg-navy-light/50 border border-cyan/10">
            <Brain className="w-5 h-5 text-cyan" />
            <div>
              <p className="text-xs text-slate">AI models</p>
              <p className="text-sm font-mono text-foreground">8 active</p>
            </div>
          </div>
          <div className="stat-item flex items-center gap-3 p-4 rounded-lg bg-navy-light/50 border border-cyan/10">
            <Activity className="w-5 h-5 text-cyan" />
            <div>
              <p className="text-xs text-slate">Updates</p>
              <p className="text-sm font-mono text-foreground">Real-time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
