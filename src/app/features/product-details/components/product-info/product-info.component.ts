import { Component, computed, effect, inject, input, OnDestroy, signal } from '@angular/core';
import { WishlistService } from '../../../../core/services/wishlist.service';
import { Product } from '../../../../core/interfaces/product.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { CartService } from '../../../../core/services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-info',
  imports: [RouterLink, CurrencyPipe, FormsModule],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css',
})
export class ProductInfoComponent implements OnDestroy {
  wishlist = inject(WishlistService);
  cart = inject(CartService);

  product = input<Product>();

  isWishlist = signal(false);
  addedToCart = signal(false);
  quantity = signal(1);
  image = signal('');
  priceAfterDiscount = computed(() => {
    const price = this.product()?.price ?? 0;
    const discount = this.product()?.priceAfterDiscount ?? 0;
    return discount < price ? discount : price;
  });
  discountPercentage = computed(() => {
    const price = this.product()?.price ?? 0;
    const discount = this.product()?.priceAfterDiscount ?? 0;
    if (discount >= price) return 0;
    return Math.round(((price - discount) / price) * 100);
  });
  resetTimer: any;

  constructor() {
    effect(() => {
      this.isWishlist.set(this.wishlist.wishlist().includes(this.product() as Product));
      this.image.set(this.product()?.imageCover ?? '');
    });
  }

  toggleWishlist(): void {
    if (!this.product()) return;
    this.wishlist.toggle(this.product()!);
  }

  addToCart(): void {
    if (!this.product()) return;
    this.cart.add(this.product()!);
    this.addedToCart.set(true);

    clearTimeout(this.resetTimer);

    this.resetTimer = setTimeout(() => {
      this.addedToCart.set(false);
    }, 3000);
  }

  increase(): void {
    const maxQty = this.product()?.quantity ?? 0;
    if (this.quantity() < maxQty) {
      this.quantity.update(val => val + 1);
    }
  }

  decrease(): void {
    if (this.quantity() > 1) {
      this.quantity.update(val => val - 1);
    }
  }
  changeImage(img: string): void {
    this.image.set(img);
  }

  ngOnDestroy(): void {
    clearTimeout(this.resetTimer);
  }
}
