import { Component, EventEmitter, Input, OnInit, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, startWith, debounceTime, of } from 'rxjs';
import { Client } from 'src/app/_models/Client';
import { ClientsService } from 'src/app/_services/clients.service';
import { CreateClientDialogComponent } from 'src/app/_shared/_dialogs/create-client-dialog/create-client-dialog.component';

@Component({
  selector: 'app-client-select-input',
  templateUrl: './client-select-input.component.html',
  styleUrls: ['./client-select-input.component.css']
})
export class ClientSelectInputComponent implements OnInit {
  @Input() label: string = 'Klient';
  @Input() selectedClient?: Client;
  @Output() clientChange: EventEmitter<Client> = new EventEmitter();
  filteredClients: Observable<Client[]>;

  constructor(
    @Self() public ngControl: NgControl,
    public dialog: MatDialog,
    private clientsService: ClientsService
  ) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    // Set up the initial client name
    if (this.selectedClient)
      this.ngControl.control.setValue(this.clientToString(this.selectedClient));

    // Track input value change
    this.ngControl.control.valueChanges
      .pipe(
        debounceTime(300),
        // distinctUntilChanged(),
        startWith('')
      )
      .subscribe((value: string) => {
        // Init state (even if input has any starting value the changing value will be empty string ""))
        if (value !== this.ngControl.value && this.selectedClient) return;

        this.loadClients(value.toLowerCase()).subscribe((clients) => {
          this.selectedClient =
            clients.length === 1 &&
            this.clientToString(clients[0]).toLowerCase() === this.ngControl.value.toLowerCase()
              ? (this.selectedClient = clients[0])
              : null;

          this.clientChange.emit(this.selectedClient);
          if (this.selectedClient) {
            if (this.ngControl.value !== this.clientToString(this.selectedClient)) {
              this.ngControl.control.setValue(this.clientToString(this.selectedClient), {
                emitEvent: false
              });
            }
          }

          this.filteredClients = of(clients);

          if (!this.selectedClient) {
            if (this.ngControl.value === '' && !this.ngControl.hasError('required')) {
              this.ngControl.control.setErrors(null);
            } else {
              this.ngControl.hasError('required')
                ? this.ngControl.control.setErrors({ required: true })
                : this.ngControl.control.setErrors({ incorrect: true });
              // this.ngControl.control.markAsTouched();
            }
          } else {
            this.ngControl.control.setErrors(null);
          }
        });
      });
  }

  private loadClients(match: string) {
    return this.clientsService.getClientsSearch(10, match);
  }

  clear() {
    this.selectedClient = null;
    this.filteredClients = of([]);
    this.ngControl.control.setValue('', { emitEvent: false });
  }

  clientToString(client: Client) {
    if (!client) return '';
    return client.type === 'company'
      ? client.companyName
      : client.firstname + ' ' + client.lastname;
  }

  onAddClient() {
    const dialogRef = this.dialog.open(CreateClientDialogComponent, {
      width: '900px',
      data: { name: this.ngControl.value }
    });

    dialogRef.afterClosed().subscribe((client: Client) => {
      if (client !== undefined) {
        this.selectedClient = client;
        this.ngControl.control.setValue(this.clientToString(client), { emitEvent: false });
      }
      this.ngControl.control.updateValueAndValidity();
    });
  }

  // We don't have to use it
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}
