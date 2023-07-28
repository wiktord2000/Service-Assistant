import { Injectable } from '@angular/core';
import {
  DEFAULT_TABLE_HEADER_HEIGHT,
  DEFAULT_TABLE_ROW_HEIGHT
} from 'src/app/core/constants/constants';
import { Client } from 'src/app/core/models/Client';
import { Vehicle } from 'src/app/core/models/Vehicle';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() {}

  calculateTableHeight(heightInRows: number) {
    return DEFAULT_TABLE_HEADER_HEIGHT + heightInRows * DEFAULT_TABLE_ROW_HEIGHT;
  }

  // Consider pipes
  clientToString(client: Client): string {
    if (!client) return '';
    return client.type === 'company'
      ? client.companyName
      : client.firstname + ' ' + client.lastname;
  }

  getClientIcon(client: Client) {
    return client.type === 'company' ? 'groups' : 'person';
  }

  vehicleToString(vehicle: Vehicle): string {
    if (!vehicle) return '';
    return vehicle.brand + ' ' + vehicle.model;
  }

  getCurrentDate() {
    return new Date();
  }
}
