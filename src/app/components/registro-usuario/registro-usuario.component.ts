import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificacionToastService } from 'src/app/service/alertas/notificacion-toast.service';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { RegistroUsuarioService } from 'src/app/service/registro-usuario.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  form: FormGroup;
  userEmail_db: string = '';
  existing_user: boolean = false;
  showSpinner: boolean = false;

  constructor( private formBuilder: FormBuilder,
               private datosPortafolio: DatosPortfoliosService,
               private registroUserService: RegistroUsuarioService,
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

  get Nombre(){
    return this.form.get('nombre');
  }
  get Apellido(){
    return this.form.get('apellido');
  }
  get Email(){
    return this.form.get('email');
  }
  get Password(){
    return this.form.get('password');
  }

  onEnviarRegistro(event:Event){
    event.preventDefault;
    this.showSpinner= true;
    let userEmail_register= this.form.value.email;

    this.datosPortafolio.existeUsuarioRegistrado(userEmail_register).subscribe(data=>{
      if(data){
        setTimeout(() => {
          this.showSpinner = false;
          }, 1500);
          this.notificationToast.showError("El email ya existe, intente con otro email de registro.", " ");

      } else{
        this.registroUserService.RegistrarUsuario(this.form.value).subscribe(
          {next:(res: Response)=>{
            if(res.ok){
              this.form.reset();
                setTimeout(() => {
                  this.showSpinner = false;
                  }, 1500);
                  this.notificationToast.showSuccess("Usuario creado con éxito.", " ");
            }
          },
          error: (e)=>{
            if(e.ok !=true){
              setTimeout(() => {
                this.showSpinner = false;
                }, 1500);
              this.notificationToast.showError("Ha ocurrido un error, intenta luego.", " ");
            }
          }
       });
      }
    })
  }
}

