import { Component, computed, inject, OnInit, PLATFORM_ID, Signal, signal, WritableSignal } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../../core/services/cart/cart.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly flowbiteService = inject(FlowbiteService)
  private readonly cartService = inject(CartService)
  private readonly authService = inject(AuthService)
  private readonly wishlistService = inject(WishlistService)
  private readonly platformId = inject(PLATFORM_ID)
  private readonly ngxSpinner = inject(NgxSpinnerService)
  private readonly router = inject(Router)


  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.checkLogin()
  }

  countOfWishlistItem: Signal<number> = computed(() => this.wishlistService.countOfWishlistItem());
  numOfCartItems: Signal<number> = computed(() => this.cartService.numOfCartItems());
  // authentication flag
  isLoggedIn: Signal<boolean> = computed(() => this.authService.isLoggedIn())

  // mobile menu
  menuOpen: WritableSignal<boolean> = signal(false);

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  checkLogin() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('token')) {
        this.authService.isLoggedIn.set(true)
        this.getLoggedInUser()
        this.getUserProductWishlist()
      }
      else {
        this.authService.isLoggedIn.set(false)
      }
    }
  }

  logout() {

    this.ngxSpinner.show()

    setTimeout(() => {
      // remove token
      localStorage.removeItem('token')

      // set islogged flag
      this.authService.isLoggedIn.set(false)

      // navigate
      this.router.navigate(['/login'])

      this.ngxSpinner.hide()
    }, 500);


  }

  getLoggedInUser() {
    this.cartService.getLoggedInUser().subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.numOfCartItems.set(res.numOfCartItems)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }



  getUserProductWishlist() {
    this.wishlistService.getUserProductWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishlistService.countOfWishlistItem.set(res.data.length)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


}

