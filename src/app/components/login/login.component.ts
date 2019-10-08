import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  titleCard: string = "Iniciar Sesión";
  loginUserForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loginUserForm = this.formBuilder.group({
      taxId: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(13)]],
      password: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginUserForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginUserForm.invalid) {
      return;
    }

    // display form values on success
    alert(this.loginUserForm.value);

    this.onReset()
  }

  onReset() {
    this.submitted = false;
    this.loginUserForm.reset();
  }
}
