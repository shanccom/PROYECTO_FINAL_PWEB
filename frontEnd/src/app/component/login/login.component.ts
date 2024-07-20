import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule ],
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          // Supongamos que el token está en response.token
          this.authService.setSession(response.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          // Manejar errores aquí
          this.errorMessage = 'Inicio de sesión fallido. Verifique sus credenciales.';
        }
      });
    }
  }
  
  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}