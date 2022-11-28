import { VehiclesTableComponent } from './../../_shared/_tables/vehicles-table/vehicles-table.component';
import { OrdersTableComponent } from '../../_shared/_tables/orders-table/orders-table.component';
import { SnackbarService } from './../../_services/snackbar.service';
import { ClientsService } from '../../_services/clients.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../_models/Client';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Order } from 'src/app/_models/Order';
import { MatDialog } from '@angular/material/dialog';
import { CreateVehicleDialogComponent } from 'src/app/_shared/_dialogs/create-vehicle-dialog/create-vehicle-dialog.component';
import { Vehicle } from 'src/app/_models/Vehicle';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {
  @ViewChild(OrdersTableComponent) ordersTable!: OrdersTableComponent;
  @ViewChild(VehiclesTableComponent) vehiclesTable: VehiclesTableComponent;
  client: Client;
  isCompany: boolean;
  isSaving: boolean = false;
  displayFinished: boolean = false;
  editForm: FormGroup;

  constructor(
    private clientsService: ClientsService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackbarService: SnackbarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadClient();
  }

  onSaveChanges() {
    this.isSaving = true;
    this.clientsService
      .updateClient(this.client.id, this.editForm.value)
      .pipe(
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: () => {
          this.client = { ...this.client, ...this.editForm.value }; // Update specific props -> really handy
          this.snackbarService.showMessage('success', 'Pomyślnie zaktualizowano dane klienta');
          this.editForm.reset(this.client);
        },
        error: (error) => {
          this.snackbarService.showMessage('error', error);
        }
      });
  }

  onToggleChange() {
    this.displayFinished = !this.displayFinished;
    this.displayFinished
      ? this.ordersTable.dataSource.setOrders(this.client.orders)
      : this.ordersTable.dataSource.setOrders(this.filterFinshedOrders(this.client.orders));
  }

  filterFinshedOrders(orders: Order[]) {
    return orders.filter((order) => order.status.position !== 4);
  }

  loadClient() {
    const clientId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.clientsService.getClient(clientId).subscribe((client) => {
      // Store client data
      this.client = client;
      this.isCompany = client.type === 'company';

      // Build form
      this.editForm = this.formBuilder.group({
        companyName: [client.companyName, this.isCompany && [Validators.required]],
        nip: [client.nip, this.isCompany && [Validators.required]],
        firstname: [client.firstname, [Validators.required]],
        lastname: [client.lastname, [Validators.required]],
        street: [client.street],
        city: [client.city],
        postalCode: [client.postalCode],
        countryCode: [client.postalCode],
        phone: [client.phone],
        email: [client.email]
      });
    });
  }

  onAddVehicle() {
    const dialogRef = this.dialog.open(CreateVehicleDialogComponent, {
      width: '900px',
      data: { client: this.client }
    });

    dialogRef.afterClosed().subscribe((vehicle: Vehicle) => {
      if (vehicle) this.vehiclesTable.dataSource.addVehicle(vehicle);
    });
  }
}
