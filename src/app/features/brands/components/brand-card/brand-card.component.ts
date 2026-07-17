import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-brand-card',
  imports: [RouterLink],
  templateUrl: './brand-card.component.html',
  styleUrl: './brand-card.component.css',
})
export class BrandCardComponent {
  brand = input<Brand>();
}
