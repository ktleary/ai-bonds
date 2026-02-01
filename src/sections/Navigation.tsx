import { useState, useEffect } from 'react';
import { Menu, X, Bell, Zap } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Bonds', href: '#bonds' },
    { label: 'Issuers', href: '#issuers' },
    { label: 'Analytics', href: '#analytics' },
    { label: 'Updates', href: '#updates' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy/90 backdrop-blur-md border-b border-cyan/20'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-cyan" />
            <span className="font-heading font-semibold text-lg text-foreground">
              AI Bond Tracker
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-sm text-slate hover:text-cyan transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm text-slate hover:text-foreground transition-colors duration-200">
              Sign in
            </button>
            <button className="btn-outline flex items-center gap-2 text-sm py-2 px-4">
              <Bell className="w-4 h-4" />
              Get alerts
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-navy-light border-b border-cyan/20">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left text-slate hover:text-cyan py-2 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t border-cyan/20 space-y-3">
              <button className="block w-full text-left text-slate hover:text-foreground py-2">
                Sign in
              </button>
              <button className="btn-outline w-full flex items-center justify-center gap-2">
                <Bell className="w-4 h-4" />
                Get alerts
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
