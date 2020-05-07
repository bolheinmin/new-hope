import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AdminPanel } from './components/admin-panel/admin-panel.component';
import { HelpsComponent } from './components/helps/helps.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { OtherComponent } from './components/other/other.component';


@NgModule({
  declarations: [
    AdminPanel,
    HelpsComponent,
    OtherComponent,
    NavBarComponent,
    LoginComponent,
  ],
  imports: [
    SharedModule,
    FontAwesomeModule,
    MaterialModule,
    RouterModule.forChild([])
  ],
  exports: [
    NavBarComponent,
    HelpsComponent,
    OtherComponent,
    LoginComponent
  ]
})
export class CoreModule { }
