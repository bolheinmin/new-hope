import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Order } from '../models/order';
import { ShoppingCartService } from './shopping-cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ordersCollection: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore, 
    private cartService: ShoppingCartService) {
    this.ordersCollection = afs.collection('orders');
   }

  async placeOrder(order: Order) {

    const orderObj = {
      userId: order.userId,
      datePlaced: order.dateplaced,
      shipping: order.shipping,
      items: order.items
    };
    let result = await this.ordersCollection.add(orderObj);
    this.cartService.clearCart();
    return result;
  }

  getAllOrder(): Observable<Order[]> {
    return this.ordersCollection.snapshotChanges()
    .pipe(
      map(orders => orders.map(order => {
        const id = order.payload.doc.id;
        const data = order.payload.doc.data();

        return { id, ...data };
      }))
    );
  }

  get(orderId: string): Observable<Order> {
		return this.ordersCollection.doc<Order>(orderId).valueChanges();
	}

  // getOrders() {
  //   return this.ordersCollection.snapshotChanges();
  // }

  getOrdersByUser(userId: string) {
    return this.afs.collection('/orders', ref => ref.where('userId', '==', userId)).snapshotChanges();
  }


}
