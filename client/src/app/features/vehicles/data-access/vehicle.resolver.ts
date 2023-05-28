import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/core/models/Vehicle';
import { VehiclesService } from './vehicles.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleResolver implements Resolve<Vehicle> {
  constructor(private vehiclesService: VehiclesService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Vehicle> {
    const vehicleId = Number(route.paramMap.get('id'));
    return this.vehiclesService.getVehicle(vehicleId);
  }
}
