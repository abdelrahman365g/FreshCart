import { Component, input } from '@angular/core';
import { Category } from '../../interfaces/category.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-category-card',
  imports: [RouterLink],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
})
export class CategoryCardComponent {
  category = input<Category>();
}
