import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { NgClass } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {StorageService} from "../_shared/_services/storage.service";
import {AuthService} from "../_shared/_services/auth.service";
import {EventBusService} from "../_shared/_event/event-bus.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    standalone: true,
    imports: [RouterLink, NgClass]
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,
                private storageService: StorageService,
                private authService: AuthService,
                private eventBusService: EventBusService,
                private router: Router) { }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        this.router.navigate([""]).then(nav => {
          // window.location.reload();
        });

      },
      error: err => {
        console.log(err);
      }
    });
  }
}
