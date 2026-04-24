import { Component, input, signal } from '@angular/core';
import { Product } from '../../../../core/interfaces/product.interface';

@Component({
  selector: 'app-product-tabs',
  imports: [],
  templateUrl: './product-tabs.component.html',
  styleUrl: './product-tabs.component.css',
})
export class ProductTabsComponent {
  product = input<Product>();

  activeTab = signal<'details' | 'reviews' | 'shipping'>('details');

  setTab(tab: 'details' | 'reviews' | 'shipping') {
  this.activeTab.set(tab);
}

}
