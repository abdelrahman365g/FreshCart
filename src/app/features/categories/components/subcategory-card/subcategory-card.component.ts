import { Component, input } from '@angular/core';
import { Subcategory } from '../../interfaces/subcategory.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-subcategory-card',
  imports: [RouterLink],
  templateUrl: './subcategory-card.component.html',
  styleUrl: './subcategory-card.component.css',
})
export class SubcategoryCardComponent {
  subcategory = input<Subcategory>();
}
