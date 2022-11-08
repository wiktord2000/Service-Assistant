import { SnackbarService } from 'src/app/_services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from '../../_models/Vehicle';
import { VehiclesService } from '../../_services/vehicles.service';

@Component({
  selector: 'app-vehicle-profile',
  templateUrl: './vehicle-profile.component.html',
  styleUrls: ['./vehicle-profile.component.css']
})
export class VehicleProfileComponent implements OnInit {

  vehicle: Vehicle; 
  editForm : FormGroup;
  isSaving: boolean = false;

  constructor(private vehiclesService: VehiclesService,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.loadVehicle();
  }

  loadVehicle(){

    const vehicleId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.vehiclesService.getVehicle(vehicleId).subscribe(vehicle => {
      // Store client data
      this.vehicle = vehicle;

      // Obtain owner name
      const currentOwnerName = vehicle.currentOwner.type === 'company' 
                                  ? vehicle.currentOwner.companyName 
                                  : vehicle.currentOwner.firstname + " " + vehicle.currentOwner.lastname;

      const numberRegex = /^\d+$/;

      // Build form
      this.editForm = this.formBuilder.group(
        {
          brand: [vehicle.brand, [Validators.required]],
          model: [vehicle.model, [Validators.required]],
          color: [vehicle.color],
          registrationNumber: [vehicle.registrationNumber],
          productionDate: [vehicle.productionDate, [Validators.pattern(numberRegex)]],
          currentOwner: [currentOwnerName],
          engineFuel: [vehicle.engineFuel],
          vin: [vehicle.vin],
          engineCode: [vehicle.engineCode],
          capacity: [vehicle.capacity, [Validators.pattern(numberRegex)]],
          enginePower: [vehicle.enginePower, [Validators.pattern(numberRegex)]],
          technicalInspectionEnd: [vehicle.technicalInspectionEnd],
          firstRegistration: [vehicle.firstRegistration],
          description: [vehicle.description],
        }
      );
    });
  }

  getCurrentDate(){
    return new Date();
  }

}
