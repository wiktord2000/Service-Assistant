import { Vehicle } from './../_models/Vehicle';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  private baseUrl: String = environment.apiUrl;
  
  constructor(private http: HttpClient) { }


  getVehicle(id: number) {
    return this.http.get<Vehicle>(this.baseUrl + 'vehicles/' + id);
  }

  getVehicles() {
    return this.http.get<Vehicle[]>(this.baseUrl + 'vehicles');
  }

  addVehicle(vehicle: Vehicle){
    return this.http.post<Vehicle>(this.baseUrl + 'vehicles/', vehicle);
  }

  updateVehicle(id: number, vehicle: Vehicle){
    return this.http.put<Vehicle>(this.baseUrl + 'vehicles/' + id, vehicle);
  }

  deleteVehicle(id: number){
    return this.http.delete(this.baseUrl + 'vehicles/' + id);
  }

}
