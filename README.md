# FreshCart E-Commerce

A modern, feature-rich Angular e-commerce application featuring product browsing, cart and wishlist management, user authentication, and Server-Side Rendering (SSR) for improved performance and SEO.

## Features

- **User Authentication**: Secure login and registration flows protected by route guards.
- **Product Catalog**: Comprehensive shop page to browse products with a dedicated product details view.
- **Categories & Brands**: Dedicated sections to filter and explore products by category or brand.
- **Shopping Cart**: Full cart management (add, update, remove items).
- **Wishlist**: Save favorite products for later viewing and quick cart addition.
- **Static Content**: Essential informational pages including Privacy Policy, Terms of Service, and Cookie Policy.

## Tech Stack

- **Frontend**: Angular v21 (Standalone Components)
- **State Management**: RxJS (v7.8.0)
- **Styling**: TailwindCSS v4, Flowbite, FontAwesome (Icons), Fontsource (Exo typography)
- **Tooling**: Angular CLI v21 (Vite-based `@angular/build`), Angular SSR (`@angular/ssr`), Vitest (Unit testing), Prettier

## Architecture / Project Structure

The application follows a modular, feature-based architecture utilizing Angular Standalone Components:

- `src/app/core/`: Contains singleton services (Auth, Cart, Products, Wishlist), HTTP interceptors, layouts, and route guards.
- `src/app/features/`: Contains domain-specific modules, standalone components, and localized routes (e.g., Auth, Brands, Cart, Categories, Home, Shop).
- `src/app/shared/`: Contains reusable UI components, pipes, and directives shared across multiple features.

## Key Implementation Details/s

- **Server-Side Rendering (SSR) Safety**: Fully configured with `@angular/ssr` and Express. Services and interceptors utilize Angular's `isPlatformBrowser` utility to safely handle browser-only APIs (like `localStorage`) preventing hydration mismatches and build errors during pre-rendering.
- **Lazy Loading Strategy**: The router configuration (`app.routes.ts`) aggressively uses `loadComponent` and `loadChildren` to lazy-load almost every feature page and static route, ensuring a minimal initial bundle size.
- **Custom HTTP Interceptors**: Implements a `handleHeadersInterceptor` to automatically retrieve the JWT from local storage and inject `Authorization: Bearer <token>` and `token` headers into outgoing requests, heavily integrated with SSR platform checks.

## Setup & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run start
   ```
   Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Test SSR locally:**
   ```bash
   npm run serve:ssr:e-commerce
   ```

## Live Demo

Experience the live application here: [https://abdelrahman365g-freshcart.vercel.app](https://abdelrahman365g-freshcart.netlify.app)
