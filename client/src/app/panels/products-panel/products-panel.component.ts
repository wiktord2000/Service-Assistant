import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/core/models/product';
import { ProductsService } from 'src/app/core/services/http/products.service';
import { SnackbarService } from 'src/app/core/services/ui/snackbar.service';
import { CreateProductDialogComponent } from 'src/app/shared/dialogs/create-product-dialog/create-product-dialog.component';
import { ProductsTableComponent } from 'src/app/shared/tables/products-table/products-table.component';

@Component({
  selector: 'app-products-panel',
  templateUrl: './products-panel.component.html',
  styleUrls: ['./products-panel.component.css']
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
      width: '700px'
    });
    dialogRef.afterClosed().subscribe((product: Product) => {
      if (product !== undefined) this.productsTable.dataSource.addProduct(product);
    });
  }
}
