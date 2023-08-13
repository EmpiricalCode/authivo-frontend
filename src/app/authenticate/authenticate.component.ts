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
      
    if (this.authService.pathMatch("/auth")) {

      const urlParams = new URLSearchParams(document.location.search);

      this.authService.redirectWithParams("/auth/login");
    }
  }
}