import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientsService } from 'src/app/_services/clients.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { ClientsTableComponent } from 'src/app/_shared/_tables/clients-table/clients-table.component';

@Component({
  selector: 'app-clients-panel',
  templateUrl: './clients-panel.component.html',
  styleUrls: ['./clients-panel.component.css']
})
export class ClientsPanelComponent implements OnInit {

  @ViewChild(ClientsTableComponent) clientsTable!: ClientsTableComponent;
  
  constructor(public snackbarService : SnackbarService, 
              public clientsService: ClientsService) {
  }
  ngAfterViewInit(): void {
    this.clientsTable.dataSource.loadClients();
  }

  ngOnInit(): void {
  }

}
