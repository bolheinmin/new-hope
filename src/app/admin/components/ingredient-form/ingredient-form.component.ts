import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

import { Ingredient } from '../../../shared/models/ingredient';
import { Meal } from '../../../shared/models/meal';
import { IngredientService } from '../../../shared/services/ingredient.service';
import { MealService } from '../../../shared/services/meal.service';

@Component({
	selector: 'app-ingredient-form',
	templateUrl: './ingredient-form.component.html',
	styleUrls: [ './ingredient-form.component.css' ]
})
export class IngredientFormComponent implements OnInit {
	imgSrc: string;
	selectedImage: any = null;

	meals$: Observable<Meal[]>;
	ingredient: Ingredient = { id: '', title: '', meal: '', price: 0, imageUrl: '' };
	id: string;

	constructor(
		private storage: AngularFireStorage,
		private mealService: MealService,
		private ingredientService: IngredientService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.meals$ = this.mealService.getAllMeals();

		this.id = this.route.snapshot.paramMap.get('id');
		if (this.id) this.ingredientService.get(this.id).pipe(take(1)).subscribe((i) => (this.ingredient = i));
	}

	showPreview(event: any) {
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();
			reader.onload = (e: any) => (this.imgSrc = e.target.result);
			reader.readAsDataURL(event.target.files[0]);
			this.selectedImage = event.target.files[0];
		} else {
			//this.imgSrc = '/assets/img/image_placeholder.jpg';
			this.selectedImage = null;
		}
	}

	save(ingredient) {
		var filePath = `${ingredient.category}/${this.selectedImage.name
			.split('.')
			.slice(0, -1)
			.join('.')}_${new Date().getTime()}`;
		const fileRef = this.storage.ref(filePath);
		this.storage
			.upload(filePath, this.selectedImage)
			.snapshotChanges()
			.pipe(
				finalize(() => {
					fileRef.getDownloadURL().subscribe((url) => {
						ingredient.imageUrl = url;
						this.ingredientService.create(ingredient);
						this.router.navigate([ '/admin/ingredients' ]);
					});
				})
			)
			.subscribe();
	}

	// save(product){
	//   if(this.id) this.productService.update(this.id, product);
	//   else this.productService.create(product);

	//   this.router.navigate(['/admin/products']);
	// }
}
