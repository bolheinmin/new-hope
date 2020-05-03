import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { Ingredient } from 'shared/models/ingredient';

import { IngredientService } from '../../../shared/services/ingredient.service';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Meal } from '../../../shared/models/meal';
import { MealService } from '../../../shared/services/meal.service';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: [ './products.component.css' ]
})
export class ProductsComponent implements OnInit {
	meals: Meal = { id: '', name: '', description: '', ingredients: '', meat: '', imageUrl: '' };
	ingredients: Ingredient[] = [];
	filteredIngredients: Ingredient[] = [];
	meal: string;
	cart;
	id: string;

	constructor(
		private route: ActivatedRoute,
		private ingredientService: IngredientService,
		private cartService: ShoppingCartService,
		private mealService: MealService
	) {}

	async ngOnInit() {
		this.cart = (await this.cartService.getCart()).subscribe((cart) => (this.cart = cart));

		this.id = this.route.snapshot.paramMap.get('id');
		if (this.id) this.mealService.get(this.id).pipe(take(1)).subscribe((m) => (this.meals = m));

		this.ingredientService
			.getAllIngredients()
			.pipe(
				switchMap((ingredients) => {
					this.ingredients = ingredients;
					return this.route.queryParamMap;
				})
			)
			.subscribe((params) => {
				this.meal = params.get('meal');

				this.filteredIngredients = this.meal
					? this.ingredients.filter((i) => i.meal === this.meal)
					: this.ingredients;
			});
	}
}
