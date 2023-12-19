import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpParameterCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  search: HttpParams = new HttpParams({fromString: window.location.search});

  constructor(private router: Router, private http: HttpClient) { }

  // Fetches user data using localstorage token
  async getUserData() {

    return new Promise((resolve, reject) => {

      if (!window.localStorage.getItem("token")) {
        reject();
      }

      // Fetching token info to get user id
      this.http.post("https://api.authivo.com/authorization/tokeninfo", {
        token: window.localStorage.getItem("token")
      }).subscribe((tokenInfoResponse: any) => {

        if (tokenInfoResponse.status == 200) {

          // Fetching user data from id
          this.http.get(`https://api.authivo.com/users/userdata?id=${tokenInfoResponse.decoded.id}`).subscribe((userDataResponse: any) => {

            if (userDataResponse.status == 200) {
              resolve(userDataResponse.data);
            }
          })
        }
      });
    });
  }

  // Returns redirect URI from search params
  getRedirectUri() {
    return this.search.get("redirect_uri");
  }

  // Returns client id from search params
  getClientID() {
    return this.search.get("client_id");
  }

  // Returns auth type from search params
  getAuthType() {
    return this.search.get("auth_type");
  }

  // Returns code challenge from search params
  getCodeChallenge() {
    return this.search.get("code_challenge");
  }

  // Returns if a user is currently logged in
  async isLoggedIn() {
    
    if (window.localStorage.getItem("token")) {

      // Fetching token info to check its validity
      const response: any = await lastValueFrom(this.http.post("https://api.authivo.com/authorization/tokeninfo", {
        headers: new HttpHeaders({"Access-Control-Allow-Origin" : "https://api.authivo.com"}),
        token: window.localStorage.getItem("token")
      }))
      .catch((error) => {
        // alert(error.message);
      })

      // If token invalid, clear token from localstorage
      if (response && response.status == 200 && response.valid == true && response.decoded.aud == "host") {
        return true;
      } else {
        window.localStorage.removeItem("token");
      }
    } 
      
    return false;

  }

  // Checks if the current window path matches a given path
  pathMatch(path: string) {
    return window.location.pathname == path;
  }

  // Checks if the current window path contains a substring
  pathContains(str: string) {
    return window.location.pathname.includes(str);
  }

  // Redirects to a new path while keeping search params
  redirectWithParams(path: string) {
    return this.router.navigateByUrl(path + "?" + this.search.toString());
  }
  
  // Generates code verifier for PKCE flow
  generateCodeVerifier() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for ( var i = 0; i < 20; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}

export class CustomEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}