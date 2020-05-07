import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';

import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { MealsComponent } from './components/meals/meals.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';



const routes: Routes = [
  { 
    path: 'meals/:id', 
    component: IngredientsComponent 
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
  },
  { 
    path: 'my/orders/:id', 
    component: ViewOrdersComponent,
    canActivate: [AuthGuard]
  }
];


@NgModule({
  declarations: [
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ViewOrdersComponent,
    IngredientsComponent,
    MealsComponent,
    OrderSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    SharedModule,
    CoreModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class ShoppingModule { }
