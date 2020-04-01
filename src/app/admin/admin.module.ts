import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import 'firebase/storage';

import { SharedModule } from '../shared/shared.module';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';


const routes: Routes = [
  { 
    path: 'admin/products/new', 
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  { 
    path: 'admin/products/:id', 
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  { 
    path: 'admin/products', 
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  { 
    path: 'admin/orders', 
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  }
];


@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
