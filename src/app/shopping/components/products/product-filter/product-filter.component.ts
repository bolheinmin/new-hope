import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../../shared/models/category';
import { CategoryService } from '../../../../shared/services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit, OnDestroy {

  categories: Category[];
  dataSource = new MatTableDataSource<Category>();
  loading = true;
  subscriptions = [];
  displayedColumns = ['imageUrl', 'name', 'mealType', 'action'];

  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  categories$: Observable<Category[]>;
  @Input('category') category;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.categoryService
        .getAllCategories()
        .subscribe((categories) => this.onDataLoad(categories))
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onDataLoad(products: Category[]) {
    this.loading = false;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = products;
  }
}
