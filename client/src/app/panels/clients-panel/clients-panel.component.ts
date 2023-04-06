import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/core/models/Client';
import { ClientsService } from 'src/app/core/services/http/clients.service';
import { SnackbarService } from 'src/app/core/services/ui/snackbar.service';
import { CreateClientDialogComponent } from 'src/app/shared/dialogs/create-client-dialog/create-client-dialog.component';
import { ClientsTableComponent } from 'src/app/shared/tables/clients-table/clients-table.component';

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
