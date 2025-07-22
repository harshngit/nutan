import exchangeRates from "../../public/asset/currencyExchange.json";

export const formatCurrency = (price, currency) => {
  const rate = exchangeRates[currency] || 1;
  const convertedPrice = price * rate;

  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  }).format(convertedPrice);
};
