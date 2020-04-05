import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  subscription: Subscription;
  listData: MatTableDataSource<Product>;
  displayedColumns: string[] = ['title', 'price', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  
  constructor(
    private productService: ProductService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.subscription = this.productService.getAllProducts()
      .subscribe(products => {
        this.products = products;

        this.initializeTable(products);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initializeTable(product) {
    this.listData = new MatTableDataSource(product);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
  }


  onSearchClear() {
    this.searchKey = "";
  }

  filter(query: string) {
    let filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase() )) :
      this.products;

      this.initializeTable(filteredProducts);
  }
}
