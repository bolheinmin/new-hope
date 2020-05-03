import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Ingredient } from '../models/ingredient';

@Injectable({
	providedIn: 'root'
})
export class IngredientService {
	ingredientsCollection: AngularFirestoreCollection<Ingredient>;

	constructor(private afs: AngularFirestore) {
		this.ingredientsCollection = afs.collection<Ingredient>('ingredients');
	}

	create(ingredient) {
		this.ingredientsCollection.add(ingredient);
	}

	getAllIngredients(): Observable<Ingredient[]> {
		return this.ingredientsCollection.snapshotChanges().pipe(
			map((ingredients) =>
				ingredients.map((ingredient) => {
					const id = ingredient.payload.doc.id;
					const data = ingredient.payload.doc.data();

					return { id, ...data };
				})
			)
		);
	}

	get(ingredientId: string): Observable<Ingredient> {
		return this.ingredientsCollection.doc<Ingredient>(ingredientId).valueChanges();
	}

	update(ingredientId: string, ingredient: Ingredient) {
		this.ingredientsCollection.doc<Ingredient>(ingredientId).update(ingredient);
	}

	delete(ingredientId) {
		this.ingredientsCollection.doc(ingredientId).delete();
	}
}
