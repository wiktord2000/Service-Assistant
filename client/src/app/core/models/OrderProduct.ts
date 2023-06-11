import { Order } from './Order';
import { Product } from './Product';

export interface OrderProduct {
  id: number;
  approvedProductName: string;
  approvedSalesPriceGross: number;
  count: number;
  isProvided: boolean;
  isReserved: boolean;
  deliveryTime?: Date;
  orderId: number;
  productId: number;
  order?: Order;
  product?: Product;
}
