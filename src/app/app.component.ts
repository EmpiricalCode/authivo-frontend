import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  loggedIn: boolean = true;

  authPaths: String[] = [
    "/login",
    "/register",
    "/auth/login",
    "/auth/register",
    "/auth/continue",
    "/auth"
  ];

  constructor(public authService: AuthService) { }

  ngAfterViewInit() {
    
    this.authService.isLoggedIn().then((value) => {
      this.loggedIn = value;
    })
  }
  
  shouldShowNavRight() {
    return !this.authPaths.includes(document.location.pathname);
  }
}
