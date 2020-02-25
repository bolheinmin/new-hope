import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService) {

     }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();
  }

  save(product){
    this.productService.create(product);
  }

}