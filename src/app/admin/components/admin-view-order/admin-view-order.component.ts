import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../shared/services/order.service';
import { take } from 'rxjs/operators';
import { Order } from '../../../shared/models/order';

@Component({
  selector: 'app-admin-view-order',
  templateUrl: './admin-view-order.component.html',
  styleUrls: ['./admin-view-order.component.css']
})
export class AdminViewOrderComponent implements OnInit {
  
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
