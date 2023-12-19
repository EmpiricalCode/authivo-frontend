import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  @ViewChild("errorMessageContainer") errorMessageContainer!: ElementRef;

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

  constructor(public authService: AuthService, private renderer: Renderer2, private messageService: MessageService, private http: HttpClient, private themeService: ThemeService) { }

  // Runs after component is initialized
  ngOnInit() {

    // Sets up current theme
    this.themeService.set(localStorage.getItem("theme") as string);
  
    // Setting up message display
    this.messageService.attachMessages().subscribe((params: any) => {
      this.spawnMessage(params.message, params.success);
    })
    
    // Fetching user data if logged in
    this.authService.isLoggedIn().then(async (value) => {
      this.loggedIn = value;

      if (value) {
        this.userData = await this.authService.getUserData();
      }
    })
    
    // Dropdown handling
    window.onclick = (event: any) => {
      if (!event.target.matches(".profile-dropdown-member")) {
        this.hideProfileDropdown();
      }
    }
  }

  // Redirects to a path on the website
  redirectTo(path: string) {
    window.location.href = window.location.origin + path;
  }
  
  // Returns if the right side of the nav bar should be shown
  shouldShowNavRight() {
    return !this.authPaths.includes(document.location.pathname);
  }

  // Displays an error/success message
  spawnMessage(message: string, success: boolean) {

    const errorMessage = this.renderer.createElement("div");

    errorMessage.innerHTML = message;

    // Appending error message
    this.errorMessageContainer.nativeElement.append(errorMessage);

    this.renderer.addClass(errorMessage, "message");

    if (success) {
      this.renderer.addClass(errorMessage, "success-message");
    } else {
      this.renderer.addClass(errorMessage, "error-message");
    }

    // Deleting message after delay
    setTimeout(() => {
      errorMessage.style.opacity = "0";

      setTimeout(() => {
        errorMessage.remove();
      }, 200);
    }, 3000);
  }

  // Shows profile dropdown menu
  showProfileDropdown() {
    this.profileDropdown = true;
  }

  // Hides profile dropdown menu
  hideProfileDropdown() {
    this.profileDropdown = false;
  }

  // Toggles profile dropdown menu
  toggleProfileDropdown() {
    this.profileDropdown = !this.profileDropdown;
  }

  // Logs user out of account
  logout() {
    window.localStorage.removeItem("token");
    window.location.href = window.location.origin;
  }
}
