import { Injectable } from '@angular/core';
import { Category } from '../../../types/category.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getAllCategory(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(
      `${environment.PROURL}/productCategories`
    );
  }
}
