export const convertToCurrency = (number) => {
  const result = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number);
  return result;
};
