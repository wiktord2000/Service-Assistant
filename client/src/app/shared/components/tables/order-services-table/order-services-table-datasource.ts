import { OrderServicesService } from '../../../services/order-services.service';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { OrderService } from 'src/app/core/models/OrderService';

/**
 * Data source for the TableExample view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class OrderServicesTableDataSource extends DataSource<OrderService> {
  data: OrderService[] = []; // current data of table

  private orderServicesSubject = new BehaviorSubject<OrderService[]>([]);

  constructor(private orderServicesService: OrderServicesService, initialData?: OrderService[]) {
    super();

    // Fill using initial data if needed
    this.data = initialData ?? [];
    this.orderServicesSubject.next(this.data); // Maybe not needed
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns ---------------------------------> A stream of the items to be rendered !!!!.
   */
  connect(): Observable<OrderService[]> {
    return this.orderServicesSubject.asObservable().pipe(
      map((data) => {
        this.data = data;
        return data;
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    this.orderServicesSubject.complete();
  }

  loadOrderServices(orderId: number) {
    this.orderServicesService.getOrderServices(orderId).subscribe({
      next: (orderServices) => {
        this.orderServicesSubject.next(orderServices);
      }
    });
  }

  // CRUD
  getOrderServices(): OrderService[] {
    return this.data;
  }

  setOrderServices(orderServices: OrderService[]) {
    this.orderServicesSubject.next(orderServices);
  }

  getOrderService(id: number): OrderService {
    return this.data.find((orderService) => orderService.id === id);
  }

  addOrderService(orderService: OrderService): void {
    this.orderServicesSubject.next([orderService, ...this.data]);
  }

  updateOrderService(updatedOrderService: OrderService) {
    const updatedData = this.data.map((service) =>
      service.id == updatedOrderService.id ? updatedOrderService : service
    );
    this.orderServicesSubject.next(updatedData);
  }

  deleteOrderService(id: number): void {
    this.orderServicesSubject.next(this.data.filter((orderService) => orderService.id !== id));
  }

  getTotalTime() {
    return this.data.reduce((total, service) => {
      return total + service.approvedEstimatedTime;
    }, 0.0);
  }

  getTotalCostGross() {
    return this.data.reduce((total, service) => {
      return total + service.approvedCostGross * service.approvedEstimatedTime;
    }, 0.0);
  }
}
