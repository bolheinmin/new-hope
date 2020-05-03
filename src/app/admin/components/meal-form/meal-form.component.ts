import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meat } from 'shared/models/meat';
import { AngularFireStorage } from '@angular/fire/storage';
import { MeatService } from 'shared/services/meat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take, finalize } from 'rxjs/operators';
import { Meal } from 'shared/models/meal';
import { MealService } from 'shared/services/meal.service';

@Component({
	selector: 'app-meal-form',
	templateUrl: './meal-form.component.html',
	styleUrls: [ './meal-form.component.css' ]
})
export class MealFormComponent implements OnInit {
	imgSrc: string;
	selectedImage: any = null;

	meat$: Observable<Meat[]>;
	meal: Meal = { id: '', name: '', description: '', ingredients: '', meat: '', imageUrl: '' };
	id: string;

	constructor(
		private storage: AngularFireStorage,
		private mealService: MealService,
		private meatService: MeatService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.meat$ = this.meatService.getAllMeat();

		this.id = this.route.snapshot.paramMap.get('id');
		if (this.id) this.mealService.get(this.id).pipe(take(1)).subscribe((m) => (this.meal = m));
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

	save(meal) {
		var filePath = `${meal.meat}/${this.selectedImage.name
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
						meal.imageUrl = url;
						this.mealService.create(meal);
						this.router.navigate([ '/admin/meals' ]);
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
