export interface Product {
  id: number;
  name: string;
  code: string;
  manufacturer: string;
  unit: string;
  ean: string;
  availability: number;
  reserved: number;
  description: string;
  notice: string;
  grade: number;
  vat: number;
  buyPriceNet: number;
  buyPriceGross: number;
  salesPriceNet: number;
  salesPriceGross: number;
  profit: number;
  markup: number;
  margin: number;
  lastDeliveryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
