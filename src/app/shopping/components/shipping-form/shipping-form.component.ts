import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Order } from '../../../shared/models/order';
import { take } from 'rxjs/operators';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Shipping } from '../../../shared/models/shipping';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: ShoppingCart;
  shipping: Shipping = { id: '', name: '', addressLine1: '', addressLine2: '', city: '' };
  private userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService) {}
  
  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.id]);
  }
}
