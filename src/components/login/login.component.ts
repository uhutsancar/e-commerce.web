import { Component, inject, model, OnInit } from '@angular/core';
import { AuthApi } from '../../data-access/auth-api';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule],
})
export class LoginComponent {
  username = model<string>('emilys');
  password = model<string>('emilyspass');
  authApi = inject(AuthApi);
  authService = inject(AuthService);
  router = inject(Router);

  submit() {
    this.authApi.login(this.username(), this.password()).subscribe({
      next: (user) => {
        this.authService.setUser(user);
        this.router.navigate(['/products']);
      },
    });
  }
}
