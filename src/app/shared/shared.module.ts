import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbDropdownModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular5-data-table';
import { CustomFormsModule } from 'ngx-custom-validators';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    MaterialModule,
    NgbDropdownModule,
    NgbCollapseModule,
    NgbAccordionModule
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    MaterialModule,
    NgbDropdownModule,
    NgbCollapseModule,
    NgbAccordionModule
  ]
})
export class SharedModule { }
