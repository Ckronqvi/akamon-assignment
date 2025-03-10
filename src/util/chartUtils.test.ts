import { describe, it, expect } from "vitest";
import { processPricesAndTimeStamps } from "./chartUtils";
import { IElectricityPrice, IProcessedPrice } from "../types";

describe("processPricesAndTimeStamps", () => {
  it("should convert prices and transform timestamps correctly", () => {
    // Input data
    const inputPrices: IElectricityPrice[] = [
      {
        price: 100,
        timestamp: "2024-01-01T12:00:00Z",
        deliveryArea: "FI",
        unit: "EUR/MWh",
      }, // 100 EUR/MWh
      {
        price: 50,
        timestamp: "2024-01-01T13:00:00Z",
        deliveryArea: "FI",
        unit: "EUR/MWh",
      }, // 50 EUR/MWh
      {
        price: 0,
        timestamp: "2024-01-01T14:00:00Z",
        deliveryArea: "FI",
        unit: "EUR/MWh",
      }, // 0 EUR/MWh
    ];

    // Expected output
    const expectedOutput: IProcessedPrice[] = [
      { price: 12.55, timestamp: new Date("2024-01-01T12:00:00Z") }, // 100 EUR/MWh → 12.55 snt/kWh
      { price: 6.275, timestamp: new Date("2024-01-01T13:00:00Z") }, // 50 EUR/MWh → 6.275 snt/kWh
      { price: 0, timestamp: new Date("2024-01-01T14:00:00Z") }, // 0 EUR/MWh → 0 snt/kWh
    ];

    // Run the function
    const result = processPricesAndTimeStamps(inputPrices);

    // Assertions
    expect(result).toEqual(expectedOutput);
  });

  it("should handle an empty array", () => {
    const inputPrices: IElectricityPrice[] = [];
    const expectedOutput: IProcessedPrice[] = [];

    const result = processPricesAndTimeStamps(inputPrices);

    expect(result).toEqual(expectedOutput);
  });

  it("should handle negative prices", () => {
    const inputPrices: IElectricityPrice[] = [
      {
        price: -100,
        timestamp: "2024-01-01T12:00:00Z",
        deliveryArea: "FI",
        unit: "EUR/MWh",
      }, // -100 EUR/MWh
    ];

    const expectedOutput: IProcessedPrice[] = [
      { price: -12.55, timestamp: new Date("2024-01-01T12:00:00Z") }, // -100 EUR/MWh → -12.55 snt/kWh
    ];

    const result = processPricesAndTimeStamps(inputPrices);

    expect(result).toEqual(expectedOutput);
  });

  it("should handle invalid timestamps gracefully", () => {
    const inputPrices: IElectricityPrice[] = [
      {
        price: 100,
        timestamp: "invalid-date",
        deliveryArea: "FI",
        unit: "EUR/MWh",
      }, // Invalid timestamp
    ];

    // Expect the function to throw an error or handle the invalid date gracefully
    expect(() => processPricesAndTimeStamps(inputPrices)).toThrow();
  });
});
