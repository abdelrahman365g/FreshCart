import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Product } from '../../../../core/interfaces/product.interface';
import { WishlistService } from '../../../../core/services/wishlist.service';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-wishlist-item',
  imports: [RouterLink , CurrencyPipe],
  templateUrl: './wishlist-item.component.html',
  styleUrl: './wishlist-item.component.css',
})
export class WishlistItemComponent {
  wishlistService = inject(WishlistService);
  cart = inject(CartService);

  product = input<Product>();
  added = signal(false);

  addToCart(): void {
    if(!this.product()) return;
    this.cart.add(this.product()!);
    this.added.set(true);
  }

  remove(): void {
    if(!this.product()) return ;
    this.wishlistService.removeProductFromWishlist(this.product()?._id ?? '');
  }
}
