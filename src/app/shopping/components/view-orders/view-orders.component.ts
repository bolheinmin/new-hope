import { Component, OnInit } from '@angular/core';
import { Order } from 'shared/models/order';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {

  order: Order;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
    ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
		if (this.id) this.orderService.get(this.id).pipe(take(1)).subscribe((o) => (this.order = o));
  }

}