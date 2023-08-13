import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-continue',
  templateUrl: './continue.component.html',
  styleUrls: ['./continue.component.css']
})
export class ContinueComponent {

  @Output() 
  spawnErrorMessageEvent = new EventEmitter<string>();

  spawnErrorMessage(message: string) {
    this.spawnErrorMessageEvent.emit(message);
  }
}
