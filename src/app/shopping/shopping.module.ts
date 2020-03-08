import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';

import { SharedModule } from '../shared/shared.module';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { 
    path: 'products', 
    component: ProductsComponent 
  },
  { 
    path: 'shopping-cart', 
    component: ShoppingCartComponent 
  },
  { 
    path: 'check-out', 
    component: CheckOutComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'order-success/:id', 
    component: OrderSuccessComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'my/orders', 
    component: MyOrdersComponent,
    canActivate: [AuthGuard]
  }
];


@NgModule({
  declarations: [
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductsComponent,
    ProductFilterComponent,
    OrderSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ShoppingModule { }
