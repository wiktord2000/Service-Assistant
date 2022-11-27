import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { Product } from 'src/app/_models/product';
import { ProductsService } from 'src/app/_services/products.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';

const FLOAT_REGEX = /^[0-9]*\.[0-9]{2}$/;
const INTEGER_REGEX = /^\+?(0|[1-9]\d*)$/;
const ZERO_TO_HUNDRED_REGEX = /\b([0-9]|[1-9][0-9])\b/; // without 100

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.component.html',
  styleUrls: ['./create-product-dialog.component.css']
})
export class CreateProductDialogComponent implements OnInit {
  isSaving: boolean = false;

  productForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    manufacturer: ['', [Validators.required]],
    unit: ['szt.', [Validators.required]],
    code: ['', [Validators.required]],
    availability: ['0', [Validators.required, Validators.pattern(INTEGER_REGEX)]],
    ean: [''],
    buyPriceNet: ['0.00', [Validators.required, Validators.pattern(FLOAT_REGEX)]],
    buyPriceGross: ['0.00', [Validators.required, Validators.pattern(FLOAT_REGEX)]],
    margin: ['25', [Validators.required, Validators.pattern(ZERO_TO_HUNDRED_REGEX)]],
    salesPriceNet: ['0.00', [Validators.required, Validators.pattern(FLOAT_REGEX)]],
    salesPriceGross: ['0.00', [Validators.required, Validators.pattern(FLOAT_REGEX)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<CreateProductDialogComponent>
  ) {}

  ngOnInit(): void {
    // Subscribe inputs changes
    this.productForm.controls['buyPriceNet'].valueChanges.subscribe((value: string) => {
      this.productForm.controls['buyPriceGross'].setValue((Number(value) * 1.23).toFixed(2), {
        emitEvent: false
      });
      this.calculateDown();
    });

    this.productForm.controls['buyPriceGross'].valueChanges.subscribe((value: string) => {
      this.productForm.controls['buyPriceNet'].setValue((Number(value) / 1.23).toFixed(2), {
        emitEvent: false
      });
      this.calculateDown();
    });

    this.productForm.controls['margin'].valueChanges.subscribe((value: string) => {
      this.calculateDown();
    });

    this.productForm.controls['salesPriceNet'].valueChanges.subscribe((value: string) => {
      this.productForm.controls['salesPriceGross'].setValue((Number(value) * 1.23).toFixed(2), {
        emitEvent: false
      });
      this.calculateUp();
    });

    this.productForm.controls['salesPriceGross'].valueChanges.subscribe((value: string) => {
      this.productForm.controls['salesPriceNet'].setValue((Number(value) / 1.23).toFixed(2), {
        emitEvent: false
      });
      this.calculateUp();
    });
  }

  // Calculate up fields (buyPriceNet and buyPriceGross)
  calculateUp() {
    // buyPrice = salesPrice*(1 - margin)
    const { salesPriceNet, margin } = this.productForm.value;
    const buyPriceNet = Number(salesPriceNet) * (1 - Number(margin) / 100);
    this.productForm.controls['buyPriceNet'].setValue(buyPriceNet.toFixed(2), {
      emitEvent: false
    });
    this.productForm.controls['buyPriceGross'].setValue((buyPriceNet * 1.23).toFixed(2), {
      emitEvent: false
    });
  }

  // Calculate down fields (salesPriceNet and salesPriceGross)
  calculateDown() {
    // salesPrice = buyPrice/(1 - margin)
    const { buyPriceNet, margin } = this.productForm.value;
    const salesPriceNet = Number(buyPriceNet) / (1 - Number(margin) / 100);
    this.productForm.controls['salesPriceNet'].setValue(salesPriceNet.toFixed(2), {
      emitEvent: false
    });
    this.productForm.controls['salesPriceGross'].setValue((salesPriceNet * 1.23).toFixed(2), {
      emitEvent: false
    });
  }

  onSaveChanges() {
    this.isSaving = true;

    let formValue = this.productForm.value;

    this.productsService
      .addProduct({ ...formValue, margin: formValue.margin / 100 })
      .pipe(
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: (product: Product) => {
          this.snackbarService.showMessage('success', 'Pomyślnie dodano nowy produkt');
          this.dialogRef.close(product);
        },
        error: (error) => {
          this.snackbarService.showMessage('error', error);
        }
      });
  }
}
