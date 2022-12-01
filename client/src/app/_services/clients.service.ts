import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from '../_models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private baseUrl: String = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getClients() {
    return this.http.get<Client[]>(this.baseUrl + 'clients/');
  }

  getVehicleClients(vehicleId?: number) {
    if (!vehicleId) return this.getClientsSearch(10, '');

    let params = new HttpParams().appendAll({
      vehicleId: vehicleId
    });
    return this.http.get<Client[]>(this.baseUrl + 'clients', { params });
  }

  getClientsSearch(clientsNumber: number, match: string) {
    let params = new HttpParams().appendAll({
      clientsNumber: clientsNumber,
      match: match
    });

    return this.http.get<Client[]>(this.baseUrl + 'clients/search', { params });
  }

  getClient(id: number) {
    return this.http.get<Client>(this.baseUrl + 'clients/' + id);
  }

  addClient(client: Client) {
    return this.http.post<Client>(this.baseUrl + 'clients/', client);
  }

  updateClient(id: number, client: Client) {
    return this.http.put<Client>(this.baseUrl + 'clients/' + id, client);
  }

  deleteClient(id: number) {
    return this.http.delete(this.baseUrl + 'clients/' + id);
  }
}
