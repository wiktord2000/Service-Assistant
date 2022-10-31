import { SnackbarService } from './../../_services/snackbar.service';
import { ClientsService } from '../../_services/clients.service';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../_models/Client';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  client: Client; 
  isCompany: boolean;
  isUpdated: boolean = false;
  isSaving: boolean = false;
  editForm : FormGroup;

  constructor(private clientsService: ClientsService,
              private formBuilder: FormBuilder,
              private snackbarService: SnackbarService,
              private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.loadClient();
  }


  onSaveChanges(){
    this.isSaving = true;
    this.clientsService.updateClient(this.client.id, this.editForm.value)
      .pipe(
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: () => {
          this.client = {...this.client, ...this.editForm.value};    // Update specific props -> really handy
          this.snackbarService.showMessage('success', "Pomyślnie zaktualizowano dane klienta");
          this.editForm.reset(this.client);
        },
        error: (error) => {
          this.snackbarService.showMessage('error', error);
        }
    });
  }

  loadClient(){

    const clientId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.clientsService.getClient(clientId).subscribe(client => {

      // Store client data
      this.client = client;
      this.isCompany = client.type === 'company';

      // Build form
      this.editForm = this.formBuilder.group(
        {
          companyName: [ client.companyName, this.isCompany && [Validators.required]],
          nip: [ client.nip, this.isCompany && [Validators.required]],
          firstname: [ client.firstname, [Validators.required]],
          lastname: [client.lastname, [Validators.required]],
          street: [client.street],
          city: [client.city],
          postalCode: [client.postalCode],
          countryCode: [client.postalCode],
          phone: [client.phone],
          email: [client.email],
        }
      );
    });
  }
}
