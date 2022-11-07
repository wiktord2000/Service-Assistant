import { VehiclesService } from '../../../../_services/vehicles.service';
import { Client } from '../../../../_models/Client';
import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { BehaviorSubject, map, merge, Observable } from "rxjs";
import { Vehicle } from '../../../../_models/Vehicle';

/**
 * Data source for the TableExample view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
 export class VehiclesTableDataSource extends DataSource<Vehicle> {
    data: Vehicle[];   // current data of table
    paginator: MatPaginator | undefined;
    sort: MatSort | undefined;
      
    private vehiclesSubject = new BehaviorSubject<Vehicle[]>([]);
  
    constructor(private vehiclesService: VehiclesService, initialData?: Vehicle[]) {
      super();
      // Fill using initial data if needed
      this.data = initialData ?? [];
      this.vehiclesSubject.next(initialData); // Maybe not needed
    }
  
    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns ---------------------------------> A stream of the items to be rendered.
     */
    connect(): Observable<Vehicle[]> {
      if (!this.paginator || !this.sort) throw Error('Please set the paginator and sort on the data source before connecting.');
        
      // Combine everything that affects the rendered data into one update stream for the data-table to consume. 
      // In the nutshell update displaying data when one of the events (pageEvent, sort, ordersSubject.next) has occured
        return merge(this.vehiclesSubject.asObservable(), this.paginator.page, this.sort.sortChange)
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
      this.vehiclesSubject.complete();
    }
  
    /**
     * Paginate the data (client-side). If you're using server-side pagination,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getPagedData(data: Vehicle[]): Vehicle[] {
      if (!this.paginator) return data;
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    }
  
    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getSortedData(data: Vehicle[]): Vehicle[] {
      if (!this.sort || !this.sort.active || this.sort.direction === '') return data;
  
      // Defining sorting strategy for every column
      return data.sort((a, b) => {
        const isAsc = this.sort?.direction === 'asc';
        switch (this.sort?.active) {
          // case 'id': return compare(+a.id, +b.id, isAsc);
          // case 'orderNumber': return this.defaultCompare(a.orderNumber, b.orderNumber, isAsc);
          // case 'client': return this.compareClients(a.client, b.client, isAsc);
          // case 'vehicle': return  this.defaultCompare(`${a.vehicle.brand} ${a.vehicle.model}`, `${b.vehicle.brand} ${b.vehicle.model}`, isAsc);
          // case 'createDate': return this.compareDates(new Date(a.createdAt), new Date(b.createdAt), isAsc);
          // case 'finishDate': return this.compareDates(new Date(a.finishDate!), new Date(b.finishDate!), isAsc);
          // case 'status': return this.defaultCompare(a.status.position, b.status.position, !isAsc);
          // case 'totalGross': return this.defaultCompare(+a.totalGross.toFixed(2), +b.totalGross.toFixed(2), !isAsc)
          // case 'admissionDate': return this.compareDates(new Date(a.admissionDate!), new Date(b.admissionDate!), isAsc);
          // case 'deadlineDate': return this.compareDates(new Date(a.deadlineDate!), new Date(b.deadlineDate!), isAsc);
          default: return 0;
        }
      });
    }
  
    loadVehicles(){

      this.vehiclesService.getVehicles().subscribe({
        next: (vehicles) => {
          this.vehiclesSubject.next(vehicles);
        }
      })
    }

    setVehicles(vehicles: Vehicle[]){
      // this.data = vehicles;
      this.vehiclesSubject.next(vehicles);
    }

    getVehicles(){
      return this.data;
    }

    private compareDates(fstDate: Date, sndDate: Date, isAsc: boolean){
      return (fstDate.getTime() - sndDate.getTime()) * (isAsc ? 1 : -1);
    }

    private compareClients(fstClient: Client, sndClient: Client, isAsc: boolean){

      const fstClientString = fstClient.type === 'company' ? fstClient.companyName : fstClient.firstname + " " + fstClient.lastname;
      const sndClientString = sndClient.type === 'company' ? sndClient.companyName : sndClient.firstname + " " + sndClient.lastname;

      return this.defaultCompare(fstClientString, sndClientString, isAsc);
    }

    /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
    private defaultCompare(a: string | number, b: string | number, isAsc: boolean): number {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }