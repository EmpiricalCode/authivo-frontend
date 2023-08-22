import { Component } from '@angular/core';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent {

  documentationData: any = {
    raw: [
      {
        title: "Authentication",
        id: "authentication",
        type: "REDIRECT",
        url: "https://authivo.vercel.app/auth",
        description: "Redirect to this endpoint with the neccessary URL query parameters in order to use Authivo authentication.",
        request: [
          {
            name: "auth_type",
            description: `The authentication type which your project uses. Valid values are "authentication_code" and "pkce".`
          },
          {
            name: "client_id",
            description: "The client ID for your application. This can be viewed from the Authivo dashboard."
          },
          {
            name: "redirect_uri",
            description: "The URI that Authivo should redirect to once authentication is complete."
          },
          {
            name: "code_challenge",
            description: `A code challenge relating to the PKCE code flow. If your project's authentication type is "authentication_code", this parameter is not neccessary.`
          }
        ],
        return: [
          {
            name: "code",
            description: "The authentication code that should be used to fetch a token."
          }
        ]
      },
      {
        title: "Token",
        id: "token",
        type: "POST",
        url: "https://authivo-api.vercel.app/authentication/token",
        description: "The token endpoint takes in an authentication code (among other parameters), and returns a JSON web token.",
        request: [
          {
            name: "code",
            description: "The authentication code returned by the /auth redirect."
          },
          {
            name: "code_verifier",
            description: "The code verifier used to generate the code challenge (Only for PKCE)."
          },
          {
            name: "client_secret",
            description: "The client secret to your application (For non-PKCE)."
          }
        ],
        return: [
          {
            name: "status",
            description: "The HTTP status of the response."
          },
          {
            name: "response",
            description: "The response to the request."
          },
          {
            name: "token",
            description: "The authentication code that should be used to fetch a token."
          }
        ]
      }
    ],
    index: [
      {
        title: "Authentication API",
        id: "authentication_api",
        indexGrouping: [0, 1]
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
