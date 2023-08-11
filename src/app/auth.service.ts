import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  search: URLSearchParams = new URLSearchParams(window.location.search);

  constructor(private router: Router) { }

  getRedirectUri() {
    return this.search.get("redirect_uri");
  }

  getClientID() {
    return this.search.get("client_id");
  }

  isLoggedIn() {
    return false;
  }

  pathMatch(path: string) {
    return window.location.pathname == path;
  }

  pathContains(str: string) {
    return window.location.pathname.includes(str);
  }

  redirectWithParams(path: string) {
    return this.router.navigateByUrl(path + "?" + this.search.toString());
  }
}
