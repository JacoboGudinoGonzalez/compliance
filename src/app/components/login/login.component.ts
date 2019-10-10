import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';


//services
import { AuthService } from '../../services/auth.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  user: User;
  users:User[];
  loginUserForm: FormGroup;
  titleCard: string = "Iniciar Sesión";
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private _userService: UserService
    ) {
    this.user = new User();
  }

  ngOnInit() {
    this.loginUserForm = this.formBuilder.group({
      taxId: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(13)]],
      password: ['', [Validators.required]]
    });

    this._userService.getUsers().subscribe(
      users => this.users = users
    );
    console.log(this.users);
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginUserForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginUserForm.invalid) {
      return;
    }

    this.user = this.loginUserForm.value;
    this._authService.login(this.user).subscribe(response =>{
      console.log(response);
      this._authService.saveUser(response.access_token);
      this._authService.saveToken(response.access_token);
      let user = this._authService.user;
      this.router.navigate(['/home']);
      //swal
    });
    
    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.loginUserForm.reset();
  }
}
