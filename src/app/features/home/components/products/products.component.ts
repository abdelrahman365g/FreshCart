import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductCardComponent } from "../../../../shared/components/product-card/product-card.component";
import { Product } from '../../../../core/interfaces/product.interface';
import { ProductsService } from '../../../../core/services/products.service';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private readonly productService = inject(ProductsService);

  allProducts = signal<Product[]>([]);
  isLoading = signal(false);


  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() :void{
    this.isLoading.set(true);
    this.productService.getProducts({"limit":20}).subscribe({
      next: (res) => {
        this.allProducts.set(res.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        console.log(err);
      },
    });
  }

}
