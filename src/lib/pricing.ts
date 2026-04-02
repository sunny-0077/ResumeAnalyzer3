export const PRICING = {
  IN: {
    symbol: '₹',
    currency: 'INR',
    pro: 599,
    advanced: 1399,
    pro_annual: 5999,
    advanced_annual: 13999,
  },
  ROW: {
    symbol: '$',
    currency: 'USD',
    pro: 15,
    advanced: 39,
    pro_annual: 149,
    advanced_annual: 399,
  }
};

export type Region = 'IN' | 'ROW';

export const getRegionData = (countryCode: string = 'IN') => {
  return countryCode === 'IN' ? PRICING.IN : PRICING.ROW;
};

export const formatPrice = (amount: number, symbol: string) => {
  return `${symbol}${amount.toLocaleString()}`;
};
