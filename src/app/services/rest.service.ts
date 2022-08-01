import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const endpoint = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient, private _authService: AuthService) {}

  getDataGrid(): Observable<any> {
    return this.http.get(endpoint + '/test');
  }

  // getDataGrid(): Observable<any> {
  //   return this.http
  //     .get(endpoint + 'test')
  //     .pipe(map(this.extractData), catchError(this.handleError));
  // }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response): any {
    const body = res;
    return body || {};
  }

  // public getAccessToken = (): Promise<string> => {
  //   return this._authService.getUser().then((user) => {
  //     return !!user && !user.expired ? user.access_token : null;
  //   });
  // };

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
