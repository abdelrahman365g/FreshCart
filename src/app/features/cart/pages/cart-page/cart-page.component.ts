import { Component, computed, inject } from '@angular/core';
import { CartHeaderComponent } from '../../components/cart-header/cart-header.component';
import { CartService } from '../../../../core/services/cart.service';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  imports: [CartHeaderComponent, CartItemComponent , CurrencyPipe],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  cart = inject(CartService);

  cartItems = computed(() => this.cart.cart());

  get subtotal() {
    return this.cartItems().reduce((sum, i) => sum + i.product.price * i.count, 0);
  }
}
