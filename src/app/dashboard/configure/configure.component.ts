import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css', '../dashboard.component.css']
})
export class ConfigureComponent {

  application: any = {};
  params: any = {};

  deleting: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private renderer: Renderer2, private messageService: MessageService) {

    this.route.params.subscribe((params: any) => {
      this.params = params;
      this.loadApplicationData();
    })
  }

  loadApplicationData() {
    this.http.post("https://authivo-api-dev.vercel.app/applications/getapplicationbyid", {
        token: window.localStorage.getItem("token"),
        client_id: this.params.client_id
    }).subscribe((response: any) => {

      if (response.status == 200) {
        this.application = response.application;
        this.application.creationDate = new Date(this.application.creationDate).toLocaleString().split(',')[0];
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
    this.http.post("https://authivo-api-dev.vercel.app/applications/delete", {
      token: window.localStorage.getItem("token"),
      client_id: this.params.client_id
    }).subscribe((response: any) => {

      if (response.status == 200) {
        this.router.navigate(['dashboard']);
      } else {
        this.messageService.spawnErrorMessage(response.response);
      }
    })
  }
}
