export interface IElectricityPrice {
  timestamp: string;
  price: number;
  deliveryArea: string;
  unit: string;
}

export interface IProcessedPrice {
  timestamp: Date;
  price: number;
}
