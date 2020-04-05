import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { switchMap } from 'rxjs/operators';
import { Order } from '../../../shared/models/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders$;

  constructor(private orderService: OrderService) {
    this.orders$ = orderService.getAllOrder();
   }

  ngOnInit() { }
// pri(order) {
//   console.log(order.payload.doc.data().shipping.name);
// }
}
