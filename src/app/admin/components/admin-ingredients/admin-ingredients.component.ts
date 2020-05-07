import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Ingredient } from '../../../shared/models/ingredient';
import { IngredientService } from '../../../shared/services/ingredient.service';

@Component({
	selector: 'app-admin-ingredients',
	templateUrl: './admin-ingredients.component.html',
	styleUrls: [ './admin-ingredients.component.css' ]
})
export class AdminIngredientsComponent implements OnInit, OnDestroy {
	ingredients: Ingredient[];
	subscription: Subscription;
	listData: MatTableDataSource<Ingredient>;
	displayedColumns: string[] = [ 'imageUrl', 'title','meal', 'price', 'actions' ];
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	searchKey: string;

	constructor(private ingredientService: IngredientService, private router: Router) {}

	ngOnInit() {
		this.subscription = this.ingredientService.getAllIngredients().subscribe((ingredients) => {
			this.ingredients = ingredients;

			this.initializeTable(ingredients);
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	private initializeTable(ingredient) {
		this.listData = new MatTableDataSource(ingredient);
		this.listData.sort = this.sort;
		this.listData.paginator = this.paginator;
	}

	onSearchClear() {
		this.searchKey = '';
	}

	filter(query: string) {
		let filteredIngredients = query
			? this.ingredients.filter((i) => i.title.toLowerCase().includes(query.toLowerCase()))
			: this.ingredients;

		this.initializeTable(filteredIngredients);
	}

	onDelete(id) {
		if (!confirm('Are you sure want to delete')) return;
		this.ingredientService.delete(id);
	}
}
