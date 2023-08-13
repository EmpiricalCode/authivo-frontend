import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})

export class AuthenticateComponent implements AfterViewInit {

  @ViewChild("errorMessageContainer") errorMessageContainer!: ElementRef;

  constructor(public authService: AuthService) {

  }

  ngAfterViewInit() {
      
    if (this.authService.pathMatch("/auth")) {

      const urlParams = new URLSearchParams(document.location.search);

      this.authService.redirectWithParams("/auth/login");
    }
  }

  spawnErrorMessage(message: string) {

    const errorMessage = document.createElement("div");

    errorMessage.innerHTML = message;
    errorMessage.classList.add("error-message");

    this.errorMessageContainer.nativeElement.append(errorMessage);

    setTimeout(() => {
      errorMessage.style.opacity = "0";

      setTimeout(() => {
        errorMessage.remove();
      }, 200);
    }, 3000);
  }
}