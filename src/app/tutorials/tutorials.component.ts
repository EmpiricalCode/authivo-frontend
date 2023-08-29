import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

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
            The code verifier should be a random long string, and the code challenge should be the SHA-256 hash (encoded to base 64) of said code verifier. Make sure to store the code verifier (for example, in local storage).`
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

              clientID: string = "(your client ID)";

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
          
              // Redirecting to /auth
              window.location.href = \`https://authivo.com/auth?auth_type=pkce&client_id=\${this.clientID}&code_challenge=\${codeChallenge}&redirect_uri=http://localhost:4200\`;
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
      },
      {
        title: "Concluding Authentication",
        id: "concluding_authentication",
        content: [
          {
            type: "p",
            content: `After a user clicks the login button and authenticates, they will be redirected back to the website with the authorization code within the URL query parameters. Using this code, 
            alongside the stored code verifier, make a request to the token endpoint to recieve a Java Web Token. These JWTs last for one day. Also note that the authorization code provided
            only lasts for 60 seconds.`
          },
          {
            type: "p",
            content: `Implement the OnInit interface and then create the ngOnInit function.
            Inject the ActivatedRoute service into the app component and use it to access the URL query parameters.
            Once the authorization code is obtained from the URL, make a post request to the token endpoint in order to obtain a token corresponding to your application.`
          },
          {
            type: "p",
            content: `Now that the token is obtained, store it and then get rid of the original authorization code.`
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

            export class AppComponent implements OnInit {

              title = 'authivo-angular';
            
              clientID: string = "(your client ID)";
            
              constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {}
            
              ngOnInit() {
                  
                this.activatedRoute.queryParams.subscribe((params: any) => {
                  
                  // If there is an authorization code within the URL query parameters, use it to obtain a token
                  if (params.code) {

                    // Create the post request
                    this.http.post("https://api.authivo.com/authentication/token", 
                      {
                        auth_type: "pkce",
                        code_verifier: window.localStorage.getItem("code"),
                        code: params.code
                      }
                    // Recieve token resposne
                    ).subscribe((tokenResponse: any) => {
                      
                      if (tokenResponse.status == 200) {

                        window.localStorage.setItem("token", tokenResponse.token);
                        window.localStorage.removeItem("code");

                      // If error, log it to the console
                      } else {
                        console.log(tokenResponse.response);
                      }
                    })
                  }
                })
              }

            ...
            \`\`\``
          }
        ]
      },
      {
        title: "Checking If A User Is Logged In",
        id: "checking_if_a_user_is_logged_in",
        content: [
          {
            type: "p",
            content: `Next, create a variable describing whether or not the user is logged in. Within ngOnInit, check if the localStorage contains a token. 
            If it does, make a post request to the tokenInfo endpoint and verify that the token is valid and its 'aud' field matches your application's client id.
            If the token is valid, set loggedIn to true. Otherwise, remove the token from localStorage. As well, make sure you reload the page after you store the token (after using the authorization code).`
          },
          {
            type: "h4",
            content: "app.component.ts"
          },
          {
            type: "code",
            content : `
            \`\`\`typescript
            ...

            loggedIn: boolean = false;

            ...

            ngOnInit() {
      
              if (window.localStorage.getItem("token")) {
          
                // Making post request to token info endpoint
                this.http.post("https://api.authivo.com/authorization/tokeninfo", 
                  {
                    token: window.localStorage.getItem("token")
                  }
          
                // Recieve token info response data
                ).subscribe((tokenInfoResponse: any) => {
          
                  if (tokenInfoResponse.status == 200) {
          
                    if (tokenInfoResponse.valid && tokenInfoResponse.decoded.aud == this.clientID) {
                      this.loggedIn = true;
                    
                      // Removing the token if it isn't valid
                    } else {
                      localStorage.removeItem("token");
                    }
          
                  } else {
                    console.log(tokenInfoResponse.response);
                  }
                })
          
              // If there is no token, just proceed with checking if there is a code within the URL query params
              } else {

                this.activatedRoute.queryParams.subscribe((params: any) => {

                        ...

                        window.localStorage.setItem("token", tokenResponse.token);
                        window.localStorage.removeItem("code");
          
                        window.location.href = window.location.origin;

                        ...

                })
              }
            }

            ...
            \`\`\`
            `
          },
          {
            type: "p",
            content: "Next, modify the app component's template to show a welcome message if the user is logged in."
          },
          {
            type: "h4",
            content: "app.component.html"
          },
          {
            type: "code",
            content: `
            \`\`\`html
            <button *ngIf="!this.loggedIn" id="login-button" (click)="login()">Login With Authivo</button>
            <p *ngIf="this.loggedIn">Welcome!</p>
            \`\`\``
          }
        ]
      },
      {
        title: "Displaying User Data",
        id: "displaying_user_data",
        content: [
          {
            type: "p",
            content: `Within ngOnInit, after you request the token information and the token is verified, make a get request to the userData endpoint with the user id of the token in the URL query params.
            Store the response data within a variable. Within the app component's template, you can now display this data.`
          },
          {
            type: "h4",
            content: "app.component.ts"
          },
          {
            type: "code",
            content: `
            \`\`\`typescript
            ngOnInit() {

              ...
              
                  if (tokenInfoResponse.status == 200) {

                    if (tokenInfoResponse.valid && tokenInfoResponse.decoded.aud == this.clientID) {
          
                      this.loggedIn = true;
          
                      // Fetching user data
                      this.http.get(\`https://api.authivo.com/users/userdata?id=\${tokenInfoResponse.decoded.id}\`).subscribe((userDataResponse: any) => {
                        
                        if (userDataResponse.status == 200) {
                          this.userData = userDataResponse.data;
                        } else {
                          console.log(userDataResponse.response);
                        }
                      })

                    // Removing the token if it isn't valid
                    } else {
                      localStorage.removeItem("token");
                    }
          
                  } else {
                    console.log(tokenInfoResponse.response);
                  }
              
              ...

            }
            \`\`\``
          },
          {
            type: "h4",
            content: "app.component.html"
          },
          {
            type: "code",
            content: `
            \`\`\`html
            <button *ngIf="!this.loggedIn" id="login-button" (click)="login()">Login With Authivo</button>
            <p *ngIf="this.loggedIn">Welcome {{this.userData.username}}! Your id is {{this.userData.id}}.</p>
            \`\`\``
          },
          {
            type: "p",
            content: "Your application should now be able to display the username and ID of a user upon logging in with Authivo."
          }
        ]
      }
    ],
    index: [
      {
        title: "Using Authivo With Angular",
        id: "using_authivo_with_angular",
        indexGrouping: [0, 1, 2, 3, 4, 5, 6, 7, 8]
      }
    ]
  }

  constructor(private titleService: Title) {
    this.titleService.setTitle("Tutorials | Authivo");
  }

  scrollTo(element: Element) {
    element.scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }

  scrollToID(id: any) {
    document.getElementById(id)!.scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }
}
