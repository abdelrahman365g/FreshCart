import { Routes } from '@angular/router';
import { CategoriesRoutes } from './features/categories/categories.routes';
import { AuthRoutes } from './features/auth/auth.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layouts/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/pages/home-page/home-page.component').then(
            (m) => m.HomePageComponent,
          ),
      },
      {
        path: 'auth',
        loadComponent: () =>
          import('./features/auth/pages/auth-page/auth-page.component').then(
            (m) => m.AuthPageComponent,
          ),
        children: AuthRoutes,
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/shop/pages/shop-page/shop-page.component').then(
            (m) => m.ShopPageComponent,
          ),
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./features/product-details/pages/product-details-page/product-details-page.component').then(
            (m) => m.ProductDetailsPageComponent,
          ),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/pages/categories-page/categories-page.component').then(
            (m) => m.CategoriesPageComponent,
          ),
        children: CategoriesRoutes,
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/brands/pages/brands-page/brands-page.component').then(
            (m) => m.BrandsPageComponent,
          ),
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./features/wishlist/pages/wishlist-page/wishlist-page.component').then(
            (m) => m.WishlistPageComponent,
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/pages/cart-page/cart-page.component').then(
            (m) => m.CartPageComponent,
          ),
      },
      {
        path: 'privacy',
        loadComponent: () =>
          import('./features/static-pages/privacy-policy/privacy-policy.component').then(
            (m) => m.PrivacyPolicyComponent,
          ),
      },
      {
        path: 'terms',
        loadComponent: () =>
          import('./features/static-pages/terms-of-service/terms-of-service.component').then(
            (m) => m.TermsOfServiceComponent,
          ),
      },
      {
        path: 'cookies',
        loadComponent: () =>
          import('./features/static-pages/cookie-policy/cookie-policy.component').then(
            (m) => m.CookiePolicyComponent,
          ),
      },
      {
        path: 'coming-soon',
        loadComponent: () =>
          import('./features/static-pages/coming-soon/coming-soon.component').then(
            (m) => m.ComingSoonComponent,
          ),
      },
      {
        path: 'orders',
        redirectTo: 'coming-soon',
        pathMatch: 'full',
      },
      {
        path: 'help',
        redirectTo: 'coming-soon',
        pathMatch: 'full',
      },
      {
        path: 'shipping',
        redirectTo: 'coming-soon',
        pathMatch: 'full',
      },
      {
        path: 'returns',
        redirectTo: 'coming-soon',
        pathMatch: 'full',
      },
      {
        path: 'track-order',
        redirectTo: 'coming-soon',
        pathMatch: 'full',
      },
      {
        path: 'not-found',
        loadComponent: () =>
          import('./features/static-pages/not-found-page/not-found-page.component').then(
            (m) => m.NotFoundPageComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
];
