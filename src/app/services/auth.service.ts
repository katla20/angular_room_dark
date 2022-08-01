import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const endpoint = environment.API_URL;
const user = environment.user;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = environment.user;
  constructor(private http: HttpClient) {}

  authToken(): Observable<any> {
    const apiAddress: string = `${endpoint}api/login`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any[]>(apiAddress, user, httpOptions);
  }

  // public getAccessToken = (): Promise<string> => {
  //   // return this._userManager.getUser()
  //   // .then(user => {
  //   //   return !!user && !user.expired ? user.access_token : null;
  //   // })
  // }

  // public getData = (route: string) => {
  //   return from(
  //     this._authService.getAccessToken().then((token) => {
  //       const headers = new HttpHeaders().set(
  //         'Authorization',
  //         `Bearer ${token}`
  //       );
  //       return this.http
  //         .get(this.createCompleteRoute(route, this.envUrl.urlAddress), {
  //           headers: headers,
  //         })
  //         .toPromise();
  //     })
  //   );
  // };

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  };
}
