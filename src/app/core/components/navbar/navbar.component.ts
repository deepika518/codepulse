import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from '../../../features/category/category-list/category-list.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { User } from '../../../features/auth/models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CategoryListComponent, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  user?: User;

  constructor(private authService: AuthService, private router: Router){
  }

  //below method will listen to changes when user is set
  ngOnInit(): void {
    this.authService.user()
    .subscribe({
      next: (response) => {
        this.user = response; 
      }
    })  
    this.user = this.authService.getUser();
  }

  onLogout():void{
    this.authService.logout();
    //taking the user back at home page
    this.router.navigateByUrl('/');

  }
}
