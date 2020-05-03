import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Ingredient } from '../../models/ingredient';

@Component({
	selector: 'ingredient-quantity',
	templateUrl: './ingredient-quantity.component.html',
	styleUrls: [ './ingredient-quantity.component.css' ]
})
export class IngredientQuantityComponent {
	@Input('ingredient') ingredient: Ingredient;
	@Input('show-actions') showActions = true;
	@Input('shopping-cart') cart: ShoppingCart;

	constructor(private cartService: ShoppingCartService) {}

	addToCart() {
		this.cartService.addToCart(this.ingredient);
	}

	removeFromCart() {
		this.cartService.removeFromCart(this.ingredient);
	}
}
