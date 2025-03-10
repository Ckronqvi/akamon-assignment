import Spinner from "./Spinner";
import { Chart } from "./Chart";
import { PriceCards } from "./PriceCards";
import { processPricesAndTimeStamps } from "../util/chartUtils";
import { useElectricityPrices } from "../services/fetchAPI";

export const DataContainer: React.FC = () => {
  const { prices, isLoading, error } = useElectricityPrices();
  const processedPrices = prices ? processPricesAndTimeStamps(prices) : [];

  return (
    <div className="container">
      <h1
        aria-label="Assignment"
        className="text-2xl font-bold text-center mb-4 lg:mb-6"
      >
        Assignment
      </h1>

      {isLoading && <Spinner />}

      {error && (
        <p className="text-red-500 text-center">Error: {error.message}</p>
      )}

      {!isLoading && !error && prices && (
        <>
          <div className="mb-8">
            <PriceCards prices={processedPrices} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Chart prices={processedPrices} />
          </div>
        </>
      )}
    </div>
  );
};
