import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Meal } from '../../../shared/models/meal';
import { MealService } from '../../../shared/services/meal.service';

@Component({
	selector: 'app-meats',
	templateUrl: './meats.component.html',
	styleUrls: [ './meats.component.css' ]
})
export class MeatsComponent implements OnInit {
	meals: Meal[] = [];
	filteredMeals: Meal[] = [];
	meat: string;

	constructor(private route: ActivatedRoute, private mealService: MealService) {}

	async ngOnInit() {
		this.mealService
			.getAllMeals()
			.pipe(
				switchMap((meals) => {
					this.meals = meals;
					return this.route.queryParamMap;
				})
			)
			.subscribe((params) => {
				this.meat = params.get('meal');

				this.filteredMeals = this.meat ? this.meals.filter((m) => m.meat === this.meat) : this.meals;
			});
	}
}
