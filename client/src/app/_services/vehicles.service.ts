import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../_models/Vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  private baseUrl: String = environment.apiUrl;
  
  constructor(private http: HttpClient) { }


  getVehicle(id: number) {
    return this.http.get<Vehicle>(this.baseUrl + 'vehicles/' + id);
  }

}
