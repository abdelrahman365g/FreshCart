import { Component, computed, inject } from '@angular/core';
import { WishlistHeaderComponent } from "../../components/wishlist-header/wishlist-header.component";
import { WishlistService } from '../../../../core/services/wishlist.service';
import { WishlistItemComponent } from "../../components/wishlist-item/wishlist-item.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-wishlist-page',
  imports: [WishlistHeaderComponent, WishlistItemComponent, RouterLink],
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.css',
})
export class WishlistPageComponent {
  wishlistService = inject(WishlistService);

  wishlist = computed(()=> this.wishlistService.wishlist());
  itemsCount = computed(() => this.wishlist().length);
}
