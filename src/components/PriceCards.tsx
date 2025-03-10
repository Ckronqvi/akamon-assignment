import React from "react";
import { IProcessedPrice } from "../types";

interface PriceCardsProps {
  prices: IProcessedPrice[];
}

export const PriceCards: React.FC<PriceCardsProps> = ({ prices }) => {
  // Calculate average, min, and max prices
  const averagePrice =
    prices.reduce((sum, price) => sum + price.price, 0) / prices.length;
  const minPrice = Math.min(...prices.map((price) => price.price));
  const maxPrice = Math.max(...prices.map((price) => price.price));

  // Find the hours for min and max prices
  const minPriceHour = prices
    .find((price) => price.price === minPrice)
    ?.timestamp.getHours();
  const maxPriceHour = prices
    .find((price) => price.price === maxPrice)
    ?.timestamp.getHours();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Single card for small screens */}
      <div
        className="bg-white/60 backdrop-blur-3xl p-4 rounded-lg shadow-md md:hidden"
        aria-label="Price summary"
      >
        <p
          className="text-xl"
          aria-label={`Average price: ${averagePrice.toFixed(2)} snt/kWh`}
        >
          <span className="font-bold">Average:</span> {averagePrice.toFixed(2)}{" "}
          snt/kWh
        </p>
        <p
          className="text-xl"
          aria-label={`Minimum price: ${minPrice.toFixed(2)} snt/kWh at ${minPriceHour}:00`}
        >
          <span className="font-bold">Min:</span> {minPrice.toFixed(2)} snt/kWh
          (at {minPriceHour}:00)
        </p>
        <p
          className="text-xl"
          aria-label={`Maximum price: ${maxPrice.toFixed(2)} snt/kWh at ${maxPriceHour}:00`}
        >
          <span className="font-bold">Max:</span> {maxPrice.toFixed(2)} snt/kWh
          (at {maxPriceHour}:00)
        </p>
      </div>

      {/* Three cards for medium screens and above */}
      <div
        className="bg-white/60 backdrop-blur-3xl p-4 rounded-lg shadow-md hidden md:block"
        aria-label="Average price card"
      >
        <h3 className="text-lg font-semibold">Average Price</h3>
        <p
          className="text-2xl"
          aria-label={`Average price: ${averagePrice.toFixed(2)} snt/kWh`}
        >
          {averagePrice.toFixed(2)} snt/kWh
        </p>
      </div>
      <div
        className="bg-white/60 backdrop-blur-3xl p-4 rounded-lg shadow-md hidden md:block"
        aria-label="Minimum price card"
      >
        <h3 className="text-lg font-semibold">Minimum Price</h3>
        <p
          className="text-2xl"
          aria-label={`Minimum price: ${minPrice.toFixed(2)} snt/kWh`}
        >
          {minPrice.toFixed(2)} snt/kWh
        </p>
        <p
          className="text-sm text-gray-600"
          aria-label={`Occurred at ${minPriceHour}:00`}
        >
          at {minPriceHour}:00
        </p>
      </div>
      <div
        className="bg-white/60 backdrop-blur-3xl p-4 rounded-lg shadow-md hidden md:block"
        aria-label="Maximum price"
      >
        <h3 className="text-lg font-semibold">Maximum Price</h3>
        <p
          className="text-2xl"
          aria-label={`Maximum price: ${maxPrice.toFixed(2)} snt/kWh`}
        >
          {maxPrice.toFixed(2)} snt/kWh
        </p>
        <p
          className="text-sm text-gray-600"
          aria-label={`Occurred at ${maxPriceHour}:00`}
        >
          at {maxPriceHour}:00
        </p>
      </div>
    </div>
  );
};
