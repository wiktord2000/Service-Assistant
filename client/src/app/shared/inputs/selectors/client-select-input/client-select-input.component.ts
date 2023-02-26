import { Component, EventEmitter, Input, OnInit, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, startWith, debounceTime, of } from 'rxjs';
import { Client } from 'src/app/core/models/Client';
import { ClientsService } from 'src/app/core/services/http/clients.service';
import { CreateClientDialogComponent } from 'src/app/shared/dialogs/create-client-dialog/create-client-dialog.component';

@Component({
  selector: 'app-client-select-input',
  templateUrl: './client-select-input.component.html',
  styleUrls: ['./client-select-input.component.css']
})
export class ClientSelectInputComponent implements OnInit {
  @Input() label: string = 'Klient';
  @Input() selectedClient?: Client;
  @Output() clientChange: EventEmitter<Client> = new EventEmitter();
  possibleClients: Client[] = [];
  displayingClients: Observable<Client[]> = of([]);

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
        // Check that currently have a candidate (cover also case when one from the list has been selected)
        let candidates = this.possibleClients.filter(
          (client) => this.clientToString(client) === value
        );

        if (candidates.length) {
          this.selectedClient = candidates[0];
          this.clientChange.emit(candidates[0]);
          this.displayingClients = of(candidates);
          return;
        }

        this.loadClients(value.toLowerCase()).subscribe((clients) => {
          this.possibleClients = clients;
          this.displayingClients = of(clients);

          // Automatically select when found match
          this.selectedClient =
            clients.length === 1 &&
            this.clientToString(clients[0]).toLowerCase() === this.ngControl.value.toLowerCase()
              ? (this.selectedClient = clients[0])
              : null;

          // Inform about change
          this.clientChange.emit(this.selectedClient);

          // Update letter casing of input (if needed)
          if (
            this.selectedClient &&
            this.ngControl.value !== this.clientToString(this.selectedClient)
          ) {
            this.ngControl.control.setValue(this.clientToString(this.selectedClient), {
              emitEvent: false
            });
          }

          // Errors handling
          if (this.selectedClient) {
            this.ngControl.control.setErrors(null);
            return;
          }
          if (this.ngControl.value !== '') {
            this.ngControl.control.setErrors({ incorrect: true });
            return;
          }
          this.ngControl.hasError('required')
            ? this.ngControl.control.setErrors({ required: true })
            : this.ngControl.control.setErrors(null);
        });
      });
  }

  private loadClients(match: string) {
    return this.clientsService.getClientsSearch(10, match);
  }

  clear(emitEvent: boolean = false) {
    this.selectedClient = null;
    if (emitEvent) this.clientChange.emit(null);
    this.possibleClients = [];
    this.displayingClients = of([]);
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
        this.clientChange.emit(client);
        this.displayingClients = of([client]);
        this.ngControl.control.setValue(this.clientToString(client), { emitEvent: false });
      }
    });
  }

  // We don't have to use it
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}
