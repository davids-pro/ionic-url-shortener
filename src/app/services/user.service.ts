import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  rootUri: string;

  constructor(private http: HttpClient) {
    this.rootUri = `${environment.apiEndPoint}/users/`;
  }

  createUser(user: any) {
    return this.http.post(this.rootUri, user).toPromise();
  }

  getUserbyUsernameAndPassword(username: string, password: string) {
    return this.http.post(this.rootUri + 'auth', { username, password }).toPromise();
  }

  verifyIfUsernameIsAvailable(username: string) {
    return this.http.post(this.rootUri + 'check', { username }).toPromise();
  }

  sendResetCode(username: string) {
    return this.http.post(this.rootUri + 'askResetCode', { username }).toPromise();
  }

  updatePassword(username: string, password: string, code: number) {
    return this.http.put(this.rootUri + 'updatePassword', { username, password, code }).toPromise();
  }
}
