import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import jsPDF from 'jspdf';
import { ReservacionService } from '../../services/reservacion.service';
import { ActivatedRoute } from '@angular/router';
import { ReservacionComponent } from '../reservacion/reservacion.component';

@Component({
  selector: 'app-imprimir',
  standalone: true,
  imports: [RouterModule, ReservacionComponent],
  templateUrl: './imprimir-gmail.component.html',
  styleUrls: ['./imprimir-gmail.component.css']
})
export class ImprimirComponent {

  // Datos que se mostrarán en el PDF
  data: any = {
    titulo: 'Reserva de Cuarto',
    usuario: '',
    cuarto: '',
    fecha_inicio: '',
    fecha_fin: ''
  };

  constructor(private reservacionService: ReservacionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const reservacionId = params.get('id');
      console.log('ID de reservación:', reservacionId);

      if (reservacionId && !isNaN(Number(reservacionId))) {
        this.reservacionService.getReservacionById(+reservacionId).subscribe({
          next: data => {
            console.log('Datos de la reservación:', data);

            this.data = {
              titulo: 'Reserva de Cuarto',
              fecha_inicio: data.fecha_inicio,
              fecha_fin: data.fecha_fin
            };

            if (data.usuario) {
              this.reservacionService.getUserById(data.usuario).subscribe({
                next: user => {
                  console.log('Datos del usuario:', user);
                  this.data.usuario = user.username;
                },
                error: error => {
                  console.error('Error al obtener el usuario', error);
                }
              });
            } else {
              console.error('ID de usuario no proporcionado');
            }

            if (data.cuarto) {
              this.reservacionService.getCuartoById(data.cuarto).subscribe({
                next: cuarto => {
                  console.log('Datos del cuarto:', cuarto);
                  this.data.cuarto = cuarto.numero; // Asegúrate de que `numero` sea el campo correcto
                },
                error: error => {
                  console.error('Error al obtener el cuarto', error);
                }
              });
            } else {
              console.error('ID de cuarto no proporcionado');
            }
          },
          error: error => {
            console.error('Error al obtener los datos de la reservación', error);
          }
        });
      } else {
        console.error('ID de reservación inválido');
      }
    });
  }

  generatePDF() {
    const doc = new jsPDF();

    doc.text(this.data.titulo, 10, 10);
    doc.text(`Usuario: ${this.data.usuario}`, 10, 20);
    doc.text(`Cuarto: ${this.data.cuarto}`, 10, 30);
    doc.text(`Fecha de Inicio: ${this.data.fecha_inicio}`, 10, 40);
    doc.text(`Fecha de Fin: ${this.data.fecha_fin}`, 10, 50);

    doc.save('reserva.pdf');
  }

  private getPDFBase64(): Promise<string> {
    return new Promise((resolve, reject) => {
      const doc = new jsPDF();
      doc.text(this.data.titulo, 10, 10);
      doc.text(`Usuario: ${this.data.usuario}`, 10, 20);
      doc.text(`Cuarto: ${this.data.cuarto}`, 10, 30);
      doc.text(`Fecha de Inicio: ${this.data.fecha_inicio}`, 10, 40);
      doc.text(`Fecha de Fin: ${this.data.fecha_fin}`, 10, 50);

      const pdfOutput = doc.output('datauristring');
      const base64PDF = pdfOutput.split(',')[1]; // Extrae la parte base64 del data URI
      resolve(base64PDF);
    });
  }

  gmail(){}

}
