import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, map, merge, Observable } from 'rxjs';
import { Service } from 'src/app/core/models/Service';
import { ServicesService } from 'src/app/services/data-access/services.service';

/**
 * Data source for the TableExample view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ServicesTableDataSource extends DataSource<Service> {
  data: Service[] = []; // current data of table
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  private servicesSubject = new BehaviorSubject<Service[]>([]);

  constructor(private servicesService: ServicesService, initialData?: Service[]) {
    super();

    // Fill using initial data if needed
    this.data = initialData ?? [];
    this.servicesSubject.next(this.data); // Maybe not needed
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns ---------------------------------> A stream of the items to be rendered.
   */
  connect(): Observable<Service[]> {
    if (!this.paginator || !this.sort)
      throw Error('Please set the paginator and sort on the data source before connecting.');

    // Combine everything that affects the rendered data into one update stream for the data-table to consume.
    // In the nutshell update displaying data when one of the events (pageEvent, sort, servicesSubject.next) has occured
    return merge(
      this.servicesSubject.asObservable(),
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
    this.servicesSubject.complete();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Service[]): Service[] {
    if (!this.paginator) return data;
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Service[]): Service[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') return data;

    // Defining sorting strategy for every column
    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name':
          return this.defaultCompare(a.name, b.name, isAsc);
        case 'cost':
          return this.defaultCompare(a.costGross, b.costGross, !isAsc);
        case 'estimatedTime':
          return this.defaultCompare(a.estimatedTime, b.estimatedTime, !isAsc);
        case 'total':
          return this.defaultCompare(a.totalGross, b.totalGross, !isAsc);
        default:
          return 0;
      }
    });
  }

  loadServices() {
    this.servicesService.getServices().subscribe({
      next: (services) => {
        this.servicesSubject.next(services);
      }
    });
  }

  // CRUD
  getServices(): Service[] {
    return this.data;
  }

  setServices(services: Service[]) {
    this.servicesSubject.next(services);
  }

  getService(id: number): Service {
    return this.data.find((service) => service.id === id);
  }

  addService(service: Service): void {
    this.servicesSubject.next([service, ...this.data]);
  }

  updateService(updatedService: Service) {
    const updatedData = this.data.map((service) =>
      service.id == updatedService.id ? updatedService : service
    );
    this.servicesSubject.next(updatedData);
  }

  deleteService(id: number): void {
    this.servicesSubject.next(this.data.filter((service) => service.id !== id));
  }

  private compareDates(fstDate: Date, sndDate: Date, isAsc: boolean) {
    return (fstDate.getTime() - sndDate.getTime()) * (isAsc ? 1 : -1);
  }

  /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
  private defaultCompare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
