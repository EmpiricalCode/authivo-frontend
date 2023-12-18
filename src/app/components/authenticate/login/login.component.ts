import { Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../authenticate.component.css']
})
export class LoginComponent {

  @ViewChild("username") usernameRef!: ElementRef;
  @ViewChild("password") passwordRef!: ElementRef;
  @ViewChild("loginButton") loginButton!: ElementRef;

  loggingIn: boolean = false;

  constructor(public authService: AuthService, private http: HttpClient, private messageService: MessageService, private titleService: Title) {
    this.titleService.setTitle("Login | Authivo");
  }

  async login() {

    if (!this.loggingIn) {

      this.loggingIn = true;

      const username = this.usernameRef.nativeElement.value;
      const password = this.passwordRef.nativeElement.value;

      // Regular login
      if (this.authService.pathMatch("/login")) {

        const code_verifier = this.authService.generateCodeVerifier();
        const code_challenge = btoa(String.fromCharCode(...new Uint8Array(await window.crypto.subtle.digest("SHA-256", (new TextEncoder()).encode(code_verifier)))));

        try {

          const codeResponse: any = await lastValueFrom(this.http.post("https://api.authivo.com/authentication/login", {
            username: username,
            password: password,
            auth_type: "pkce",
            client_id: "host",
            code_challenge: code_challenge,
            redirect_uri: "https://authivo.com"
          }));

          if (codeResponse.status == 200) {

            const tokenResponse: any = await lastValueFrom(this.http.post("https://api.authivo.com/authentication/token", {
              auth_type: "pkce",
              code_verifier: code_verifier,
              code: codeResponse.code
            }));

            if (tokenResponse.status == 200) {
              window.localStorage.setItem("token", tokenResponse.token);
              window.location.href = window.location.origin + "/dashboard";
            } else {

              if (tokenResponse.status == 500) {
                this.messageService.spawnErrorMessage("A fatal server error was encountered");
              } else {
                this.messageService.spawnErrorMessage(tokenResponse.response);
              }
            }

          } else {
            
            if (codeResponse.status == 500) {
              this.messageService.spawnErrorMessage("A fatal server error was encountered");
            } else {
              this.messageService.spawnErrorMessage(codeResponse.response);
            }
          }
        } catch(error) {
          console.log(error);
        }

        this.loggingIn = false;

      // Auth provider login
      } else if (this.authService.pathMatch("/auth/login")) {

        const clientID = this.authService.getClientID();
        const redirectURI = this.authService.getRedirectUri();

        let codeResponse: any;
      
        if (this.authService.getAuthType() == "pkce") {

          const codeChallenge = this.authService.getCodeChallenge();

          codeResponse = await lastValueFrom(this.http.post("https://api.authivo.com/authentication/login", {
            username: username,
            password: password,
            auth_type: "pkce",
            client_id: clientID,
            code_challenge: codeChallenge,
            redirect_uri: redirectURI
          }));

        } else {

          codeResponse = await lastValueFrom(this.http.post("https://api.authivo.com/authentication/login", {
            username: username,
            password: password,
            auth_type: "authentication_code",
            client_id: clientID,
            redirect_uri: redirectURI
          }));
        }

        if (codeResponse.status == 200) {
          window.location.href = redirectURI + "?code=" + codeResponse.code;
        } else {
          this.messageService.spawnErrorMessage(codeResponse.response);
        }

        this.loggingIn = false;
      }
    }
  }
}
