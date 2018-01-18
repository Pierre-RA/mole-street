import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.usersService.getAccessToken(this.form.value.email, this.form.value.password)
      .subscribe(token => {
        console.log(token);
      });
  }

}
