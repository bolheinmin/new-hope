import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Meal } from '../../../../shared/models/meal';
import { MealService } from '../../../../shared/services/meal.service';

@Component({
	selector: 'product-filter',
	templateUrl: './product-filter.component.html',
	styleUrls: [ './product-filter.component.css' ]
})
export class ProductFilterComponent implements OnInit {
	meals$: Observable<Meal[]>;
	@Input('meal') meal;

	constructor(private mealService: MealService) {}

	ngOnInit() {
		this.meals$ = this.mealService.getAllMeals();
	}
}
