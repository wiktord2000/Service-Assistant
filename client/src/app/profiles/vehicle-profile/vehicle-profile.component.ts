import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from '../../_models/Vehicle';
import { VehiclesService } from '../../_services/vehicles.service';

@Component({
  selector: 'app-vehicle-profile',
  templateUrl: './vehicle-profile.component.html',
  styleUrls: ['./vehicle-profile.component.css']
})
export class VehicleProfileComponent implements OnInit {

  vehicle: Vehicle; 

  constructor(private vehiclesService: VehiclesService,
              private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.loadVehicle();
  }

  loadVehicle(){

    const vehicleId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.vehiclesService.getVehicle(vehicleId).subscribe(vehicle => {
      this.vehicle = vehicle;
    });
  }

}
