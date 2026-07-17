import { isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Stored_Keys } from '../constants/Stored_Keys';
import { appAPIs } from '../constants/appAPIs';
import { catchError, finalize, forkJoin, Observable, of } from 'rxjs';
import { Product } from '../interfaces/product.interface';

interface WishlistResponse {
  data: Product[];
}

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);

  private readonly _wishlist = signal<Product[]>([]);
  wishlist = this._wishlist.asReadonly();

  private pending = new Set<string>();
  private synced = false;

  constructor() {
    effect(() => {
      const user = this.authService.user();

      if (user && !this.synced) {
        this.synced = true;
        this.syncLocalToServer();
        this.loadFromServer();
      }

      if (!user) {
        this.synced = false;
        this.loadFromLocal();
      }
    });
  }

  private loadFromLocal() {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(Stored_Keys.WISHLIST);
      this._wishlist.set(data ? JSON.parse(data) : []);
    } else {
      this._wishlist.set([]);
    }
  }

  private loadFromServer() {
    this.http.get<WishlistResponse>(appAPIs.getWishlist).subscribe({
      next: (res) => this._wishlist.set(res.data),
      error: () => this._wishlist.set([]),
    });
  }

  toggle(product: Product) {
    const id = product._id;

    if (this.pending.has(id)) return;
    this.pending.add(id);

    const exists = this._wishlist().some((p) => p._id === id);

    const request = exists
      ? this.removeProductFromWishlist(id)
      : this.addProductToWishlist(product);

    request.pipe(finalize(() => this.pending.delete(id))).subscribe();
  }

  addProductToWishlist(product: Product): Observable<boolean> {
    const previous = this._wishlist();

    if (previous.some((p) => p._id === product._id)) {
      return of(true);
    }

    const updated = [...previous, product];

    this._wishlist.set(updated);
    this.saveLocal(updated);

    if (!this.authService.isAuthinticated()) {
      return of(true);
    }

    return this.addToServer(product._id).pipe(
      catchError((err) => {
        this._wishlist.set(previous);
        this.saveLocal(previous);
        throw err;
      }),
    );
  }

  removeProductFromWishlist(productId: string): Observable<boolean> {
    const previous = this._wishlist();

    const updated = previous.filter((p) => p._id !== productId);

    this._wishlist.set(updated);
    this.saveLocal(updated);

    if (!this.authService.isAuthinticated()) {
      return of(true);
    }

    return this.removeFromServer(productId).pipe(
      catchError((err) => {
        this._wishlist.set(previous);
        this.saveLocal(previous);
        throw err;
      }),
    );
  }

  private addToServer(productId: string): Observable<any> {
    return this.http.post(appAPIs.addToWishlist, { productId });
  }

  private removeFromServer(productId: string): Observable<any> {
    return this.http.delete(appAPIs.removeFromWishlist.replace(':id', productId));
  }

  private syncLocalToServer() {
    if (!isPlatformBrowser(this.platformId)) return;

    const local = localStorage.getItem(Stored_Keys.WISHLIST);
    if (!local) return;

    const items: Product[] = JSON.parse(local);
    if (!items.length) return;

    forkJoin(items.map((p) => this.addToServer(p._id).pipe(catchError(() => of(null))))).subscribe(
      () => {
        localStorage.removeItem(Stored_Keys.WISHLIST);
        this.loadFromServer();
      },
    );
  }

  private saveLocal(data: Product[]) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(Stored_Keys.WISHLIST, JSON.stringify(data));
    }
  }
}
