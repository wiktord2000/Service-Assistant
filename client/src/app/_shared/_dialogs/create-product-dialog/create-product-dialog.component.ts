import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { Product } from 'src/app/_models/product';
import { ProductsService } from 'src/app/_services/products.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';

const FLOAT_REGEX = /^[0-9]*\.[0-9]{2}$/;
const INTEGER_REGEX = /^\+?(0|[1-9]\d*)$/;
const ZERO_TO_HUNDRED_REGEX = /\b([0-9]|[1-9][0-9]|100)\b/;

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
    code: [''],
    availability: ['0', [Validators.pattern(INTEGER_REGEX)]],
    ean: [''],
    buyPriceNet: ['0.00', [Validators.pattern(FLOAT_REGEX)]],
    buyPriceGross: ['0.00', [Validators.pattern(FLOAT_REGEX)]],
    margin: ['0', [Validators.pattern(ZERO_TO_HUNDRED_REGEX)]],
    salesPriceNet: ['0.00', [Validators.pattern(FLOAT_REGEX)]],
    salesPriceGross: ['0.00', [Validators.pattern(FLOAT_REGEX)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<CreateProductDialogComponent>
  ) {}

  ngOnInit(): void {
    // Subscribe inputs changes
    // this.productForm.controls['costNet'].valueChanges.subscribe((value: string) => {
    //   const costGross = Number(value) * 1.23;
    //   this.productForm.controls['costGross'].setValue(costGross.toFixed(2), { emitEvent: false });
    //   this.updateTotalPrices();
    // });
    // this.productForm.controls['costGross'].valueChanges.subscribe((value: string) => {
    //   const costNet = Number(value) * 0.77;
    //   this.productForm.controls['costNet'].setValue(costNet.toFixed(2), { emitEvent: false });
    //   this.updateTotalPrices();
    // });
    // this.productForm.controls['estimatedTime'].valueChanges.subscribe((value: string) => {
    //   const totalNet = Number(value) * Number(this.productForm.controls['costNet'].value);
    //   const totalGross = Number(value) * Number(this.productForm.controls['costGross'].value);
    //   this.productForm.controls['totalNet'].setValue(totalNet.toFixed(2));
    //   this.productForm.controls['totalGross'].setValue(totalGross.toFixed(2));
    // });
  }

  updateTotalPrices() {
    const estimatedTime = Number(this.productForm.controls['estimatedTime'].value);
    const totalNet = estimatedTime * Number(this.productForm.controls['costNet'].value);
    const totalGross = estimatedTime * Number(this.productForm.controls['costGross'].value);
    this.productForm.controls['totalNet'].setValue(totalNet.toFixed(2));
    this.productForm.controls['totalGross'].setValue(totalGross.toFixed(2));
  }

  onSaveChanges() {
    this.isSaving = true;

    let formValue = this.productForm.value;

    // Create case
    this.productsService
      .addProduct(formValue)
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
