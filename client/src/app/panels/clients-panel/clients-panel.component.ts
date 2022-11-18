import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/_models/Client';
import { ClientsService } from 'src/app/_services/clients.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { CreateClientDialogComponent } from 'src/app/_shared/_dialogs/create-client-dialog/create-client-dialog.component';
import { ClientsTableComponent } from 'src/app/_shared/_tables/clients-table/clients-table.component';

@Component({
  selector: 'app-clients-panel',
  templateUrl: './clients-panel.component.html',
  styleUrls: ['./clients-panel.component.css']
})
export class ClientsPanelComponent implements OnInit {

  @ViewChild(ClientsTableComponent) clientsTable!: ClientsTableComponent;
  
  constructor(public snackbarService : SnackbarService, 
              public dialog: MatDialog,
              public clientsService: ClientsService) {
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.clientsTable.dataSource.loadClients();
  }

  onAddClient(){
    const dialogRef = this.dialog.open(CreateClientDialogComponent, {
      width: "900px"
    });

    dialogRef.afterClosed().subscribe((client: Client) => {
      if(client !== undefined) this.clientsTable.dataSource.addClient(client);
    });
  }

}
