import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tarjetaCredito } from '../models/tarjetaCredito';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  myAppUrl ='https://localhost:5001/';
  myApiUrl ='api/TarjetaCredito/';
  list: tarjetaCredito[];

  constructor(private http:HttpClient) { }


  guardarTarjeta(tarjeta:tarjetaCredito):Observable<tarjetaCredito>{
    return this.http.post<tarjetaCredito>(this.myAppUrl+this.myApiUrl,tarjeta);
  }

  obtenerTarjetas(){
    this.http.get(this.myAppUrl+this.myApiUrl).toPromise().then(
      data=>{
        this.list=data as tarjetaCredito[];
      }
    );
  }
}
