'use client';

import React, { useState, useRef, useEffect } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import { useCurrency } from '@/Context/CurrencyProvider';

const CurrencySelector = () => {
  const { currency, setCurrency, exchangeRates, getCurrentCurrencyInfo } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentCurrency = getCurrentCurrencyInfo();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <img 
          className="w-5 h-5 mr-2 object-contain rounded-sm" 
          src={currentCurrency.flag} 
          alt={`${currency} flag`}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <span className="text-black text-sm font-medium mr-1">{currency}</span>
        <IoChevronDownOutline 
          className={`w-3 h-3 text-black transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px]">
          {Object.entries(exchangeRates).map(([currencyCode, info]) => (
            <button
              key={currencyCode}
              onClick={() => handleCurrencyChange(currencyCode)}
              className={`w-full flex items-center px-3 py-2 text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                currency === currencyCode ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
            >
              <img 
                className="w-5 h-5 mr-2 object-contain rounded-sm" 
                src={info.flag} 
                alt={`${currencyCode} flag`}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="font-medium">{currencyCode}</span>
              <span className="ml-auto text-xs text-gray-500">{info.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;