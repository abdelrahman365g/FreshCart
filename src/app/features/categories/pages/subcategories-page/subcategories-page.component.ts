import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subcategory } from '../../interfaces/subcategory.interface';
import { Category } from '../../interfaces/category.interface';
import { SubcategoryCardComponent } from "../../components/subcategory-card/subcategory-card.component";

@Component({
  selector: 'app-subcategories-page',
  imports: [RouterLink, SubcategoryCardComponent],
  templateUrl: './subcategories-page.component.html',
  styleUrl: './subcategories-page.component.css',
})
export class SubcategoriesPageComponent implements OnInit {
  categoriesService = inject(CategoriesService);
  route = inject(ActivatedRoute);

  subcategories = signal<Subcategory[] | null>([]);
  category = signal<Category | null>(null);
  isLoading = signal(false);

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (!categoryId) return;

    this.isLoading.set(true);

    this.getCategoryDetails(categoryId);
    this.getSubcategories(categoryId);

    this.isLoading.set(false);
  }

  getCategoryDetails(categoryId: string): void {
    this.categoriesService.getSpecificCategory(categoryId).subscribe({
      next: (response) => {
        this.category.set(response.data);
      },
      error: (error) => {
        console.error('Error fetching category details:', error);
      },
    });
  }

  getSubcategories(categoryId: string): void {

    this.categoriesService.getSubcategoriesByCategory(categoryId).subscribe({
      next: (response) => {
        this.subcategories.set(response.data);
      },
      error: (error) => {
        console.error('Error fetching subcategories:', error);
      },
    });
  }
}
