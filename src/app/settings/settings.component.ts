import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Title } from '@angular/platform-browser';
import { MessageService } from '../message.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css', '../dashboard/configure/configure.component.css']
})
export class SettingsComponent implements OnInit {

  userData: any = {};
  changingUsername: boolean = false;
  activeTheme: string = this.themeService.activeTheme as string;

  constructor(private http: HttpClient, private authService: AuthService, private titleService: Title, private messageService: MessageService, private themeService: ThemeService) {
    titleService.setTitle("Account Settings | Authivo");
  }

  changeUsername(name: string) {

    if (name != this.userData.username) {

      if (!this.changingUsername) {

        this.changingUsername = true;

        this.http.post("https://api.authivo.com/users/changeusername", {
          token: localStorage.getItem("token"),
          username: name
        }).subscribe((response: any) => {

          this.changingUsername = false;

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

  async ngOnInit() {
    this.userData = await this.authService.getUserData();
    this.userData.creationDate = new Date(this.userData.registerTimestamp).toLocaleString().split(',')[0];
  }
}
