import { Component, OnInit, ViewChild } from '@angular/core';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { VehiclesService } from 'src/app/_services/vehicles.service';
import { VehiclesTableComponent } from 'src/app/_shared/tables/vehicles-table/vehicles-table.component';

@Component({
  selector: 'app-vehicles-panel',
  templateUrl: './vehicles-panel.component.html',
  styleUrls: ['./vehicles-panel.component.css']
})
export class VehiclesPanelComponent implements OnInit {

  @ViewChild(VehiclesTableComponent) vehiclesTable!: VehiclesTableComponent;
  
  constructor(public snackbarService : SnackbarService, 
              public vehiclesService: VehiclesService) {
  }
  ngAfterViewInit(): void {
    this.vehiclesTable.dataSource.loadVehicles();
  }

  ngOnInit(): void {}
}
