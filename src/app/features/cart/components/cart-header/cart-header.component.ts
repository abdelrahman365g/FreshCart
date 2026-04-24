import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-header',
  imports: [RouterLink],
  templateUrl: './cart-header.component.html',
  styleUrl: './cart-header.component.css',
})
export class CartHeaderComponent {
  count = input<number>(0);
}
