import { User } from './../interfaces/user.interface';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Stored_Keys } from '../constants/Stored_Keys';
import { HttpClient } from '@angular/common/http';
import { appAPIs } from '../constants/appAPIs';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private readonly _user = signal<User | null>(null);
  user = this._user.asReadonly();

  isAuthinticated = computed(() => !!this._user());

  constructor() {
    this.restoreSession();
  }

  private restoreSession() {
    const data = localStorage.getItem(Stored_Keys.USER_DATA);

    if (!data) return;

    try {
      this._user.set(JSON.parse(data));
    } catch {
      localStorage.removeItem(Stored_Keys.USER_DATA);
    }
  }

  login(data: FormData): Observable<any> {
    return this.signIn(data).pipe(
      tap((res: any) => {
        this._user.set(res.data);
        localStorage.setItem(
          Stored_Keys.USER_DATA,
          JSON.stringify(res.data)
        );
      })
    );
  }

  register(data: FormData): Observable<any> {
    return this.signUp(data).pipe(
      tap((res: any) => {
        this._user.set(res.data);
        localStorage.setItem(
          Stored_Keys.USER_DATA,
          JSON.stringify(res.data)
        );
      })
    );
  }

  logout() {
    localStorage.removeItem(Stored_Keys.USER_DATA);
    this._user.set(null);
  }

  private signUp(data: FormData): Observable<any> {
    return this.http.post(appAPIs.signUp, data);
  }

  private signIn(data: FormData): Observable<any> {
    return this.http.post(appAPIs.signIn, data);
  }
}