import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})

export class AuthenticateComponent implements AfterViewInit {

  constructor(public authService: AuthService) {

  }

  ngAfterViewInit() {
      
    if (this.authService.pathMatch("/auth") && this.authService.getRedirectUri() && this.authService.getClientID()) {

      const urlParams = new URLSearchParams(document.location.search);

      document.location = document.location.origin + "/auth/login?" + urlParams.toString();
    }

    // TODO: Handle error
  }
}