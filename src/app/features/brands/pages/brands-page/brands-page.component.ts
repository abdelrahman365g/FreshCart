import { Component } from '@angular/core';
import { BrandsHeaderComponent } from "../../components/brands-header/brands-header.component";
import { BrandsGridComponent } from "../../components/brands-grid/brands-grid.component";

@Component({
  selector: 'app-brands-page',
  imports: [BrandsHeaderComponent, BrandsGridComponent],
  templateUrl: './brands-page.component.html',
  styleUrl: './brands-page.component.css',
})
export class BrandsPageComponent {}
