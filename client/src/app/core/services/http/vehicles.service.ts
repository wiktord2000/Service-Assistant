import { Vehicle } from '../../models/Vehicle';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private baseUrl: String = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getVehicle(id: number) {
    return this.http.get<Vehicle>(this.baseUrl + 'vehicles/' + id);
  }

  getVehicles() {
    return this.http.get<Vehicle[]>(this.baseUrl + 'vehicles');
  }

  getClientVehicles(clientId?: number) {
    if (!clientId) return this.getVehiclesSearch(10, '');

    let params = new HttpParams().appendAll({
      clientId: clientId
    });

    return this.http.get<Vehicle[]>(this.baseUrl + 'vehicles', { params });
  }

  getVehiclesSearch(vehiclesNumber: number, match: string) {
    let params = new HttpParams().appendAll({
      vehiclesNumber: vehiclesNumber,
      match: match
    });

    return this.http.get<Vehicle[]>(this.baseUrl + 'vehicles/search', { params });
  }

  addVehicle(vehicle: Vehicle) {
    return this.http.post<Vehicle>(this.baseUrl + 'vehicles/', vehicle);
  }

  updateVehicle(id: number, vehicle: Vehicle) {
    return this.http.put<Vehicle>(this.baseUrl + 'vehicles/' + id, vehicle);
  }

  deleteVehicle(id: number) {
    return this.http.delete(this.baseUrl + 'vehicles/' + id);
  }
}
