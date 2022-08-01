import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const endpoint = environment.API_URL;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = environment.user;
  constructor() {}

  // public getAccessToken = (): Promise<string> => {
  //   // return this._userManager.getUser()
  //   // .then(user => {
  //   //   return !!user && !user.expired ? user.access_token : null;
  //   // })
  // }
}
