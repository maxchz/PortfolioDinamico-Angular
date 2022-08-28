import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificacionToastService } from 'src/app/service/alertas/notificacion-toast.service';
import { AutenticacionService } from 'src/app/service/autenticacion.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  form: FormGroup;
  showSpinner: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private autenticacionService: AutenticacionService,
              private ruta: Router,
              private notificationToast: NotificacionToastService) {
                this.form = this.formBuilder.group(
                  {
                    email: ['', [Validators.required, Validators.email]],
                    password: ['',[Validators.required, Validators.minLength(5)]],
                  }
                );
  }

  ngOnInit(): void {
  }

  get Email(){
    return this.form.get('email');
  }

  get Password(){
    return this.form.get('password');
  }

  get EmailUser(){
    return this.form.value('email');
  }

  onEnviar(event:Event){
    event.preventDefault;
    this.showSpinner= true;


    this.autenticacionService.IniciarSesion(this.form.value).subscribe({next:(data)=>{
      if(data){
        setTimeout(() => {
          this.showSpinner = false;
          }, 1500);
          this.ruta.navigate(['/portfolio']);
        }
    },
    error: (e)=>{
      if(!e.ok){
        setTimeout(() => {
          this.showSpinner = false;
          }, 1500);
        this.notificationToast.showError("Ha ocurrido un error, el email o contraseña son incorrectos.", " ");
      }
    }
  })}
}
