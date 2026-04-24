import { Routes } from '@angular/router';

export const CategoriesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/all-categories-page/all-categories-page.component').then(
        (m) => m.AllCategoriesPageComponent,
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/subcategories-page/subcategories-page.component').then(
        (m) => m.SubcategoriesPageComponent,
      ),
  }
];