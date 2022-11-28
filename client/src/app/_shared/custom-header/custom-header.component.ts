import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.css']
})
export class CustomHeaderComponent implements OnInit {
  @Input() headerText: string;

  constructor() {}

  ngOnInit(): void {}
}
