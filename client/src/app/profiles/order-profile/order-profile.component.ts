import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ClientSelectInputComponent } from 'src/app/_forms/_complex-selectors/client-select-input/client-select-input.component';
import { VehicleSelectInputComponent } from 'src/app/_forms/_complex-selectors/vehicle-select-input/vehicle-select-input.component';
import { Client } from 'src/app/_models/Client';
import { Order } from 'src/app/_models/Order';
import { Vehicle } from 'src/app/_models/Vehicle';
import { ClientsService } from 'src/app/_services/clients.service';
import { OrdersService } from 'src/app/_services/orders.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { VehiclesService } from 'src/app/_services/vehicles.service';
import { CreateOrderDialogComponent } from 'src/app/_shared/_dialogs/create-order-dialog/create-order-dialog.component';
import { OrderProductsTableComponent } from 'src/app/_shared/_tables/order-products-table/order-products-table.component';
import { OrderServicesTableComponent } from 'src/app/_shared/_tables/order-services-table/order-services-table.component';
const INTEGER_REGEX = /^\+?(0|[1-9]\d*)$/;

@Component({
  selector: 'app-order-profile',
  templateUrl: './order-profile.component.html',
  styleUrls: ['./order-profile.component.css']
})
export class OrderProfileComponent implements OnInit, AfterViewInit {
  @ViewChild(ClientSelectInputComponent) clientSelectInput!: ClientSelectInputComponent;
  @ViewChild(VehicleSelectInputComponent) vehicleSelectInput!: VehicleSelectInputComponent;
  @ViewChild(OrderServicesTableComponent) servicesTable!: OrderServicesTableComponent;
  @ViewChild(OrderProductsTableComponent) productsTable!: OrderProductsTableComponent;
  selectedClient: Client = null;
  selectedVehicle: Vehicle = null;
  isSaving: boolean = false;
  order: Order;
  orderForm: FormGroup = this.formBuilder.group({
    client: ['', [Validators.required]],
    vehicle: ['', [Validators.required]],
    clientDescription: [''],
    mileage: ['', [Validators.pattern(INTEGER_REGEX)]],
    fuelLevel: ['']
  });

  constructor(
    private ordersService: OrdersService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private vehiclesService: VehiclesService,
    private clientsService: ClientsService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.servicesTable?.dataSource.loadOrderServices(this.order.id);
  }

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
    const orderId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.ordersService.getOrder(orderId).subscribe((order) => {
      this.order = order;
    });
  }

  onClientChange(client: Client) {
    this.selectedClient = client;

    this.vehiclesService.getClientVehicles(client?.id).subscribe((vehicles: Vehicle[]) => {
      this.vehicleSelectInput.displayingVehicles = of(vehicles);
    });
  }

  onVehicleChange(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;

    this.clientsService.getVehicleClients(vehicle?.id).subscribe((clients: Client[]) => {
      this.clientSelectInput.displayingClients = of(clients);
    });
  }

  getTotalGross() {
    let totalJobsGross = this?.servicesTable?.dataSource.getTotalCostGross() ?? 0.0;
    let totalPartsGross = this?.productsTable?.dataSource.getTotalSalesPriceGross() ?? 0.0;
    return totalJobsGross + totalPartsGross;
  }

  onEditClick() {
    const dialogRef = this.dialog.open(CreateOrderDialogComponent, {
      width: '800px',
      data: { order: this.order }
    });
    dialogRef.afterClosed().subscribe((order: Order) => {
      if (!order) return;
      this.order = order;
      this.servicesTable.dataSource.setOrderServices(order.orderServices);
      this.productsTable.dataSource.setOrderProducts(order.orderProducts);
    });
  }
}
