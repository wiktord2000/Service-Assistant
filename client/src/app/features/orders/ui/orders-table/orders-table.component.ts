import { SnackbarService } from 'src/app/shared/ui/snackbar/snackbar.service';
import { Component, OnInit, ViewChild, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Order } from 'src/app/core/models/Order';
import { OrdersService } from 'src/app/features/orders/data-access/orders.service';
import { OrdersTableDataSource } from './orders-table-datasource';
import { Status } from 'src/app/core/models/Status';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/ui/confirm-dialog/confirm-dialog.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription, distinctUntilChanged, map } from 'rxjs';
import { DateAndTimeInputEvent } from 'src/app/shared/ui/inputs/date-and-time-input/date-and-time-input.component';

const COMPLETE_COLUMN_LIST = [
  'orderNumber',
  'createDate',
  'finishDate',
  'status',
  'client',
  'vehicle',
  'admissionDate',
  'deadlineDate',
  'totalGross',
  'actions'
];

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
  dataSource: OrdersTableDataSource;
  displayedColumns = COMPLETE_COLUMN_LIST;
  shrinkDates: boolean = false;
  subscription: Subscription;
  isLargeScreen$ = this.breakpointObserver.observe([Breakpoints.Large, Breakpoints.XLarge]).pipe(
    map((event) => event.matches),
    distinctUntilChanged()
  );

  constructor(
    public ordersService: OrdersService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.subscription = this.isLargeScreen$.subscribe((value) => {
      this.shrinkDates = !value;
    });
    this.dataSource = new OrdersTableDataSource(this.ordersService, this.initialData ?? []);
    this.displayedColumns = this.displayedColumns.filter(
      (column) =>
        !(
          (column === 'client' && this.hideClientColumn) ||
          (column === 'vehicle' && this.hideVehicleColumn)
        )
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onDateUpdate(event: DateAndTimeInputEvent, orderId: number, dateType: 'admission' | 'deadline') {
    const orderToUpdate = this.dataSource.getOrders().find((order) => order.id === orderId);
    if (!orderToUpdate) {
      this.snackbarService.showMessage('error', 'Niepoprawne ID zlecenia!');
      return;
    }
    const payload =
      dateType === 'admission' ? { admissionDate: event.date } : { deadlineDate: event.date };

    this.ordersService.updateOrderPatch(orderId, payload).subscribe({
      next: () => {
        this.snackbarService.showMessage('success', 'Pomyślnie zaktualizowano dane!');
      },
      error: (error) => {
        console.log(error);
        this.snackbarService.showMessage('error', 'Problem z aktualizacją daty!');
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
        this.snackbarService.showMessage('error', 'Problem z aktualizacją daty!');
      }
    });
  }

  onDeleteClick(order: Order) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        headerText: 'Usuwanie zlecenia',
        bodyText: `<h3>Jesteś pewny, że chcesz usunąć zlecenie o numerze <strong>${order.orderNumber}</strong> ?<h3>`
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.ordersService.deleteOrder(order.id).subscribe({
        next: () => {
          this.snackbarService.showMessage('success', 'Pomyślnie usunięto zlecenie');
          this.dataSource.deleteOrder(order.id);
        },
        error: () => {
          this.snackbarService.showMessage('error', 'Problem z usunięciem zlecenia');
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
