import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_KEY } from './keys';
import { TickerResponse } from './types';

export const URL = 'https://api.polygon.io/v3/reference/tickers';

export const pr = new Promise((resolve) =>
  setTimeout(() => resolve('done'), 3000),
);

export const queryClient = new QueryClient();

export const debounce = (fn: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export const fetchTickers = (pageParam = '', search = '') => {
  const searchParam = search ? `search=${search}` : '';
  const nextUrl = pageParam ? pageParam + '&' : URL + '?';
  return axios<TickerResponse>(
    `${nextUrl}${searchParam}&limit=100&active=true&apiKey=${API_KEY}`,
  ).then((res) => res.data);
};
