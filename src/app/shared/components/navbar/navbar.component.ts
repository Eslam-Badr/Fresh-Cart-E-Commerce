import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink } from "@angular/router";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly flowbiteService = inject(FlowbiteService)
  private readonly platformId = inject(PLATFORM_ID)

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.login()
  }


  // authentication flag
isLoggedIn : WritableSignal<boolean> = signal(false);

  // mobile menu
  menuOpen: WritableSignal<boolean> = signal(false);

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  login() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('token')) {
        this.isLoggedIn.set(true);
      }
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token')
      this.isLoggedIn.set(false);
    }
  }

}

