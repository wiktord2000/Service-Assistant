import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Client } from 'src/app/_models/Client';
import { ClientsService } from 'src/app/_services/clients.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { ClientsTableDataSource } from './clients-table-datasource';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css']
})
export class ClientsTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;    // ! - assured that paginator exists
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Client>;
  @Input() initialData?: Client[];
  @Input() matElevationValue?: number = 8;
  @Input() fixedSize?: boolean = true;

  dataSource: ClientsTableDataSource;
  displayedColumns= ["client", "address", "phone", "email", "actions"];
                      

  
  constructor(public clientsService: ClientsService,
              private snackbarService: SnackbarService) {}
  
  ngOnInit(): void {
    // Create DataSource (with initialData if needed)
    this.dataSource = new ClientsTableDataSource(this.clientsService, this.initialData);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}
