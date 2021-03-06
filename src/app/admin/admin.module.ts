import 'firebase/storage';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AdminIngredientsComponent } from './components/admin-ingredients/admin-ingredients.component';
import { AdminMealsComponent } from './components/admin-meals/admin-meals.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminViewOrderComponent } from './components/admin-view-order/admin-view-order.component';
import { IngredientFormComponent } from './components/ingredient-form/ingredient-form.component';
import { MealFormComponent } from './components/meal-form/meal-form.component';

const routes: Routes = [
	{
		path: 'admin/ingredients/new',
		component: IngredientFormComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'admin/ingredients/:id',
		component: IngredientFormComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'admin/meals/new',
		component: MealFormComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'admin/meals/:id',
		component: MealFormComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'admin/meals',
		component: AdminMealsComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'admin/ingredients',
		component: AdminIngredientsComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'admin/orders',
		component: AdminOrdersComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'admin/view-orders/:id',
		component: AdminViewOrderComponent,
		canActivate: [ AuthGuard ]
	}
];

@NgModule({
	declarations: [
		AdminMealsComponent,
		AdminIngredientsComponent,
		IngredientFormComponent,
		MealFormComponent,
		AdminOrdersComponent,
		AdminViewOrderComponent
	],
	imports: [ SharedModule, FormsModule, ReactiveFormsModule, MaterialModule, RouterModule.forChild(routes) ]
})
export class AdminModule {}
