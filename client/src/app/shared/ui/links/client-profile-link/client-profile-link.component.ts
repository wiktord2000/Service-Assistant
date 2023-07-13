import { Component, Input, OnInit } from '@angular/core';
import { Client } from 'src/app/core/models/Client';
import { UtilsService } from 'src/app/shared/utils/utils.service';

@Component({
  selector: 'app-client-profile-link',
  templateUrl: './client-profile-link.component.html',
  styleUrls: ['./client-profile-link.component.scss']
})
export class ClientProfileLinkComponent implements OnInit {
  @Input() client: Client;
  clientDisplayName: string;
  clientIcon: string;
  routerLink: string;
  constructor(private utils: UtilsService) {}

  ngOnInit(): void {
    this.clientDisplayName = this.utils.clientToString(this.client);
    this.clientIcon = this.utils.getClientIcon(this.client);
    this.routerLink = this.utils.getClientRouterLink(this.client);
  }
}
