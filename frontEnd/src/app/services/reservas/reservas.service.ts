import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private apiUrl = `${environment.apiUrlReservas}/cuartos/`;

  constructor(private http: HttpClient) { }

  // Método para obtener todas las reservas
  obtenerReservas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para crear una nueva reserva
  crearReserva(reserva: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, reserva);
  }

  // Método para obtener una reserva por ID
  obtenerReservaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }

  // Método para actualizar una reserva
  actualizarReserva(id: number, reserva: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, reserva);
  }

  // Método para eliminar una reserva
  eliminarReserva(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}