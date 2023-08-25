import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  applications: any[] = [];

  constructor(private http: HttpClient, public router: Router) {}

  ngOnInit() {
      
    this.http.post("https://authivo-api.vercel.app/applications/getapplications", {
      token: window.localStorage.getItem("token")
    }).subscribe((res: any) => {

      if (res.status == 200) {

        this.applications = res.applications;

        // Formatting dates
        for (var application of this.applications) {
          application.creationDate = new Date(application.creationDate).toLocaleString().split(',')[0];
        }

      } else {
        alert(res.response);
      }
    })
  }
}
