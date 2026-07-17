import { Component, input, signal, effect, OnInit, inject } from '@angular/core';
import { Product } from '../../../core/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../../core/services/wishlist.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);

  product = input<Product>();
  images = signal<string[]>([]);
  imageCover = signal<string>('');
  counter = signal(0);
  discountPercentage = signal(0);
  isWishlist = signal(false);

  constructor() {
    effect(() => {
      this.isWishlist.set(this.wishlistService.wishlist().includes(this.product() as Product));
    });
  }

  ngOnInit(): void {
    if (this.product()?.images.length === 0) return;
    this.images.set(this.product()?.images ?? []);
    this.imageCover.set(this.product()?.imageCover ?? '');
    if (this.product()?.priceAfterDiscount) {
      const discount =
        (((this.product()?.price ?? 0) - (this.product()?.priceAfterDiscount ?? 0)) /
          (this.product()?.price ?? 1)) *
        100;
      this.discountPercentage.set(Math.round(discount));
    }
  }

  changeImage(): void {
    if (this.images().length === 0) return;
    const newCounter = (this.counter() + 1) % this.images().length;
    this.counter.set(newCounter);
    this.imageCover.set(this.images()[newCounter]);
  }

  toggleWishlist(): void {
    if (!this.product()?._id) return;
    this.wishlistService.toggle(this.product()!);
  }
  
  addToCart(): void {
    if(!this.product()) return;
    this.cartService.add(this.product()!);
  }
}
