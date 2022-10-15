import { Order } from "./Order";
import { Vehicle } from "./Vehicle";

export interface Client {
    id: number;
    type: string;
    companyName: string;
    nip: number;
    firstname: string;
    lastname: string;
    street: string;
    city: string;
    postalCode: number;
    countryCode: string;
    phone: number;
    email: string;
    discountJobs: number;
    discountParts: number;
    createdAt: Date;
    updatedAt: Date;
    orders: Array<Order>;
    vehicles: Array<Vehicle>;
}