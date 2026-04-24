import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProductInfoComponent } from "../../components/product-info/product-info.component";
import { ProductTabsComponent } from "../../components/product-tabs/product-tabs.component";
import { RelatedProductsComponent } from "../../components/related-products/related-products.component";
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../../../../core/interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-details-page',
  imports: [ProductInfoComponent, ProductTabsComponent, RelatedProductsComponent],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.css',
})
export class ProductDetailsPageComponent implements OnInit {
  productService = inject(ProductsService);
  router = inject(ActivatedRoute);

  params = toSignal(this.router.paramMap);
  productId = computed(() => this.params()?.get('id'));
  product = signal<Product | null>(null);
  isLoading = signal(false);

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void{
    if(!this.productId) return;
    this.isLoading.set(true);
    this.productService.getProductById(this.productId()!).subscribe({
      next: (res) => {
        this.product.set(res.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        console.log(err);
      }
    });
  }
}
