import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild("errorMessageContainer") errorMessageContainer!: ElementRef;

  title: string = "authivo-frontend";
  loggedIn: boolean = true;

  authPaths: String[] = [
    "/login",
    "/register",
    "/auth/login",
    "/auth/register",
    "/auth/continue",
    "/auth"
  ];

  constructor(public authService: AuthService, private renderer: Renderer2, private messageService: MessageService) { }

  ngAfterViewInit() {

    this.messageService.attachMessages().subscribe((params: any) => {
      this.spawnMessage(params.message, params.success);
    })
    
    this.authService.isLoggedIn().then((value) => {
      this.loggedIn = value;
    })
  }
  
  shouldShowNavRight() {
    return !this.authPaths.includes(document.location.pathname);
  }

  spawnMessage(message: string, success: boolean) {

    const errorMessage = this.renderer.createElement("div");

    errorMessage.innerHTML = message;
    this.errorMessageContainer.nativeElement.append(errorMessage);

    this.renderer.addClass(errorMessage, "message");

    if (success) {
      this.renderer.addClass(errorMessage, "success-message");
    } else {
      this.renderer.addClass(errorMessage, "error-message");
    }

    setTimeout(() => {
      errorMessage.style.opacity = "0";

      setTimeout(() => {
        errorMessage.remove();
      }, 200);
    }, 3000);
  }
}
