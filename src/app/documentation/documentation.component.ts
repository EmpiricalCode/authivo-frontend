import { Component } from '@angular/core';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent {

  scrollTo(element: Element) {
    element.scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }
}
