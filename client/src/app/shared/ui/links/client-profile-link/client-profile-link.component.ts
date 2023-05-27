import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { Client } from 'src/app/core/models/Client';
import { UtilsService } from 'src/app/shared/utils/utils.service';

@Component({
  selector: 'app-client-profile-link',
  templateUrl: './client-profile-link.component.html',
  styleUrls: ['./client-profile-link.component.scss']
})
export class ClientProfileLinkComponent implements OnInit {
  @Input() client: Client;
  @Input() tooltipPosition: TooltipPosition = 'right';
  @Input() color: ThemePalette = 'primary';
  @Input() customColor?: string;
  @Input() label!: string;
  clientName!: string;
  constructor(private utils: UtilsService) {}

  ngOnInit(): void {
    this.clientName = this.utils.clientToString(this.client);
  }
}
