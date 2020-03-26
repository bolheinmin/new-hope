import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'shared/models/category';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take, finalize } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  imgSrc: string;
  selectedImage: any = null;

  categories$: Observable<Category[]>;
  product: Product = { id: '', title: '', category: '', price: 0, imageUrl: '' };
  id: string;

  constructor(
    private storage: AngularFireStorage,
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

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      //this.imgSrc = '/assets/img/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }

  save(product) {
    var filePath = `${product.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          product.imageUrl = url;
          this.productService.create(product);
          this.router.navigate(['/admin/products']);
        })
      })
    ).subscribe();
  }

  // save(product){
  //   if(this.id) this.productService.update(this.id, product);
  //   else this.productService.create(product);

  //   this.router.navigate(['/admin/products']);
  // }

  delete() {
    if( !confirm('Are you sure want to delete')) return;
    
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
