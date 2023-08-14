import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  applications: any[] = [
    {
      name: "Spotify appasdfasdfasdfasdfasdasdasdasdasasdf",
      date: "2023/08/14"
    },
    {
      name: "My Application",
      date: "2023/08/14"
    }
  ];
}
