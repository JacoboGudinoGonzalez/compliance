import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2'

import { MustMatch } from '../../util/must-match.validator';
// import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  title: string = "Registro Compliance";
  registerUserForm: FormGroup;
  submitted = false;
  // user: User;

  constructor(private formBuilder: FormBuilder) {
    // this.user = new User();
  }

  ngOnInit() {
    this.registerUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      patSurname: ['', Validators.required],
      matSurname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      taxId: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(13)]],
      type: ['', Validators.required],
      tel: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerUserForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerUserForm.invalid) {
      return;
    }

    // display form values on success
    console.log(this.registerUserForm.value);
    Swal.fire({
      type: 'success',
      title: 'Registro completo!',
      html: 'Puedes iniciar sesión ' +'<a href="/login">aquí</a>',
      showConfirmButton: false,
    })

    this.onReset()
  }

  onReset() {
    this.submitted = false;
    this.registerUserForm.reset();
  }

}
