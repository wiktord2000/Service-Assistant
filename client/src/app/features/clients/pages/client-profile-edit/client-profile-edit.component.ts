import { Component, OnInit, SkipSelf } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Client } from 'src/app/core/models/Client';
import { ClientsService } from '../../data-access/clients.service';
import { SnackbarService } from 'src/app/shared/ui/snackbar/snackbar.service';
import { CanDeactivateComponent } from 'src/app/core/guards/can-deactivate.guard';
import { ClientProfileComponent } from '../client-profile/client-profile.component';

@Component({
  selector: 'app-client-profile-edit',
  templateUrl: './client-profile-edit.component.html',
  styleUrls: ['./client-profile-edit.component.scss']
})
export class ClientProfileEditComponent implements OnInit, CanDeactivateComponent {
  editForm!: FormGroup;
  client: Client;
  isCompany: boolean;
  isSaving: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private clientsService: ClientsService,
    private snackbarService: SnackbarService,
    @SkipSelf() private clientProfile: ClientProfileComponent
  ) {}

  ngOnInit(): void {
    this.client = this.clientProfile.client;
    this.isCompany = this.client.type === 'company';
    this.initForm(this.client);
  }

  onSaveChanges() {
    this.isSaving = true;
    this.clientsService
      .updateClient(this.client.id, this.editForm.value)
      .pipe(
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: () => {
          this.client = { ...this.client, ...this.editForm.value };
          this.clientProfile.client = this.client;
          this.snackbarService.showMessage('success', 'Pomyślnie zaktualizowano dane klienta');
          this.editForm.reset(this.client);
        },
        error: (error) => {
          this.snackbarService.showMessage('error', error);
        }
      });
  }

  initForm(client: Client) {
    this.editForm = this.formBuilder.group({
      companyName: [client.companyName, client.type === 'company' && [Validators.required]],
      nip: [client.nip, client.type === 'company' && [Validators.required]],
      firstname: [client.firstname, [Validators.required]],
      lastname: [client.lastname, [Validators.required]],
      street: [client.street],
      city: [client.city],
      postalCode: [client.postalCode],
      countryCode: [client.countryCode],
      phone: [client.phone],
      email: [client.email]
    });
  }

  canDeactivate() {
    return !this.editForm.dirty || confirm('Are you sure to unsaved the current changes?');
  }
}
