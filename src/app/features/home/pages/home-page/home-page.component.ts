import { Component } from '@angular/core';
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { CategoriesComponent } from "../../components/categories/categories.component";
import { OffersComponent } from "../../components/offers/offers.component";
import { ContactComponent } from "../../components/contact/contact.component";
import { FeaturesComponent } from "../../components/features/features.component";
import { ProductsComponent } from "../../components/products/products.component";

@Component({
  selector: 'app-home-page',
  imports: [CarouselComponent, CategoriesComponent, OffersComponent, ContactComponent, FeaturesComponent, ProductsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
