import { OrderServicesService } from './../../../_services/order-services.service';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, map, merge, Observable } from 'rxjs';
import { OrderService } from 'src/app/_models/OrderService';

/**
 * Data source for the TableExample view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class OrderServicesTableDataSource extends DataSource<OrderService> {
  data: OrderService[] = []; // current data of table
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

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
   * @returns ---------------------------------> A stream of the items to be rendered.
   */
  connect(): Observable<OrderService[]> {
    if (!this.paginator || !this.sort)
      throw Error('Please set the paginator and sort on the data source before connecting.');

    // Combine everything that affects the rendered data into one update stream for the data-table to consume.
    // In the nutshell update displaying data when one of the events (pageEvent, sort, orderServicesSubject.next) has occured
    return merge(
      this.orderServicesSubject.asObservable(),
      this.paginator.page,
      this.sort.sortChange
    ).pipe(
      map((value) => {
        if (Array.isArray(value)) this.data = value;
        // console.log(value);   <- nice to track events behavior
        return this.getPagedData(this.getSortedData([...this.data]));
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

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: OrderService[]): OrderService[] {
    if (!this.paginator) return data;
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: OrderService[]): OrderService[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') return data;

    // Defining sorting strategy for every column
    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        // case 'name':
        //   return this.defaultCompare(a.name, b.name, isAsc);
        // case 'cost':
        //   return this.defaultCompare(a.costGross, b.costGross, !isAsc);
        // case 'estimatedTime':
        //   return this.defaultCompare(a.estimatedTime, b.estimatedTime, !isAsc);
        // case 'total':
        //   return this.defaultCompare(a.totalGross, b.totalGross, !isAsc);
        default:
          return 0;
      }
    });
  }

  loadOrderServices() {
    this.orderServicesService.getOrderServices().subscribe({
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

  addOrderService(orderServices: OrderService): void {
    this.orderServicesSubject.next([orderServices, ...this.data]);
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

  private compareDates(fstDate: Date, sndDate: Date, isAsc: boolean) {
    return (fstDate.getTime() - sndDate.getTime()) * (isAsc ? 1 : -1);
  }

  /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
  private defaultCompare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
