import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';
import { ProductService } from './shared/services/product.service';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [
  { 
    path: '', 
    component: ProductsComponent 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: '**', component: NotFoundComponent 
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
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
    BrowserAnimationsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
