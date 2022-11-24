import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, map, merge, Observable } from 'rxjs';
import { Product } from 'src/app/_models/Product';
import { ProductsService } from 'src/app/_services/products.service';

/**
 * Data source for the TableExample view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProductsTableDataSource extends DataSource<Product> {
  data: Product[] = []; // current data of table
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  private productsSubject = new BehaviorSubject<Product[]>([]);

  constructor(private productsService: ProductsService, initialData?: Product[]) {
    super();

    // Fill using initial data if needed
    this.data = initialData ?? [];
    this.productsSubject.next(this.data); // Maybe not needed
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns ---------------------------------> A stream of the items to be rendered.
   */
  connect(): Observable<Product[]> {
    if (!this.paginator || !this.sort)
      throw Error('Please set the paginator and sort on the data source before connecting.');

    // Combine everything that affects the rendered data into one update stream for the data-table to consume.
    // In the nutshell update displaying data when one of the events (pageEvent, sort, productsSubject.next) has occured
    return merge(
      this.productsSubject.asObservable(),
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
    this.productsSubject.complete();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Product[]): Product[] {
    if (!this.paginator) return data;
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Product[]): Product[] {
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

  loadProducts() {
    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.productsSubject.next(products);
      }
    });
  }

  // CRUD
  getProducts(): Product[] {
    return this.data;
  }

  setProducts(products: Product[]) {
    this.productsSubject.next(products);
  }

  getProduct(id: number): Product {
    return this.data.find((product) => product.id === id);
  }

  addProduct(service: Product): void {
    this.productsSubject.next([service, ...this.data]);
  }

  updateProduct(updatedProduct: Product) {
    const updatedData = this.data.map((service) =>
      service.id == updatedProduct.id ? updatedProduct : service
    );
    this.productsSubject.next(updatedData);
  }

  deleteProduct(id: number): void {
    this.productsSubject.next(this.data.filter((product) => product.id !== id));
  }

  private compareDates(fstDate: Date, sndDate: Date, isAsc: boolean) {
    return (fstDate.getTime() - sndDate.getTime()) * (isAsc ? 1 : -1);
  }

  /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
  private defaultCompare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
