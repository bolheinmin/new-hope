import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../../shared/models/category';
import { CategoryService } from '../../../../shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$: Observable<Category[]>;
  @Input('category') category;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getAllCategories();
  }

}
