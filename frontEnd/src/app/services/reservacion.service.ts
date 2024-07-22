import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservacionService {

  private apiUrl = `http://127.0.0.1:8000/reservaciones/reservaciones/`;

  constructor(private http: HttpClient) { }


  // Método para obtener todas las reservaciones
  getReservaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para crear una nueva reservación
  createReservacion(reservacion: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, reservacion);
  }

  getReservacionById(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/`;  // Asegúrate de que no haya doble barra
    return this.http.get(url);
  }
}
