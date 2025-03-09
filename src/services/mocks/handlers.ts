import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/data/data.json", () => {
    return HttpResponse.json([
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
  }),
];
