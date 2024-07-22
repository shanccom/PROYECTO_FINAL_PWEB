import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/usuarios/';
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.isAuthenticated.next(!!localStorage.getItem('token'));
    }
  }

  // Registro de usuario
  register(userData: { username: string; email: string; password: string; password2: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'register/', userData).pipe(
      tap(response => {
        if (response && response.token) {
          this.setSession(response.token);
        }
      })
    );
  }

  // Inicio de sesión
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'login/', credentials).pipe(
      tap(response => {
        if (response && response.token) {
          this.setSession(response.token);
        }
      })
    );
  }

  // Guardar el token en localStorage y actualizar el estado de autenticación
  public setSession(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
      this.isAuthenticated.next(true);
    }
  }

  // Cerrar sesión
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      this.isAuthenticated.next(false);
      this.router.navigate(['/login']);
    }
  }

  // Verificar si el usuario está autenticado
  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }


  getAuthenticatedUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}usuarios/`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}usuarios/`);
  }

}