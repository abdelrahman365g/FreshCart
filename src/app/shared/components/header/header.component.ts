import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../../core/services/wishlist.service';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  authService = inject(AuthService);
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);

  isMobileMenuOpen = signal(false);
  isDropdownOpen = signal(false);
  wishlistLength = computed(() => this.wishlistService.wishlist().length);
  cartLength = computed(() => this.cartService.cart().length);
  isAuthenticated = computed(() => this.authService.isAuthinticated());
  user = computed(() => this.authService.user());

  dropdown = viewChild<ElementRef>('dropdown');

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    const target = event.target as HTMLElement;
    const el = this.dropdown()?.nativeElement;

    if (this.isDropdownOpen() && el && !el.contains(target)) {
      this.closeDropdown();
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  toggleDropdown() {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }

  signOut() {
    this.authService.logout();
    this.closeMobileMenu();
  }
}
