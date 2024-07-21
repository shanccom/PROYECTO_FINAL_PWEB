import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuartoService {
  private apiUrl = 'http://localhost:8000/reservaciones/';
  private tiposApiUrl = `${this.apiUrl}tipos/`; 
  private cuartosApiUrl = `${this.apiUrl}cuartos/`;


  constructor(private http: HttpClient) {}

  // Obtener tipos de cuartos
  getTiposDeCuartos(): Observable<any[]> {
    return this.http.get<any[]>(this.tiposApiUrl);
  }

  // Obtener cuartos disponibles para reservar según el tipo
  getCuartosDisponibles(tipoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.cuartosApiUrl}?tipo=${tipoId}`);
  }

  getTipoDeCuartoById(id: number): Observable<any> {
    return this.http.get(`${this.tiposApiUrl}/tipos-de-cuart/${id}`);
  }
}
