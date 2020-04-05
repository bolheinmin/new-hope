
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavComponent } from './components/nav/nav.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SliderComponent } from './components/slider/slider.component';




@NgModule({
  declarations: [
    HomeComponent,
    NavBarComponent,
    NavComponent,
    SliderComponent,
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
    NavComponent,
    SliderComponent,
    LoginComponent
  ]
})
export class CoreModule { }
