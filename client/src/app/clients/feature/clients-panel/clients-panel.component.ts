import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/core/models/Client';
import { ClientsService } from 'src/app/clients/data-access/clients.service';
import { SnackbarService } from 'src/app/shared/ui/snackbar/snackbar.service';
import { CreateClientDialogComponent } from 'src/app/clients/ui/create-client-dialog/create-client-dialog.component';
import { ClientsTableComponent } from 'src/app/clients/ui/clients-table/clients-table.component';

@Component({
  selector: 'app-clients-panel',
  templateUrl: './clients-panel.component.html',
  styleUrls: ['./clients-panel.component.scss']
})
export class ClientsPanelComponent implements OnInit {
  @ViewChild(ClientsTableComponent) clientsTable!: ClientsTableComponent;

  constructor(
    public snackbarService: SnackbarService,
    public dialog: MatDialog,
    public clientsService: ClientsService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.clientsTable.dataSource.loadClients();
  }

  onAddClient() {
    const dialogRef = this.dialog.open(CreateClientDialogComponent, {
      width: '900px'
    });

    dialogRef.afterClosed().subscribe((client: Client) => {
      if (client !== undefined) this.clientsTable.dataSource.addClient(client);
    });
  }
}
