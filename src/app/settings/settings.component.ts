import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css', '../dashboard/configure/configure.component.css']
})
export class SettingsComponent implements OnInit {

  userData: any = {};

  constructor(private http: HttpClient, private authService: AuthService) {}

  async ngOnInit() {
    this.userData = await this.authService.getUserData();
    this.userData.creationDate = new Date(this.userData.registerTimestamp).toLocaleString().split(',')[0];
  }
}
