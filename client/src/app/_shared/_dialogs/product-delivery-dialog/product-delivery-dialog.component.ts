import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { Product } from 'src/app/_models/product';
import { ProductsService } from 'src/app/_services/products.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';

const FLOAT_REGEX = /^[0-9]*\.[0-9]{2}$/;
const INTEGER_REGEX = /^\+?(0|[1-9]\d*)$/;

@Component({
  selector: 'app-product-delivery-dialog',
  templateUrl: './product-delivery-dialog.component.html',
  styleUrls: ['./product-delivery-dialog.component.css']
})
export class ProductDeliveryDialogComponent implements OnInit {
  isOldPrice: boolean = true;
  isSaving: boolean = false;

  deliveryForm: FormGroup = this.formBuilder.group({
    count: ['1', [Validators.required, Validators.pattern(INTEGER_REGEX)]],
    buyPriceNet: [
      { value: '', disabled: true },
      [Validators.required, Validators.pattern(FLOAT_REGEX)]
    ],
    buyPriceGross: [
      { value: '', disabled: true },
      [Validators.required, Validators.pattern(FLOAT_REGEX)]
    ],
    lastDeliveryDate: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<ProductDeliveryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product?: Product }
  ) {}

  ngOnInit(): void {
    // If gets initial data
    if (this?.data?.product) {
      const initData = this.data.product;

      this.deliveryForm.setValue({
        count: '1',
        buyPriceNet: initData.buyPriceNet.toFixed(2),
        buyPriceGross: initData.buyPriceGross.toFixed(2),
        lastDeliveryDate: new Date()
      });
    }

    this.deliveryForm.controls['buyPriceNet'].valueChanges.subscribe((value: string) => {
      this.deliveryForm.controls['buyPriceGross'].setValue((Number(value) * 1.23).toFixed(2), {
        emitEvent: false
      });
    });

    this.deliveryForm.controls['buyPriceGross'].valueChanges.subscribe((value: string) => {
      this.deliveryForm.controls['buyPriceNet'].setValue((Number(value) / 1.23).toFixed(2), {
        emitEvent: false
      });
    });
  }

  onSaveChanges() {
    this.isSaving = true;

    let { count, buyPriceNet, buyPriceGross, lastDeliveryDate } = this.deliveryForm.getRawValue();

    let productToUpdate = { ...this?.data?.product };
    if (!productToUpdate) return;

    productToUpdate.availability += Number(count);
    productToUpdate.lastDeliveryDate = lastDeliveryDate;
    if (!this.isOldPrice) {
      const margin = productToUpdate.margin;
      productToUpdate.buyPriceNet = Number(buyPriceNet);
      productToUpdate.buyPriceGross = Number(buyPriceGross);
      productToUpdate.salesPriceNet = productToUpdate.buyPriceNet / (1 - margin);
      productToUpdate.salesPriceGross = productToUpdate.salesPriceNet * 1.23;
    }

    this.productsService
      .updateProduct(productToUpdate.id, productToUpdate)
      .pipe(
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: () => {
          this.snackbarService.showMessage('success', 'Pomyślnie zaktualizowano produkt');
          this.dialogRef.close(productToUpdate);
        },
        error: (error) => {
          this.snackbarService.showMessage('error', error);
        }
      });
  }

  onToggleChange() {
    this.isOldPrice ? this.disableControls() : this.enableControls();
    if (!this.isOldPrice) return;

    // Restore defaults
    this.deliveryForm.controls['buyPriceNet'].setValue(this.data.product.buyPriceNet.toFixed(2), {
      emitEvent: false
    });
    this.deliveryForm.controls['buyPriceGross'].setValue(
      this.data.product.buyPriceGross.toFixed(2),
      {
        emitEvent: false
      }
    );
  }

  disableControls() {
    this.deliveryForm.controls['buyPriceNet'].disable();
    this.deliveryForm.controls['buyPriceGross'].disable();
  }

  enableControls() {
    this.deliveryForm.controls['buyPriceNet'].enable();
    this.deliveryForm.controls['buyPriceGross'].enable();
  }
}
