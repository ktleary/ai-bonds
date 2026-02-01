export interface Bond {
  id: string;
  issuer: string;
  issuerLogo?: string;
  isin: string;
  coupon: number;
  maturityDate: string;
  price: number;
  yield: number;
  change: number;
  rating: string;
  volume?: number;
  aiSummary?: string;
}

export interface Issuer {
  name: string;
  ticker: string;
  description: string;
  totalDebt: number;
  rating: string;
  bonds: Bond[];
}

export interface PricePoint {
  date: string;
  price: number;
  yield: number;
}

export interface HistoricalData {
  bondId: string;
  data: PricePoint[];
}
