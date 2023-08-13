import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../authenticate.component.css']
})
export class LoginComponent {

  @ViewChild("username") usernameRef!: ElementRef;
  @ViewChild("password") passwordRef!: ElementRef;

  loggingIn: boolean = false;

  constructor(public authService: AuthService, private http: HttpClient) { }

  async login() {

    if (!this.loggingIn) {

      this.loggingIn = true;

      // Regular login
      if (this.authService.pathMatch("/login")) {

        const username = this.usernameRef.nativeElement.value;
        const password = this.passwordRef.nativeElement.value;

        const code_verifier = this.authService.generateCodeVerifier();
        const code_challenge = btoa(String.fromCharCode(...new Uint8Array(await window.crypto.subtle.digest("SHA-256", (new TextEncoder()).encode(code_verifier)))));

        try {

          const codeResponse: any = await lastValueFrom(this.http.post("https://authivo-backend-git-dev-empiricalcode.vercel.app/authentication/login", {
            username: username,
            password: password,
            auth_type: "pkce",
            client_id: "host",
            code_challenge: code_challenge,
            redirect_uri: "http://localhost:4200"
          }));

          if (codeResponse.status == 200) {

            const tokenResponse: any = await lastValueFrom(this.http.post("https://authivo-backend-git-dev-empiricalcode.vercel.app/authentication/token", {
              auth_type: "pkce",
              client_id: "host",
              code_verifier: code_verifier,
              code: codeResponse.code
            }));

            if (tokenResponse.status == 200) {
              window.localStorage.setItem("token", tokenResponse.token);
              window.location.href = window.location.origin + "/dashboard";
            } else {
              alert(tokenResponse.response);
            }

          } else {
            alert(codeResponse.response);
          }
        } catch(error) {
          console.log(error);
        }

        this.loggingIn = false;

      // Auth provider login
      } else if (this.authService.pathMatch("/auth/login")) {
      
      }
    }
  }
}
