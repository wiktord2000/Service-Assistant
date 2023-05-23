import { ProductsService } from '../../data-access/products.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/core/models/product';
import { ProductsTableDataSource } from './products-table-datasorce';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/ui/snackbar/snackbar.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ConfirmDialogComponent } from '../../../../shared/ui/confirm-dialog/confirm-dialog.component';
import { ProductDeliveryDialogComponent } from '../product-delivery-dialog/product-delivery-dialog.component';
import { UtilsService } from 'src/app/shared/utils/utils.service';

const COMPLETE_COLUMN_LIST = [
  'name',
  'code',
  'unit',
  'availability',
  'buyPrice',
  'salesPrice',
  'manufacturer',
  'lastDeliveryDate',
  'actions'
];

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;
  @Input() initialData?: Product[];
  @Input() matElevationValue: number = 8;
  @Input() isGross: boolean;
  @Input() heightInRows: number = 8;
  tableHeight!: number;
  dataSource: ProductsTableDataSource;
  displayedColumns = COMPLETE_COLUMN_LIST;

  constructor(
    public productsService: ProductsService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.dataSource = new ProductsTableDataSource(this.productsService, this.initialData);
    this.tableHeight = this.utils.calculateTableHeight(this.heightInRows);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
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
        error: ({ error }) => {
          this.snackbarService.showMessage('error', error);
        }
      });
    });
  }

  onDeliveryClick(product: Product) {
    const dialogRef = this.dialog.open(ProductDeliveryDialogComponent, {
      width: '600px',
      data: { product: product }
    });
    dialogRef.afterClosed().subscribe((product: Product) => {
      if (product !== undefined) this.dataSource.updateProduct(product);
    });
  }
}
