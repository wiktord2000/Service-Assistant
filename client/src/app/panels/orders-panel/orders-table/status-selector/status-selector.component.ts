import { Component, Input, OnInit } from '@angular/core';
import { Status } from 'src/app/_models/Status';

@Component({
  selector: 'app-status-selector',
  templateUrl: './status-selector.component.html',
  styleUrls: ['./status-selector.component.css']
})
export class StatusSelectorComponent implements OnInit {

  @Input() statusData: Status;
  selectedStatus: string = '0';   // By default 0

  possibleStatuses = [
    {position: 0, name: 'Wycena', color: 'lightcoral'},
    {position: 1, name: 'Akceptacja', color: 'lightskyblue'},
    {position: 2, name: 'Naprawa', color: 'lightsalmon'},
    {position: 3, name: 'Gotowe', color: 'lightgreen'},
    {position: 4, name: 'Zakończone', color: 'lightslategray'}
  ]

  getStatusColor(position: string){
    return this.possibleStatuses.find((status) => status.position === Number(position)).color;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
