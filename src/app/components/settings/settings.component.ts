import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  activeTheme: string = this.themeService.activeTheme as string;

  constructor(private http: HttpClient, private authService: AuthService, private titleService: Title, private messageService: MessageService, private themeService: ThemeService) {
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
            window.location.reload();
            this.messageService.spawnSuccessMessage(response.response);
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
      this.http.post("https://api-authivo-dev.vercel.app/users/changepassword", {
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
}
