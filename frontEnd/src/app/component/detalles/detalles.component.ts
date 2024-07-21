import { Component} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservasService } from '../../services/reservas/reservas.service';
import { CuartoService } from '../../services/cuarto/cuarto.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  public tiposDeCuartos: any[] = [];
  public cuartosDisponibles: any[] = [];
  public elid: number = 0;
  isAuthenticated = false;
  reservas: any[] = [];

  constructor(private authService: AuthService, private cuartoService: CuartoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.isAuthenticated = isLoggedIn;
      if (this.isAuthenticated) {
        this.loadTiposDeCuartos();
      }
    });
    this.route.params.subscribe(params => {
      this.elid = params['id'];
      this.loadTiposDeCuartos = this.tiposDeCuartos.find(t => t.id === this.elid);
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

  obtenerID(): number{
    return this.elid;
  }
}
