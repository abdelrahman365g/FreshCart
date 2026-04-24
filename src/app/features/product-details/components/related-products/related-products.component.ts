import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../../../../core/interfaces/product.interface';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-related-products',
  imports: [ProductCardComponent],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css',
})
export class RelatedProductsComponent implements OnInit {
  productService = inject(ProductsService);

  relatedProducts = signal<Product[]>([]);
  categoryId = input<String>();
  startIndex = signal(0);
  visibleCount = signal(5);
  visibleProducts = computed(() => {
    const products = this.relatedProducts();
    const start = this.startIndex();
    const count = this.visibleCount();

    return products.slice(start, start + count);
  });

  ngOnInit(): void {
    this.getRelatedProducts();
    this.updateVisibleCount();
    window.addEventListener('resize', this.updateVisibleCount.bind(this));
  }

  getRelatedProducts(): void {
    if (!this.categoryId) return;
    const filter = { 'category[in]': this.categoryId(), limit: 10 };
    this.productService.getProducts(filter).subscribe({
      next: (res) => {
        this.relatedProducts.set(res.data);
      },
    });
  }

  updateVisibleCount() {
    const w = window.innerWidth;

    if (w >= 1280) this.visibleCount.set(5);
    else if (w >= 1024) this.visibleCount.set(4);
    else if (w >= 768) this.visibleCount.set(3);
    else if (w >= 640) this.visibleCount.set(2);
    else this.visibleCount.set(1);
  }

  next() {
    const max = this.relatedProducts().length - this.visibleCount();

    this.startIndex.update((i) => Math.min(i + 1, max));
  }

  prev() {
    this.startIndex.update((i) => Math.max(i - 1, 0));
  }
}
