import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from '../../../../core/models/Vehicle';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/core/models/Client';

@Component({
  selector: 'app-vehicle-profile',
  templateUrl: './vehicle-profile.component.html',
  styleUrls: ['./vehicle-profile.component.scss']
})
export class VehicleProfileComponent implements OnInit, OnDestroy {
  vehicle: Vehicle;
  currentOwner: Client;
  subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.data.subscribe((data) => {
      this.vehicle = data['vehicle'];
      this.currentOwner = this.vehicle.currentOwner;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
