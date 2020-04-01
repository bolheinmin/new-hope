import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  // products: Product[];
  // subscription: Subscription;
  // items: Product[] = [];
  // itemCount: number;
  // tableResource: DataTableResource<Product>;

  products: Product[];
  subscription: Subscription;
  listData: MatTableDataSource<Product>;
  displayedColumns: string[] = ['title', 'price', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  
  

  constructor(
    private productService: ProductService,
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
    // this.listData.filterPredicate = (data, filter) => {
    //   return this.displayedColumns.some(ele => {
    //     return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
    //   });
    // };
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


  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(ProductFormComponent,dialogConfig);
  }

  onEdit(row){
    // this.service.populateForm(row);
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "60%";
    // this.dialog.open(EmployeeComponent,dialogConfig);
  }

  onDelete($key){
    // if(confirm('Are you sure to delete this record ?')){
    // this.service.deleteEmployee($key);
    // this.notificationService.warn('! Deleted successfully');
    // }
  }

  // private initializeDataTable(product) {
  //   this.tableResource = new DataTableResource(product);
  //   this.tableResource.query({ offset:0 })
  //     .then( items => this.items = items);
  //   this.tableResource.count()
  //     .then(count => this.itemCount = count)
  // }

  // reloadItems(params) {
  //   if( !this.tableResource ) return;

  //   this.tableResource.query(params)
  //    .then( items => this.items = items);
  // }

}
