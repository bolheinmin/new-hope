import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore/public_api';
import { Order } from '../models/order';
import { ShoppingCartService } from './shopping-cart.service';

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

  getOrders() {
    return this.ordersCollection.snapshotChanges();
  }

  getOrdersByUser(userId: string) {
    return this.afs.collection('/orders', ref => ref.where('userId', '==', userId)).snapshotChanges();
  }
}
