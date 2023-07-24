import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/core/models/Vehicle';
import { UtilsService } from 'src/app/shared/utils/utils.service';

@Component({
  selector: 'app-vehicle-profile-link',
  templateUrl: './vehicle-profile-link.component.html',
  styleUrls: ['./vehicle-profile-link.component.scss']
})
export class VehicleProfileLinkComponent implements OnInit {
  @Input() vehicle!: Vehicle;
  @Input() customColor?: string;
  @Input() label?: string;
  @Input() includeIcon: boolean = false;
  vehicleDisplayName: string;
  routerLink: string;

  constructor(private utils: UtilsService) {}

  ngOnInit(): void {
    this.vehicleDisplayName = this.utils.vehicleToString(this.vehicle);
    this.routerLink = this.utils.getVehicleRouterLink(this.vehicle);
  }
}
