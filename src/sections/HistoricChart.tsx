import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Calendar, TrendingUp, Info } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { bonds } from '../data/bonds';

gsap.registerPlugin(ScrollTrigger);

interface HistoricChartProps {
  className?: string;
}

// Generate realistic historical price data
const generateHistoricalData = (basePrice: number, volatility: number = 2) => {
  const data = [];
  const startDate = new Date('2019-01-01');
  const endDate = new Date();
  let currentPrice = basePrice;

  for (let d = new Date(startDate); d <= endDate; d.setMonth(d.getMonth() + 1)) {
    const change = (Math.random() - 0.5) * volatility;
    currentPrice = Math.max(80, Math.min(120, currentPrice + change));
    
    data.push({
      date: d.toISOString().split('T')[0],
      price: parseFloat(currentPrice.toFixed(2)),
      yield: parseFloat((4 + Math.random() * 3).toFixed(2)),
    });
  }

  return data;
};

const HistoricChart = ({ className = '' }: HistoricChartProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  
  const [selectedBond, setSelectedBond] = useState(bonds[0]);
  const [timeRange, setTimeRange] = useState<'1Y' | '3Y' | '5Y' | 'ALL'>('ALL');
  const [chartData, setChartData] = useState(generateHistoricalData(95));

  useEffect(() => {
    setChartData(generateHistoricalData(selectedBond.price, 1.5));
  }, [selectedBond]);

  const filteredData = chartData.filter((d) => {
    const date = new Date(d.date);
    const now = new Date();
    switch (timeRange) {
      case '1Y':
        return date >= new Date(now.setFullYear(now.getFullYear() - 1));
      case '3Y':
        return date >= new Date(now.setFullYear(now.getFullYear() - 3));
      case '5Y':
        return date >= new Date(now.setFullYear(now.getFullYear() - 5));
      default:
        return true;
    }
  });

  useEffect(() => {
    const section = sectionRef.current;
    const textPanel = textPanelRef.current;
    const chart = chartRef.current;

    if (!section || !textPanel || !chart) return;

    const ctx = gsap.context(() => {
      // Text panel animation
      gsap.fromTo(
        textPanel,
        { x: '-6vw', opacity: 0 },
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

      // Chart animation
      gsap.fromTo(
        chart,
        { x: '6vw', scale: 0.98, opacity: 0 },
        {
          x: 0,
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

      // Exit animations
      gsap.fromTo(
        textPanel,
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
        chart,
        { y: 0, opacity: 1 },
        {
          y: '-5vh',
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

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="card-terminal p-3 text-sm">
          <p className="text-slate font-mono mb-1">{label}</p>
          <p className="text-foreground font-mono">
            Price: <span className="text-cyan">{payload[0].value}</span>
          </p>
          <p className="text-foreground font-mono">
            Yield: <span className="text-positive">{payload[0].payload.yield}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const priceChange = filteredData[filteredData.length - 1]?.price - filteredData[0]?.price;
  const priceChangePercent = (priceChange / filteredData[0]?.price) * 100;

  return (
    <section
      ref={sectionRef}
      id="analytics"
      className={`relative min-h-screen w-full flex items-center py-20 ${className}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Text Panel */}
            <div ref={textPanelRef} className="lg:col-span-3 space-y-6">
              <div>
                <h2 className="font-heading font-semibold text-3xl lg:text-4xl text-foreground mb-3">
                  Historic Prices
                </h2>
                <p className="text-slate leading-relaxed">
                  Daily closes since 2019. Compare spreads, yields, and momentum across issuers.
                </p>
              </div>

              {/* Bond selector */}
              <div className="space-y-3">
                <label className="text-xs text-slate font-mono uppercase tracking-wider">
                  Select Bond
                </label>
                <select
                  value={selectedBond.id}
                  onChange={(e) => {
                    const bond = bonds.find((b) => b.id === e.target.value);
                    if (bond) setSelectedBond(bond);
                  }}
                  className="input-terminal text-sm py-2"
                >
                  {bonds.map((bond) => (
                    <option key={bond.id} value={bond.id}>
                      {bond.issuer} {bond.coupon}% {new Date(bond.maturityDate).getFullYear()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stats */}
              <div className="card-terminal p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate">Current Price</span>
                  <span className="font-mono text-foreground">{selectedBond.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate">Period Change</span>
                  <span className={`font-mono ${priceChange >= 0 ? 'text-positive' : 'text-negative'}`}>
                    {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent.toFixed(1)}%)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate">52W High</span>
                  <span className="font-mono text-foreground">
                    {Math.max(...chartData.map((d) => d.price)).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate">52W Low</span>
                  <span className="font-mono text-foreground">
                    {Math.min(...chartData.map((d) => d.price)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="btn-outline w-full flex items-center justify-center gap-2 text-sm py-2">
                <Download className="w-4 h-4" />
                Download CSV
              </button>
            </div>

            {/* Right: Chart */}
            <div ref={chartRef} className="lg:col-span-9">
              <div className="card-terminal p-6 h-[500px] lg:h-[600px]">
                {/* Chart header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-cyan" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">
                        {selectedBond.issuer} {selectedBond.coupon}% {new Date(selectedBond.maturityDate).getFullYear()}
                      </h3>
                      <p className="text-xs text-slate font-mono">{selectedBond.isin}</p>
                    </div>
                  </div>

                  {/* Time range selector */}
                  <div className="flex items-center gap-1">
                    {(['1Y', '3Y', '5Y', 'ALL'] as const).map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                          timeRange === range
                            ? 'bg-cyan text-navy'
                            : 'text-slate hover:text-foreground hover:bg-navy'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chart */}
                <div className="h-[calc(100%-80px)]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke="rgba(41, 231, 243, 0.1)" 
                        vertical={false}
                      />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
                        }}
                        stroke="rgba(167, 177, 200, 0.5)"
                        tick={{ fill: '#A7B1C8', fontSize: 11, fontFamily: 'IBM Plex Mono' }}
                        axisLine={{ stroke: 'rgba(41, 231, 243, 0.2)' }}
                        tickLine={false}
                      />
                      <YAxis
                        domain={['auto', 'auto']}
                        stroke="rgba(167, 177, 200, 0.5)"
                        tick={{ fill: '#A7B1C8', fontSize: 11, fontFamily: 'IBM Plex Mono' }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => value.toFixed(0)}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <ReferenceLine
                        y={100}
                        stroke="rgba(41, 231, 243, 0.3)"
                        strokeDasharray="5 5"
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#29E7F3"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6, fill: '#29E7F3', stroke: '#070A12', strokeWidth: 2 }}
                        animationDuration={1500}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Chart footer */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-cyan/10">
                  <div className="flex items-center gap-4 text-xs text-slate">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {filteredData.length} data points
                    </span>
                    <span className="flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      Daily closes
                    </span>
                  </div>
                  <span className="text-xs text-cyan font-mono">
                    Last updated: {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoricChart;
