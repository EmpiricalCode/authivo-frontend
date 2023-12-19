import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})

export class AuthenticateComponent implements AfterViewInit {

  constructor(public authService: AuthService) {

  }

  ngAfterViewInit() {
      
    // If path matches /auth, redirect to /auth/login
    if (this.authService.pathMatch("/auth")) {

      this.authService.redirectWithParams("/auth/login");
    }
  }
}