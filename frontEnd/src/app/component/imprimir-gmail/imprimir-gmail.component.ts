import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-imprimir',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './imprimir-gmail.component.html',
  styleUrls: ['./imprimir-gmail.component.css']
})
export class ImprimirComponent {

  // Datos que se mostrarán en el PDF
  data: any = {
    titulo: 'reserva de cuarto',
    contenido: 'asdsadsd'
  };

  constructor() {}


  generatePDF() {
    const doc = new jsPDF();

    doc.text(this.data.titulo, 10, 10);
    doc.text(this.data.contenido, 10, 20);

    doc.save('reservas.pdf');
  }

  gmail(){
    
  }
}

