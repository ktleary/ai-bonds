import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { bonds, formatPrice, formatChange, formatYield, formatVolume } from '../data/bonds';
import type { Bond } from '../types/bond';

gsap.registerPlugin(ScrollTrigger);

interface LivePriceTableProps {
  className?: string;
}

const LivePriceTable = ({ className = '' }: LivePriceTableProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Bond>('price');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [filterRating, setFilterRating] = useState<string | null>(null);

  // Filter and sort bonds
  const filteredBonds = bonds
    .filter((bond) => {
      const matchesSearch = 
        bond.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bond.isin.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRating = filterRating ? bond.rating === filterRating : true;
      return matchesSearch && matchesRating;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      return 0;
    });

  const handleSort = (field: keyof Bond) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const table = tableRef.current;

    if (!section || !header || !table) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header,
        { y: '-4vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );

      // Table animation
      gsap.fromTo(
        table,
        { y: '10vh', scale: 0.98, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'top 25%',
            scrub: 0.5,
          },
        }
      );

      // Row stagger animation removed - breaks when filtering/sorting changes DOM

      // Exit animations
      gsap.fromTo(
        header,
        { opacity: 1 },
        {
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

      gsap.fromTo(
        table,
        { y: 0, opacity: 1 },
        {
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

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-3 h-3" />;
    if (change < 0) return <TrendingDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const ratings = [...new Set(bonds.map(b => b.rating))].sort();

  return (
    <section
      ref={sectionRef}
      id="bonds"
      className={`relative min-h-screen w-full flex items-center py-20 ${className}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <div ref={headerRef} className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <h2 className="font-heading font-semibold text-3xl lg:text-4xl text-foreground mb-2">
                  Live Prices
                </h2>
                <p className="text-slate">
                  Investment-grade tech issuers. Updated every 60 seconds.
                </p>
              </div>
              
              {/* Search and filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
                  <input
                    type="text"
                    placeholder="Search bonds..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-terminal pl-10 pr-4 py-2 text-sm w-48 lg:w-64"
                  />
                </div>
                
                <div className="relative group">
                  <button className="btn-outline flex items-center gap-2 py-2 px-3 text-sm">
                    <Filter className="w-4 h-4" />
                    Rating
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-40 card-terminal p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                    <button
                      onClick={() => setFilterRating(null)}
                      className={`w-full text-left px-3 py-2 rounded text-sm ${
                        filterRating === null ? 'bg-cyan/20 text-cyan' : 'text-slate hover:bg-navy'
                      }`}
                    >
                      All Ratings
                    </button>
                    {ratings.map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFilterRating(rating)}
                        className={`w-full text-left px-3 py-2 rounded text-sm ${
                          filterRating === rating ? 'bg-cyan/20 text-cyan' : 'text-slate hover:bg-navy'
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div ref={tableRef} className="card-terminal overflow-hidden">
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyan/20">
                    <th className="text-left py-4 px-4 text-xs font-mono text-slate uppercase tracking-wider">
                      <button 
                        onClick={() => handleSort('issuer')}
                        className="flex items-center gap-1 hover:text-cyan transition-colors"
                      >
                        Issuer
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                    <th className="text-left py-4 px-4 text-xs font-mono text-slate uppercase tracking-wider">
                      ISIN
                    </th>
                    <th className="text-right py-4 px-4 text-xs font-mono text-slate uppercase tracking-wider">
                      <button 
                        onClick={() => handleSort('coupon')}
                        className="flex items-center gap-1 hover:text-cyan transition-colors ml-auto"
                      >
                        Coupon
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                    <th className="text-left py-4 px-4 text-xs font-mono text-slate uppercase tracking-wider">
                      Maturity
                    </th>
                    <th className="text-right py-4 px-4 text-xs font-mono text-slate uppercase tracking-wider">
                      <button 
                        onClick={() => handleSort('price')}
                        className="flex items-center gap-1 hover:text-cyan transition-colors ml-auto"
                      >
                        Price
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                    <th className="text-right py-4 px-4 text-xs font-mono text-slate uppercase tracking-wider">
                      <button 
                        onClick={() => handleSort('yield')}
                        className="flex items-center gap-1 hover:text-cyan transition-colors ml-auto"
                      >
                        Yield
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                    <th className="text-right py-4 px-4 text-xs font-mono text-slate uppercase tracking-wider">
                      <button 
                        onClick={() => handleSort('change')}
                        className="flex items-center gap-1 hover:text-cyan transition-colors ml-auto"
                      >
                        Chg
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                    <th className="text-center py-4 px-4 text-xs font-mono text-slate uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBonds.map((bond) => (
                    <>
                      <tr
                        key={bond.id}
                        className="bond-row border-b border-cyan/10 last:border-0 table-row-hover cursor-pointer transition-colors"
                        onClick={() => setExpandedRow(expandedRow === bond.id ? null : bond.id)}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md bg-cyan/10 flex items-center justify-center">
                              <span className="text-xs font-bold text-cyan">
                                {bond.issuer.slice(0, 2).toUpperCase()}
                              </span>
                            </div>
                            <span className="font-medium text-foreground">{bond.issuer}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-mono text-sm text-slate">
                          {bond.isin}
                        </td>
                        <td className="py-4 px-4 text-right font-mono text-sm text-foreground">
                          {bond.coupon.toFixed(2)}%
                        </td>
                        <td className="py-4 px-4 font-mono text-sm text-slate">
                          {new Date(bond.maturityDate).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="py-4 px-4 text-right font-mono text-sm text-foreground">
                          {formatPrice(bond.price)}
                        </td>
                        <td className="py-4 px-4 text-right font-mono text-sm text-cyan">
                          {formatYield(bond.yield)}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className={`inline-flex items-center gap-1 font-mono text-sm ${
                            bond.change >= 0 ? 'text-positive' : 'text-negative'
                          }`}>
                            {getChangeIcon(bond.change)}
                            {formatChange(bond.change)}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-block px-2 py-1 rounded text-xs font-mono border border-cyan/30 text-cyan">
                            {bond.rating}
                          </span>
                        </td>
                        <td className="py-4 px-2">
                          {bond.aiSummary && (
                            <button className="p-1 rounded hover:bg-cyan/10 transition-colors">
                              <Sparkles className="w-4 h-4 text-cyan" />
                            </button>
                          )}
                        </td>
                      </tr>
                      
                      {/* Expanded row with AI summary */}
                      {expandedRow === bond.id && bond.aiSummary && (
                        <tr className="bg-navy/50">
                          <td colSpan={9} className="py-4 px-4">
                            <div className="flex items-start gap-3">
                              <Sparkles className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-xs text-cyan font-mono mb-1">AI Summary</p>
                                <p className="text-sm text-slate">{bond.aiSummary}</p>
                                <div className="flex items-center gap-4 mt-3">
                                  <span className="text-xs text-slate">
                                    Volume: {formatVolume(bond.volume || 0)}
                                  </span>
                                  <button className="text-xs text-cyan hover:underline flex items-center gap-1">
                                    View details
                                    {expandedRow === bond.id ? (
                                      <ChevronUp className="w-3 h-3" />
                                    ) : (
                                      <ChevronDown className="w-3 h-3" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Table footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-cyan/20">
              <div className="flex items-center gap-4 text-xs text-slate">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-positive" />
                  Price up
                </span>
                <span className="flex items-center gap-1">
                  <TrendingDown className="w-3 h-3 text-negative" />
                  Price down
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan" />
                  AI summary available
                </span>
              </div>
              <span className="text-xs text-slate font-mono">
                Showing {filteredBonds.length} of {bonds.length} bonds
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LivePriceTable;
