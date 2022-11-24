import { ProductsService } from './../../../_services/products.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { ProductsTableDataSource } from './products-table-datasorce';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ConfirmDialogComponent } from '../../_dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator; // ! - assured that paginator exists
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;
  @Input() initialData?: Product[];
  @Input() matElevationValue?: number = 8;
  @Input() fixedSize?: boolean = true;
  @Input() isGross: boolean;

  dataSource: ProductsTableDataSource;
  displayedColumns = [
    'name',
    'code',
    'unit',
    'availability',
    'buyPrice',
    'salesPrice',
    'manufacturer',
    'lastDelivery',
    'actions'
  ];

  constructor(
    public productsService: ProductsService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    // Create DataSource (with initialData if needed)
    this.dataSource = new ProductsTableDataSource(this.productsService, this.initialData);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onDeliveryClick(product: Product) {
    // const dialogRef = this.dialog.open(CreateProductDialogComponent, {
    //   data: {
    //     product: product
    //   }
    // });
    // dialogRef.afterClosed().subscribe((product: Product) => {
    //   if (!product) return;
    //   console.log(product);
    //   this.dataSource.updateProduct(product);
    // });
  }

  onDeleteClick(product: Product) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        headerText: 'Usuwanie produktu',
        bodyText: `<h3>Czy na pewno chcesz usunąć produkt <strong>${product.name}</strong> ?<h3>`
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.productsService.deleteProduct(product.id).subscribe({
        next: () => {
          this.snackbarService.showMessage('success', 'Pomyślnie usunięto produkt');
          this.dataSource.deleteProduct(product.id);
        },
        error: () => {
          this.snackbarService.showMessage('error', 'Problem z usunięciem produktu');
        }
      });
    });
  }
}
