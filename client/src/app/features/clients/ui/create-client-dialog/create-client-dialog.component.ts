import { ClientsService } from 'src/app/features/clients/data-access/clients.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/ui/snackbar/snackbar.service';
import { finalize } from 'rxjs';
import { Client } from 'src/app/core/models/Client';

@Component({
  selector: 'app-create-client-dialog',
  templateUrl: './create-client-dialog.component.html',
  styleUrls: ['./create-client-dialog.component.scss']
})
export class CreateClientDialogComponent implements OnInit {
  isSaving: boolean = false;
  isCompany: boolean = false;
  createClientForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private clientsService: ClientsService,
    public dialogRef: MatDialogRef<CreateClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { name?: string }
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.createClientForm.controls['firstname'].setValue(this?.data?.name ?? '');
  }

  buildForm() {
    this.createClientForm = this.formBuilder.group({
      companyName: ['', this.isCompany && [Validators.required]],
      nip: ['', this.isCompany && [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      street: [''],
      city: [''],
      postalCode: [''],
      countryCode: [''],
      phone: [''],
      email: ['']
    });
  }

  onToggleChange() {
    const previousValue = this.createClientForm.value;
    this.buildForm();
    this.createClientForm.setValue(previousValue);
  }

  onSaveChanges() {
    let requestData = {
      ...this.createClientForm.value,
      type: this.isCompany ? 'company' : 'person'
    };
    this.isCompany || { ...requestData, copmanyName: '', nip: '' };

    this.isSaving = true;
    this.clientsService
      .addClient(requestData)
      .pipe(
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: (client: Client) => {
          this.snackbarService.showMessage('success', 'Pomyślnie dodano nowego klienta');
          this.dialogRef.close(client);
          // this.editForm.reset(this.client);
        },
        error: (error) => {
          this.snackbarService.showMessage('error', error);
        }
      });
  }
}
