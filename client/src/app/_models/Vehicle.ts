import { Client } from "./Client";

export interface Vehicle {
    id: number;
    brand: string;
    model: string;
    registrationNumber: string;
    vin: string;
    engineCode?: string;
    capacity: number;
    engineFuel: string;
    enginePower: number;
    enginePowerUnit: string;
    color: string;
    productionDate: Date;
    firstRegistration: Date;
    technicalInspectionEnd?: Date;
    description?: string;
    currentOwner: Client;
    createdAt: Date;
    updatedAt: Date;
}