import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { Observable, debounceTime, of, Subscription, distinctUntilChanged } from 'rxjs';
import { Client } from 'src/app/core/models/Client';
import { ClientsService } from 'src/app/features/clients/data-access/clients.service';
import {
  CREATE_CLIENT_DIALOG_DEFAULT_SETUP,
  CreateClientDialogComponent
} from 'src/app/features/clients/ui/create-client-dialog/create-client-dialog.component';
import { UtilsService } from 'src/app/shared/utils/utils.service';

const MAX_NUMBER_OF_DISPLAYED_CLIENTS = 10;

@Component({
  selector: 'app-client-select-input',
  templateUrl: './client-select-input.component.html',
  styleUrls: ['./client-select-input.component.scss']
})
export class ClientSelectInputComponent implements OnInit, OnDestroy {
  @Input() label: string = 'Klient';
  @Input() selectedClient?: Client;
  @Output() clientChange: EventEmitter<Client> = new EventEmitter();
  possibleClients: Observable<Client[]> = of([]);
  valueChangesSubsctiption: Subscription;

  constructor(
    @Self() public ngControl: NgControl,
    private dialog: MatDialog,
    private clientsService: ClientsService,
    public utils: UtilsService
  ) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.subscribeValueChanges();
    // When client exist -> just setup name and don't emit the event
    // When client not exist -> setup "" and emit the event (to send request)
    this.ngControl.control.setValue(
      // Note: clientToString() returns "" if client is undefined/null
      this.utils.clientToString(this.selectedClient),
      { emitEvent: !this.selectedClient }
    );
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    // Note: When the option is selected the valueChanges event is triggered automatically with selected Client
    // (it's mat-autocomplete specific) This is why we setup exit condition: if (value instanceof Object) return;
    this.updateSelectedClient(event.option.value);
    this.possibleClients = of([]);
    this.ngControl.control.setValue(this.utils.clientToString(this.selectedClient), {
      emitEvent: false
    });
  }

  subscribeValueChanges() {
    this.valueChangesSubsctiption = this.ngControl.control.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value: string | Client) => {
        // When we will get Client object - do nothing (mat-autocomplate defect)
        if (value instanceof Object) return;
        // We will reset the selectedClient every time the input value changed
        this.updateSelectedClient(null);

        this.findClients(value.toLowerCase()).subscribe((clients) => {
          this.possibleClients = of(clients);
          if (this.ngControl.value === '') return;
          if (!clients.some((client) => this.utils.clientToString(client) === this.ngControl.value))
            this.ngControl.control.setErrors({ 'not-exist': true });
        });
      });
  }

  findClients(match: string) {
    return this.clientsService.getClientsSearch(MAX_NUMBER_OF_DISPLAYED_CLIENTS, match);
  }

  onAddClient() {
    const dialogRef = this.dialog.open(CreateClientDialogComponent, {
      ...CREATE_CLIENT_DIALOG_DEFAULT_SETUP,
      data: { name: this.ngControl.value }
    });

    dialogRef.afterClosed().subscribe((client: Client) => {
      if (client !== undefined) {
        this.updateSelectedClient(client);
        this.ngControl.control.setValue(this.utils.clientToString(client), { emitEvent: false });
      }
    });
  }

  updateSelectedClient(client?: Client) {
    this.selectedClient = client;
    this.clientChange.emit(client);
  }

  clear(requestInitialClients: boolean = false) {
    this.selectedClient = null;
    // if (emitEvent) this.clientChange.emit(null);
    this.clientChange.emit(null);
    if (!requestInitialClients) this.possibleClients = of([]);
    this.ngControl.control.setValue('', { emitEvent: requestInitialClients });
  }

  ngOnDestroy(): void {
    this.valueChangesSubsctiption.unsubscribe();
  }

  // We don't have to use it
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}
