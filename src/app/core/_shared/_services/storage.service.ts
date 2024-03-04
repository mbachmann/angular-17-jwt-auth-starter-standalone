import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  getStorage() {
    return window.localStorage;
    // return window.sessionStorage;
  }
  clean(): void {
    this.getStorage().clear();
  }

  public saveUser(user: any): void {
    this.getStorage().removeItem(USER_KEY);
    this.getStorage().setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = this.getStorage().getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public isLoggedIn(): boolean {
    const user = this.getStorage().getItem(USER_KEY);
    return !!user;
  }
}
