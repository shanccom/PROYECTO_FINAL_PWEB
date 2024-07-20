import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservasService } from '../../services/reservas/reservas.service';
import { CuartoService } from '../../services/cuarto/cuarto.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public tiposDeCuartos: any[] = [];
  public cuartosDisponibles: any[] = [];
  public selectedTipoId: number | null = null;
  
  isAuthenticated = false;
  reservas: any[] = [];

  constructor(private authService: AuthService, private reservasService: ReservasService, private cuartoService: CuartoService) { }

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

  public onTipoSeleccionado(tipoId: number): void {
    this.selectedTipoId = tipoId;
    this.cuartoService.getCuartosDisponibles(tipoId).subscribe(
      (data: any[]) => {
        this.cuartosDisponibles = data;
      },
      (error) => {
        console.error('Error al obtener cuartos disponibles:', error);
      }
    );
  }
}
