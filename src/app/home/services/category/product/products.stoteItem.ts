import { Product } from './../../../types/products.type';
import { StoreItem } from "src/app/shared/storeItem";
import { ProductsService } from './products.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { products } from 'src/app/home/components/products/products.data';

@Injectable()

export class ProductsStoreItem extends StoreItem<Product[]>{

  constructor(private productService : ProductsService){
    super([]);
  }

  async loadProduct(query?: string){
    this.productService.getAllProducts(query).subscribe((prod)=>{
      this.setValue(prod);
    })
  }

  get products$(): Observable<Product[]>{
    return this.value$;
  }


}
