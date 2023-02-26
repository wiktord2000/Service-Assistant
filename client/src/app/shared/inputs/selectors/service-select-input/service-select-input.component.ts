import { Component, EventEmitter, Input, OnInit, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, Observable, of, startWith } from 'rxjs';
import { Service } from 'src/app/core/models/Service';
import { ServicesService } from 'src/app/core/services/http/services.service';
import { CreateServiceDialogComponent } from 'src/app/shared/dialogs/create-service-dialog/create-service-dialog.component';

@Component({
  selector: 'app-service-select-input',
  templateUrl: './service-select-input.component.html',
  styleUrls: ['./service-select-input.component.css']
})
export class ServiceSelectInputComponent implements OnInit {
  @Input() label: string = 'Pojazd';
  @Input() selectedService?: Service;
  @Output() serviceChange: EventEmitter<Service> = new EventEmitter();
  possibleServices: Service[] = [];
  displayingServices: Observable<Service[]> = of([]);

  constructor(
    @Self() public ngControl: NgControl,
    public dialog: MatDialog,
    private servicesService: ServicesService
  ) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    // Set up the initial service name
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
        // Check that currently have a candidate (cover also case when one from the list has been selected)
        let candidates = this.possibleServices.filter(
          (service) => this.serviceToString(service) === value
        );

        if (candidates.length) {
          this.selectedService = candidates[0];
          this.serviceChange.emit(candidates[0]);
          this.displayingServices = of(candidates);
          return;
        }

        // Request
        this.loadServices(value.toLowerCase()).subscribe((services) => {
          this.possibleServices = services;
          this.displayingServices = of(services);

          // Automatically select when found match
          this.selectedService =
            services.length === 1 &&
            this.serviceToString(services[0]).toLowerCase() === this.ngControl.value.toLowerCase()
              ? (this.selectedService = services[0])
              : null;

          // Inform about change
          this.serviceChange.emit(this.selectedService);

          // Update letter casing of input (if needed)
          if (
            this.selectedService &&
            this.ngControl.value !== this.serviceToString(this.selectedService)
          ) {
            this.ngControl.control.setValue(this.serviceToString(this.selectedService), {
              emitEvent: false
            });
          }

          // Errors handling
          if (this.selectedService) {
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

  private loadServices(match: string) {
    return this.servicesService.getServicesSearch(10, match);
  }

  clear(emitEvent: boolean = false) {
    this.selectedService = null;
    if (emitEvent) this.serviceChange.emit(null);
    this.possibleServices = [];
    this.displayingServices = of([]);
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
      this.selectedService = service;
      this.serviceChange.emit(service);
      this.displayingServices = of([service]);
      this.ngControl.control.setValue(this.serviceToString(service), { emitEvent: false });
    });
  }

  // We don't have to use it
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}
