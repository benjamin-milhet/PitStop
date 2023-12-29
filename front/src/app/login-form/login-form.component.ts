import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;
    console.log(loginData);

    this.authService.login(loginData).subscribe(
      data => {
        console.log('Connexion réussie', data);
        // Gérer la réussite de la connexion ici (par exemple, enregistrement du token, redirection, etc.)
      },
      error => {
        console.error('Erreur de connexion', error);
        // Gérer l'échec de la connexion ici
      }
      );
  }
}
