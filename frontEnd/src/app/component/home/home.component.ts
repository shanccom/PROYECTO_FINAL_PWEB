import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservasService } from '../../services/reservas/reservas.service';
import { CuartoService } from '../../services/cuarto/cuarto.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public tiposDeCuartos: any[] = [];
  public cuartosDisponibles: any[] = [];
  public selectedTipoId: number | null = null;
  public cuartoSeleccionado: any | null = null;
  dato: number = 0 ;
  
  isAuthenticated = false;
  reservas: any[] = [];

  constructor(private authService: AuthService, private cuartoService: CuartoService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.isAuthenticated = isLoggedIn;
      if (this.isAuthenticated) {
        this.loadTiposDeCuartos();
      }
    });
  }
  logout(): void {
    this.authService.logout();
  }  

  private loadTiposDeCuartos(): void {
    this.cuartoService.getTiposDeCuartos().subscribe(
      (data: any[]) => {
        console.log('Datos obtenidos:', data);
        this.tiposDeCuartos = data;
      },
      (error) => {
        console.error('Error al obtener tipos de cuartos:', error);
      }
    );
  }

  onTipoSeleccionado(id: number) {
    this.router.navigate(['/detalles', id]);
  }

  
}
