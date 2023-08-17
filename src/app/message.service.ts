import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageObservable$ = new Subject();

  constructor() { }

  attachMessages() {
    return this.messageObservable$;
  }

  spawnErrorMessage(message: string) {
    this.messageObservable$.next({message: message, success: false});
  }

  spawnSuccessMessage(message: string) {
    this.messageObservable$.next({message: message, success: true});
  }
}
