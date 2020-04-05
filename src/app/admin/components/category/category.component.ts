import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/models/category';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, take } from 'rxjs/operators';
import { CategoryService } from '../../../shared/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  imgSrc: string;
  selectedImage: any = null;

  category: Category = { id: '', name: '', imageUrl: '', mealType:''};
  id: string;

  constructor(
    private storage: AngularFireStorage,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() { 
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id)
      this.categoryService.get(this.id).pipe(take(1))
        .subscribe(c => this.category = c);
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

  save(category) {
    var filePath = `${category.mealType}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          category.imageUrl = url;
          this.categoryService.create(category);
          this.router.navigate(['/admin/categories']);
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
    
    this.categoryService.delete(this.id);
    this.router.navigate(['/admin/categories']);
  }
}
