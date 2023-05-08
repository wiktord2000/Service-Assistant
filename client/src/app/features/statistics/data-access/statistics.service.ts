import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClientOrdersStatistics } from '../../../core/models/ClientOrdersStatistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private baseUrl: String = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMostPopularClients(clientsCount?: number) {
    let params =
      clientsCount !== undefined
        ? new HttpParams().appendAll({
            clientsCount: clientsCount
          })
        : null;

    return this.http.get<ClientOrdersStatistics[]>(this.baseUrl + 'clients/statistics', { params });
  }
}
