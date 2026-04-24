import { isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Stored_Keys } from '../constants/Stored_Keys';
import { appAPIs } from '../constants/appAPIs';
import { catchError, finalize, forkJoin, Observable, of } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { CartItem } from '../../features/cart/interfaces/cart-item.interface';

interface CartResponse {
  data: {
    _id: string;
    cartOwner: string;
    products: CartItem[];
    totalCartPrice: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);

  private readonly _cart = signal<CartItem[]>([]);
  cart = this._cart.asReadonly();

  private pending = new Set<string>();
  private synced = false;

  constructor() {
    effect(() => {
      const user = this.authService.user();

      if (user && !this.synced) {
        this.synced = true;
        this.syncLocalToServer();
        this.loadFromServer();
      } else if (!user) {
        this.synced = false;
        this.loadFromLocal();
      }
    });
  }

  private loadFromLocal() {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(Stored_Keys.CART);
      this._cart.set(data ? JSON.parse(data) : []);
    } else {
      this._cart.set([]);
    }
  }

  private loadFromServer() {
    this.http.get<CartResponse>(appAPIs.getCart).subscribe({
      next: (res) => this._cart.set(res.data.products),
    });
  }

  add(product: Product) {
    if (this.pending.has(product._id)) return;

    this.pending.add(product._id);

    this.addProduct(product)
      .pipe(finalize(() => this.pending.delete(product._id)))
      .subscribe();
  }

  updateQuantity(productId: string, count: number): Observable<any> {
    const previous = this._cart();

    const item = previous.find((i) => i.product._id === productId);
    if (!item) return of(false);

    if (count <= 0) {
      return this.removeProduct(productId);
    }

    const updated = previous.map((i) => (i.product._id === productId ? { ...i, count } : i));

    this._cart.set(updated);

    if (this.authService.isAuthinticated()) {
      const url = appAPIs.updateCartProductQuantity.replace(':id', productId);

      return this.http.put(url, { count }).pipe(
        catchError((err) => {
          this._cart.set(previous);
          throw err;
        }),
      );
    }

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(Stored_Keys.CART, JSON.stringify(updated));
    }
    return of(true);
  }

  remove(productId: string) {
    if (this.pending.has(productId)) return;

    this.pending.add(productId);

    const request = this.removeProduct(productId);

    request.pipe(finalize(() => this.pending.delete(productId)));
  }

  clear() {
    const previous = this._cart();

    this._cart.set([]);

    if (this.authService.isAuthinticated()) {
      this.http
        .delete(appAPIs.clearCart)
        .pipe(
          catchError((err) => {
            this._cart.set(previous);
            throw err;
          }),
        )
        .subscribe();
    } else {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem(Stored_Keys.CART);
      }
    }
  }

  private addProduct(product: Product): Observable<any> {
    const previous = this._cart();

    const exists = previous.find((i) => i.product._id === product._id);

    let updated: CartItem[];

    if (exists) {
      updated = previous.map((i) =>
        i.product._id === product._id ? { ...i, count: i.count + 1 } : i,
      );
    } else {
      updated = [...previous, { product, count: 1 }];
    }

    this._cart.set(updated);

    if (this.authService.isAuthinticated()) {
      return this.http
        .post(appAPIs.addToCart, {
          productId: product._id,
          count: 1,
        })
        .pipe(
          catchError((err) => {
            this._cart.set(previous);
            throw err;
          }),
        );
    }

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(Stored_Keys.CART, JSON.stringify(updated));
    }
    return of(true);
  }

  private removeProduct(productId: string): Observable<any> {
    const previous = this._cart();
    const updated = previous.filter((i) => i.product._id !== productId);

    this._cart.set(updated);

    if (this.authService.isAuthinticated()) {
      const url = appAPIs.removeFromCart.replace(':id', productId);

      return this.http.delete(url).pipe(
        catchError((err) => {
          this._cart.set(previous);
          throw err;
        }),
      );
    }

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(Stored_Keys.CART, JSON.stringify(updated));
    }
    return of(true);
  }

  private syncLocalToServer() {
    if (!isPlatformBrowser(this.platformId)) return;
    const local = localStorage.getItem(Stored_Keys.CART);
    if (!local) return;

    const items: CartItem[] = JSON.parse(local);

    forkJoin(
      items.map((item) =>
        this.http
          .post(appAPIs.addToCart, {
            productId: item.product._id,
            count: item.count,
          })
          .pipe(catchError(() => of(null))),
      ),
    ).subscribe({
      next: () => {
        localStorage.removeItem(Stored_Keys.CART);
        this.loadFromServer();
      },
    });
  }
}
