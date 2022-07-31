import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const endpoint = 'http://127.0.0.1:8000/api/grid/';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient, private _authService: AuthService) {}

  getDataGrid(): Observable<any> {
    return this.http
      .get(endpoint + 'load_design')
      .pipe(map(this.extractData), catchError(this.handleError));
  }
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

  public getAccessToken = (): Promise<string> => {
    return this._userManager.getUser().then((user) => {
      return !!user && !user.expired ? user.access_token : null;
    });
  };
}
