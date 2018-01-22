import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../shared';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.authService.getUser()
      .subscribe(user => {
        this.user = user;
      });
  }

  signOut(): void {
    this.authService.removeAccessToken();
    this.router.navigate(['']);
  }

}
