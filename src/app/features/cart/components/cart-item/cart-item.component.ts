import { Component, inject, input } from '@angular/core';
import { CartItem } from '../../interfaces/cart-item.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [RouterLink],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  cart = inject(CartService);
  item = input<CartItem>();

  increament() {
    if (!this.item()) return;
    this.cart.updateQuantity(this.item()!.product._id, this.item()!.count + 1).subscribe();
  }

  decreament() {
    if (!this.item()) return;
    this.cart.updateQuantity(this.item()!.product._id, this.item()!.count - 1).subscribe();
  }

  remove() {
    if (!this.item()) return;
    this.cart.remove(this.item()!.product._id);
  }
}
