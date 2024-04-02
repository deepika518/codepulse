//this service will talk to the api login method and authenticate the user

import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //this behaviour subject will emit the user values for the navBar
  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(request: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, {
      email: request.email,
      password: request.password
    })
  }

  setUser(user: User): void{

    //using behaviour subject to transmit values
    this.$user.next(user);

    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }
  //to maintain the logged in state
  user(): Observable<User | undefined>{
    return this.$user.asObservable();
  }
//when app refreshes after logging in, nav bar stays at logged in stage
 getUser(): User | undefined{
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if(email && roles){
      const user: User = {
        email: email,
        roles: roles.split(',')
      }
      return user;
    }
    return undefined;
 }

  logout(): void{
    //clearout local storage
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined); //telling the app that user has locked out
  }
}
