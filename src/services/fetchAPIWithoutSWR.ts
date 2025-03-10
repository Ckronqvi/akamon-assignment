// I did not know if we are allowed to use SWR or not, so I created this file to fetch data without using SWR.

import { useState, useEffect } from "react";
import { IElectricityPrice } from "../types";

/**
 * Fetches electricity prices from the API
 * @param url - The URL to fetch the data from
 * @returns The electricity prices
 */
export const fetchElectricityPrices = async (
  url: string,
): Promise<IElectricityPrice[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data: " + response.statusText);
  }
  const data = (await response.json()) as IElectricityPrice[];
  return data;
};

/**
 * Fetches electricity prices from the API
 * @returns The electricity prices, loading state, and error
 */
export const useElectricityPrices = () => {
  const [prices, setPrices] = useState<IElectricityPrice[] | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const dataPath =
    (import.meta.env.VITE_DATA_PATH as string) ?? "/data/data.json";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchElectricityPrices(dataPath);
        setPrices(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
        setPrices(undefined);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData().catch((err) => {
      console.error("Error fetching data:", err);
    });
  }, [dataPath]);

  return {
    prices,
    isLoading,
    error,
  };
};
