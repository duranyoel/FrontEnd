import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tarjetaCredito } from '../models/tarjetaCredito';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  myAppUrl = 'https://localhost:44371/';
  myApiUrl = 'api/TarjetaCredito/';
  list: tarjetaCredito[];
  private actualizarFormulario = new BehaviorSubject<tarjetaCredito>({} as any);
  constructor(private http: HttpClient) { }


  guardarTarjeta(tarjeta: tarjetaCredito): Observable<tarjetaCredito> {
    return this.http.post<tarjetaCredito>(this.myAppUrl + this.myApiUrl, tarjeta);
  }

  obtenerTarjetas() {
    this.http.get(this.myAppUrl + this.myApiUrl).toPromise().then(
      data => {
        this.list = data as tarjetaCredito[];
      }
    );
  }

  eliminarTarjeta(id: number): Observable<tarjetaCredito> {
    return this.http.delete<tarjetaCredito>(this.myAppUrl + this.myApiUrl + id);
  }
  actualizarTarjeta(id: number, tarjeta: tarjetaCredito): Observable<tarjetaCredito> {
    return this.http.put<tarjetaCredito>(this.myAppUrl + this.myApiUrl + id, tarjeta);
  }
  actualizar(tarjeta) {
    this.actualizarFormulario.next(tarjeta);
  }
  obtenerTarjeta(): Observable<tarjetaCredito> {
    return this.actualizarFormulario.asObservable();
  }
}
