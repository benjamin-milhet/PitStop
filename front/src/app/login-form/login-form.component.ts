import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RegisterService } from '../register.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  activeTab: string = 'login';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private registerService: RegisterService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(12), this.passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });

  }

  ngOnInit() {

  }

  onSubmitLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;
    console.log(loginData);

    this.authService.login(loginData).subscribe(
      data => {
        console.log('Connexion réussie', data);
        this.authService.saveToken(data.token);

        this.router.navigate(['/accueil']).then(success => {
          console.log('Navigation réussie:', success);
        }).catch(err => {
          console.error('Erreur de navigation:', err);
        });
      },
      error => {
        console.error('Erreur de connexion', error);
      }
      );
  }

  onSubmitRegister() {
    if (this.registerForm.invalid) {
      return;
    }

    const registerData = this.registerForm.value;
    console.log(registerData);

    this.registerService.register(registerData).subscribe(
      data => {
        console.log('Connexion réussie', data);
      },
      error => {
        console.error('Erreur de connexion', error);
        // Gérer l'échec de la connexion ici
      }
      );
  }

  private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]+/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;
    return !passwordValid ? { passwordStrength: true } : null;
  }

  private mustMatch(passwordRegisterField: string, confirmPasswordField: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.controls[passwordRegisterField];
      const confirmPassword = formGroup.controls[confirmPasswordField];

      if (confirmPassword.errors && !confirmPassword.errors['mustMatch']) {
        // Return if another validator has already found an error on the confirmPassword
        return;
      }

      // Set error on confirmPassword if validation fails
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ mustMatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
    };
  }


}
