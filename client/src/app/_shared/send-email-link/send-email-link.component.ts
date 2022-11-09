import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-send-email-link',
  templateUrl: './send-email-link.component.html',
  styleUrls: ['./send-email-link.component.css']
})
export class SendEmailLinkComponent implements OnInit {

  @Input() email: string;
  @Input() color: ThemePalette = "primary";
  @Input() customColor?: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
