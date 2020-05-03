import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Ingredient } from '../models/ingredient';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
	providedIn: 'root'
})
export class ShoppingCartService {
	cartCollection: AngularFirestoreCollection<any>;

	constructor(private afs: AngularFirestore) {
		this.cartCollection = afs.collection('shoppingCarts');
	}

	private create() {
		return this.cartCollection.add({
			updatedAt: new Date()
		});
	}

	async getCart() {
		let cartId = await this.getOrCreateCartId();
		return this.getItemsCollection(cartId).snapshotChanges().pipe(map((x) => new ShoppingCart(x as any)));
	}

	private async getOrCreateCartId(): Promise<string> {
		const cartId = localStorage.getItem('cartId');
		if (!cartId) {
			let result = await this.create();
			localStorage.setItem('cartId', result.id);
			return result.id;
		} else return cartId;
	}

	async addToCart(ingredient: Ingredient) {
		this.updateItemQty(ingredient, 1);
	}

	async removeFromCart(ingredient: Ingredient) {
		this.updateItemQty(ingredient, -1);
	}

	private async updateItemQty(ingredient: Ingredient, change: number) {
		let cartId = await this.getOrCreateCartId();

		let item$ = this.getItemDoc(cartId, ingredient.id).valueChanges();
		item$.pipe(take(1)).subscribe((item: any) => {
			if (item) {
				const qty = item.quantity + change;
				if (qty === 0) this.getItemDoc(cartId, ingredient.id).delete();
				else this.getItemDoc(cartId, ingredient.id).update({ quantity: qty });
			} else
				this.getItemDoc(cartId, ingredient.id).set({
					title: ingredient.title,
					category: ingredient.meal,
					price: ingredient.price,
					imageUrl: ingredient.imageUrl,
					quantity: 1
				});
		});
	}

	async clearCart() {
		const cartId = await this.getOrCreateCartId();
		this.getItemsCollection(cartId).snapshotChanges().pipe(take(1)).subscribe((items) => {
			items.forEach((item) => {
				this.getItemDoc(cartId, item.payload.doc.id).delete();
			});
		});
	}

	private getItemsCollection(cartId) {
		return this.cartCollection.doc(cartId).collection('items');
	}

	private getItemDoc(cartId: string, ingredientId: string) {
		return this.cartCollection.doc(cartId).collection('items').doc(ingredientId);
	}
}
