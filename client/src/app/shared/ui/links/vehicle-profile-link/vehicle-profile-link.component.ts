import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { Vehicle } from 'src/app/core/models/Vehicle';
import { UtilsService } from 'src/app/shared/utils/utils.service';

@Component({
  selector: 'app-vehicle-profile-link',
  templateUrl: './vehicle-profile-link.component.html',
  styleUrls: ['./vehicle-profile-link.component.scss']
})
export class VehicleProfileLinkComponent implements OnInit {
  @Input() vehicle: Vehicle;
  @Input() tooltipPosition: TooltipPosition = 'right';
  @Input() color: ThemePalette = 'primary';
  @Input() customColor?: string;
  @Input() containLabel: boolean = false;
  @Input() includeIcon: boolean = false;
  vehicleName!: string;
  constructor(private utils: UtilsService) {}

  ngOnInit(): void {
    this.vehicleName = this.utils.vehicleToString(this.vehicle);
  }
}
