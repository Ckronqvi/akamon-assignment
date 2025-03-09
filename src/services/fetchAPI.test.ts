import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { server } from "./mocks/server";
import { useElectricityPrices, fetcher } from "./fetchAPI";
import { HttpResponse, http } from "msw";

// Start the MSW server before all tests
beforeAll(() => server.listen());

// Reset the MSW server after each test
afterEach(() => server.resetHandlers());

// Stop the MSW server after all tests
afterAll(() => server.close());

describe("fetcher", () => {
  it("should fetch and return electricity prices", async () => {
    const url = "/data/data.json";
    const data = await fetcher(url);

    expect(data).toEqual([
      {
        timestamp: "2024-12-24T22:00:00Z",
        price: 79,
        deliveryArea: "FI",
        unit: "EUR/MWh",
      },
      {
        timestamp: "2024-12-24T23:00:00Z",
        price: 68.01,
        deliveryArea: "FI",
        unit: "EUR/MWh",
      },
    ]);
  });

  it("should throw an error if the request fails", async () => {
    server.use(
      http.get("/data/data.json", () => {
        return HttpResponse.json(
          { message: "Internal Server Error" },
          { status: 500 },
        );
      }),
    );

    const url = "/data/data.json";
    await expect(fetcher(url)).rejects.toThrow(
      "Failed to fetch data: Internal Server Error",
    );
  });
});

describe("useElectricityPrices", () => {
  it("should handle errors", async () => {
    // Override the default handler to simulate an error
    server.use(
      http.get("/data/data.json", () => {
        return HttpResponse.json(
          { message: "Internal Server Error" },
          { status: 500 },
        );
      }),
    );

    const { result } = renderHook(() => useElectricityPrices());

    expect(result.current.prices).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeUndefined();

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.prices).toBeUndefined();
    expect(result.current.error).toEqual(
      new Error("Failed to fetch data: Internal Server Error"),
    );
  });
});
