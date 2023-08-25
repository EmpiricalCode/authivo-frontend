import { Component } from '@angular/core';

@Component({
  selector: 'app-documentation',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.css', '../documentation/documentation.component.css']
})
export class TutorialsComponent {

  tutorialsData: any = {
    raw: [
      {
        title: "Getting Set Up",
        id: "getting_set_up",
        content: [
          {
            type: "p",
            content: `Before we start, make sure you create an Authivo account (if you haven't already). Click the login button in the top right corner, and then either login or register into Authivo.`
          },
          {
            type: "p",
            content: `Next, navigate to your dashboard. Click the create button, title your application, and continue. Once your application is created, navigate back to the dashboard and make sure the newly created application is there. 
            You won't be needing your client secret for this tutorial since you will be using the PKCE code flow.`
          },
          {
            type: "p",
            content: `Click on your newly created application, and navigate down to the redirect URI section. Add 'http://localhost:4200' to your list of redirect URIs. If you use another port for your angular applications, replace '4200' with that.`
          },
          {
            type: "p",
            content: `NOTE: You will need both Angular and the Angular CLI installed to follow this tutorial.`
          },
        ]
      },
      {
        title: "Creating The Project",
        id: "creating_the_project",
        content: [
          {
            type: "p",
            content: `Create a new angular project by running the following command:`
          },
          {
            type: "code",
            content: `
            \`\`\`
            ng new (your app name)
            \`\`\`
            `
          },
          {
            type: "p",
            content: `Once your application is finished generating, open the folder (corresponding to your project) in a code editor (such as VSCode).`
          },
        ]
      },
      {
        title: "Setting Up The Front End",
        id: "setting_up_the_front_end",
        content: [
          {
            type: "p",
            content: `Navigate to the src/app folder and clear the app.component.html file. 
            Create a basic login button in the app component. This button will be what redirects us to Authivo's /auth endpoint.`
          },
          {
            type: "h4",
            content: "app.component.html:"
          },
          {
            type: "code",
            content: `
            \`\`\`html
            <button id="login-button">Login With Authivo</button>
            \`\`\`
            `
          },
          {
            type: "h4",
            content: `app.component.css`
          },
          {
            type: "code",
            content: `
            \`\`\`css
            #login-button {
              padding: 10px;
              background-color: rgb(168, 100, 216);
              border-radius: 10px;
              border: none;
              color: white;
              cursor: pointer;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              font-weight: 500;
              font-size: 15px;
            }
            \`\`\`
            `
          }
        ]
      },
      {
        title: "Setting Up HttpClient",
        id: "setting_up_httpclients",
        content: [
          {
            type: "p",
            content: "Go to app.module.ts and import the HttpClientModule. Then, using dependency injection, we can create a constructor in app.component.ts in order to use HttpClient."
          },
          {
            type: "h4",
            content: "app.module.ts"
          },
          {
            type: "code",
            content: `
            \`\`\`typescript
            import { NgModule } from '@angular/core';
            import { BrowserModule } from '@angular/platform-browser';

            import { AppRoutingModule } from './app-routing.module';
            import { AppComponent } from './app.component';
            import { HttpClientModule } from '@angular/common/http';

            @NgModule({
              declarations: [
                AppComponent
              ],
              imports: [
                BrowserModule,
                AppRoutingModule,
                HttpClientModule
              ],
              providers: [],
              bootstrap: [AppComponent]
            })
            export class AppModule { }
            \`\`\`
            `
          },
          {
            type: "h4",
            content: "app.component.ts"
          },
          {
            type: "code",
            content: `
            \`\`\`typescript
            import { HttpClient } from '@angular/common/http';
            import { Component } from '@angular/core';

            @Component({
              selector: 'app-root',
              templateUrl: './app.component.html',
              styleUrls: ['./app.component.css']
            })
            export class AppComponent {

              title = 'authivo-angular';

              constructor(private http: HttpClient) {}
            }
            \`\`\`
            `
          },
        ]
      },
      {
        title: "Generating The Code Challenge",
        id: "generating_the_code_challenge",
        content: [
          {
            type: "p",
            content: `Next, create an async login function in app.component.ts and store your client ID within a variable. Within the login function, you will want to generate a code verifier and a code challenge.
            The code verifier should be a random long string, and the code challenge should be the SHA-256 hash (encoded to base 64) of said code verifier.`
          },
          {
            type: "h4",
            content: "app.component.ts"
          },
          {
            type: "code",
            content: `
            \`\`\`typescript
            import { HttpClient } from '@angular/common/http';
            import { Component } from '@angular/core';

            @Component({
              selector: 'app-root',
              templateUrl: './app.component.html',
              styleUrls: ['./app.component.css']
            })
            export class AppComponent {

              title = 'authivo-angular';

              clientID: string = "F9SFFIUfH89rcuX2Iy4S";

              constructor(private http: HttpClient) {}

              generateCodeVerifier() {

                var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
                var string_length = 20;
                var randomstring = '';

                for (var i = 0; i < string_length; i++) {
                    var rnum = Math.floor(Math.random() * chars.length);
                    randomstring += chars[rnum];
                }

                return randomstring;
              }

              async login() {

                // Randomly generates a string of length 20
                const codeVerifier = this.generateCodeVerifier();

                // Runs the code verifier through a SHA-256 algorithm, then converts it to base 64
                const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(
                  await window.crypto.subtle.digest("SHA-256", (new TextEncoder()).encode(codeVerifier)))));
              }
            }
            \`\`\`
            `
          }
        ]
      },
      {
        title: "Initiating Authentication",
        id: "initiating_authentication",
        content: [
          {
            type: "p",
            content: "Within the login function, redirect the window to the Authivo /auth endpoint with the following URL query parameters:"
          },
          {
            type: "h4",
            content: "app.component.ts"
          },
          {
            type: "code",
            content: `
            \`\`\`typescript
            ... 

            async login() {

              // Randomly generates a string of length 20
              const codeVerifier = this.generateCodeVerifier();
          
              // Storing the code verifier
              window.localStorage.setItem("code", codeVerifier);
          
              // Runs the code verifier through a SHA-256 algorithm, then converts it to base 64
              const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(
                await window.crypto.subtle.digest("SHA-256", (new TextEncoder()).encode(codeVerifier)))));
          
              window.location.href = \`https://authivo-frontend-git-dev-empiricalcode.vercel.app/auth
                ?auth_type=pkce&client_id=\${this.clientID}&code_challenge=\${codeChallenge}&redirect_uri=http://localhost:4200\`;
            }

            ...
            \`\`\`
            `
          },
          {
            type: "p",
            content: "Next, add a click binding to the button in app.component.html which correponds to the login function."
          },
          {
            type: "h4",
            content: "app.component.html"
          },
          {
            type: "code",
            content: `
            \`\`\`html
            <button id="login-button" (click)="login()">Login With Authivo</button>
            \`\`\`
            `
          }
        ]
      }
    ],
    index: [
      {
        title: "Using Authivo With Angular",
        id: "using_authivo_with_angular",
        indexGrouping: [0, 1, 2, 3, 4, 5]
      }
    ]
  }

  scrollTo(element: Element) {
    element.scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }

  scrollToID(id: any) {
    document.getElementById(id)!.scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }
}
