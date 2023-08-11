import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../authenticate.component.css']
})
export class LoginComponent {

  constructor(public authService: AuthService) {

  }
}
