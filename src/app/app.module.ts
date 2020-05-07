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
import { AuthGuard } from 'shared/services/auth-guard.service';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { AdminPanel } from './core/components/admin-panel/admin-panel.component';
import { HelpsComponent } from './core/components/helps/helps.component';
import { LoginComponent } from './core/components/login/login.component';
import { OtherComponent } from './core/components/other/other.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { MealsComponent } from './shopping/components/meals/meals.component';
import { MyOrdersComponent } from './shopping/components/my-orders/my-orders.component';
import { ShoppingModule } from './shopping/shopping.module';

const routes: Routes = [
	{
		path: '',
		component: MealsComponent
	},
	{
		path: 'admin/panel',
		component: AdminPanel,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'helps',
		component: HelpsComponent
	},
	{
		path: 'other',
		component: OtherComponent
	},
	{
		path: 'my/orders',
		component: MyOrdersComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'login',
		component: LoginComponent
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
