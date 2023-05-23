import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Client } from 'src/app/core/models/Client';
import { ClientsService } from 'src/app/features/clients/data-access/clients.service';
import { SnackbarService } from 'src/app/shared/ui/snackbar/snackbar.service';
import { ConfirmDialogComponent } from '../../../../shared/ui/confirm-dialog/confirm-dialog.component';
import { ClientsTableDataSource } from './clients-table-datasource';
import { UtilsService } from 'src/app/shared/utils/utils.service';

const COMPLETE_COLUMN_LIST = ['client', 'address', 'phone', 'email', 'actions'];

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss']
})
export class ClientsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Client>;
  @Input() initialData?: Client[];
  @Input() matElevationValue: number = 8;
  @Input() heightInRows: number = 8;
  tableHeight!: number;
  dataSource: ClientsTableDataSource;
  displayedColumns = COMPLETE_COLUMN_LIST;

  constructor(
    public clientsService: ClientsService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.dataSource = new ClientsTableDataSource(this.clientsService, this.initialData);
    this.tableHeight = this.utils.calculateTableHeight(this.heightInRows);
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
        bodyText: `<h3>Czy na pewno chcesz usunąć klienta <strong>${this.utils.clientToString(
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
}
