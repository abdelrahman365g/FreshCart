import { Component ,input } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-wishlist-header',
  imports: [RouterLink],
  templateUrl: './wishlist-header.component.html',
  styleUrl: './wishlist-header.component.css',
})
export class WishlistHeaderComponent {

  itemsCount = input<number>(0);
}
