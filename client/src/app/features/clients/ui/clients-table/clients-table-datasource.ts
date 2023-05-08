import { ClientsService } from '../../data-access/clients.service';
import { Client } from '../../../../core/models/Client';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, map, merge, Observable } from 'rxjs';

/**
 * Data source for the TableExample view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ClientsTableDataSource extends DataSource<Client> {
  data: Client[]; // current data of table
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  private clientsSubject = new BehaviorSubject<Client[]>([]);

  constructor(private clientsService: ClientsService, initialData?: Client[]) {
    super();
    // Fill using initial data if needed
    this.data = initialData ?? [];
    this.clientsSubject.next(initialData); // Maybe not needed
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns ---------------------------------> A stream of the items to be rendered.
   */
  connect(): Observable<Client[]> {
    if (!this.paginator || !this.sort)
      throw Error('Please set the paginator and sort on the data source before connecting.');

    // Combine everything that affects the rendered data into one update stream for the data-table to consume.
    // In the nutshell update displaying data when one of the events (pageEvent, sort, ordersSubject.next) has occured
    return merge(
      this.clientsSubject.asObservable(),
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
    this.clientsSubject.complete();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Client[]): Client[] {
    if (!this.paginator) return data;
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Client[]): Client[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') return data;

    // Defining sorting strategy for every column
    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'email':
          return this.defaultCompare(a.email, b.email, isAsc);
        case 'phone':
          return this.defaultCompare(a.phone, b.phone, isAsc);
        case 'address':
          return this.defaultCompare(a.street, b.street, isAsc);
        case 'client':
          return this.compareClients(a, b, isAsc);
        default:
          return 0;
      }
    });
  }

  loadClients() {
    this.clientsService.getClients().subscribe({
      next: (clients) => {
        this.clientsSubject.next(clients);
      }
    });
  }

  setClients(clients: Client[]) {
    // this.data = vehicles;
    this.clientsSubject.next(clients);
  }

  // CRUD
  getClients(): Client[] {
    return this.data;
  }

  getClient(id: number): Client {
    return this.data.find((client) => client.id === id);
  }

  addClient(client: Client): void {
    this.clientsSubject.next([client, ...this.data]);
  }

  deleteClient(id: number): void {
    this.clientsSubject.next(this.data.filter((client) => client.id !== id));
  }

  // Compare methods
  private compareDates(fstDate: Date, sndDate: Date, isAsc: boolean) {
    return (fstDate.getTime() - sndDate.getTime()) * (isAsc ? 1 : -1);
  }

  private compareClients(fstClient: Client, sndClient: Client, isAsc: boolean) {
    const fstClientString =
      fstClient.type === 'company'
        ? fstClient.companyName
        : fstClient.firstname + ' ' + fstClient.lastname;
    const sndClientString =
      sndClient.type === 'company'
        ? sndClient.companyName
        : sndClient.firstname + ' ' + sndClient.lastname;

    return this.defaultCompare(fstClientString, sndClientString, isAsc);
  }

  /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
  private defaultCompare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
