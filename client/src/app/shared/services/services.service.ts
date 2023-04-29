import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Service } from '../../core/models/Service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private baseUrl: String = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getServices() {
    return this.http.get<Service[]>(this.baseUrl + 'services/');
  }

  getServicesSearch(servicesNumber: number, match: string) {
    let params = new HttpParams().appendAll({
      servicesNumber: servicesNumber,
      match: match
    });

    return this.http.get<Service[]>(this.baseUrl + 'services/search', { params });
  }

  getService(id: number) {
    return this.http.get<Service>(this.baseUrl + 'services/' + id);
  }

  addService(service: Service) {
    return this.http.post<Service>(this.baseUrl + 'services/', service);
  }

  updateService(id: number, service: Service) {
    return this.http.put<Service>(this.baseUrl + 'services/' + id, service);
  }

  deleteService(id: number) {
    return this.http.delete(this.baseUrl + 'services/' + id);
  }
}
