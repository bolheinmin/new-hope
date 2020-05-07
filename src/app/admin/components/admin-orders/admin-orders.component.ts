import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { switchMap } from 'rxjs/operators';
import { Order } from '../../../shared/models/order';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Ingredient } from 'shared/models/ingredient';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
	selector: 'app-admin-orders',
	templateUrl: './admin-orders.component.html',
	styleUrls: [ './admin-orders.component.css' ]
})
export class AdminOrdersComponent implements OnInit {
	orders: Order[];
	subscription: Subscription;
	listData: MatTableDataSource<Order>;
	displayedColumns: string[] = [ 'name', 'phNum', 'date', 'actions' ];
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	
	// orders$;

	constructor(private orderService: OrderService) {
		// this.orders$ = orderService.getAllOrder();
	}

	ngOnInit() {
		this.subscription = this.orderService.getAllOrder().subscribe((orders) => {
			this.orders = orders;

			this.initializeTable(orders);
		});
	}

	// ngOnDestroy() {
	// 	this.subscription.unsubscribe();
	// }

	private initializeTable(order) {
		this.listData = new MatTableDataSource(order);
		this.listData.sort = this.sort;
		this.listData.paginator = this.paginator;
	}
}
