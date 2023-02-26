import { Client } from './Client';
import { OrderProduct } from './OrderProduct';
import { OrderService } from './OrderService';
import { Status } from './Status';
import { Vehicle } from './Vehicle';

export interface Order {
  id: number;
  orderNumber: string;
  admissionDate?: Date;
  deadlineDate?: Date;
  clientDescription: string;
  fuelLevel: string;
  repairDescription: string;
  invoiceId: string;
  mileage?: number;
  totalJobsNet: number;
  totalJobsGross: number;
  totalPartsNet: number;
  totalPartsGross: number;
  totalNet: number;
  totalGross: number;
  createdAt: Date;
  updatedAt: Date;
  finishDate?: Date;
  statusId: number;
  clientId?: number;
  vehicleId?: number;
  status: Status;
  client: Client;
  vehicle: Vehicle;
  orderServices: Array<OrderService>;
  orderProducts: Array<OrderProduct>;
}
