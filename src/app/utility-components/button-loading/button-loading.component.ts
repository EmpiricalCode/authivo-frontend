import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-loading',
  templateUrl: './button-loading.component.html',
  styleUrls: ['./button-loading.component.css']
})
export class ButtonLoadingComponent {

  @Input() text = "";
  @Input() active = false;
  @Input() width = "";

  @Output() buttonClick = new EventEmitter();

  click() {
    this.buttonClick.emit();
  }
}
