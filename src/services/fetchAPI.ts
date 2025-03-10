import useSWR from "swr";
import { IElectricityPrice } from "../types";

/**
 * Fetches electricity prices from the API
 * @param url - The URL to fetch the data from
 * @returns The electricity prices
 */
export const fetcher = async (url: string): Promise<IElectricityPrice[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data: " + response.statusText);
  }
  const data = (await response.json()) as IElectricityPrice[];
  return data;
};

/**
 * Fetches electricity prices from the API
 * @returns The electricity prices
 */
export const useElectricityPrices = () => {
  const dataPath =
    (import.meta.env.VITE_DATA_PATH as string) ?? "/data/data.json";
  const { data, error, isLoading } = useSWR<IElectricityPrice[], Error>(
    dataPath,
    fetcher,
    {
      onErrorRetry: (error) => {
        // Do not retry on errors
        if (error) return;
      },
    },
  );

  return {
    prices: error ? undefined : data, // Reset prices to undefined on error
    isLoading,
    error,
  };
};
