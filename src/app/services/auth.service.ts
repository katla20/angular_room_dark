import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const endpoint = environment.API_URL;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getAccessToken(): void {}
}
