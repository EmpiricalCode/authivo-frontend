import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css', '../dashboard.component.css']
})
export class ConfigureComponent {

  @ViewChild("addRedirectURIInput") addRedirectURIInput!: ElementRef;

  application: any = {};
  params: any = {};
  redirectURIs: any = [];

  addingURI: boolean = false;
  deleting: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private renderer: Renderer2, private messageService: MessageService, private titleService: Title) {

    this.titleService.setTitle("Authivo • Configure");

    this.route.params.subscribe((params: any) => {
      this.params = params;
      this.loadApplicationData();
    })
  }

  loadApplicationData() {
    this.http.post("https://authivo-api.vercel.app/applications/getapplicationbyid", {
        token: window.localStorage.getItem("token"),
        client_id: this.params.client_id
    }).subscribe((response: any) => {

      if (response.status == 200) {
        this.application = response.application;
        this.application.creationDate = new Date(this.application.creationDate).toLocaleString().split(',')[0];
        this.getRedirectURIs();
      } else if (response.status == 400) {
        this.router.navigate(['dashboard']);
      }
    })
  }

  deactivateDelete() {
    this.renderer.removeClass(document.body, "no-scroll");
    this.deleting = false;
  }

  initiateDelete() {
    this.renderer.addClass(document.body, "no-scroll");
    this.deleting = true;
  }

  delete() {
    this.http.post("https://authivo-api.vercel.app/applications/delete", {
      token: window.localStorage.getItem("token"),
      client_id: this.params.client_id
    }).subscribe((response: any) => {

      this.deactivateDelete();

      if (response.status == 200) {
        this.router.navigate(['dashboard']);
      } else {
        this.messageService.spawnErrorMessage(response.response);
      }
    })
  }

  addRedirectURI() {

    if (!this.addingURI) {

      this.addingURI = true;

      const uri = this.addRedirectURIInput.nativeElement.value;

      this.http.post("https://authivo-api.vercel.app/applications/addredirecturi", {
        token: window.localStorage.getItem("token"),
        client_id: this.params.client_id,
        redirect_uri: uri
      }).subscribe((response: any) => {

        if (response.status == 200) {
          this.messageService.spawnSuccessMessage(response.response);
          this.addRedirectURIInput.nativeElement.value = "";
          this.getRedirectURIs();
        } else {  
          this.messageService.spawnErrorMessage(response.response);
        }

        this.addingURI = false;
      })
    }
  }

  deleteRedirectURI(uri: string) {
    this.http.post("https://authivo-api.vercel.app/applications/deleteredirecturi", {
      token: window.localStorage.getItem("token"),
      client_id: this.params.client_id,
      redirect_uri: uri
    }).subscribe((response: any) => {

      if (response.status == 200) {
        this.messageService.spawnSuccessMessage(response.response);
        this.getRedirectURIs();
        this.redirectURIs = response.redirect_uris;
      } else {  
        this.messageService.spawnErrorMessage(response.response);
      }
    })
  }

  getRedirectURIs() {

    this.http.post("https://authivo-api.vercel.app/applications/getredirecturis", {
      token: window.localStorage.getItem("token"),
      client_id: this.params.client_id,
    }).subscribe((response: any) => {

      if (response.status == 200) {
        this.redirectURIs = response.redirect_uris;
      } else {  
        this.messageService.spawnErrorMessage(response.response);
      }
    })
  }
}
