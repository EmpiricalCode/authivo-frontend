import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Title } from '@angular/platform-browser';
import { MessageService } from '../../services/message.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css', '../dashboard/configure/configure.component.css']
})
export class SettingsComponent implements OnInit {

  userData: any = {};
  changingUsername: boolean = false;
  changingPassword: boolean = false;
  deleting: boolean = false;
  activeTheme: string = this.themeService.activeTheme as string;

  constructor(private http: HttpClient, private authService: AuthService, private titleService: Title, private messageService: MessageService, private themeService: ThemeService, private renderer: Renderer2) {
    titleService.setTitle("Account Settings | Authivo");
  }

  // Runs after component is initialized
  async ngOnInit() {

    // Fetching user data
    this.userData = await this.authService.getUserData();
    this.userData.creationDate = new Date(this.userData.registerTimestamp).toLocaleString().split(',')[0];
  }

  // Changes theme given name
  changeTheme(name: string) {
    this.activeTheme = name;
    this.themeService.set(name);
  }

  // Changes a user's username
  changeUsername(name: string) {

    if (name != this.userData.username) {

      if (!this.changingUsername) {

        this.changingUsername = true;

        // Calling changeUsername API 
        this.http.post("https://api.authivo.com/users/changeusername", {
          token: localStorage.getItem("token"),
          username: name
        }).subscribe((response: any) => {

          this.changingUsername = false;

          // If success, reload page and spawn success message
          if (response.status == 200) {

            this.messageService.spawnSuccessMessage(response.response);
            
            setTimeout(() => {
              window.location.reload();
            }, 1000);

          } else {
            this.messageService.spawnErrorMessage(response.response);
          }
        })
      }
    } else {
      this.messageService.spawnErrorMessage("New username must be different than current username");
    }
  }

  // Changes a user's password
  changePassword(oldPassword: string, newPassword: string, newPasswordConfirm: string) {

    // Checks if new password matches new confirm password
    if (newPassword !== newPasswordConfirm) {
      this.messageService.spawnErrorMessage("Passwords do not match");
      return;
    }

    if (!this.changingPassword) {

      this.changingPassword = true;

      // Calling changePassword API 
      this.http.post("https://api.authivo.com/users/changepassword", {
        token: localStorage.getItem("token"),
        oldPassword: oldPassword,
        newPassword: newPassword
      }).subscribe((response: any) => {

        this.changingPassword = false;

        // If success, reload page and spawn success message
        if (response.status == 200) {
          this.messageService.spawnSuccessMessage(response.response);

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          this.messageService.spawnErrorMessage(response.response);
        }
      })
    }
  }



  // Deletes the user's account
  delete(confirmUsername: string) {

    // Checks if the confirm username is correct
    if (this.userData.username !== confirmUsername) {
      this.messageService.spawnErrorMessage("Incorrect username entered");
      return;
    }

    // Making request to deleteAccount endpoint
    this.http.post("https://api.authivo.com/users/deleteaccount", {
      token: localStorage.getItem("token")
    }).subscribe((response: any) => {

      if (response.status == 200) {
        this.messageService.spawnSuccessMessage(response.response);
        localStorage.removeItem("token");

        setTimeout(() => {
          window.location.href = "";
        }, 1000);
      } else {
        this.messageService.spawnErrorMessage(response.response);
      }
    })
  }

  // Initiates the delete action
  initiateDelete() {
    this.renderer.addClass(document.body, "no-scroll");
    this.deleting = true;
  }

  // Cancels the delete action
  deactivateDelete() {
    this.renderer.removeClass(document.body, "no-scroll");
    this.deleting = false;
  }
}
