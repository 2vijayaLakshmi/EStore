import { Component, OnInit } from '@angular/core';
import { ProductsStoreItem } from '../../services/category/product/products.stoteItem';

@Component({
  selector: 'app-products-gallery',
  templateUrl: './products-gallery.component.html',
  styleUrls: ['./products-gallery.component.scss']
})
export class ProductsGalleryComponent implements OnInit {

  constructor(public productsStoreItem : ProductsStoreItem) { }

  ngOnInit(): void {
  }

  onSelectSubCategory(subCategoryId: number):void {
    this.productsStoreItem.loadProduct('subcategoryid=' + subCategoryId);
  }

}
