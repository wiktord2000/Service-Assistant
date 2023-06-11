import { Component, OnInit, SkipSelf } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  FLOAT_REGEX,
  INTEGER_REGEX,
  ZERO_TO_HUNDRED_REGEX
} from 'src/app/core/constants/constants';
import { ProductsService } from '../../data-access/products.service';
import { Product } from 'src/app/core/models/Product';
import { finalize } from 'rxjs';
import { SnackbarService } from 'src/app/shared/ui/snackbar/snackbar.service';
import { ProductProfileComponent } from '../product-profile/product-profile.component';
import { CanDeactivateComponent } from 'src/app/core/guards/can-deactivate.guard';

@Component({
  selector: 'app-product-profile-edit',
  templateUrl: './product-profile-edit.component.html',
  styleUrls: ['./product-profile-edit.component.scss']
})
export class ProductProfileEditComponent implements OnInit, CanDeactivateComponent {
  isSaving: boolean = false;
  product: Product;
  productDataForm: FormGroup = this.formBuilder.group({
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
    @SkipSelf() private productProfile: ProductProfileComponent,
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.product = this.productProfile.product;
    this.initInputSubscriptions();
    this.fillForm(this.product);
  }

  onProductDataSave() {
    this.isSaving = true;
    const formValue = this.productDataForm.value;
    const updateData = {
      ...formValue,
      margin: Number(formValue.margin) / 100,
      buyPriceNet: Number(formValue.buyPriceNet),
      buyPriceGross: Number(formValue.buyPriceGross),
      salesPriceNet: Number(formValue.salesPriceNet),
      salesPriceGross: Number(formValue.salesPriceGross),
      availability: Number(formValue.availability)
    };

    this.productsService
      .updateProduct(this.product.id, updateData)
      .pipe(
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: () => {
          this.product = { ...this.product, ...updateData };
          this.productProfile.product = this.product; // Update parent
          this.snackbarService.showMessage('success', 'Pomyślnie zaktualizowano dane produktu');
          this.productDataForm.reset(formValue);
        },
        error: (error) => {
          this.snackbarService.showMessage('error', error);
        }
      });
  }

  // Calculate up fields (buyPriceNet and buyPriceGross)
  calculateUp() {
    // buyPrice = salesPrice*(1 - margin)
    const { salesPriceNet, margin } = this.productDataForm.value;
    const buyPriceNet = Number(salesPriceNet) * (1 - Number(margin) / 100);
    this.productDataForm.controls['buyPriceNet'].setValue(buyPriceNet.toFixed(2), {
      emitEvent: false
    });
    this.productDataForm.controls['buyPriceGross'].setValue((buyPriceNet * 1.23).toFixed(2), {
      emitEvent: false
    });
  }

  // Calculate down fields (salesPriceNet and salesPriceGross)
  calculateDown() {
    // salesPrice = buyPrice/(1 - margin)
    const { buyPriceNet, margin } = this.productDataForm.value;
    const salesPriceNet = Number(buyPriceNet) / (1 - Number(margin) / 100);
    this.productDataForm.controls['salesPriceNet'].setValue(salesPriceNet.toFixed(2), {
      emitEvent: false
    });
    this.productDataForm.controls['salesPriceGross'].setValue((salesPriceNet * 1.23).toFixed(2), {
      emitEvent: false
    });
  }

  fillForm(product: Product) {
    this.productDataForm.setValue({
      name: product.name,
      manufacturer: product.manufacturer,
      unit: product.unit,
      code: product.code,
      availability: product.availability,
      ean: product.ean,
      buyPriceNet: product.buyPriceNet.toFixed(2),
      buyPriceGross: product.buyPriceGross.toFixed(2),
      margin: product.margin * 100,
      salesPriceNet: product.salesPriceNet.toFixed(2),
      salesPriceGross: product.salesPriceGross.toFixed(2)
    });
  }

  initInputSubscriptions() {
    // Subscribe inputs changes
    this.productDataForm.controls['buyPriceNet'].valueChanges.subscribe((value: string) => {
      this.productDataForm.controls['buyPriceGross'].setValue((Number(value) * 1.23).toFixed(2), {
        emitEvent: false
      });
      this.calculateDown();
    });

    this.productDataForm.controls['buyPriceGross'].valueChanges.subscribe((value: string) => {
      this.productDataForm.controls['buyPriceNet'].setValue((Number(value) / 1.23).toFixed(2), {
        emitEvent: false
      });
      this.calculateDown();
    });

    this.productDataForm.controls['margin'].valueChanges.subscribe((value: string) => {
      this.calculateDown();
    });

    this.productDataForm.controls['salesPriceNet'].valueChanges.subscribe((value: string) => {
      this.productDataForm.controls['salesPriceGross'].setValue((Number(value) * 1.23).toFixed(2), {
        emitEvent: false
      });
      this.calculateUp();
    });

    this.productDataForm.controls['salesPriceGross'].valueChanges.subscribe((value: string) => {
      this.productDataForm.controls['salesPriceNet'].setValue((Number(value) / 1.23).toFixed(2), {
        emitEvent: false
      });
      this.calculateUp();
    });
  }

  canDeactivate() {
    return !this.productDataForm.dirty || confirm('Are you sure to unsaved the current changes?');
  }
}
