import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Product } from 'src/app/_models/product';
import { ProductsService } from 'src/app/_services/products.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { OrdersTableComponent } from 'src/app/_shared/_tables/orders-table/orders-table.component';

const FLOAT_REGEX = /^[0-9]*\.[0-9]{2}$/;
const INTEGER_REGEX = /^\+?(0|[1-9]\d*)$/;
const ZERO_TO_HUNDRED_REGEX = /\b([0-9]|[1-9][0-9])\b/; // without 100
const ONE_TO_TEN_REGEX = /\b([1-9]|10)\b/;

@Component({
  selector: 'app-product-profile',
  templateUrl: './product-profile.component.html',
  styleUrls: ['./product-profile.component.css']
})
export class ProductProfileComponent implements OnInit {
  @ViewChild(OrdersTableComponent) ordersTable!: OrdersTableComponent;
  product: Product;
  displayFinished: boolean = false;
  isSaving: boolean = false;
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

  productDescriptionForm: FormGroup = this.formBuilder.group({
    description: [''],
    notice: [''],
    grade: ['', [Validators.pattern(ONE_TO_TEN_REGEX), Validators.pattern(INTEGER_REGEX)]]
  });

  constructor(
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProduct();
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

  loadProduct() {
    const productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.productsService.getProduct(productId).subscribe((product) => {
      // Store product
      this.product = product;

      // Fill forms
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

      this.productDescriptionForm.setValue({
        description: product.description,
        notice: product.notice,
        grade: product.grade
      });
    });
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
          this.product = { ...this.product, ...updateData }; // Update specific props -> really handy
          this.snackbarService.showMessage('success', 'Pomyślnie zaktualizowano dane produktu');
          this.productDataForm.reset(formValue);
        },
        error: (error) => {
          this.snackbarService.showMessage('error', error);
        }
      });
  }

  onProductDescriptionSave() {
    this.isSaving = true;
    const formValue = this.productDescriptionForm.value;
    const updateData = {
      ...formValue,
      grade: formValue.grade ? Number(formValue.grade) : null
    };

    this.productsService
      .updateProduct(this.product.id, { ...this.product, ...updateData })
      .pipe(
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: () => {
          this.product = { ...this.product, ...updateData }; // Update specific props -> really handy
          this.snackbarService.showMessage('success', 'Pomyślnie zaktualizowano dane produktu');
          this.productDescriptionForm.reset(formValue);
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
}
