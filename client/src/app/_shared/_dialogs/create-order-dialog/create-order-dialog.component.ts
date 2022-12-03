import { OrderServicesService } from './../../../_services/order-services.service';
import { OrderService } from './../../../_models/OrderService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize, forkJoin, of } from 'rxjs';
import { ClientSelectInputComponent } from 'src/app/_forms/_complex-selectors/client-select-input/client-select-input.component';
import { VehicleSelectInputComponent } from 'src/app/_forms/_complex-selectors/vehicle-select-input/vehicle-select-input.component';
import { Client } from 'src/app/_models/Client';
import { Order } from 'src/app/_models/Order';
import { Service } from 'src/app/_models/Service';
import { Vehicle } from 'src/app/_models/Vehicle';
import { ClientsService } from 'src/app/_services/clients.service';
import { OrdersService } from 'src/app/_services/orders.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { VehiclesService } from 'src/app/_services/vehicles.service';
import { OrderServicesTableComponent } from '../../_tables/order-services-table/order-services-table.component';
import { Product } from 'src/app/_models/product';
import { OrderProductsTableComponent } from '../../_tables/order-products-table/order-products-table.component';
import { OrderProduct } from 'src/app/_models/OrderProduct';
import { OrderProductsService } from 'src/app/_services/order-products.service';

const INTEGER_REGEX = /^\+?(0|[1-9]\d*)$/;

@Component({
  selector: 'app-create-order-dialog',
  templateUrl: './create-order-dialog.component.html',
  styleUrls: ['./create-order-dialog.component.css']
})
export class CreateOrderDialogComponent implements OnInit {
  @ViewChild(ClientSelectInputComponent) clientSelectInput!: ClientSelectInputComponent;
  @ViewChild(VehicleSelectInputComponent) vehicleSelectInput!: VehicleSelectInputComponent;
  @ViewChild(OrderServicesTableComponent) servicesTable!: OrderServicesTableComponent;
  @ViewChild(OrderProductsTableComponent) productsTable!: OrderProductsTableComponent;
  isPricing: boolean = false;
  isSaving: boolean = false;
  selectedClient: Client = null;
  selectedVehicle: Vehicle = null;
  selectedService: Service = null;
  selectedProduct: Product = null;
  servicesArray: OrderService[] = [];

  serviceForm: FormGroup = this.formBuilder.group({
    service: ['']
  });

  productForm: FormGroup = this.formBuilder.group({
    product: [''],
    count: ['1', [Validators.pattern(INTEGER_REGEX)]]
  });

  orderForm: FormGroup = this.formBuilder.group({
    client: ['', [Validators.required]],
    vehicle: ['', [Validators.required]],
    clientDescription: [''],
    mileage: ['', [Validators.pattern(INTEGER_REGEX)]],
    fuelLevel: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private ordersService: OrdersService,
    private vehiclesService: VehiclesService,
    private clientsService: ClientsService,
    private orderServicesService: OrderServicesService,
    private orderProductsService: OrderProductsService,
    public dialogRef: MatDialogRef<CreateOrderDialogComponent>
  ) {}

  ngOnInit(): void {}

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

  onServiceChange(service: Service) {
    this.selectedService = service;
  }

  onProductChange(product: Product) {
    this.selectedProduct = product;
  }

  onAddService() {
    const { id, costGross, estimatedTime, name } = this.selectedService;
    this.serviceForm.controls['service'].setValue('');

    // Calculate new index
    let maxId = this.servicesTable.dataSource.getOrderServices().reduce((maxId, service) => {
      return service.id > maxId ? service.id : maxId;
    }, 0);

    this.servicesTable.dataSource.addOrderService({
      id: maxId + 1,
      orderId: 0,
      serviceId: id,
      approvedCostGross: costGross,
      approvedEstimatedTime: estimatedTime,
      approvedServiceName: name,
      isCompleted: false,
      workedTime: 0.0
    });
  }

  onAddProduct() {
    const { id, name, salesPriceGross } = this.selectedProduct;
    this.productForm.controls['product'].setValue('');

    // Calculate new index
    let maxId = this.productsTable.dataSource.getOrderProducts().reduce((maxId, product) => {
      return product.id > maxId ? product.id : maxId;
    }, 0);

    this.productsTable.dataSource.addOrderProduct({
      id: maxId + 1,
      orderId: 0,
      productId: id,
      approvedSalesPriceGross: salesPriceGross,
      approvedProductName: name,
      isProvided: false,
      isReserved: false,
      count: this.productForm.controls['count'].value
    });
  }

  getTotalGross() {
    let totalJobsGross = this?.servicesTable?.dataSource.getTotalCostGross() ?? 0.0;
    let totalPartsGross = this?.productsTable?.dataSource.getTotalSalesPriceGross() ?? 0.0;
    return totalJobsGross + totalPartsGross;
  }

  onSaveChanges() {
    this.isSaving = true;

    let formValue = this.isPricing
      ? {}
      : {
          ...this.orderForm.value,
          clientId: this.selectedClient?.id,
          vehicleId: this.selectedVehicle?.id
        };

    let totalJobsGross = this.servicesTable.dataSource.getTotalCostGross();
    let totalPartsGross = this.productsTable.dataSource.getTotalSalesPriceGross();
    let totalGross = totalJobsGross + totalPartsGross;

    this.ordersService
      .addOrder({
        ...formValue,
        totalJobsNet: totalJobsGross / 1.23,
        totalJobsGross: totalJobsGross,
        totalPartsNet: totalPartsGross / 1.23,
        totalPartsGross: totalPartsGross,
        totalNet: totalGross / 1.23,
        totalGross: totalGross
      })
      .pipe(
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: (order: Order) => {
          this.snackbarService.showMessage('success', 'Pomyślnie dodano nowe zlecenie');
          this.addServicesToOrder(order, this.servicesTable.dataSource.getOrderServices());
          this.addProductsToOrder(order, this.productsTable.dataSource.getOrderProducts());
          this.dialogRef.close({
            ...order,
            client: this.isPricing ? null : this.selectedClient,
            vehicle: this.isPricing ? null : this.selectedVehicle
          });
        },
        error: (error) => {
          this.snackbarService.showMessage('error', error);
        }
      });
  }

  addServicesToOrder(order: Order, orderServices: OrderService[]) {
    // Prepare multiple request to handle
    let observableArray = orderServices.map((service) =>
      this.orderServicesService.addOrderService({ ...service, orderId: order.id })
    );

    forkJoin<OrderService[]>([...observableArray]).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        this.snackbarService.showMessage('error', 'Problem z zapisem usług!');
        console.log(err);
      }
    });
  }

  addProductsToOrder(order: Order, orderProducts: OrderProduct[]) {
    // Prepare multiple request to handle
    let observableArray = orderProducts.map((product) =>
      this.orderProductsService.addOrderProduct({ ...product, orderId: order.id })
    );

    forkJoin<OrderProduct[]>(observableArray).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        this.snackbarService.showMessage('error', 'Problem z zapisem towarów!');
        console.log(err);
      }
    });
  }
}
