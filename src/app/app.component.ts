import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  shouldShowNavRight() {
    if (window.location.pathname == "/login" || window.location.pathname == "/register") {
      return false;
    }

    return true;
  }
}
