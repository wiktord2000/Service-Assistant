import { Client } from "./Client";
import { Status } from "./Status";
import { Vehicle } from "./Vehicle";

export interface Order {
    id: number;
    orderNumber: string;
    createdAt: Date;
    finishDate?: Date;
    status: Status;
    client: Client;
    vehicle: Vehicle;
    admissionDate?: Date;
    deadlineDate?: Date;
    clientDescription?: string;
    repairDescription?: string;
    invoiceId?: string;
    mileage?: number;
    totalJobsNet: number;
    totalJobsGross: number;
    totalPartsNet: number;
    totalPartsGross: number;
    totalNet: number;
    totalGross: number;
}