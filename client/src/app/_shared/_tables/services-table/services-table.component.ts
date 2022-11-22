import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Service } from 'src/app/_models/Service';
import { ServicesService } from 'src/app/_services/services.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { ConfirmDialogComponent } from '../../_dialogs/confirm-dialog/confirm-dialog.component';
import { ServicesTableDataSource } from './services-table-datasource';
import { CreateServiceDialogComponent } from '../../_dialogs/create-service-dialog/create-service-dialog.component';

@Component({
  selector: 'app-services-table',
  templateUrl: './services-table.component.html',
  styleUrls: ['./services-table.component.css']
})
export class ServicesTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator; // ! - assured that paginator exists
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Service>;
  @Input() initialData?: Service[];
  @Input() matElevationValue?: number = 8;
  @Input() fixedSize?: boolean = true;
  @Input() isGross: boolean;

  dataSource: ServicesTableDataSource;
  displayedColumns = ['name', 'cost', 'estimatedTime', 'total', 'actions'];

  constructor(
    public servicesService: ServicesService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    // Create DataSource (with initialData if needed)
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
        error: () => {
          this.snackbarService.showMessage('error', 'Problem z usunięciem pojazdu');
        }
      });
    });
  }
}
