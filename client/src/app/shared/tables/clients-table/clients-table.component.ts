import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Client } from 'src/app/core/models/Client';
import { ClientsService } from 'src/app/core/services/http/clients.service';
import { SnackbarService } from 'src/app/core/services/ui/snackbar.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { ClientsTableDataSource } from './clients-table-datasource';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css']
})
export class ClientsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator; // ! - assured that paginator exists
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Client>;
  @Input() initialData?: Client[];
  @Input() matElevationValue?: number = 8;
  @Input() fixedSize?: boolean = true;

  dataSource: ClientsTableDataSource;
  displayedColumns = ['client', 'address', 'phone', 'email', 'actions'];

  constructor(
    public clientsService: ClientsService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    // Create DataSource (with initialData if needed)
    this.dataSource = new ClientsTableDataSource(this.clientsService, this.initialData);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onDeleteClick(client: Client) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        headerText: 'Usuwanie klienta',
        bodyText: `<h3>Czy na pewno chcesz usunąć klienta <strong>${this.clientToString(
          client
        )}</strong> ?<h3>`
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.clientsService.deleteClient(client.id).subscribe({
        next: () => {
          this.snackbarService.showMessage('success', 'Pomyślnie usunięto klienta');
          this.dataSource.deleteClient(client.id);
        },
        error: ({ error }) => {
          this.snackbarService.showMessage('error', error);
        }
      });
    });
  }

  clientToString(client: Client): string {
    return client.type === 'company'
      ? client.companyName
      : client.firstname + ' ' + client.lastname;
  }
}
