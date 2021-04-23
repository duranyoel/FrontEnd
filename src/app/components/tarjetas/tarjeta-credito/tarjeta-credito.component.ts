import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { tarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';
@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private tarjetaService: TarjetaService,
    private toastr:ToastrService) {
    this.form = this.formBuilder.group({
      id: 0,
      titular: ["", [Validators.required]],
      numero: ["", [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ["", [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ["", [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
    })
  }

  ngOnInit(): void {
  }
  guardarTarjeta() {
    const tarjeta: tarjetaCredito = {
      titular: this.form.get('titular').value,
      numero: this.form.get('numero').value,
      fechaExpiracion: this.form.get('fechaExpiracion').value,
      cvv: this.form.get('cvv').value
    }
    this.tarjetaService.guardarTarjeta(tarjeta).subscribe(data => {
      this.toastr.success('Registro Agregado','La tarjeta se ha guardado');
      this.tarjetaService.obtenerTarjetas();
      this.form.reset();
    });
  }

}
