'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Exchange rates relative to AED (1 AED = x currency)
const EXCHANGE_RATES = {
  AED: { rate: 1, symbol: 'AED', flag: '/asset/flag/aed.png' },
  INR: { rate: 23.85, symbol: '₹', flag: '/asset/flag/inr.png' },
  USD: { rate: 0.27, symbol: '$', flag: '/asset/flag/usd.png' },
  GBP: { rate: 0.20, symbol: '£', flag: '/asset/flag/gbp.png' },
  EUR: { rate: 0.23, symbol: '€', flag: '/asset/flag/eur.png' },
};

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('AED');

  // Load currency from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency && EXCHANGE_RATES[savedCurrency]) {
      setCurrency(savedCurrency);
    }
  }, []);

  // Save currency to localStorage when changed
  useEffect(() => {
    localStorage.setItem('selectedCurrency', currency);
  }, [currency]);

  const convertPrice = (priceInAED) => {
    if (!priceInAED || isNaN(priceInAED)) return 0;
    const rate = EXCHANGE_RATES[currency]?.rate || 1;
    return Math.round(priceInAED * rate * 100) / 100; // Round to 2 decimal places
  };

  const formatPrice = (priceInAED) => {
    const convertedPrice = convertPrice(priceInAED);
    const { symbol } = EXCHANGE_RATES[currency] || EXCHANGE_RATES.AED;
    
    // Format with proper decimal places and thousand separators
    const formattedAmount = convertedPrice.toLocaleString('en-US', {
      minimumFractionDigits: currency === 'INR' ? 0 : 2,
      maximumFractionDigits: currency === 'INR' ? 0 : 2,
    });

    return `${symbol} ${formattedAmount}`;
  };

  const getCurrentCurrencyInfo = () => {
    return EXCHANGE_RATES[currency] || EXCHANGE_RATES.AED;
  };

  const value = {
    currency,
    setCurrency,
    convertPrice,
    formatPrice,
    getCurrentCurrencyInfo,
    availableCurrencies: Object.keys(EXCHANGE_RATES),
    exchangeRates: EXCHANGE_RATES,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};