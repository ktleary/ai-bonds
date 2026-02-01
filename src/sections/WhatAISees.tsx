import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface WhatAISeesProps {
  className?: string;
}

const WhatAISees = ({ className = '' }: WhatAISeesProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const diagram = diagramRef.current;

    if (!section || !card || !diagram) return;

    const ctx = gsap.context(() => {
      // Card animation
      gsap.fromTo(
        card,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
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

      // Diagram nodes animation
      const nodes = diagram.querySelectorAll('.diagram-node');
      const lines = diagram.querySelectorAll('.diagram-line');

      gsap.fromTo(
        nodes,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.03,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        lines,
        { scaleX: 0, scaleY: 0 },
        {
          scaleX: 1,
          scaleY: 1,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 55%',
            end: 'top 15%',
            scrub: 0.5,
          },
        }
      );

      // Exit animations
      gsap.fromTo(
        card,
        { x: 0, opacity: 1 },
        {
          x: '-6vw',
          opacity: 0.35,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: section,
            start: 'bottom 80%',
            end: 'bottom 20%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        diagram,
        { x: 0, opacity: 1 },
        {
          x: '6vw',
          opacity: 0.3,
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

  const features = [
    {
      icon: FileText,
      text: 'Summarizes issuer filings and earnings calls',
    },
    {
      icon: TrendingUp,
      text: 'Maps yield changes to news sentiment',
    },
    {
      icon: AlertTriangle,
      text: 'Surfaces outliers before the market does',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="ai-features"
      className={`relative min-h-screen w-full flex items-center py-20 ${className}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-[1600px] mx-auto">
          {/* Left: Feature Card */}
          <div ref={cardRef} className="card-terminal p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-cyan" />
              </div>
              <h2 className="font-heading font-semibold text-2xl lg:text-3xl text-foreground">
                What the AI sees
              </h2>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-navy/50 border border-cyan/10 hover:border-cyan/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-md bg-cyan/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <feature.icon className="w-4 h-4 text-cyan" />
                  </div>
                  <p className="text-slate leading-relaxed">{feature.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-cyan/20">
              <button className="text-cyan hover:text-cyan-light flex items-center gap-2 text-sm transition-colors">
                Learn more about the model
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Abstract Diagram */}
          <div ref={diagramRef} className="relative h-[400px] lg:h-[500px]">
            {/* Node flow diagram */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 400 400"
              fill="none"
            >
              {/* Left column nodes */}
              {[0, 1, 2, 3].map((i) => (
                <rect
                  key={`left-${i}`}
                  className="diagram-node"
                  x="40"
                  y={60 + i * 80}
                  width="48"
                  height="48"
                  rx="8"
                  fill="rgba(41, 231, 243, 0.15)"
                  stroke="rgba(41, 231, 243, 0.5)"
                  strokeWidth="1.5"
                />
              ))}

              {/* Right column nodes */}
              {[0, 1, 2, 3].map((i) => (
                <rect
                  key={`right-${i}`}
                  className="diagram-node"
                  x="312"
                  y={60 + i * 80}
                  width="48"
                  height="48"
                  rx="8"
                  fill="rgba(41, 231, 243, 0.15)"
                  stroke="rgba(41, 231, 243, 0.5)"
                  strokeWidth="1.5"
                />
              ))}

              {/* Center node */}
              <circle
                className="diagram-node"
                cx="200"
                cy="200"
                r="40"
                fill="rgba(41, 231, 243, 0.2)"
                stroke="rgba(41, 231, 243, 0.7)"
                strokeWidth="2"
              />
              <text
                x="200"
                y="205"
                textAnchor="middle"
                fill="#29E7F3"
                fontSize="12"
                fontFamily="IBM Plex Mono"
              >
                AI
              </text>

              {/* Connecting lines */}
              {[0, 1, 2, 3].map((i) => (
                <line
                  key={`line-left-${i}`}
                  className="diagram-line"
                  x1="88"
                  y1={84 + i * 80}
                  x2="160"
                  y2="200"
                  stroke="rgba(41, 231, 243, 0.4)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{ transformOrigin: '88px center' }}
                />
              ))}

              {[0, 1, 2, 3].map((i) => (
                <line
                  key={`line-right-${i}`}
                  className="diagram-line"
                  x1="312"
                  y1={84 + i * 80}
                  x2="240"
                  y2="200"
                  stroke="rgba(41, 231, 243, 0.4)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{ transformOrigin: '312px center' }}
                />
              ))}

              {/* Horizontal connector lines */}
              <line
                className="diagram-line"
                x1="88"
                y1="84"
                x2="88"
                y2="324"
                stroke="rgba(41, 231, 243, 0.25)"
                strokeWidth="1"
                strokeLinecap="round"
                style={{ transformOrigin: 'center' }}
              />
              <line
                className="diagram-line"
                x1="312"
                y1="84"
                x2="312"
                y2="324"
                stroke="rgba(41, 231, 243, 0.25)"
                strokeWidth="1"
                strokeLinecap="round"
                style={{ transformOrigin: 'center' }}
              />
            </svg>

            {/* Floating labels */}
            <div className="absolute top-4 left-0 text-xs text-slate font-mono">
              Market Data
            </div>
            <div className="absolute top-4 right-0 text-xs text-slate font-mono">
              Insights
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-cyan font-mono">
              Real-time Processing
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Need to import Brain for the icon
import { Brain } from 'lucide-react';

export default WhatAISees;
