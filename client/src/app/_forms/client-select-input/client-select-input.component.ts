import { Component, Input, OnInit, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable, startWith, debounceTime, of } from 'rxjs';
import { Client } from 'src/app/_models/Client';
import { ClientsService } from 'src/app/_services/clients.service';

@Component({
  selector: 'app-client-select-input',
  templateUrl: './client-select-input.component.html',
  styleUrls: ['./client-select-input.component.css']
})
export class ClientSelectInputComponent implements OnInit {
  @Input() label: string = "Klient";
  @Input() selectedClient?: Client;
  clients: Client[] = [];
  filteredClients: Observable<Client[]>;
  isCasingUpdate: boolean = false;

  constructor(@Self() public ngControl: NgControl, private clientsService: ClientsService) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {

    // Track input value change
    this.ngControl.control.valueChanges.pipe(
        debounceTime(300),
        // distinctUntilChanged(),
        startWith('')
      )
      .subscribe((value: string) => {

        if(this.isCasingUpdate){
          this.isCasingUpdate = !this.isCasingUpdate;
          return;
        }

        // Init state (even if input has any starting value the changing value will be empty string ""))
        if(value !== this.ngControl.value && this.selectedClient) return;

        this.loadClients(value.toLowerCase()).subscribe((clients) => {

          this.selectedClient = clients.length === 1 && this.clientToString(clients[0]).toLowerCase() === this.ngControl.value.toLowerCase() 
              ? this.selectedClient = clients[0] 
              : null;

          if(this.selectedClient){

            if(this.ngControl.value !== this.clientToString(this.selectedClient)){
              this.isCasingUpdate = true;
              this.ngControl.control.setValue(this.clientToString(this.selectedClient));
            }
          }

          this.filteredClients = of(clients);

          if(!this.selectedClient && this.ngControl.value){
            this.ngControl.control.setErrors({'incorrect': true});
            this.ngControl.control.markAsTouched();
          }
          else{
            this.ngControl.control.setErrors(null);
          } 
        })

      })
  }

  private loadClients(match: string){
    return this.clientsService.getClientsSearch(10, match);
  }

  clientToString(client: Client){
    return client.type === 'company' 
      ? client.companyName
      : client.firstname + " " + client.lastname;
  }

  onAddClient(event){
    event.preventDefault();
  }

  // We don't have to use it
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}
