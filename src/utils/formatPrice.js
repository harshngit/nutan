export const formatPrice = (priceInINR, currency) => {
  const conversionRate = {
    INR: 1,
    USD: 0.012, // 1 INR = 0.012 USD approx. (you can replace this with live rates if needed)
  };

  const convertedPrice = priceInINR * conversionRate[currency];

  const currencySymbols = {
    INR: "₹",
    USD: "$",
  };

  return `${currencySymbols[currency]}${convertedPrice.toFixed(2)}`;
};
