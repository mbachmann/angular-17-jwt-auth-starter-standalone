import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './core/_shared/_services/storage.service';
import { AuthService } from './core/_shared/_services/auth.service';
import { EventBusService } from './core/_shared/_event/event-bus.service';
import {NgClass, NgIf} from '@angular/common';
import { RouterLinkActive, RouterLink, RouterOutlet, Router } from '@angular/router';
import { PrimeNGConfig } from "primeng/api";
import {ChallLandingComponent} from "./pages/landing/chall-landing.component";
import {LayoutService} from "./core/layout/service/app.layout.service";
import {environment} from "../environments/environment";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
  imports: [RouterLinkActive, RouterLink, NgIf, RouterOutlet, ChallLandingComponent, NgClass]
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  title: string = "angular-17-jwt-auth";
  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    public layoutService: LayoutService,
  ) {}

  ngOnInit(): void {
    this.init();
    this.primengConfig.ripple = true;

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });

    this.eventBusService.on('login', (value: string)  => {
      console.log('redirect', value);
      this.init();
    });
  }

  private init () {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
      console.log('username=' + this.username, 'environment=' + JSON.stringify(environment) )
    }
  }


  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        this.router.navigate(["/","home"]).then(nav => {
          window.location.reload();
        });

      },
      error: err => {
        console.log(err);
      }
    });
  }

  get containerClass() {
    return {
      'layout-theme-light': this.layoutService.config().colorScheme === 'light',
      'layout-theme-dark': this.layoutService.config().colorScheme === 'dark',
      'layout-overlay': this.layoutService.config().menuMode === 'overlay',
      'layout-static': this.layoutService.config().menuMode === 'static',
      'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config().menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.config().inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutService.config().ripple
    }
  }

}
