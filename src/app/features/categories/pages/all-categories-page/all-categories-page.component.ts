import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interfaces/category.interface';
import { CategoryCardComponent } from "../../components/category-card/category-card.component";
@Component({
  selector: 'app-all-categories-page',
  imports: [CategoryCardComponent],
  templateUrl: './all-categories-page.component.html',
  styleUrl: './all-categories-page.component.css',
})
export class AllCategoriesPageComponent implements OnInit {
  categoriesService = inject(CategoriesService);

  categories = signal<Category[] | null>([]);
  isLoading = signal(false);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.categoriesService.getAllCategories().subscribe({
      next: (response) => {
        this.categories.set(response.data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.isLoading.set(false);
      },
    });
  }
}
