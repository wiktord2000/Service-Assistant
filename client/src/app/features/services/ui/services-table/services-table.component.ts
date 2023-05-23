import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Service } from 'src/app/core/models/Service';
import { ServicesService } from 'src/app/features/services/data-access/services.service';
import { SnackbarService } from 'src/app/shared/ui/snackbar/snackbar.service';
import { ConfirmDialogComponent } from '../../../../shared/ui/confirm-dialog/confirm-dialog.component';
import { ServicesTableDataSource } from './services-table-datasource';
import { CreateServiceDialogComponent } from '../create-service-dialog/create-service-dialog.component';

const COMPLETE_COLUMN_LIST = ['name', 'cost', 'estimatedTime', 'total', 'actions'];

@Component({
  selector: 'app-services-table',
  templateUrl: './services-table.component.html',
  styleUrls: ['./services-table.component.scss']
})
export class ServicesTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Service>;
  @Input() initialData?: Service[];
  @Input() isGross: boolean;
  dataSource: ServicesTableDataSource;
  displayedColumns = COMPLETE_COLUMN_LIST;

  constructor(
    public servicesService: ServicesService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.dataSource = new ServicesTableDataSource(this.servicesService, this.initialData);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onEditClick(service: Service) {
    const dialogRef = this.dialog.open(CreateServiceDialogComponent, {
      data: {
        service: service
      }
    });

    dialogRef.afterClosed().subscribe((service: Service) => {
      if (!service) return;
      console.log(service);

      this.dataSource.updateService(service);
    });
  }

  onDeleteClick(service: Service) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        headerText: 'Usuwanie usługi',
        bodyText: `<h3>Czy na pewno chcesz usunąć usługę <strong>${service.name}</strong> ?<h3>`
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.servicesService.deleteService(service.id).subscribe({
        next: () => {
          this.snackbarService.showMessage('success', 'Pomyślnie usunięto usługę');
          this.dataSource.deleteService(service.id);
        },
        error: ({ error }) => {
          this.snackbarService.showMessage('error', error);
        }
      });
    });
  }
}
