import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../../../../core/interfaces/product.interface';
import { ProductCardComponent } from "../../../../shared/components/product-card/product-card.component";

@Component({
  selector: 'app-products-grid',
  imports: [ProductCardComponent],
  templateUrl: './products-grid.component.html',
  styleUrl: './products-grid.component.css',
})
export class ProductsGridComponent {
    private readonly productService = inject(ProductsService);

  allProducts = signal<Product[]>([]);
  isLoading = signal(false);


  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() :void{
    this.isLoading.set(true);
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.allProducts.set(res.data);
        console.log(this.allProducts());
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        console.log(err);
      },
    });
  }
}
