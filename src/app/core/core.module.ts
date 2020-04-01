import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    HomeComponent,
    NavBarComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    SharedModule,
    FontAwesomeModule,
    MaterialModule,
    RouterModule.forChild([])
  ],
  exports: [
    NavBarComponent,
    LoginComponent
  ]
})
export class CoreModule { }
