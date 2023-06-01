import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { FLOAT_REGEX } from 'src/app/core/constants/constants';
import { Service } from 'src/app/core/models/Service';
import { ServicesService } from 'src/app/features/services/data-access/services.service';
import { SnackbarService } from 'src/app/shared/ui/snackbar/snackbar.service';

export const CREATE_SERVICE_DIALOG_DEFAULT_CONFIG = {
  maxWidth: 600,
  width: '94vw'
};

@Component({
  selector: 'app-create-service-dialog',
  templateUrl: './create-service-dialog.component.html',
  styleUrls: ['./create-service-dialog.component.scss']
})
export class CreateServiceDialogComponent implements OnInit {
  isSaving: boolean = false;
  isCompany: boolean = false;

  serviceForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    estimatedTime: ['0.00', [Validators.required, Validators.pattern(FLOAT_REGEX)]],
    unit: ['rbh', [Validators.required]],
    costNet: ['0.00', [Validators.required, Validators.pattern(FLOAT_REGEX)]],
    costGross: ['0.00', [Validators.required, Validators.pattern(FLOAT_REGEX)]],
    totalNet: [{ value: '0.00', disabled: true }],
    totalGross: [{ value: '0.00', disabled: true }]
  });

  constructor(
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private servicesService: ServicesService,
    public dialogRef: MatDialogRef<CreateServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { service?: Service; name?: string }
  ) {}

  ngOnInit(): void {
    // Subscribe inputs changes
    this.serviceForm.controls['costNet'].valueChanges.subscribe((value: string) => {
      const costGross = Number(value) * 1.23;
      this.serviceForm.controls['costGross'].setValue(costGross.toFixed(2), { emitEvent: false });
      this.updateTotalPrices();
    });

    this.serviceForm.controls['costGross'].valueChanges.subscribe((value: string) => {
      const costNet = Number(value) * 0.77;
      this.serviceForm.controls['costNet'].setValue(costNet.toFixed(2), { emitEvent: false });
      this.updateTotalPrices();
    });

    this.serviceForm.controls['estimatedTime'].valueChanges.subscribe((value: string) => {
      const totalNet = Number(value) * Number(this.serviceForm.controls['costNet'].value);
      const totalGross = Number(value) * Number(this.serviceForm.controls['costGross'].value);
      this.serviceForm.controls['totalNet'].setValue(totalNet.toFixed(2));
      this.serviceForm.controls['totalGross'].setValue(totalGross.toFixed(2));
    });

    // If gets initial data
    if (this?.data?.service) {
      const initData = this.data.service;

      this.serviceForm.setValue({
        name: initData.name,
        estimatedTime: initData.estimatedTime.toFixed(2),
        unit: initData.unit,
        costNet: initData.costNet.toFixed(2),
        costGross: initData.costGross.toFixed(2),
        totalNet: initData.totalNet.toFixed(2),
        totalGross: initData.totalGross.toFixed(2)
      });
    }
    if (this?.data?.name) {
      this.serviceForm.controls['name'].setValue(this.data.name);
    }
  }

  updateTotalPrices() {
    const estimatedTime = Number(this.serviceForm.controls['estimatedTime'].value);
    const totalNet = estimatedTime * Number(this.serviceForm.controls['costNet'].value);
    const totalGross = estimatedTime * Number(this.serviceForm.controls['costGross'].value);
    this.serviceForm.controls['totalNet'].setValue(totalNet.toFixed(2));
    this.serviceForm.controls['totalGross'].setValue(totalGross.toFixed(2));
  }

  onSaveChanges() {
    this.isSaving = true;

    let formValue = this.serviceForm.getRawValue();

    // Convert strings to numbers
    formValue = Object.fromEntries(
      Object.entries(formValue).map(([key, value]) =>
        key !== 'name' && key !== 'unit' ? [key, Number(value)] : [key, value]
      )
    );

    // Update case
    if (this?.data?.service) {
      this.servicesService
        .updateService(this.data.service.id, formValue)
        .pipe(
          finalize(() => {
            this.isSaving = false;
          })
        )
        .subscribe({
          next: () => {
            this.snackbarService.showMessage('success', 'Pomyślnie zaktualizowano usługę');
            this.dialogRef.close({
              ...this.data.service,
              ...formValue
            });
          },
          error: (error) => {
            this.snackbarService.showMessage('error', error);
          }
        });

      return;
    }

    // Create case
    this.servicesService
      .addService(formValue)
      .pipe(
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: (service: Service) => {
          this.snackbarService.showMessage('success', 'Pomyślnie dodano nową usługę');
          this.dialogRef.close(service);
        },
        error: (error) => {
          this.snackbarService.showMessage('error', error);
        }
      });
  }
}
