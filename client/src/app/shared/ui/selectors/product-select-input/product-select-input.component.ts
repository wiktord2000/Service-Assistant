import { ProductsService } from '../../../../features/products/data-access/products.service';
import { Component, EventEmitter, Input, OnInit, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, Observable, of, startWith } from 'rxjs';
import { Product } from 'src/app/core/models/Product';
import {
  CREATE_PRODUCT_DIALOG_DEFAULT_CONFIG,
  CreateProductDialogComponent
} from 'src/app/features/products/ui/create-product-dialog/create-product-dialog.component';

@Component({
  selector: 'app-product-select-input',
  templateUrl: './product-select-input.component.html',
  styleUrls: ['./product-select-input.component.scss']
})
export class ProductSelectInputComponent implements OnInit {
  @Input() label: string = 'Towar';
  @Input() selectedProduct?: Product;
  @Output() productChange: EventEmitter<Product> = new EventEmitter();
  possibleProducts: Product[] = [];
  displayingProducts: Observable<Product[]> = of([]);

  constructor(
    @Self() public ngControl: NgControl,
    public dialog: MatDialog,
    private productsService: ProductsService
  ) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    // Set up the initial Product name
    if (this.selectedProduct)
      this.ngControl.control.setValue(this.productToString(this.selectedProduct));

    // Track input value change
    this.ngControl.control.valueChanges
      .pipe(
        debounceTime(300),
        // distinctUntilChanged(),
        startWith('')
      )
      .subscribe((value: string) => {
        // Init state (even if input has any starting value the changing value will be empty string ""))
        if (value !== this.ngControl.value && this.selectedProduct) return;
        // Check that currently have a candidate (cover also case when one from the list has been selected)
        let candidates = this.possibleProducts.filter(
          (product) => this.productToString(product) === value
        );

        if (candidates.length) {
          this.selectedProduct = candidates[0];
          this.productChange.emit(candidates[0]);
          this.displayingProducts = of(candidates);
          return;
        }

        // Request
        this.loadProducts(value.toLowerCase()).subscribe((products) => {
          this.possibleProducts = products;
          this.displayingProducts = of(products);

          // Automatically select when found match
          this.selectedProduct =
            products.length === 1 &&
            this.productToString(products[0]).toLowerCase() === this.ngControl.value.toLowerCase()
              ? (this.selectedProduct = products[0])
              : null;

          // Inform about change
          this.productChange.emit(this.selectedProduct);

          // Update letter casing of input (if needed)
          if (
            this.selectedProduct &&
            this.ngControl.value !== this.productToString(this.selectedProduct)
          ) {
            this.ngControl.control.setValue(this.productToString(this.selectedProduct), {
              emitEvent: false
            });
          }

          // Errors handling
          if (this.selectedProduct) {
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

  private loadProducts(match: string) {
    return this.productsService.getProductsSearch(10, match);
  }

  clear(emitEvent: boolean = false) {
    this.selectedProduct = null;
    if (emitEvent) this.productChange.emit(null);
    this.possibleProducts = [];
    this.displayingProducts = of([]);
    this.ngControl.control.setValue('', { emitEvent: false });
  }

  productToString(product: Product) {
    return product ? product.name : '';
  }

  onAddProduct() {
    const dialogRef = this.dialog.open(CreateProductDialogComponent, {
      ...CREATE_PRODUCT_DIALOG_DEFAULT_CONFIG,
      data: { name: this.ngControl.value }
    });

    dialogRef.afterClosed().subscribe((product: Product) => {
      if (product !== undefined) {
        this.selectedProduct = product;
        this.productChange.emit(product);
        this.displayingProducts = of([product]);
        this.ngControl.control.setValue(this.productToString(product), { emitEvent: false });
      }
    });
  }

  // We don't have to use it
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}
