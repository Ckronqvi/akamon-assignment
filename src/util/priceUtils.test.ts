import { describe, it, expect } from 'vitest';
import { convertToSntPerKWh, addElectricityVAT, processPrice, formatPrice } from './conversionUtils';
import Fraction from 'fraction.js';

describe('Price Utility Functions', () => {
  // Test for convertToSntPerKWh
  describe('convertToSntPerKWh', () => {
    it('should convert EUR/MWh to snt/kWh correctly', () => {
      expect(convertToSntPerKWh(100).equals(new Fraction(10))); // 100 EUR/MWh = 10 snt/kWh
      expect(convertToSntPerKWh(50).equals(new Fraction(5)));   // 50 EUR/MWh = 5 snt/kWh
      expect(convertToSntPerKWh(0).equals(new Fraction(0)));    // 0 EUR/MWh = 0 snt/kWh
    });

    it('should handle negative values', () => {
      expect(convertToSntPerKWh(-100).equals(new Fraction(-10))); // -100 EUR/MWh = -10 snt/kWh
    });
  });

  // Test for addElectricityVAT
  describe('addElectricityVAT', () => {
    it('should add VAT to the price correctly', () => {
      expect(addElectricityVAT(new Fraction(10)).equals(new Fraction(12.55))); // 10 snt/kWh + 25.5% VAT = 12.55 snt/kWh
      expect(addElectricityVAT(new Fraction(5)).equals(new Fraction(6.275)));  // 5 snt/kWh + 25.5% VAT = 6.275 snt/kWh
      expect(addElectricityVAT(new Fraction(0)).equals(new Fraction(0)));      // 0 snt/kWh + 25.5% VAT = 0 snt/kWh
    });

    it('should handle custom VAT rates', () => {
      expect(addElectricityVAT(new Fraction(10), 1.1).equals(new Fraction(11))); // 10 snt/kWh + 10% VAT = 11 snt/kWh
    });

    it('should handle negative values', () => {
      expect(addElectricityVAT(new Fraction(-10)).equals(new Fraction(-12.55))); // -10 snt/kWh + 25.5% VAT = -12.55 snt/kWh
    });
  });

  // Test for processPrice
  describe('processPrice', () => {
    it('should convert EUR/MWh to snt/kWh and add VAT correctly', () => {
      expect(processPrice(100).equals(new Fraction(12.55))); // 100 EUR/MWh → 10 snt/kWh → 12.55 snt/kWh (with VAT)
      expect(processPrice(50).equals(new Fraction(6.275)));  // 50 EUR/MWh → 5 snt/kWh → 6.275 snt/kWh (with VAT)
      expect(processPrice(0).equals(new Fraction(0)));       // 0 EUR/MWh → 0 snt/kWh → 0 snt/kWh (with VAT)
    });

    it('should handle negative values', () => {
      expect(processPrice(-100).equals(new Fraction(-12.55))); // -100 EUR/MWh → -10 snt/kWh → -12.55 snt/kWh (with VAT)
    });
  });

  // Test for formatPrice
  describe('formatPrice', () => {
    it('should format the price correctly', () => {
      expect(formatPrice(new Fraction(12.55))).toBe('12.55'); // 12.55 snt/kWh → "12.55"
      expect(formatPrice(new Fraction(6.275))).toBe('6.28');  // 6.275 snt/kWh → "6.28"
      expect(formatPrice(new Fraction(0))).toBe('0.00');      // 0 snt/kWh → "0.00"
    });

    it('should handle negative values', () => {
      expect(formatPrice(new Fraction(-12.55))).toBe('-12.55'); // -12.55 snt/kWh → "-12.55"
    });
  });
});