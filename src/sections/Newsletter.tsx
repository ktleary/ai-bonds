import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Bell, Shield, FileText, Users, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface NewsletterProps {
  className?: string;
}

const Newsletter = ({ className = '' }: NewsletterProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3000);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const footer = footerRef.current;

    if (!section || !card || !footer) return;

    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.fromTo(
        card,
        { y: '10vh', scale: 0.98, opacity: 0 },
        {
          y: 0,
          scale: 1,
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

      // Input and button animation
      const formElements = card.querySelectorAll('.form-element');
      gsap.fromTo(
        formElements,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 0.5,
          },
        }
      );

      // Footer animation
      const footerLinks = footer.querySelectorAll('.footer-link');
      gsap.fromTo(
        footerLinks,
        { y: 8, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            end: 'top 10%',
            scrub: 0.5,
          },
        }
      );

      // Exit animation (keep visible longer since it's the end)
      gsap.fromTo(
        card,
        { opacity: 1 },
        {
          opacity: 0.3,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: section,
            start: 'bottom 90%',
            end: 'bottom 50%',
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const footerLinks = [
    { label: 'Privacy', icon: Shield, href: '#' },
    { label: 'Terms', icon: FileText, href: '#' },
    { label: 'Contact', icon: Users, href: '#' },
    { label: 'API docs', icon: Code, href: '#' },
  ];

  return (
    <section
      ref={sectionRef}
      id="updates"
      className={`relative min-h-screen w-full flex items-center py-20 ${className}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-[1600px] mx-auto">
          {/* Main CTA Card */}
          <div ref={cardRef} className="max-w-xl mx-auto">
            <div className="card-terminal p-8 lg:p-10">
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-xl bg-cyan/10 flex items-center justify-center mx-auto mb-4 border border-cyan/30">
                  <Bell className="w-7 h-7 text-cyan" />
                </div>
                <h2 className="font-heading font-semibold text-2xl lg:text-3xl text-foreground mb-2">
                  Get AI bond alerts
                </h2>
                <p className="text-slate">
                  Weekly summaries + unusual movement alerts.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-element relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-terminal pl-12 pr-4 py-3 w-full"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className={`form-element btn-primary w-full flex items-center justify-center gap-2 py-3 transition-all ${
                    isSubscribed ? 'bg-positive' : ''
                  }`}
                >
                  {isSubscribed ? (
                    <>
                      <Shield className="w-4 h-4" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      <Bell className="w-4 h-4" />
                      Subscribe
                    </>
                  )}
                </button>
              </form>

              <p className="form-element text-center text-xs text-slate mt-4">
                No spam. Unsubscribe anytime.
              </p>

              {/* Features */}
              <div className="form-element grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-cyan/20">
                <div className="flex items-center gap-2 text-sm text-slate">
                  <div className="w-2 h-2 rounded-full bg-positive" />
                  Weekly digest
                </div>
                <div className="flex items-center gap-2 text-sm text-slate">
                  <div className="w-2 h-2 rounded-full bg-positive" />
                  Price alerts
                </div>
                <div className="flex items-center gap-2 text-sm text-slate">
                  <div className="w-2 h-2 rounded-full bg-positive" />
                  AI summaries
                </div>
                <div className="flex items-center gap-2 text-sm text-slate">
                  <div className="w-2 h-2 rounded-full bg-positive" />
                  New issuance
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            ref={footerRef}
            className="mt-16 pt-8 border-t border-cyan/20"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center">
                  <span className="text-cyan font-bold text-sm">AI</span>
                </div>
                <span className="font-heading font-semibold text-foreground">
                  Bond Tracker
                </span>
              </div>

              {/* Links */}
              <div className="flex items-center gap-6">
                {footerLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="footer-link flex items-center gap-2 text-sm text-slate hover:text-cyan transition-colors"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Copyright */}
              <p className="text-xs text-slate">
                © {new Date().getFullYear()} AI Bond Tracker. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
