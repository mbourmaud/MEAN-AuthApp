import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from "angular2-jwt";

@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user) {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");

    return this.http.post('users/register', user, { headers: headers })
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");

    return this.http.post('users/authenticate', user, { headers: headers })
      .map(res => res.json());
  }

  storeUserData(token, user) {
    // The path id_token will automatically be found by jwt
    localStorage.setItem('id_token', token);
    // localstorage cannot save an object so we stringify it
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  getProfile() {
    let headers = new Headers();

    this.loadToken();

    headers.append("Authorization", this.authToken);
    headers.append("Content-Type", "application/json");

    return this.http.get('users/profile', { headers: headers })
      .map(res => res.json());
  }

  // fetch the token from the local storage
  loadToken() {
    const token = localStorage.getItem('id_token');

    this.authToken = token;
  }

  // Check if we are logged in
  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
