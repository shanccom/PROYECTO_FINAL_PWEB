import { Component } from '@angular/core';
import { ReservacionService } from '../../services/reservacion.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reservacion',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './reservacion.component.html',
  styleUrl: './reservacion.component.css'
})

export class ReservacionComponent {
  reservacion = {
    usuario: '',
    cuarto: '',
    fecha_inicio: '',
    fecha_fin: ''
  };

  constructor(private reservacionService: ReservacionService, private router: Router, private http: HttpClient) { }

  onSubmit() {
    this.reservacionService.createReservacion(this.reservacion).subscribe(response => {
      console.log('Reservación creada', response);
      this.router.navigate(['/imprimir', response.id]);
    }, error => {
      console.error('Error al crear la reservación', error);
    });
  }

  
  getReservacionById(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/reservaciones/${id}/`);
  }

  
}