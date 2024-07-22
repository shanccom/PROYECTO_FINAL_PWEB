import { Component, Input, OnInit } from '@angular/core';
import { ReservacionService } from '../../services/reservacion.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-reservacion',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './reservacion.component.html',
  styleUrl: './reservacion.component.css'
})

export class ReservacionComponent implements OnInit {
  reservacion = {
    usuario: '',
    cuarto: '',
    fecha_inicio: '',
    fecha_fin: ''
  };

  @Input() cuartoId: string = ""; // Asegúrate de que esta propiedad se reciba correctamente

  usuarios: any[] = []; 

  constructor(
    private reservacionService: ReservacionService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Depuración: Imprime el cuartoId recibido
    console.log('cuartoId recibido:', this.cuartoId);
  
    // Obtener el usuario autenticado
    this.authService.getAuthenticatedUser().subscribe({
      next: user => {
        this.reservacion.usuario = user.id;
      },
      error: error => {
        console.error('Error al obtener el usuario autenticado', error);
      }
    });

    // Obtener todos los usuarios
    this.authService.getAllUsers().subscribe({
      next: users => {
        this.usuarios = users;
      },
      error: error => {
        console.error('Error al obtener los usuarios', error);
      }
    });


    // Asignar el cuartoId a la reservación
    if (this.cuartoId) {
      this.reservacion.cuarto = this.cuartoId;
    } else {
      console.error('cuartoId no está definido en ngOnInit');
    }
  }

  onSubmit(): void {
    // Asegúrate de que reservacion.cuarto tenga el ID del cuarto
    if (!this.reservacion.cuarto) {
      console.error('El ID del cuarto no está definido');
      return;
    }

    console.log('ID del cuarto:', this.reservacion.cuarto); // Imprime el ID del cuarto en la consola

    // Envía la solicitud de creación de la reservación
    this.reservacionService.createReservacion(this.reservacion).subscribe(response => {
      console.log('Reservación creada con ID:', response.id);
      this.router.navigate(['/imprimir', response.id]);
    }, error => {
      console.error('Error al crear la reservación', error);
    });
  }
}