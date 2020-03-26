import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataTableResource } from 'angular5-data-table';
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
  items: Product[] = [];
  itemCount: number;
  tableResource: DataTableResource<Product>;
  

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAllProducts()
      .subscribe(products => {
        this.products = products;

        this.initializeDataTable(products);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initializeDataTable(product) {
    this.tableResource = new DataTableResource(product);
    this.tableResource.query({ offset:0 })
      .then( items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count)
  }

  reloadItems(params) {
    if( !this.tableResource ) return;

    this.tableResource.query(params)
     .then( items => this.items = items);
  }

  filter(query: string) {
    let filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase() )) :
      this.products;

      this.initializeDataTable(filteredProducts);
  }

}
