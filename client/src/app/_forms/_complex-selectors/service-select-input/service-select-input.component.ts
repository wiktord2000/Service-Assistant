import { Component, EventEmitter, Input, OnInit, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, Observable, of, startWith } from 'rxjs';
import { Service } from 'src/app/_models/Service';
import { ServicesService } from 'src/app/_services/services.service';
import { CreateServiceDialogComponent } from 'src/app/_shared/_dialogs/create-service-dialog/create-service-dialog.component';

@Component({
  selector: 'app-service-select-input',
  templateUrl: './service-select-input.component.html',
  styleUrls: ['./service-select-input.component.css']
})
export class ServiceSelectInputComponent implements OnInit {
  @Input() label: string = 'Pojazd';
  @Input() selectedService?: Service;
  @Output() serviceChange: EventEmitter<Service> = new EventEmitter();
  filteredServices: Observable<Service[]>;

  constructor(
    @Self() public ngControl: NgControl,
    public dialog: MatDialog,
    private servicesService: ServicesService
  ) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    // Set up the initial Service name
    if (this.selectedService)
      this.ngControl.control.setValue(this.serviceToString(this.selectedService));

    // Track input value change
    this.ngControl.control.valueChanges
      .pipe(
        debounceTime(300),
        // distinctUntilChanged(),
        startWith('')
      )
      .subscribe((value: string) => {
        // Init state (even if input has any starting value the changing value will be empty string ""))
        if (value !== this.ngControl.value && this.selectedService) return;

        this.loadServices(value.toLowerCase()).subscribe((services) => {
          this.selectedService =
            services.length === 1 &&
            this.serviceToString(services[0]).toLowerCase() === this.ngControl.value.toLowerCase()
              ? (this.selectedService = services[0])
              : null;

          this.serviceChange.emit(this.selectedService);
          if (this.selectedService) {
            if (this.ngControl.value !== this.serviceToString(this.selectedService)) {
              this.ngControl.control.setValue(this.serviceToString(this.selectedService), {
                emitEvent: false
              });
            }
          }

          this.filteredServices = of(services);

          if (!this.selectedService) {
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

  private loadServices(match: string) {
    return this.servicesService.getServicesSearch(10, match);
  }

  clear() {
    this.selectedService = null;
    this.filteredServices = of([]);
    this.ngControl.control.setValue('', { emitEvent: false });
  }

  serviceToString(service: Service) {
    return service ? service.name : '';
  }

  onAddService() {
    const dialogRef = this.dialog.open(CreateServiceDialogComponent, {
      width: '900px',
      data: { name: this.ngControl.value }
    });

    dialogRef.afterClosed().subscribe((service: Service) => {
      if (service !== undefined) {
        this.selectedService = service;
        this.ngControl.control.setValue(this.serviceToString(service), { emitEvent: false });
      }
      this.ngControl.control.updateValueAndValidity();
    });
  }

  // We don't have to use it
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}
