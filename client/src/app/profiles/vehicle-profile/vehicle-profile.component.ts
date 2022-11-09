import { SnackbarService } from 'src/app/_services/snackbar.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from '../../_models/Vehicle';
import { VehiclesService } from '../../_services/vehicles.service';
import { Order } from 'src/app/_models/Order';
import { OrdersTableComponent } from 'src/app/_shared/tables/orders-table/orders-table.component';
import { finalize } from 'rxjs';
import { Client } from 'src/app/_models/Client';

@Component({
  selector: 'app-vehicle-profile',
  templateUrl: './vehicle-profile.component.html',
  styleUrls: ['./vehicle-profile.component.css']
})
export class VehicleProfileComponent implements OnInit {

  @ViewChild(OrdersTableComponent) ordersTable!: OrdersTableComponent;
  vehicle: Vehicle;
  currentOwner: Client; 
  editForm : FormGroup;
  displayFinished: boolean = false;
  isSaving: boolean = false;

  constructor(private vehiclesService: VehiclesService,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.loadVehicle();
  }

  onSaveChanges(){
    this.isSaving = true;
    const updatData = {...this.editForm.value, currentOwnerId: this.currentOwner.id};
    this.vehiclesService.updateVehicle(this.vehicle.id, updatData)
      .pipe(
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: () => {
          this.vehicle = {...this.vehicle, ...updatData};    // Update specific props -> really handy
          this.snackbarService.showMessage('success', "Pomyślnie zaktualizowano dane pojazdu");
          this.editForm.reset(this.vehicle);
        },
        error: (error) => {
          this.snackbarService.showMessage('error', error);
        }
    });
  }

  loadVehicle(){

    const vehicleId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.vehiclesService.getVehicle(vehicleId).subscribe(vehicle => {
      // Store client and current owner data
      this.vehicle = vehicle;
      this.currentOwner = vehicle.currentOwner;

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
          firstRegistration: [new Date(vehicle.firstRegistration)],
          description: [vehicle.description],
        }
      );
    });
  }

  getCurrentDate(){
    return new Date();
  }

  onToggleChange(){
    this.displayFinished = !this.displayFinished;
    this.displayFinished 
      ? this.ordersTable.dataSource.setOrders(this.vehicle.orders)
      : this.ordersTable.dataSource.setOrders(this.filterFinshedOrders(this.vehicle.orders));
  }

  filterFinshedOrders(orders: Order[]){
    return orders.filter((order) => order.status.position !== 4);
  }

}
