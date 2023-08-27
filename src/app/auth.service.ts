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

  getRedirectUri() {
    return this.search.get("redirect_uri");
  }

  getClientID() {
    return this.search.get("client_id");
  }

  getAuthType() {
    return this.search.get("auth_type");
  }

  getCodeChallenge() {
    return this.search.get("code_challenge");
  }

  async isLoggedIn() {
    
    if (window.localStorage.getItem("token")) {

      const response: any = await lastValueFrom(this.http.post("https://api.authivo.com/authorization/tokeninfo", {
        headers: new HttpHeaders({"Access-Control-Allow-Origin" : "https://api.authivo.com"}),
        token: window.localStorage.getItem("token")
      }))
      .catch((error) => {
        // alert(error.message);
      })

      if (response && response.status == 200 && response.valid == true && response.decoded.aud == "host") {
        return true;
      } else {
        window.localStorage.removeItem("token");
      }
    } 
      
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