import { DateAndTimePickerEvent } from '../../date-and-time-picker/date-and-time-picker.component';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { Component, OnInit, ViewChild, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Order } from 'src/app/core/models/Order';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { OrdersTableDataSource } from './orders-table-datasource';
import { Status } from 'src/app/core/models/Status';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

enum OrderTableColumns {
  orderNumber = 'orderNumber',
  createDate = 'createDate',
  finishDate = 'finishDate',
  status = 'status',
  client = 'client',
  vehicle = 'vehicle',
  admissionDate = 'admissionDate',
  deadlineDate = 'deadlineDate',
  totalGross = 'totalGross',
  actions = 'actions'
}

const FILTERED_COLUMNS = {
  MEDIUM: [OrderTableColumns.createDate, OrderTableColumns.admissionDate],
  SMALL: [
    OrderTableColumns.createDate,
    OrderTableColumns.admissionDate,
    OrderTableColumns.finishDate
  ],
  XSMALL: [
    OrderTableColumns.createDate,
    OrderTableColumns.finishDate,
    OrderTableColumns.admissionDate,
    OrderTableColumns.deadlineDate
  ]
};

const FULL_SIZE_COLUMNS = Object.values(OrderTableColumns);
const MEDIUM_SIZE_COLUMNS = FULL_SIZE_COLUMNS.filter(
  (column) => !FILTERED_COLUMNS.MEDIUM.includes(column)
);
const SMALL_SIZE_COLUMNS = FULL_SIZE_COLUMNS.filter(
  (column) => !FILTERED_COLUMNS.SMALL.includes(column)
);
const XSMALL_SIZE_COLUMNS = FULL_SIZE_COLUMNS.filter(
  (column) => !FILTERED_COLUMNS.XSMALL.includes(column)
);

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Order>;
  @Input() initialData?: Order[];
  @Input() hideClientColumn?: boolean = false;
  @Input() hideVehicleColumn?: boolean = false;
  @Input() matElevationValue?: number = 8;
  @Input() fixedSize?: boolean = true;
  dataSource: OrdersTableDataSource;
  columnsVariant = {
    fullSize: FULL_SIZE_COLUMNS,
    medium: MEDIUM_SIZE_COLUMNS,
    small: SMALL_SIZE_COLUMNS,
    xsmall: XSMALL_SIZE_COLUMNS
  };
  displayedColumns!: OrderTableColumns[];
  breakpointSubscription: Subscription;
  shrinkDates: boolean = false;

  constructor(
    public ordersService: OrdersService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {}
  ngOnInit(): void {
    this.subscribeBreakpoints();
    this.dataSource = new OrdersTableDataSource(this.ordersService, this.initialData ?? []);
    const columnsToHide = [
      this.hideClientColumn && OrderTableColumns.client,
      this.hideVehicleColumn && OrderTableColumns.vehicle
    ];
    // Alter columns variants
    Object.keys(this.columnsVariant).forEach(
      (key) =>
        (this.columnsVariant[key] = this.columnsVariant[key].filter(
          (column) => !columnsToHide.includes(column)
        ))
    );
    this.displayedColumns = this.columnsVariant.fullSize;
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  ngOnDestroy(): void {
    this.breakpointSubscription.unsubscribe();
  }

  subscribeBreakpoints() {
    this.breakpointSubscription = this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .subscribe((result) => {
        if (!result.matches) {
          this.displayedColumns = this.columnsVariant.fullSize;
          this.shrinkDates = false;
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.displayedColumns = this.columnsVariant.medium;
          this.shrinkDates = true;
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.displayedColumns = this.columnsVariant.small;
        } else if (result.breakpoints[Breakpoints.XSmall]) {
          this.displayedColumns = this.columnsVariant.xsmall;
        }
      });
  }

  onDateUpdate(event: DateAndTimePickerEvent, orderId: number, dateType: 'admission' | 'deadline') {
    const orderToUpdate = this.dataSource.getOrders().find((order) => order.id === orderId);
    if (!orderToUpdate) {
      this.snackbarService.showMessage('error', 'Incorrect order ID');
      return;
    }
    const payload =
      dateType === 'admission' ? { admissionDate: event.date } : { deadlineDate: event.date };

    this.ordersService.updateOrderPatch(orderId, payload).subscribe({
      next: () => {
        this.snackbarService.showMessage('success', 'Successfully updated the date');
      },
      error: (error) => {
        console.log(error);
        this.snackbarService.showMessage('error', 'Failed to update date');
        // Restore previous date
        event.restorePreviousDate();
      }
    });
  }

  onStatusUpdate(updatedStatus: Status) {
    // Find corresponding order
    const orderToUpdate = this.dataSource
      .getOrders()
      .find((order) => order.status.id == updatedStatus.id);

    this.ordersService.updateOrder({ ...orderToUpdate, finishDate: new Date() }).subscribe({
      next: (order: Order) => {
        // Update table
        let updatedOrders = this.dataSource
          .getOrders()
          .map((o) =>
            o.id === order.id ? { ...o, finishDate: order.finishDate, status: updatedStatus } : o
          );
        this.dataSource.setOrders(updatedOrders);
      },
      error: () => {
        this.snackbarService.showMessage('error', 'Failed to update status change date');
      }
    });
  }

  onDeleteClick(order: Order) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        headerText: 'Order deletion',
        bodyText: `<h3>Are you sure you want to remove the order <strong>${order.orderNumber}</strong> ?<h3>`
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.ordersService.deleteOrder(order.id).subscribe({
        next: () => {
          this.snackbarService.showMessage('success', 'Successfully removed the order');
          this.dataSource.deleteOrder(order.id);
        },
        error: () => {
          this.snackbarService.showMessage('error', 'Problem with order deletion');
        }
      });
    });
  }
}
