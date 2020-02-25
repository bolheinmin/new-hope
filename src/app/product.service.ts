import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productCollection: AngularFirestoreCollection<Product>;

  constructor(private afs: AngularFirestore) {
    this.productCollection = afs.collection<Product>('products');
   }

  create(product){
    this.productCollection.add(product);
  }
}
