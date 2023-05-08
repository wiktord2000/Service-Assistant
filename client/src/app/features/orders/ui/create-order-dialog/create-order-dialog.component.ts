import { OrderServicesService } from '../../data-access/order-services.service';
import { OrderService } from '../../../../core/models/OrderService';
import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize, forkJoin, of, take } from 'rxjs';
import { ClientSelectInputComponent } from 'src/app/shared/ui/selectors/client-select-input/client-select-input.component';
import { VehicleSelectInputComponent } from 'src/app/shared/ui/selectors/vehicle-select-input/vehicle-select-input.component';
import { Client } from 'src/app/core/models/Client';
import { Order } from 'src/app/core/models/Order';
import { Service } from 'src/app/core/models/Service';
import { Vehicle } from 'src/app/core/models/Vehicle';
import { ClientsService } from 'src/app/features/clients/data-access/clients.service';
import { OrdersService } from 'src/app/features/orders/data-access/orders.service';
import { SnackbarService } from 'src/app/shared/ui/snackbar/snackbar.service';
import { VehiclesService } from 'src/app/features/vehicles/data-access/vehicles.service';
import { OrderServicesTableComponent } from '../order-services-table/order-services-table.component';
import { Product } from 'src/app/core/models/product';
import { OrderProductsTableComponent } from '../order-products-table/order-products-table.component';
import { OrderProduct } from 'src/app/core/models/OrderProduct';
import { OrderProductsService } from 'src/app/features/orders/data-access/order-products.service';

const INTEGER_REGEX = /^\+?(0|[1-9]\d*)$/;
const UNASSIGNED_ID = -1;

@Component({
  selector: 'app-create-order-dialog',
  templateUrl: './create-order-dialog.component.html',
  styleUrls: ['./create-order-dialog.component.scss']
})
export class CreateOrderDialogComponent implements OnInit, AfterViewInit {
  @ViewChild(ClientSelectInputComponent) clientSelectInput!: ClientSelectInputComponent;
  @ViewChild(VehicleSelectInputComponent) vehicleSelectInput!: VehicleSelectInputComponent;
  @ViewChild(OrderServicesTableComponent) servicesTable!: OrderServicesTableComponent;
  @ViewChild(OrderProductsTableComponent) productsTable!: OrderProductsTableComponent;
  isPricing: boolean = false;
  isSaving: boolean = false;
  selectedClient: Client = this?.data?.client ?? null;
  selectedVehicle: Vehicle = this?.data?.vehicle ?? null;
  selectedService: Service = null;
  selectedProduct: Product = null;
  initialServices: OrderService[] = [];
  initialProducts: OrderProduct[] = [];

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
    public dialogRef: MatDialogRef<CreateOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { order?: Order; client?: Client; vehicle?: Vehicle }
  ) {
    // Set pricing mode if gets orderId (it means it wll be update dialog)
    if (this?.data?.order?.id) this.isPricing = true;
  }
  ngAfterViewInit(): void {
    if (this?.data?.order?.id) {
      // Load data to tables
      this.orderServicesService.getOrderServices(this.data.order.id).subscribe((services) => {
        this.initialServices = services;
        this.servicesTable.dataSource.setOrderServices(services);
      });
      this.orderProductsService.getOrderProducts(this.data.order.id).subscribe((products) => {
        this.initialProducts = products;
        this.productsTable.dataSource.setOrderProducts(products);
      });
    }
  }

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
      orderId: UNASSIGNED_ID,
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
      orderId: UNASSIGNED_ID,
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

    // Calculate new prices
    let totalJobsGross = this.servicesTable.dataSource.getTotalCostGross();
    let totalPartsGross = this.productsTable.dataSource.getTotalSalesPriceGross();
    let totalGross = totalJobsGross + totalPartsGross;

    let updatedPrices = {
      totalJobsNet: totalJobsGross / 1.23,
      totalJobsGross: totalJobsGross,
      totalPartsNet: totalPartsGross / 1.23,
      totalPartsGross: totalPartsGross,
      totalNet: totalGross / 1.23,
      totalGross: totalGross
    };

    // When only update services and products (have got order)
    if (this?.data?.order) {
      this.addServicesToOrder(this.data.order.id);
      this.addProductsToOrder(this.data.order.id);
      let updatedOrder = {
        ...this.data.order,
        ...updatedPrices,
        orderServices: this.servicesTable.dataSource.data,
        orderProducts: this.productsTable.dataSource.data
      };
      this.ordersService.updateOrder(updatedOrder).subscribe({
        next: () => {
          this.dialogRef.close(updatedOrder);
          this.snackbarService.showMessage('success', 'Pomyślnie zaktualizowano zlecenie');
        },
        error: (err) => {
          console.log(err);
          this.snackbarService.showMessage('error', 'Problem z aktualizacją zlecenia!');
        }
      });
      return;
    }

    let formValue = this.isPricing
      ? {}
      : {
          ...this.orderForm.value,
          clientId: this.selectedClient?.id,
          vehicleId: this.selectedVehicle?.id
        };

    this.ordersService
      .addOrder({
        ...formValue,
        ...updatedPrices
      })
      .pipe(
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: (order: Order) => {
          this.snackbarService.showMessage('success', 'Pomyślnie dodano nowe zlecenie');
          this.addServicesToOrder(order.id);
          this.addProductsToOrder(order.id);
          this.dialogRef.close({
            ...order,
            client: this.isPricing ? null : this.selectedClient,
            vehicle: this.isPricing ? null : this.selectedVehicle,
            services: this.servicesTable.dataSource.data,
            products: this.productsTable.dataSource.data
          });
        },
        error: (error) => {
          this.snackbarService.showMessage('error', error);
        }
      });
  }

  addServicesToOrder(orderId: number) {
    // Pick current table state
    let currentServices = this.servicesTable.dataSource.data;
    // Check what we actually have to add (items with orderId === UNASSIGNED_ID)
    let toAddServices = currentServices.filter((service) => service.orderId === UNASSIGNED_ID);
    let remainingServices = currentServices.filter((service) => service.orderId !== UNASSIGNED_ID);
    let toDeleteServices = this.initialServices.filter(
      (service) => !remainingServices.some((remainingService) => remainingService.id === service.id)
    );

    let observableAddArray = toAddServices.map((service) =>
      this.orderServicesService.addOrderService({ ...service, orderId: orderId })
    );
    let observableDeleteArray = toDeleteServices.map((service) =>
      this.orderServicesService.deleteOrderService(service.id)
    );

    forkJoin<Object[]>([...observableAddArray, ...observableDeleteArray]).subscribe({
      next: (data) => {
        console.log('Add services result', data);
      },
      error: (err) => {
        this.snackbarService.showMessage('error', 'Problem z zapisem usług!');
        console.log(err);
      }
    });
  }

  addProductsToOrder(orderId: number) {
    // Pick current table state
    let currentProducts = this.productsTable.dataSource.data;
    // Check what we actually have to add (items with orderId === UNASSIGNED_ID)
    let toAddProducts = currentProducts.filter((product) => product.orderId === UNASSIGNED_ID);
    let remainingProducts = currentProducts.filter((product) => product.orderId !== UNASSIGNED_ID);
    let toDeleteProducts = this.initialProducts.filter(
      (product) => !remainingProducts.some((remainingProduct) => remainingProduct.id === product.id)
    );

    let observableAddArray = toAddProducts.map((product) =>
      this.orderProductsService.addOrderProduct({ ...product, orderId: orderId })
    );
    let observableDeleteArray = toDeleteProducts.map((product) =>
      this.orderProductsService.deleteOrderProduct(product.id)
    );

    forkJoin<Object[]>([...observableAddArray, ...observableDeleteArray]).subscribe({
      next: (data) => {
        console.log('Add products result', data);
      },
      error: (err) => {
        this.snackbarService.showMessage('error', 'Problem z zapisem towarów!');
        console.log(err);
      }
    });
  }
}
