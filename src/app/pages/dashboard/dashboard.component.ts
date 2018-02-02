import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  isEditing: boolean;
  form: FormGroup;
  totalValue: number;

  constructor(
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService,
    private fb: FormBuilder
  ) {
    this.isEditing = false;
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.getUser()
      .subscribe(user => {
        this.user = user;
        this.setupUser();
        this.getTotalValue();
      });
  }

  signOut(): void {
    this.authService.removeAccessToken();
    this.router.navigate(['']);
  }

  toggleEdition(): void {
    if (this.isEditing) {
      this.onSubmit();
    }
    this.isEditing = !this.isEditing;
  }

  setupUser(): void {
    if (this.user) {
      this.user.name = this.user.name || '';
      this.user.balance = this.user.balance || 0;
      this.setupForm();
    }
  }

  setupForm(): void {
    if (this.form.controls['name']) {
      this.form.controls['name'].setValue(this.user.name);
    }
    if (this.form.controls['email']) {
      this.form.controls['email'].setValue(this.user.email);
    }
  }

  onSubmit(): void {
    this.usersService.update(this.form.value, this.authService.getOwnerId())
      .subscribe(user => {
        if (user) {
          console.log('worked');
        }
      });
  }

  getTotalValue(): void {
    this.totalValue = 0;
    if (this.user && this.user.portfolio && this.user.portfolio.length > 0) {
      this.totalValue = this.user.portfolio.reduce((acc, current) => {
        return {
          symbol: 'total',
          amount: 0,
          price: acc.price + current.price,
          timestamp: current.timestamp
        };
      }).price;
    }
  }

}
