import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Meal } from '../models/meal';
import { Meat } from '../models/meat';

@Injectable({
	providedIn: 'root'
})
export class MealService {
	mealsCollection: AngularFirestoreCollection<Meal>;

	constructor(private afs: AngularFirestore) {
		this.mealsCollection = afs.collection<Meal>('meals', (ref) => ref.orderBy('name', 'desc'));
	}

	create(meal) {
		this.mealsCollection.add(meal);
	}

	getAllMeals(): Observable<Meal[]> {
		return this.mealsCollection.snapshotChanges().pipe(
			map((meals) =>
				meals.map((meal) => {
					const data = meal.payload.doc.data();
					const id = meal.payload.doc.id;
					return { id, ...data };
				})
			)
		);
	}

	get(mealId: string): Observable<Meal> {
		return this.mealsCollection.doc<Meal>(mealId).valueChanges();
	}

	update(mealId: string, meal: Meal) {
		this.mealsCollection.doc<Meal>(mealId).update(meal);
	}

	delete(mealId) {
		this.mealsCollection.doc(mealId).delete();
	}
}
