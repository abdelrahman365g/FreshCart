import { Component } from '@angular/core';
import { ShopHeaderComponent } from "../../components/shop-header/shop-header.component";
import { ProductsGridComponent } from '../../components/products-grid/products-grid.component';

@Component({
  selector: 'app-shop-page',
  imports: [ShopHeaderComponent, ProductsGridComponent],
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.css',
})
export class ShopPageComponent {}
