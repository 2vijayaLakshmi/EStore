
import { CategoriesStoreItem } from '../../services/category/category/categories.storeItem';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import {
  faSearch,
  faUserCircle,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { SearchKeyword } from '../../types/searchKeyword.type';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CartStoreItem } from '../../services/category/cart/cart.storeItem';
import { UserService } from '../../services/category/users/user-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  faSearch = faSearch;
  faUserCircle = faUserCircle;
  faShoppingCart = faShoppingCart;

  subscription: Subscription = new Subscription();

  @Output() searchClicked: EventEmitter<SearchKeyword> =
    new EventEmitter<SearchKeyword>();

  displaySearch: boolean = true;

  isUserAuthenticated: boolean = false;
  userName: string = '';

  constructor(
    public categoriesStoreItem: CategoriesStoreItem,
    private router: Router,
    public cartStoreItem: CartStoreItem,
    private userService: UserService
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.displaySearch =
          (event as NavigationEnd).url === '/home/products' ? true : false;
      });

      this.subscription.add(this.userService.isUserAuthenticated$.subscribe((result)=>{
        this.isUserAuthenticated = result;
      }))
      this.subscription.add(this.userService.loggedInUser$.subscribe((result)=>{
        this.userName = result.firstname;
      }))
  }

  ngOnInit(): void {}

  onClickSearch(keyword: string, categoryId: string) {
    this.searchClicked.emit({
      categoryId: parseInt(categoryId),
      keyword: keyword,
    });
  }

  navigateToCart(): void {
    this.router.navigate(['home/cart']);
  }

  logout(): void{
     this.userService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
