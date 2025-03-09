import Fraction from 'fraction.js';

/**
 * Converts electricity price from EUR per megawatt-hour (MWh) to cents per kilowatt-hour (kWh).
 *
 * @param priceInEurPerMWh - The electricity price in euros per megawatt-hour.
 * @returns The equivalent price in cents per kilowatt-hour.
 */
export const convertToSntPerKWh = (priceInEurPerMWh: number): Fraction => {
  // 1 EUR/MWh = 0.1 snt/kWh
  return new Fraction(priceInEurPerMWh).div(10);
};
  
  /**
   * Adds VAT to the given electricity price.
   *
   * @param priceInSntPerKWh - The price of electricity in cents per kilowatt-hour.
   * @param vatRate - The VAT rate to apply. Current: 1.255 (25.5%).
   * @returns The price including VAT.
   */
  export const addElectricityVAT = (priceInSntPerKWh: Fraction, vatRate: number = 1.255): Fraction => {
    return priceInSntPerKWh.mul(vatRate);
  };
  

/**
 * Processes the electricity price by converting it to cents per kilowatt-hour
 * and applying the VAT rate.
 *
 * @param priceInEurPerMWh - The electricity price in euros per megawatt-hour.
 * @returns The final price including VAT in cents per kilowatt-hour.
 */
export const processPrice = (priceInEurPerMWh: number): Fraction => {
  const priceInSntPerKWh = convertToSntPerKWh(priceInEurPerMWh);
  return addElectricityVAT(priceInSntPerKWh);
};

/**
 * Formats the price as a human-readable string with 2 decimal places.
 *
 * @param price - The price as a Fraction.
 * @returns The formatted price as a string (e.g., "12.55").
 */
export const formatPrice = (price: Fraction): string => {
  return price.valueOf().toFixed(2);
};