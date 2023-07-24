import { Injectable } from '@angular/core';
import {
  DEFAULT_TABLE_HEADER_HEIGHT,
  DEFAULT_TABLE_ROW_HEIGHT
} from 'src/app/core/constants/constants';
import { Client } from 'src/app/core/models/Client';
import { Order } from 'src/app/core/models/Order';
import { Product } from 'src/app/core/models/Product';
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

  getClientIcon(client: Client): string {
    return client.type === 'company' ? 'groups' : 'person';
  }

  getClientRouterLink(client: Client): string {
    return `/clients/${client.id}`;
  }

  getVehicleRouterLink(vehicle: Vehicle): string {
    return `/vehicles/${vehicle.id}`;
  }

  getOrderRouterLink(order: Order): string {
    return `/orders/${order.id}`;
  }

  getProductRouterLink(product: Product): string {
    return `/products/${product.id}`;
  }

  vehicleToString(vehicle: Vehicle): string {
    if (!vehicle) return '';
    return vehicle.brand + ' ' + vehicle.model;
  }

  getCurrentDate() {
    return new Date();
  }
}
