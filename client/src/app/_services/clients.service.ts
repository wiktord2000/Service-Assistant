import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from '../_models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private baseUrl: String = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getClients(){
    return this.http.get<Client[]>(this.baseUrl + 'clients/');
  }

  getClient(id: number) {
    return this.http.get<Client>(this.baseUrl + 'clients/' + id);
  }

  updateClient(id: number, client: Client){
    return this.http.put<Client>(this.baseUrl + 'clients/' + id, client);
  }

}
