import { Component, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-continue',
  templateUrl: './continue.component.html',
  styleUrls: ['./continue.component.css']
})
export class ContinueComponent {

  constructor(private messageService: MessageService) {}
}
