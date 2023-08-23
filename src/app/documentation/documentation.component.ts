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
        access: "PUBLIC",
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
        access: "PUBLIC",
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
            description: "A JSON Web Token corresponding to your application."
          }
        ]
      },
      {
        title: "Token Info",
        id: "token_info",
        type: "POST",
        access: "PUBLIC",
        url: "https://authivo-api.vercel.app/authorization/tokenInfo",
        description: "The token info endpoint takes in a token, and returns information about that token.",
        request: [
          {
            name: "token",
            description: "A JSON Web Token obtained from Authivo."
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
            name: "valid",
            description: "Whether or not the token is valid."
          },
          {
            name: "decoded",
            description: "The decoded body of the JSON Web Token. This field will only be present if the token is valid."
          }
        ]
      },
      {
        title: "Get Applications",
        id: "get_applications",
        type: "POST",
        access: "HOST ONLY",
        url: "https://authivo-api.vercel.app/applications/getApplications",
        description: "This endpoint takes in a token, and returns the applications associated with the owner of that token.",
        request: [
          {
            name: "token",
            description: "A JSON Web Token obtained from Authivo."
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
            name: "applications",
            description: "A list of the user's applications."
          }
        ]
      },
      {
        title: "Get Application By ID",
        id: "get_application_by_id",
        type: "POST",
        access: "HOST ONLY",
        url: "https://authivo-api.vercel.app/applications/getApplicationByID",
        description: "This endpoint takes in a token, and returns the application associated with a client ID (if it exists).",
        request: [
          {
            name: "token",
            description: "A JSON Web Token obtained from Authivo."
          },
          {
            name: "client_id",
            description: "The client ID of the target application."
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
            name: "application",
            description: "The target application."
          }
        ]
      },
      {
        title: "User Data",
        id: "user_data",
        type: "POST",
        access: "PUBLIC",
        url: "https://authivo-api.vercel.app/users/userData",
        description: "The user data endpoint takes in either a user ID or username, and returns data related to that user. Only one (either ID or username) is neccessary.",
        request: [
          {
            name: "id",
            description: "A user ID."
          },
          {
            name: "username",
            description: "A username."
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
            name: "data",
            description: "The desired user data."
          }
        ]
      }
    ],
    index: [
      {
        title: "Authentication API",
        id: "authentication_api",
        indexGrouping: [0, 1]
      },
      {
        title: "Authorization API",
        id: "authorization_api",
        indexGrouping: [2]
      },
      {
        title: "Application API",
        id: "application_api",
        indexGrouping: [3, 4]
      },
      {
        title: "Users API",
        id: "users_api",
        indexGrouping: [5]
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
