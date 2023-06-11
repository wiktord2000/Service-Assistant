import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/core/models/Product';
import { ProductsService } from 'src/app/features/products/data-access/products.service';
import { SnackbarService } from 'src/app/shared/ui/snackbar/snackbar.service';
import {
  CREATE_PRODUCT_DIALOG_DEFAULT_CONFIG,
  CreateProductDialogComponent
} from 'src/app/features/products/ui/create-product-dialog/create-product-dialog.component';
import { ProductsTableComponent } from 'src/app/features/products/ui/products-table/products-table.component';

@Component({
  selector: 'app-products-panel',
  templateUrl: './products-panel.component.html',
  styleUrls: ['./products-panel.component.scss']
})
export class ProductsPanelComponent implements OnInit {
  @ViewChild(ProductsTableComponent) productsTable!: ProductsTableComponent;
  isGross: boolean = true;

  constructor(
    public snackbarService: SnackbarService,
    public dialog: MatDialog,
    public productsService: ProductsService
  ) {}
  ngAfterViewInit(): void {
    this.productsTable.dataSource.loadProducts();
  }

  ngOnInit(): void {}

  onAddProduct() {
    const dialogRef = this.dialog.open(CreateProductDialogComponent, {
      ...CREATE_PRODUCT_DIALOG_DEFAULT_CONFIG
    });
    dialogRef.afterClosed().subscribe((product: Product) => {
      if (product !== undefined) this.productsTable.dataSource.addProduct(product);
    });
  }
}
