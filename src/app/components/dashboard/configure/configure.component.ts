import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';

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
  changingApplicationName: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private renderer: Renderer2, private messageService: MessageService, private titleService: Title) {

    this.titleService.setTitle("Configure | Authivo");

    this.route.params.subscribe((params: any) => {
      this.params = params;
      this.loadApplicationData();
    })
  }

  changeApplicationName(name: String) {

    if (name != this.application.name) {
      if (!this.changingApplicationName) {
        this.changingApplicationName = true;

        this.http.post("https://api.authivo.com/applications/changeapplicationname", {
          token: window.localStorage.getItem("token"),
          client_id: this.application.clientID,
          name: name
        }).subscribe((response: any) => {
          this.changingApplicationName = false;

          if (response.status == 200) {
            this.messageService.spawnSuccessMessage(response.response);
            this.loadApplicationData();
          } else {
            this.messageService.spawnErrorMessage(response.response);
          }
        })
      }
    } else {
      this.messageService.spawnErrorMessage("New application name must be different from current application name");
    }
  }

  loadApplicationData() {
    this.http.post("https://api.authivo.com/applications/getapplicationbyid", {
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
    this.http.post("https://api.authivo.com/applications/delete", {
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

      this.http.post("https://api.authivo.com/applications/addredirecturi", {
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
    this.http.post("https://api.authivo.com/applications/deleteredirecturi", {
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

    this.http.post("https://api.authivo.com/applications/getredirecturis", {
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