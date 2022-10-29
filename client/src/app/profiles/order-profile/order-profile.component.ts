import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/_models/Order';
import { OrdersService } from 'src/app/_services/orders.service';

@Component({
  selector: 'app-order-profile',
  templateUrl: './order-profile.component.html',
  styleUrls: ['./order-profile.component.css']
})
export class OrderProfileComponent implements OnInit {

  order: Order; 

  constructor(private ordersService: OrdersService,
              private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder(){

    const orderId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.ordersService.getOrder(orderId).subscribe(order => {
      this.order = order;
    });
  }

}
