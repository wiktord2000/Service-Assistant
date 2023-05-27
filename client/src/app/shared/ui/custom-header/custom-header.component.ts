import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss']
})
export class CustomHeaderComponent implements OnInit {
  @Input() headerText: string;
  @Input() disableTopDivider: boolean = false;
  @Input() disableBottomMargin: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
