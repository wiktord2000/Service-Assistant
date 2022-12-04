import { SnackbarService } from '../../../_services/snackbar.service';
import { StatusesService } from '../../../_services/statuses.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Status } from 'src/app/_models/Status';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-status-selector',
  templateUrl: './status-selector.component.html',
  styleUrls: ['./status-selector.component.css']
})
export class StatusSelectorComponent implements OnInit {
  @Input() status: Status;
  @Input() darkMode: boolean = false;
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Output() onStatusUpdate = new EventEmitter<Status>();
  selectedPosition: string;
  previousSelectedPosition: string;

  // It should be stored and fetched from backend
  possibleStatuses = [
    { position: 0, name: 'Wycena', color: 'lightcoral' },
    { position: 1, name: 'Akceptacja', color: 'lightskyblue' },
    { position: 2, name: 'Naprawa', color: 'lightsalmon' },
    { position: 3, name: 'Gotowe', color: 'lightgreen' },
    { position: 4, name: 'Zakończone', color: 'lightslategray' }
  ];

  constructor(private statusesService: StatusesService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.selectedPosition = this.status.position.toString();
    this.previousSelectedPosition = this.selectedPosition;
  }

  getStatusColor(position: string) {
    return this.possibleStatuses.find((status) => status.position === Number(position)).color;
  }

  onSelectionChange() {
    // Creating new status obj
    let newStatus = { ...this.status };
    newStatus.position = Number(this.selectedPosition);
    newStatus.name = this.possibleStatuses.find(
      (elem) => elem.position === newStatus.position
    ).name;
    newStatus.finished = this.selectedPosition == '4';

    this.statusesService.updateStatus(newStatus).subscribe({
      next: (status: Status) => {
        this.status = status;
        this.previousSelectedPosition = this.selectedPosition;
        this.snackbarService.showMessage('success', 'Pomyślnie zaktualizowano status');
        this.onStatusUpdate.emit(status);
      },
      error: () => {
        // Revert previous position
        this.selectedPosition = this.previousSelectedPosition;
      }
    });
  }
}
