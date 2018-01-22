import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  message: string;
  loaded: boolean;
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loaded = false;
    this.loading = false;
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loading = true;
    this.authService.getAccessToken(this.form.value.email, this.form.value.password)
      .subscribe(token => {
        this.loaded = true;
        this.loading = false;
        if (!token) {
          this.message = 'Wrong credentials.';
        } else {
          this.authService.setAccessToken(token);
          this.message = null;
          this.router.navigate(['']);
        }
      });
  }

}
