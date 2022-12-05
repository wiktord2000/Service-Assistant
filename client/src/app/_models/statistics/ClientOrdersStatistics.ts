import { Client } from '../Client';

export interface ClientOrdersStatistics {
  clientId: number;
  ordersCount: number;
  client: Client;
}
