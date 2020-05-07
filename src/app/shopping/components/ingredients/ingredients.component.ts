import { Component, OnInit } from '@angular/core';
import { Meal } from 'shared/models/meal';
import { Ingredient } from 'shared/models/ingredient';
import { ActivatedRoute } from '@angular/router';
import { IngredientService } from 'shared/services/ingredient.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { MealService } from 'shared/services/meal.service';
import { take, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
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
