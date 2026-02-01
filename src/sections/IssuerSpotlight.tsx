import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Calendar, Percent, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import { issuers, formatPrice, formatYield } from '../data/bonds';

gsap.registerPlugin(ScrollTrigger);

interface IssuerSpotlightProps {
  className?: string;
}

const IssuerSpotlight = ({ className = '' }: IssuerSpotlightProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [currentIssuerIndex, setCurrentIssuerIndex] = useState(0);
  
  const currentIssuer = issuers[currentIssuerIndex];
  const featuredBond = currentIssuer.bonds[0];

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;

    if (!section || !card) return;

    const ctx = gsap.context(() => {
      // 3D card entrance animation
      gsap.fromTo(
        card,
        {
          rotateY: -45,
          rotateX: 10,
          z: -120,
          y: '8vh',
          opacity: 0,
        },
        {
          rotateY: -18,
          rotateX: 6,
          z: 0,
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          },
        }
      );

      // Exit animation
      gsap.fromTo(
        card,
        {
          rotateY: -18,
          rotateX: 6,
          z: 0,
          y: 0,
          opacity: 1,
        },
        {
          rotateY: 18,
          rotateX: 8,
          z: -100,
          y: '-6vh',
          opacity: 0.25,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: section,
            start: 'bottom 80%',
            end: 'bottom 20%',
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const nextIssuer = () => {
    setCurrentIssuerIndex((prev) => (prev + 1) % issuers.length);
  };

  const prevIssuer = () => {
    setCurrentIssuerIndex((prev) => (prev - 1 + issuers.length) % issuers.length);
  };

  return (
    <section
      ref={sectionRef}
      id="issuers"
      className={`relative min-h-screen w-full flex items-center py-20 ${className}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-[1600px] mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <span className="text-cyan text-sm font-mono mb-2 block">Featured Issuer</span>
            <h2 className="font-heading font-semibold text-3xl lg:text-4xl text-foreground">
              Issuer Spotlight
            </h2>
          </div>

          {/* 3D Card Container */}
          <div className="perspective-container flex justify-center">
            <div
              ref={cardRef}
              className="card-terminal p-8 lg:p-10 w-full max-w-lg relative"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Card header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-cyan/10 flex items-center justify-center border border-cyan/30">
                    <Building2 className="w-7 h-7 text-cyan" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-2xl text-foreground">
                      {currentIssuer.name}
                    </h3>
                    <p className="text-sm text-slate font-mono">{currentIssuer.ticker}</p>
                  </div>
                </div>
                <span className="text-xs text-cyan font-mono border border-cyan/30 px-2 py-1 rounded">
                  {currentIssuer.rating}
                </span>
              </div>

              {/* Description */}
              <p className="text-slate leading-relaxed mb-8">
                {currentIssuer.description}
              </p>

              {/* Featured bond stats */}
              {featuredBond && (
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between py-3 border-b border-cyan/10">
                    <div className="flex items-center gap-2 text-slate">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Maturity</span>
                    </div>
                    <span className="text-foreground font-mono">
                      {new Date(featuredBond.maturityDate).getFullYear()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-cyan/10">
                    <div className="flex items-center gap-2 text-slate">
                      <Percent className="w-4 h-4" />
                      <span className="text-sm">Coupon</span>
                    </div>
                    <span className="text-foreground font-mono">
                      {featuredBond.coupon.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-cyan/10">
                    <div className="flex items-center gap-2 text-slate">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm">Price</span>
                    </div>
                    <span className="text-foreground font-mono">
                      {formatPrice(featuredBond.price)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2 text-slate">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">Yield</span>
                    </div>
                    <span className="text-cyan font-mono">
                      {formatYield(featuredBond.yield)}
                    </span>
                  </div>
                </div>
              )}

              {/* Total debt */}
              <div className="p-4 rounded-lg bg-navy/50 border border-cyan/10">
                <p className="text-xs text-slate mb-1">Total Debt Outstanding</p>
                <p className="text-xl font-mono text-foreground">
                  ${(currentIssuer.totalDebt / 1000000000).toFixed(1)}B
                </p>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-cyan/20">
                <button
                  onClick={prevIssuer}
                  className="flex items-center gap-2 text-slate hover:text-cyan transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="text-sm">Previous</span>
                </button>
                <span className="text-xs text-slate font-mono">
                  {currentIssuerIndex + 1} / {issuers.length}
                </span>
                <button
                  onClick={nextIssuer}
                  className="flex items-center gap-2 text-slate hover:text-cyan transition-colors"
                >
                  <span className="text-sm">Next</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Issuer dots */}
          <div className="flex justify-center gap-2 mt-8">
            {issuers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIssuerIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIssuerIndex
                    ? 'bg-cyan w-6'
                    : 'bg-cyan/30 hover:bg-cyan/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import { TrendingUp } from 'lucide-react';

export default IssuerSpotlight;
