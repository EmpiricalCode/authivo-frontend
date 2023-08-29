import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-continue',
  templateUrl: './continue.component.html',
  styleUrls: ['./continue.component.css', '../authenticate.component.css']
})
export class ContinueComponent implements AfterViewInit {

  userData: any = {};
  continuing: boolean = false;

  constructor(private messageService: MessageService, private http: HttpClient, public authService: AuthService, private titleService: Title) {
    this.titleService.setTitle("Continue | Authivo");
  }

  ngAfterViewInit() {

    this.http.post("https://api.authivo.com/authorization/tokeninfo", {
      token: window.localStorage.getItem("token")
    }).subscribe((tokenInfoResponse: any) => {

      if (tokenInfoResponse.status == 200) {

        this.http.get(`https://api.authivo.com/users/userdata?id=${tokenInfoResponse.decoded.id}`).subscribe((userDataResponse: any) => {

          if (userDataResponse.status == 200) {
            this.userData = userDataResponse.data;
          } else {
            this.messageService.spawnErrorMessage(userDataResponse.response);
          }
        })

      } else {
        this.messageService.spawnErrorMessage(tokenInfoResponse.response);
      }
    });
  }

  async continue() {

    if (!this.continuing) {

      this.continuing = true;

      const authType = this.authService.getAuthType();
      const clientID = this.authService.getClientID();
      const redirectURI = this.authService.getRedirectUri();

      let codeResponse: any;

      if (authType == "pkce") {

        const codeChallenge = this.authService.getCodeChallenge();

        codeResponse = await lastValueFrom(this.http.post("https://api.authivo.com/authentication/continue", {
          token: window.localStorage.getItem("token"),
          auth_type: "pkce",
          client_id: clientID,
          redirect_uri: redirectURI,
          code_challenge: codeChallenge
        }));

      } else {

        codeResponse = await lastValueFrom(this.http.post("https://api.authivo.com/authentication/continue", {
          token: window.localStorage.getItem("token"),
          auth_type: "authentication_code",
          client_id: clientID,
          redirect_uri: redirectURI,
        }));
      }

      if (codeResponse.status == 200) {
        window.location.href = redirectURI + "?code=" + codeResponse.code;
      } else {
        this.messageService.spawnErrorMessage(codeResponse.response);
      }

      this.continuing = false;
    }
  }
}
