import { Component, OnInit, SkipSelf } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INTEGER_REGEX, ONE_TO_TEN_REGEX } from 'src/app/core/constants/constants';
import { ProductProfileComponent } from '../product-profile/product-profile.component';
import { Product } from 'src/app/core/models/product';
import { ProductsService } from '../../data-access/products.service';
import { finalize } from 'rxjs';
import { SnackbarService } from 'src/app/shared/ui/snackbar/snackbar.service';
import { CanDeactivateComponent } from 'src/app/core/guards/can-deactivate.guard';

@Component({
  selector: 'app-product-profile-opinion',
  templateUrl: './product-profile-opinion.component.html',
  styleUrls: ['./product-profile-opinion.component.scss']
})
export class ProductProfileOpinionComponent implements OnInit, CanDeactivateComponent {
  product: Product;
  isSaving: boolean = false;
  productDescriptionForm: FormGroup = this.formBuilder.group({
    description: [''],
    notice: [''],
    grade: ['', [Validators.pattern(ONE_TO_TEN_REGEX), Validators.pattern(INTEGER_REGEX)]]
  });

  constructor(
    @SkipSelf() private productProfile: ProductProfileComponent,
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.product = this.productProfile.product;
    this.fillForm(this.product);
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
          this.product = { ...this.product, ...updateData };
          this.productProfile.product = this.product; // Update parent component
          this.snackbarService.showMessage('success', 'Pomyślnie zaktualizowano dane produktu');
          this.productDescriptionForm.reset(formValue);
        },
        error: (error) => {
          this.snackbarService.showMessage('error', error);
        }
      });
  }

  fillForm(product: Product) {
    this.productDescriptionForm.setValue({
      description: product.description,
      notice: product.notice,
      grade: product.grade
    });
  }

  canDeactivate() {
    return (
      !this.productDescriptionForm.dirty || confirm('Are you sure to unsaved the current changes?')
    );
  }
}
