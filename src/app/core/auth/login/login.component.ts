import {Component, OnInit, signal} from '@angular/core';
import { AuthService } from '../../_shared/_services/auth.service';
import { StorageService } from '../../_shared/_services/storage.service';
import {EventData} from "../../_shared/_event/event.class";
import {EventBusService} from "../../_shared/_event/event-bus.service";
import { FormsModule } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [NgIf, FormsModule, NgClass]
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage;
  roles: string[] = [];
  redirectTo  = "";


  constructor(private authService: AuthService,
              private storageService: StorageService,
              private eventBusService: EventBusService,
              private activatedRoute: ActivatedRoute,
              private router: Router
              )
    { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    } else {
      this.activatedRoute.queryParamMap.subscribe((params) => {
          this.redirectTo = params.get('redirect');
      });
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.eventBusService.emit(new EventData('login', this.redirectTo));
        this.navigateTo();
      },
      error: err => {
        this.errorMessage = err.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  navigateTo() {
    this.router.navigate([""]);
  }
}
