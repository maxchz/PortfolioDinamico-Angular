import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificacionToastService } from 'src/app/service/alertas/notificacion-toast.service';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { RegistroPersonaService } from 'src/app/service/registro-persona.service';

@Component({
  selector: 'app-crea-usuario-dialog',
  templateUrl: './crea-usuario-dialog.component.html',
  styleUrls: ['./crea-usuario-dialog.component.css']
})
export class CreaUsuarioDialogComponent implements OnInit {
  form: FormGroup;
  id_usuario: number = 0;
  showSpinner: boolean = false;

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private registerPerson: RegistroPersonaService,
              private datosPortafolio: DatosPortfoliosService,
              private notificationToast: NotificacionToastService) {

        this.datosPortafolio.ObtenerDatosUsuarioPorEmail().subscribe(data =>{
          this.id_usuario = data.id;
          this.form.patchValue({
            correo: data.email,
            usuario_id: data.id
          });
        });

        this.form = this.formBuilder.group(
          {
            nombre: ['', [Validators.required]],
            apellido: ['',[Validators.required]],
            domicilio:[' ',[Validators.required]],
            fechaNac: [' ', [Validators.required]],
            telefono: [' ', [Validators.required]],
            correo: [' ',[Validators.required]],
            sobreMi: [' ',[Validators.required]],
            posicionDev: ['',[Validators.required]],
            imagenPerfil: ['',[Validators.required]],
            usuario_id: [' ',[Validators.required]],
          });
  }

  ngOnInit(): void {

  }

  onEnviarNuevoUsuario(event:Event){
    event.preventDefault;
    this.showSpinner= true;
    this.registerPerson.CrearPersona(this.form.value).subscribe({next: (data)=>{
      if(data.ok){
        setTimeout(() => {
          this.showSpinner = false;
          this.dialog.closeAll();
        }, 1500);
        this.notificationToast.showSuccess('Se ha guardado con exito.', ' ');
      } else {
          setTimeout(() => {
            this.showSpinner = false;
            this.dialog.closeAll();
          }, 1500);
          this.notificationToast.showError('No se ha guardado con exito, intenta luego',' ');
      }
    }, error: (e)=>{
         if(e.ok !=true){
         setTimeout(() => {
           this.showSpinner = false;
         }, 1500);
         this.notificationToast.showError('Ha ocurrido un error, intenta luego.', ' ');}
      }
    })
  }

  get IdUsuario(){
    return this.id_usuario;
  }
}
