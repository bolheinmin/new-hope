import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'shared/models/category';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<Category[]>;
  product: Product = { id: '', title: '', category: '', price: 0, imageUrl: '' };
  id: string;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {

     }

  ngOnInit() {
    this.categories$ = this.categoryService.getAllCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id)
      this.productService.get(this.id).pipe(take(1))
        .subscribe(p => this.product = p);
  }

  save(product){
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if( !confirm('Are you sure want to delete')) return;
    
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
