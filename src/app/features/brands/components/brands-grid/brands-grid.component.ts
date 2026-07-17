import { Component, inject, OnInit, signal } from '@angular/core';
import { BrandCardComponent } from "../brand-card/brand-card.component";
import { BrandsService } from '../../services/brands.service';

@Component({
  selector: 'app-brands-grid',
  imports: [BrandCardComponent],
  templateUrl: './brands-grid.component.html',
  styleUrl: './brands-grid.component.css',
})
export class BrandsGridComponent implements OnInit {
  brandService = inject(BrandsService);

  brands = signal<Brand[]>([]);

  ngOnInit(): void {
    this.fetchBrands();
  }

  fetchBrands() {
    this.brandService.getAllBrands().subscribe((response) => {
      this.brands.set(response.data);
    });
  }
}
