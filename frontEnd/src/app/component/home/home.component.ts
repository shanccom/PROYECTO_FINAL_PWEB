import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isAuthenticated = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Subscribirse al observable isLoggedIn
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.isAuthenticated = isLoggedIn;
      // Puedes agregar lógica adicional aquí si es necesario
    });
  }

  logout(): void {
    this.authService.logout();
  }
  
}
