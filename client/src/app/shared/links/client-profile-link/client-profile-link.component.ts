import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { Client } from 'src/app/core/models/Client';

@Component({
  selector: 'app-client-profile-link',
  templateUrl: './client-profile-link.component.html',
  styleUrls: ['./client-profile-link.component.css']
})
export class ClientProfileLinkComponent implements OnInit {
  constructor() {}

  @Input() client: Client;
  @Input() tooltipPosition: TooltipPosition = 'right';
  @Input() color: ThemePalette = 'primary';
  @Input() customColor?: string;
  @Input() containLabel: boolean = false;

  ngOnInit(): void {}
}
