import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Meal } from '../../../shared/models/meal';
import { MealService } from '../../../shared/services/meal.service';

@Component({
	selector: 'app-admin-meals',
	templateUrl: './admin-meals.component.html',
	styleUrls: [ './admin-meals.component.css' ]
})
export class AdminMealsComponent implements OnInit, OnDestroy {
	meals: Meal[];
	subscription: Subscription;
	listData: MatTableDataSource<Meal>;
	displayedColumns: string[] = [ 'imageUrl', 'name', 'meat', 'actions' ];
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	searchKey: string;

	constructor(private mealService: MealService, private router: Router, private dialog: MatDialog) {}

	ngOnInit() {
		this.subscription = this.mealService.getAllMeals().subscribe((meals) => {
			this.meals = meals;

			this.initializeTable(meals);
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	private initializeTable(meal) {
		this.listData = new MatTableDataSource(meal);
		this.listData.sort = this.sort;
		this.listData.paginator = this.paginator;
	}

	onSearchClear() {
		this.searchKey = '';
	}

	filter(query: string) {
		let filteredMeals = query
			? this.meals.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
			: this.meals;

		this.initializeTable(filteredMeals);
	}
	onDelete(id) {
		if (!confirm('Are you sure want to delete')) return;
		this.mealService.delete(id);
	}
}
