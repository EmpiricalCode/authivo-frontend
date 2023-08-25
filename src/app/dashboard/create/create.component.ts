import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  @ViewChild("nameInput") nameInput!: ElementRef;

  creating: boolean = false;
  creatingFinished: boolean = false;
  clientID!: number;
  clientSecret!: number;

  constructor(private http: HttpClient, private messageService: MessageService) {}

  async createApplication() {

    if (!this.creating) {
      this.creating = true;

      const applicationCreateResponse: any = await lastValueFrom(this.http.post("https://authivo-api.vercel.app/applications/create", {
        token: window.localStorage.getItem("token"),
        name: this.nameInput.nativeElement.value
      }));
        
      if (applicationCreateResponse.status == 201) {
        this.creatingFinished = true;

        this.clientID = applicationCreateResponse.client_id;
        this.clientSecret = applicationCreateResponse.client_secret;

        this.messageService.spawnSuccessMessage(applicationCreateResponse.response);
      } else {
        this.messageService.spawnErrorMessage(applicationCreateResponse.response);
      }

      this.creating = false;
    }
  }
}
