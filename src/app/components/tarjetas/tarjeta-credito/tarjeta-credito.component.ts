import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { tarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';
@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit,OnDestroy {
  form: FormGroup;
  suscription:Subscription;
  tarjeta :tarjetaCredito;
  idTarjeta=0;
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
    this.suscription= this.tarjetaService.obtenerTarjeta().subscribe(data=>{
      this.tarjeta= data;
      this.form.patchValue({
        titular:this.tarjeta.titular,
        numero:this.tarjeta.numero,
        fechaExpiracion:this.tarjeta.fechaExpiracion,
        cvv:this.tarjeta.cvv
      });
      this.idTarjeta=this.tarjeta.id;
    });
  }
  guardarTarjeta() {
    if(this.idTarjeta===0){
      this.agregar();
    }else{
      this.editar();
    }

  }
  agregar(){
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
  editar(){
    const tarjeta: tarjetaCredito = {
      id:this.tarjeta.id,
      titular: this.form.get('titular').value,
      numero: this.form.get('numero').value,
      fechaExpiracion: this.form.get('fechaExpiracion').value,
      cvv: this.form.get('cvv').value
    }

    this.tarjetaService.actualizarTarjeta(this.idTarjeta,tarjeta).subscribe(data=>{
      this.toastr.info('Registro actualizado','La tarjeta se ha guardado');
      this.tarjetaService.obtenerTarjetas();
      this.form.reset();
      this.idTarjeta=0;
    });
  }
  ngOnDestroy(){
    this.suscription.unsubscribe();
  }
}
