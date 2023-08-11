import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../authenticate.component.css']
})
export class RegisterComponent {

  constructor(public authService: AuthService) {

  }
}
