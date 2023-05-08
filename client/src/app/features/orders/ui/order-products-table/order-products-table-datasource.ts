import { OrderProductsService } from '../../data-access/order-products.service';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { OrderProduct } from 'src/app/core/models/OrderProduct';

/**
 * Data source for the TableExample view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class OrderProductsTableDataSource extends DataSource<OrderProduct> {
  data: OrderProduct[] = []; // current data of table

  private orderProductsSubject = new BehaviorSubject<OrderProduct[]>([]);

  constructor(private orderProductsService: OrderProductsService, initialData?: OrderProduct[]) {
    super();

    // Fill using initial data if needed
    this.data = initialData ?? [];
    this.orderProductsSubject.next(this.data); // Maybe not needed
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns ---------------------------------> A stream of the items to be rendered !!!!.
   */
  connect(): Observable<OrderProduct[]> {
    return this.orderProductsSubject.asObservable().pipe(
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
    this.orderProductsSubject.complete();
  }

  loadOrderProducts(orderId: number) {
    this.orderProductsService.getOrderProducts(orderId).subscribe({
      next: (orderProducts) => {
        this.orderProductsSubject.next(orderProducts);
      }
    });
  }

  // CRUD
  getOrderProducts(): OrderProduct[] {
    return this.data;
  }

  setOrderProducts(orderProducts: OrderProduct[]) {
    this.orderProductsSubject.next(orderProducts);
  }

  getOrderProduct(id: number): OrderProduct {
    return this.data.find((orderProducts) => orderProducts.id === id);
  }

  addOrderProduct(orderProduct: OrderProduct): void {
    this.orderProductsSubject.next([orderProduct, ...this.data]);
  }

  updateOrderProduct(updatedOrderProduct: OrderProduct) {
    const updatedData = this.data.map((product) =>
      product.id == updatedOrderProduct.id ? updatedOrderProduct : product
    );
    this.orderProductsSubject.next(updatedData);
  }

  deleteOrderProduct(id: number): void {
    this.orderProductsSubject.next(this.data.filter((orderProduct) => orderProduct.id !== id));
  }

  getTotalSalesPriceGross() {
    return this.data.reduce((total, product) => {
      return total + product.count * product.approvedSalesPriceGross;
    }, 0.0);
  }
}
