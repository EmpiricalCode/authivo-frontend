import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
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

  constructor(public authService: AuthService, private renderer: Renderer2, private messageService: MessageService, private http: HttpClient) { }

  ngAfterViewInit() {

    this.messageService.attachMessages().subscribe((params: any) => {
      this.spawnMessage(params.message, params.success);
    })
    
    this.authService.isLoggedIn().then((value) => {
      this.loggedIn = value;

      if (value) {

        this.http.post("https://authivo-api-dev.vercel.app/authorization/tokeninfo", {
          token: window.localStorage.getItem("token")
        }).subscribe((tokenInfoResponse: any) => {

          console.log(tokenInfoResponse);

          if (tokenInfoResponse.status == 200) {

            this.http.get(`https://authivo-api-dev.vercel.app/users/userdata?id=${tokenInfoResponse.decoded.id}`).subscribe((userDataResponse: any) => {

              if (userDataResponse.status == 200) {
                this.userData = userDataResponse.data;
                console.log(this.userData);
              }
            })
          }
        });
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
