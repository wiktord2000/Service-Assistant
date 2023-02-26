import { Order } from './Order';
import { Service } from './Service';

export interface OrderService {
  id: number;
  orderId: number;
  serviceId: number;
  approvedServiceName: string;
  approvedEstimatedTime: number;
  approvedCostGross: number;
  workedTime: number;
  isCompleted: boolean;
  order?: Order;
  service?: Service;
}
