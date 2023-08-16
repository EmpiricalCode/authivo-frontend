import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css', '../dashboard.component.css']
})
export class CreateComponent {

  @ViewChild("nameInput") nameInput!: ElementRef;

  creating: boolean = false;
  creatingFinished: boolean = false;

  constructor(private http: HttpClient) {}

  async createApplication() {

    if (!this.creating) {
      this.creating = true;

      const applicationCreateResponse: any = await lastValueFrom(this.http.post("https://authivo-api-dev.vercel.app/applications/create", {
        token: window.localStorage.getItem("token"),
        name: this.nameInput.nativeElement.value
      }));

      alert(applicationCreateResponse.response);
        
      if (applicationCreateResponse.status == 201) {
        this.creatingFinished = true;
      }

      this.creating = false;
    }
  }
}
