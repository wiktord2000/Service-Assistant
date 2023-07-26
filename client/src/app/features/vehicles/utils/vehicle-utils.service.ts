import { Injectable } from '@angular/core';
import { Vehicle } from 'src/app/core/models/Vehicle';
import { VehicleFormValue } from './vehicle-form-types';
import { UtilsService } from 'src/app/shared/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleUtilsService {
  constructor(private utilsService: UtilsService) {}

  getVehicleFormValue(vehicle: Vehicle): VehicleFormValue {
    return {
      brand: vehicle.brand,
      model: vehicle.model,
      color: vehicle.color,
      registrationNumber: vehicle.registrationNumber,
      productionDate: vehicle.productionDate,
      currentOwner: this.utilsService.clientToString(vehicle.currentOwner),
      engineFuel: vehicle.engineFuel,
      vin: vehicle.vin,
      engineCode: vehicle.engineCode,
      capacity: vehicle.capacity,
      enginePower: vehicle.enginePower,
      technicalInspectionEnd: vehicle.technicalInspectionEnd,
      firstRegistration: vehicle.firstRegistration,
      description: vehicle.description
    };
  }
}
