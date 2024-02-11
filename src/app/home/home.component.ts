import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoriesStoreItem } from './services/category/category/categories.storeItem';
import { ProductsStoreItem } from './services/category/product/products.stoteItem';
import { SearchKeyword } from './types/searchKeyword.type';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private categoriesStoreItem: CategoriesStoreItem,
    private productsStoreItem: ProductsStoreItem,
    private router: Router) {
    this.categoriesStoreItem.loadCategories();
    this.productsStoreItem.loadProduct();
    router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(event => {
      if((event as NavigationEnd).url === '/home'){
        router.navigate(['/home/products'])
      }
    })
  }

  ngOnInit(): void {}

  onSelectCategory(categoryId: number): void {
    this.productsStoreItem.loadProduct('maincategoryid=' + categoryId);
  }

  onSearchKeyword(searchKeyword: SearchKeyword): void {
    this.productsStoreItem.loadProduct(
      'maincategoryid=' +
        searchKeyword.categoryId +
        '&keyword=' +
        searchKeyword.keyword
    );
  }
}
