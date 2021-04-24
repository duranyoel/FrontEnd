import { Component, OnInit } from '@angular/core';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-list-tajeta-credito',
  templateUrl: './list-tajeta-credito.component.html',
  styleUrls: ['./list-tajeta-credito.component.css']
})
export class ListTajetaCreditoComponent implements OnInit {

  constructor(
    private tarjetaService: TarjetaService
    ) { }

  ngOnInit(): void {
    this.tarjetaService.obtenerTarjetas();
  }

}
