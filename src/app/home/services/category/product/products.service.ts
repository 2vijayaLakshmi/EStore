import { Injectable } from '@angular/core';
import { Product } from '../../../types/products.type';
import { products } from '../../../components/products/products.data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable()
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(query?: string): Observable<Product[]> {
    let url: string = `${environment.PROURL}/product`
    if(query){
      url += '?' + query;
    }
    return this.httpClient.get<Product[]>(url);
  }

  getProduct(id: number): Observable<Product[]>{
    const url: string = `${environment.PROURL}/product/`+ id;
    return this.httpClient.get<Product[]>(url);
  }
}
