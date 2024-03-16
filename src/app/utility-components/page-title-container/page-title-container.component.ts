import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-title-container',
  templateUrl: './page-title-container.component.html',
  styleUrls: ['./page-title-container.component.css']
})
export class PageTitleContainerComponent {

  @Input() title = "";
}
