import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Client } from 'src/app/core/models/Client';
import { ClientsService } from './clients.service';

@Injectable({
  providedIn: 'root'
})
export class ClientResolver implements Resolve<Client> {
  constructor(private clientsService: ClientsService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Client> {
    const clientId = Number(route.paramMap.get('id'));
    return this.clientsService.getClient(clientId);
  }
}
