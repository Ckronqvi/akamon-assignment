import { IElectricityPrice, IProcessedPrice } from "../types";
import { processPrice } from "./conversionUtils";

/**
 * Transforms an array of electricity price data by converting the price values
 * and ensuring timestamps are in `Date` format.
 *
 * @param {IElectricityPrice[]} prices - An array of electricity price objects,
 * where each object contains a `price` (in EUR/MWh) and a `timestamp` (as a string).
 *
 * @returns {IProcessedPrice[]} - A new array of electricity price objects, where each
 * object contains a `price` (in snt/KWh) and a `timestamp` (as a `Date` object).
 *
 * @throws {Error} - If the timestamp is invalid.
 */
export const processPricesAndTimeStamps = (
  prices: IElectricityPrice[],
): IProcessedPrice[] => {
  return prices.map((price) => {
    const convertedPrice = processPrice(price.price).valueOf();
    const timestamp = new Date(price.timestamp);
    if (isNaN(timestamp.valueOf())) {
      throw new Error("Invalid timestamp");
    }
    return {
      price: convertedPrice,
      timestamp: timestamp,
    };
  });
};
