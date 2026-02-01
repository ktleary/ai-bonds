import type { Bond, Issuer } from '../types/bond';

export const bonds: Bond[] = [
  {
    id: 'ORCL-2034',
    issuer: 'Oracle',
    isin: 'US68389XCT00',
    coupon: 4.70,
    maturityDate: '2034-09-27',
    price: 93.06,
    yield: 5.88,
    change: -0.12,
    rating: 'BBB',
    volume: 1750000000,
    aiSummary: 'AI infrastructure financing bonds showing stable demand despite recent volatility.'
  },
  {
    id: 'ORCL-2029',
    issuer: 'Oracle',
    isin: 'US68389XCS27',
    coupon: 4.20,
    maturityDate: '2029-09-27',
    price: 98.62,
    yield: 4.86,
    change: -0.08,
    rating: 'BBB',
    volume: 1500000000,
    aiSummary: 'Shorter maturity profile attracting defensive positioning.'
  },
  {
    id: 'META-2054',
    issuer: 'Meta',
    isin: 'US30303M8V78',
    coupon: 5.40,
    maturityDate: '2054-08-15',
    price: 92.96,
    yield: 5.98,
    change: -0.08,
    rating: 'AA-',
    volume: 3250000000,
    aiSummary: 'Long-duration bonds pricing in AI capex expansion. Strong issuer credit profile.'
  },
  {
    id: 'META-2029',
    issuer: 'Meta',
    isin: 'US30303M8S40',
    coupon: 4.30,
    maturityDate: '2029-08-15',
    price: 101.14,
    yield: 4.24,
    change: +0.03,
    rating: 'AA-',
    volume: 1000000000,
    aiSummary: 'Near-par pricing reflects flight to quality within tech sector.'
  },
  {
    id: 'META-2032',
    issuer: 'Meta',
    isin: 'US30303M8L96',
    coupon: 4.60,
    maturityDate: '2032-05-15',
    price: 100.56,
    yield: 4.50,
    change: +0.05,
    rating: 'AA-',
    volume: 4000000000,
    aiSummary: 'Mid-duration sweet spot attracting institutional flows.'
  },
  {
    id: 'AAPL-2031',
    issuer: 'Apple',
    isin: 'US037833AT77',
    coupon: 4.45,
    maturityDate: '2031-02-15',
    price: 98.12,
    yield: 4.72,
    change: +0.04,
    rating: 'AA+',
    volume: 2500000000,
    aiSummary: 'Premium issuer with defensive characteristics. Steady demand from pension funds.'
  },
  {
    id: 'AAPL-2028',
    issuer: 'Apple',
    isin: 'US037833AS96',
    coupon: 4.15,
    maturityDate: '2028-08-15',
    price: 99.85,
    yield: 4.18,
    change: +0.02,
    rating: 'AA+',
    volume: 2000000000,
    aiSummary: 'Short-end exposure with minimal rate sensitivity.'
  },
  {
    id: 'MSFT-2034',
    issuer: 'Microsoft',
    isin: 'US594918BQ13',
    coupon: 4.20,
    maturityDate: '2034-08-15',
    price: 99.45,
    yield: 4.28,
    change: +0.02,
    rating: 'AAA',
    volume: 3000000000,
    aiSummary: 'Highest credit quality in tech space. Tight spreads reflecting defensive demand.'
  },
  {
    id: 'MSFT-2030',
    issuer: 'Microsoft',
    isin: 'US594918BP49',
    coupon: 3.95,
    maturityDate: '2030-05-15',
    price: 100.20,
    yield: 3.89,
    change: +0.01,
    rating: 'AAA',
    volume: 2500000000,
    aiSummary: 'Benchmark quality issuer with exceptional liquidity.'
  },
  {
    id: 'AMZN-2029',
    issuer: 'Amazon',
    isin: 'US023135AQ19',
    coupon: 4.55,
    maturityDate: '2029-12-01',
    price: 100.10,
    yield: 4.51,
    change: -0.03,
    rating: 'AA-',
    volume: 2000000000,
    aiSummary: 'Cloud growth narrative supporting credit profile. Moderate duration preference.'
  },
  {
    id: 'AMZN-2034',
    issuer: 'Amazon',
    isin: 'US023135AR91',
    coupon: 4.80,
    maturityDate: '2034-12-01',
    price: 98.75,
    yield: 4.95,
    change: -0.05,
    rating: 'AA-',
    volume: 1500000000,
    aiSummary: 'AWS cash flows providing credit support for longer maturities.'
  },
  {
    id: 'GOOGL-2032',
    issuer: 'Alphabet',
    isin: 'US02079KAB44',
    coupon: 4.35,
    maturityDate: '2032-02-15',
    price: 99.30,
    yield: 4.42,
    change: +0.03,
    rating: 'AA+',
    volume: 2500000000,
    aiSummary: 'Search monetization resilience supporting bond valuations.'
  },
  {
    id: 'NVDA-2033',
    issuer: 'NVIDIA',
    isin: 'US67066GAE47',
    coupon: 4.65,
    maturityDate: '2033-09-16',
    price: 101.25,
    yield: 4.48,
    change: +0.08,
    rating: 'AA-',
    volume: 1500000000,
    aiSummary: 'AI chip dominance translating to exceptional cash generation. Premium pricing.'
  },
  {
    id: 'TSLA-2030',
    issuer: 'Tesla',
    isin: 'US88160RAE18',
    coupon: 5.25,
    maturityDate: '2030-03-15',
    price: 94.50,
    yield: 6.12,
    change: -0.15,
    rating: 'BB+',
    volume: 1000000000,
    aiSummary: 'Higher yield compensating for credit risk. Volatile price action.'
  }
];

export const issuers: Issuer[] = [
  {
    name: 'Oracle',
    ticker: 'ORCL',
    description: 'Enterprise software and cloud infrastructure leader with significant AI investments.',
    totalDebt: 131700000000,
    rating: 'BBB',
    bonds: bonds.filter(b => b.issuer === 'Oracle')
  },
  {
    name: 'Meta',
    ticker: 'META',
    description: 'Social media and metaverse pioneer with aggressive AI infrastructure buildout.',
    totalDebt: 28800000000,
    rating: 'AA-',
    bonds: bonds.filter(b => b.issuer === 'Meta')
  },
  {
    name: 'Apple',
    ticker: 'AAPL',
    description: 'Consumer technology giant with fortress balance sheet and strong cash generation.',
    totalDebt: 90700000000,
    rating: 'AA+',
    bonds: bonds.filter(b => b.issuer === 'Apple')
  },
  {
    name: 'Microsoft',
    ticker: 'MSFT',
    description: 'Cloud computing leader with AAA credit rating and diversified revenue streams.',
    totalDebt: 43200000000,
    rating: 'AAA',
    bonds: bonds.filter(b => b.issuer === 'Microsoft')
  },
  {
    name: 'Amazon',
    ticker: 'AMZN',
    description: 'E-commerce and cloud services giant with strong free cash flow generation.',
    totalDebt: 62200000000,
    rating: 'AA-',
    bonds: bonds.filter(b => b.issuer === 'Amazon')
  },
  {
    name: 'Alphabet',
    ticker: 'GOOGL',
    description: 'Search and advertising leader with dominant market position.',
    totalDebt: 23600000000,
    rating: 'AA+',
    bonds: bonds.filter(b => b.issuer === 'Alphabet')
  },
  {
    name: 'NVIDIA',
    ticker: 'NVDA',
    description: 'AI chip market leader with exceptional growth and profitability.',
    totalDebt: 8500000000,
    rating: 'AA-',
    bonds: bonds.filter(b => b.issuer === 'NVIDIA')
  },
  {
    name: 'Tesla',
    ticker: 'TSLA',
    description: 'Electric vehicle pioneer with high growth but elevated credit risk.',
    totalDebt: 9500000000,
    rating: 'BB+',
    bonds: bonds.filter(b => b.issuer === 'Tesla')
  }
];

export const getBondById = (id: string): Bond | undefined => {
  return bonds.find(b => b.id === id);
};

export const getBondsByIssuer = (issuer: string): Bond[] => {
  return bonds.filter(b => b.issuer.toLowerCase() === issuer.toLowerCase());
};

export const formatPrice = (price: number): string => {
  return price.toFixed(2);
};

export const formatYield = (yieldValue: number): string => {
  return `${yieldValue.toFixed(2)}%`;
};

export const formatChange = (change: number): string => {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}`;
};

export const formatVolume = (volume: number): string => {
  if (volume >= 1000000000) {
    return `$${(volume / 1000000000).toFixed(2)}B`;
  }
  if (volume >= 1000000) {
    return `$${(volume / 1000000).toFixed(0)}M`;
  }
  return `$${volume.toLocaleString()}`;
};
