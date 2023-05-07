import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Service } from 'src/app/core/models/Service';
import { ServicesService } from 'src/app/services/data-access/services.service';
import { SnackbarService } from 'src/app/shared/ui/snackbar/snackbar.service';
import { CreateServiceDialogComponent } from 'src/app/services/ui/create-service-dialog/create-service-dialog.component';
import { ServicesTableComponent } from 'src/app/services/ui/services-table/services-table.component';

@Component({
  selector: 'app-services-panel',
  templateUrl: './services-panel.component.html',
  styleUrls: ['./services-panel.component.scss']
})
export class ServicesPanelComponent implements OnInit, AfterViewInit {
  @ViewChild(ServicesTableComponent) servicesTable!: ServicesTableComponent;
  isGross: boolean = true;

  constructor(
    public snackbarService: SnackbarService,
    public dialog: MatDialog,
    public servicesService: ServicesService
  ) {}
  ngAfterViewInit(): void {
    this.servicesTable.dataSource.loadServices();
  }

  ngOnInit(): void {}

  onAddService() {
    const dialogRef = this.dialog.open(CreateServiceDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((service: Service) => {
      if (service !== undefined) this.servicesTable.dataSource.addService(service);
    });
  }
}
