import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  storageKey = 'contact-manager-jwt';

  constructor(private router: Router) { }

  setToken(token: string) {
    localStorage.setItem(this.storageKey, token);
  }

  getToken() {
    return localStorage.getItem(this.storageKey);
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    console.log('logout, navigate to login mask');
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
  }

}
