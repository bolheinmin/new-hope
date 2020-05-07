import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from 'shared/models/meal';
import { MealService } from 'shared/services/meal.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {
	meals$: Observable<Meal[]>;
	@Input('meal') meal;

	constructor(private mealService: MealService) {}

	ngOnInit() {
		this.meals$ = this.mealService.getAllMeals();
	}
}
