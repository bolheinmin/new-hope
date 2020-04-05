import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'shared/models/category';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit, OnDestroy {

  categories: Category[];
  subscription: Subscription;
  listData: MatTableDataSource<Category>;
  displayedColumns: string[] = ['name', 'mealType', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.subscription = this.categoryService.getAllCategories()
      .subscribe(categories => {
        this.categories = categories;

        this.initializeTable(categories);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initializeTable(category) {
    this.listData = new MatTableDataSource(category);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
  }


  onSearchClear() {
    this.searchKey = "";
  }

  filter(query: string) {
    let filteredCategories = (query) ?
      this.categories.filter(c => c.name.toLowerCase().includes(query.toLowerCase() )) :
      this.categories;

      this.initializeTable(filteredCategories);
  }
}
