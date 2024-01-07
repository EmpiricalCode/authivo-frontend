import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageObservable$ = new Subject();

  constructor() { }

  // Exposes the message observable
  attachMessages() {
    return this.messageObservable$;
  }

  // Triggers observable to send an error message
  spawnErrorMessage(message: string) {
    this.messageObservable$.next({message: message, success: false});
  }

  // Triggers observable to send a success message
  spawnSuccessMessage(message: string) {
    this.messageObservable$.next({message: message, success: true});
  }
}
