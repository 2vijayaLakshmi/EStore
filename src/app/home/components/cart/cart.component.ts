
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartItem,DeliveryAddress } from '../../types/cart.type';
import { Router } from '@angular/router';
import { CartStoreItem } from '../../services/category/cart/cart.storeItem';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loggedInUser } from '../../types/user.type';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/category/users/user-service.service';
import { OrderService } from '../../services/category/order/order.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  orderForm: FormGroup;
  faTrash = faTrash;
  user: loggedInUser;
  subscriptions: Subscription = new Subscription();
  alertType: number = 0;
  alertMessage: string = '';
  disableCheckout: boolean = false;

  constructor(public cartStore: CartStoreItem, private router: Router,    private fb: FormBuilder,
    private userService: UserService,
    private orderService: OrderService) {
      this.user = {
        firstname: '',
        lastname: '',
        address: '',
        city: '',
        state: '',
        pin: '',
        email: '',
      };
      this.subscriptions.add(
        userService.loggedInUser$.subscribe((loggedUser) => {
          if (loggedUser.firstname) {
            this.user = loggedUser;
          }
        })
      );
    }

    ngOnInit(): void {
      this.orderForm = this.fb.group({
        name: [
          `${this.user.firstname} ${this.user.lastname}`,
          Validators.required,
        ],
        address: [this.user.address, Validators.required],
        city: [this.user.city, Validators.required],
        state: [this.user.state, Validators.required],
        pin: [this.user.pin, Validators.required],
      });
    }

  navigateToHome(): void {
    this.router.navigate(['home/products']);
  }

  updateQuantity($event: any, cartItem: CartItem): void {
    if ($event.target.innerText === '+') {
      this.cartStore.addProduct(cartItem.product);
    } else if ($event.target.innerText === '-') {
      this.cartStore.decreaseProductQuantity(cartItem);
    }
  }

  removeItem(cartItem: CartItem): void {
    this.cartStore.removeProduct(cartItem);
  }

  onSubmit(): void {
    if (this.userService.isUserAuthenticated) {
      const deliveryAddress: DeliveryAddress = {
        userName: this.orderForm.get('name')?.value,
        address: this.orderForm.get('address')?.value,
        city: this.orderForm.get('city')?.value,
        state: this.orderForm.get('state')?.value,
        pin: this.orderForm.get('pin')?.value,
      };
      this.subscriptions.add(
        this.orderService
          .saveOrder(deliveryAddress, this.user.email)
          .subscribe({
            next: (result) => {
              this.cartStore.clearCart();
              this.alertType = 0;
              this.alertMessage = 'Order registered successfully!';
              this.disableCheckout = true;
            },
            error: (error) => {
              this.alertType = 2;
              if (error.error.message === 'Authorization failed!') {
                this.alertMessage = 'Please log in to register your order.';
              } else {
                this.alertMessage = error.error.message;
              }
            },
          })
      );
    }
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
