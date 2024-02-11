
import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Category } from '../../types/category.type';
import { Subscription } from 'rxjs';
import { CategoriesStoreItem } from '../../services/category/category/categories.storeItem';

@Component({
  selector: 'app-sidenavigation',
  templateUrl: './sidenavigation.component.html',
  styleUrls: ['./sidenavigation.component.scss'],
})
export class SidenavigationComponent implements OnDestroy {
  categories: Category[] = [];
  @Output() subCategoryClicked : EventEmitter<number> = new EventEmitter<number>();

  subscription: Subscription = new Subscription();

  constructor(public categoryStore: CategoriesStoreItem) {
    this.subscription.add(
      this.categoryStore.categories$.subscribe((cat) => {
        this.categories = cat;
      })
    );
  }


  getCategories(parentCategoryId?: number): Category[] {
    return this.categories.filter((cat) =>
      parentCategoryId
        ? cat.parent_category_id === parentCategoryId
        : cat.parent_category_id === null
    );
  }

  onSubCategoryClick(subCategory: Category): void{
    this.subCategoryClicked.emit(subCategory.id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
