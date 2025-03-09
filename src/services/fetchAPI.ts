import useSWR from "swr";

export interface ElectricityPrice {
  timestamp: string;
  price: number;
  deliveryArea: string;
  unit: string;
}

/**
 * Fetches electricity prices from the API
 * @param url - The URL to fetch the data from
 * @returns - The electricity prices
 */
export const fetcher = async (url: string): Promise<ElectricityPrice[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data: " + response.statusText);
  }
  const data = (await response.json()) as ElectricityPrice[];
  return data;
};

export const useElectricityPrices = () => {
  const dataPath = process.env.REACT_APP_DATA_PATH ?? "/data/data.json";
  const { data, error, isLoading } = useSWR<ElectricityPrice[], Error>(
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
