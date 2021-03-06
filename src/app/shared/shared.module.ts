import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular5-data-table';
import { CustomFormsModule } from 'ngx-custom-validators';

import { MaterialModule } from '../material/material.module';
import { IngredientCardComponent } from './components/ingredient-card/ingredient-card.component';
import { IngredientQuantityComponent } from './components/ingredient-quantity/ingredient-quantity.component';

@NgModule({
	declarations: [ IngredientCardComponent, IngredientQuantityComponent ],
	imports: [
		CommonModule,
		FormsModule,
		CustomFormsModule,
		AngularFirestoreModule,
		AngularFireAuthModule,
		MaterialModule
	],
	exports: [
		IngredientCardComponent,
		IngredientQuantityComponent,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		CustomFormsModule,
		DataTableModule,
		AngularFirestoreModule,
		AngularFireAuthModule,
		MaterialModule
	]
})
export class SharedModule {}
