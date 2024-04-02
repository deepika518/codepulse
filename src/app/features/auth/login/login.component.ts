import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../models/login-request.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  model: LoginRequest;

  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private router: Router){
    this.model= {
      email:'',
      password:''
    };
  }

  onFormSubmit(): void {
    this.authService.login(this.model)
    .subscribe({
      next: (response) => {
        // Set Auth Cookie (saving the Jwt token from the response using the cookie service)
        this.cookieService.set('Authorization', `Bearer ${response.token}`,
        undefined, '/', undefined, true, 'Strict');

        //set user in local storage and emitting the new user values through behaviour subject 
        //such that any subscriber of taht observable will listen to those changes

        this.authService.setUser({
          email: response.email,
          roles: response.roles
        })

        //redirect ghe user to home page
        this.router.navigateByUrl('/');
      }
    });
  }

}
