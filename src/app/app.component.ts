import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements AfterViewInit {

  @ViewChild("errorMessageContainer") errorMessageContainer!: ElementRef;

  ngxMarkdownVersion = '6.2.0';

  title: string = "authivo-frontend";
  loggedIn: boolean = true;
  profileDropdown: boolean = false;

  userData: any = {};

  authPaths: String[] = [
    "/login",
    "/register",
    "/auth/login",
    "/auth/register",
    "/auth/continue",
    "/auth"
  ];

  constructor(public authService: AuthService, private renderer: Renderer2, private messageService: MessageService, private http: HttpClient) { }

  ngAfterViewInit() {

    this.messageService.attachMessages().subscribe((params: any) => {
      this.spawnMessage(params.message, params.success);
    })
    
    this.authService.isLoggedIn().then(async (value) => {
      this.loggedIn = value;

      if (value) {
        this.userData = await this.authService.getUserData();
      }
    })
    
    // Dropdown
    window.onclick = (event: any) => {
      console.log(event.target.id);
      console.log(event.target.classList);
      
      
      if (!event.target.matches(".profile-dropdown-member")) {
        this.hideProfileDropdown();
      }
    }
  }

  redirectTo(path: string) {
    window.location.href = window.location.origin + path;
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

  showProfileDropdown() {
    this.profileDropdown = true;
  }

  hideProfileDropdown() {
    this.profileDropdown = false;
  }

  toggleProfileDropdown() {
    this.profileDropdown = !this.profileDropdown;
  }

  logout() {
    window.localStorage.removeItem("token");
    window.location.href = window.location.origin;
  }
}
