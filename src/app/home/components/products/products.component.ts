import { Component, OnInit } from '@angular/core';
import { ProductsStoreItem } from '../../services/category/product/products.stoteItem';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartStoreItem } from '../../services/category/cart/cart.storeItem';
import { Product } from '../../types/products.type';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  faShoppingCart = faShoppingCart;

  constructor(public productsStoreItem: ProductsStoreItem, private cart: CartStoreItem) {}

  ngOnInit() {}

  addToCart(product: Product){
    this.cart.addProduct(product)
  }
}
