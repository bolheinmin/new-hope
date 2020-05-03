import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'environments/environment';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { ProductFilterComponent } from './shopping/components/products/product-filter/product-filter.component';
import { ShoppingModule } from './shopping/shopping.module';
import { MeatFilterComponent } from './shopping/components/meats/meat-filter/meat-filter.component';
import { MeatsComponent } from './shopping/components/meats/meats.component';

const routes: Routes = [
	{
		path: '',
		component: ProductFilterComponent
	},
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: '**',
		component: NotFoundComponent
	}
];

@NgModule({
	declarations: [ AppComponent ],
	imports: [
		BrowserModule,
		SharedModule,
		AdminModule,
		ShoppingModule,
		CoreModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forRoot(routes),
		AngularFireModule.initializeApp(environment.firebase),
		BrowserAnimationsModule,
		LayoutModule,
		MatToolbarModule,
		MatButtonModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
