import { Component, OnInit } from '@angular/core';
import { Client } from '../../../../core/models/Client';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {
  client: Client;
  isCompany: boolean;
  subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // Get data provided by resolver
    this.subscription = this.activatedRoute.data.subscribe((data: Data) => {
      this.client = data['client'];
      this.isCompany = this.client.type === 'company';
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
