
/**
 * Calculate the total of all numbers in an array.
 * @param {number[]} prices - An array of numbers representing the prices of items.
 * @returns {number} The total sum of the array elements.
 */
export const calculateTotal = (prices: number[]): number => {
    return prices.reduce((total, price) => total + price, 0);
  };
  
  /**
   * Format a number as a currency string.
   * @param {number} amount - The number to format as currency.
   * @param {string} currency - The currency symbol to use, default is "$".
   * @returns {string} The formatted currency string.
   */
  export const displayMoney = (amount: number, currency = "$"): string => {
    return `${currency}${amount.toFixed(2)}`;
  };
  