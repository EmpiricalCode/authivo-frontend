import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../authenticate.component.css']
})
export class RegisterComponent {

  @Output() 
  spawnErrorMessageEvent = new EventEmitter<string>();

  registering: boolean = false;

  @ViewChild("username") usernameRef!: ElementRef;
  @ViewChild("password") passwordRef!: ElementRef;
  @ViewChild("confirmPassword") confirmPasswordRef!: ElementRef;
  @ViewChild("registerButton") registerButton!: ElementRef;

  constructor(public authService: AuthService, private http: HttpClient, private renderer: Renderer2) {

  }

  spawnErrorMessage(message: string) {
    this.spawnErrorMessageEvent.emit(message);
  }

  async register() {

    if (!this.registering) {

      const username = this.usernameRef.nativeElement.value;
      const password = this.passwordRef.nativeElement.value;
      const confirmPassword = this.confirmPasswordRef.nativeElement.value;

      if (password == confirmPassword) {

        this.registering = true;

        // Regular login
        if (this.authService.pathMatch("/register")) {

          const code_verifier = this.authService.generateCodeVerifier();
          const code_challenge = btoa(String.fromCharCode(...new Uint8Array(await window.crypto.subtle.digest("SHA-256", (new TextEncoder()).encode(code_verifier)))));

          try {

            const codeResponse: any = await lastValueFrom(this.http.post("https://authivo-api-dev.vercel.app/authentication/register", {
              username: username,
              password: password,
              auth_type: "pkce",
              client_id: "host",
              code_challenge: code_challenge,
              redirect_uri: "http://localhost:4200"
            }));

            if (codeResponse.status == 201) {

              const tokenResponse: any = await lastValueFrom(this.http.post("https://authivo-api-dev.vercel.app/authentication/token", {
                auth_type: "pkce",
                client_id: "host",
                code_verifier: code_verifier,
                code: codeResponse.code
              }));

              if (tokenResponse.status == 200) {
                window.localStorage.setItem("token", tokenResponse.token);
                window.location.href = window.location.origin + "/dashboard";
              } else {
                
                if (tokenResponse.status == 500) {
                  this.spawnErrorMessage("A fatal server error was encountered");
                } else {
                  this.spawnErrorMessage(tokenResponse.response);
                }
              }

            } else {
              
              if (codeResponse.status == 500) {
                this.spawnErrorMessage("A fatal server error was encountered");
              } else {
                this.spawnErrorMessage(codeResponse.response);
              }
            }
          } catch(error) {
            console.log(error);
          }

          this.registering = false;

        // Auth provider login
        } else if (this.authService.pathMatch("/auth/register")) {
        
        }
      } else {
        this.spawnErrorMessage("Passwords do not match");
      }
    }
  }
}
