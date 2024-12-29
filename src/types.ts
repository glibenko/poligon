export interface Ticker {
  ticker: string;
  name: string;
}

export interface TickerResponse {
  results: Ticker[];
  next_url?: string;
}
