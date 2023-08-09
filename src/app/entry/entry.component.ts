import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})

export class EntryComponent {

  shouldShowLogin() {
    if (window.location.pathname == "/login") {
      return true;
    }

    return false;
  }
}