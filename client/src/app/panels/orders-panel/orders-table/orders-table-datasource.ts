import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { BehaviorSubject, map, merge, Observable } from "rxjs";
import { Order } from "src/app/_models/Order";
import { OrdersService } from "src/app/_services/orders.service";



/**
 * Data source for the TableExample view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
 export class OrdersTableDataSource extends DataSource<Order> {
    data: Order[] = [];   // current data of table
    statusPositions: number[] = [];
    paginator: MatPaginator | undefined;
    sort: MatSort | undefined;
  
    private ordersSubject = new BehaviorSubject<Order[]>([]);
  
    constructor(private ordersService: OrdersService) {
      super();
    }
  
    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns ---------------------------------> A stream of the items to be rendered.
     */
    connect(): Observable<Order[]> {
      if (!this.paginator || !this.sort) throw Error('Please set the paginator and sort on the data source before connecting.');
        
      // Combine everything that affects the rendered data into one update stream for the data-table to consume. 
      // In the nutshell update displaying data when one of the events (pageEvent, sort, ordersSubject.next) has occured
        return merge(this.ordersSubject.asObservable(), this.paginator.page, this.sort.sortChange)
          .pipe(map((value) => {
            if(Array.isArray(value)) this.data = value;
            // console.log(value);   <- nice to track events behavior
            return this.getPagedData(this.getSortedData([...this.data ]));
          }));
      
    }
  
    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect(): void {
      this.ordersSubject.complete();
    }
  
    /**
     * Paginate the data (client-side). If you're using server-side pagination,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getPagedData(data: Order[]): Order[] {
      if (!this.paginator) return data;
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    }
  
    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getSortedData(data: Order[]): Order[] {
      if (!this.sort || !this.sort.active || this.sort.direction === '') return data;
  
      // Defining sorting strategy for every column
      return data.sort((a, b) => {
        const isAsc = this.sort?.direction === 'asc';
        switch (this.sort?.active) {

          case 'orderNumber': return defaultCompare(a.orderNumber, b.orderNumber, isAsc);
          // case 'id': return compare(+a.id, +b.id, isAsc);
          case 'createDate': return this.compareDates(new Date(a.createdAt), new Date(b.createdAt), isAsc);
          case 'status': return defaultCompare(a.status.position, b.status.position, isAsc);
          case 'totalGross': return defaultCompare(a.totalGross.toFixed(2), b.totalGross.toFixed(2), isAsc)
          case 'admissionDate': return this.compareDates(new Date(a.admissionDate), new Date(b.admissionDate), isAsc);
          default: return 0;
        }
      });
    }
  
    loadOrders(statusPositions?: number[]){

      this.ordersService.getOrders(statusPositions).subscribe({
        next: (orders) => {
          this.ordersSubject.next(orders);
        }
      })
    }

    setOrders(orders: Order[]){
      this.data = orders;
      this.ordersSubject.next(orders);
    }

    getOrders(){
      return this.data;
    }

    compareDates(fstDate: Date, sndDate: Date, isAsc: boolean){
      return (fstDate.getTime() - sndDate.getTime()) * (isAsc ? -1 : 1);
    }
  }
  
  /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
  function defaultCompare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }