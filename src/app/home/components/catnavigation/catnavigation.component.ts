import { CategoriesStoreItem } from '../../services/category/category/categories.storeItem';
import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { Category } from '../../types/category.type';
import {NavigationEnd, Router} from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/category/users/user-service.service';



@Component({
  selector: 'app-catnavigation',
  templateUrl: './catnavigation.component.html',
  styleUrls: ['./catnavigation.component.scss'],
})
export class CatnavigationComponent {

  subscription: Subscription = new Subscription();
  @Output() categoryClicked: EventEmitter<number> = new EventEmitter<number>();

  displayOptions: boolean = true;


  isUserAuthenticated: boolean = false;

  constructor(
    public categoriesStoreItem: CategoriesStoreItem,
    private router: Router,
    private userService: UserService
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.displayOptions = (event as NavigationEnd).url === '/home/products' ? true : false;
      });

      this.subscription.add(this.userService.isUserAuthenticated$.subscribe((result)=>{
        this.isUserAuthenticated = result;
      }))
  }

  onCategoryClicked(category: Category): void {
    this.categoryClicked.emit(category.id);
  }

}
