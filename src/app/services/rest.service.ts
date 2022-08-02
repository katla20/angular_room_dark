import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
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

  getDataGrid(): Observable<any> {
    const apiAddress: string = `${endpoint}api/grid/prototype`;
    return this.http
      .get(apiAddress)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  sendDataGrid(data: any): Observable<any> {
    const apiAddress: string = `${endpoint}api/grid/load_design`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any[]>(apiAddress, data, httpOptions);
  }

  refactorDataMaptoGrid(resolve: boolean = false): Array<Array<cellState>> {
    if (!resolve) {
      return [
        [
          { light: false, bulb: false, wall: false },
          { light: false, bulb: false, wall: false },
          { light: false, bulb: false, wall: false },
          { light: false, bulb: false, wall: false },
        ],
        [
          { light: false, bulb: false, wall: true },
          { light: false, bulb: false, wall: false },
          { light: false, bulb: false, wall: true },
          { light: false, bulb: false, wall: true },
        ],
        [
          { light: false, bulb: false, wall: false },
          { light: false, bulb: false, wall: false },
          { light: false, bulb: false, wall: false },
          { light: false, bulb: false, wall: false },
        ],
        [
          { light: false, bulb: false, wall: true },
          { light: false, bulb: false, wall: true },
          { light: false, bulb: false, wall: false },
          { light: false, bulb: false, wall: false },
        ],
      ];
    }

    return [
      [
        { light: true, bulb: true, wall: false },
        { light: true, bulb: false, wall: false },
        { light: true, bulb: false, wall: false },
        { light: true, bulb: false, wall: false },
        { light: true, bulb: false, wall: false },
        { light: true, bulb: false, wall: false },
      ],
      [
        { light: false, bulb: false, wall: true },
        { light: true, bulb: true, wall: false },
        { light: false, bulb: false, wall: true },
        { light: false, bulb: false, wall: true },
        { light: true, bulb: false, wall: false },
        { light: true, bulb: false, wall: false },
      ],
      [
        { light: false, bulb: false, wall: true },
        { light: true, bulb: true, wall: false },
        { light: false, bulb: false, wall: true },
        { light: false, bulb: false, wall: true },
        { light: false, bulb: false, wall: true },
        { light: false, bulb: false, wall: true },
      ],
      [
        { light: false, bulb: false, wall: true },
        { light: true, bulb: true, wall: false },
        { light: false, bulb: false, wall: true },
        { light: false, bulb: false, wall: true },
        { light: false, bulb: false, wall: true },
        { light: false, bulb: false, wall: true },
      ],
    ];
  }

  randomDataGrid(): Observable<any> {
    const apiAddress: string = `${endpoint}api/grid/random`;
    return this.http
      .get(apiAddress)
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
}
