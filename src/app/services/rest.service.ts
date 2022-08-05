import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import {
  allData,
  cellState,
  matrix,
  positions,
} from '../interfaces/data.interface';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const endpoint = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class RestService {
  public solved_grid: Array<Array<cellState>> = [];

  constructor(private http: HttpClient, private _authService: AuthService) {}

  getGrid(): Observable<any> {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      //params: { resolve: false },
    };
    const apiAddress: string = `${endpoint}api/grid/prototype`;

    this.http.get('url', httpOptions);
    return this.http
      .get(apiAddress)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  randomGrid(): Observable<any> {
    const apiAddress: string = `${endpoint}api/grid/random`;
    return this.http
      .get(apiAddress)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  resolveGrid(): Observable<any> {
    const apiAddress: string = `${endpoint}api/grid/light_up`;
    return this.http
      .get(apiAddress)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  sendDataMatrix(data: any): Observable<any> {
    console.log('service', data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const apiAddress: string = `${endpoint}api/grid/load_txt`;
    return this.http.post<any[]>(apiAddress, data, httpOptions);
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
}
