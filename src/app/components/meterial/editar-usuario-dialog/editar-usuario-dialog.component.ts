import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificacionToastService } from 'src/app/service/alertas/notificacion-toast.service';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { ModificaDataPersonaService } from 'src/app/service/modifica-data-persona.service';


@Component({
  selector: 'app-editar-usuario-dialog',
  templateUrl: './editar-usuario-dialog.component.html',
  styleUrls: ['./editar-usuario-dialog.component.css']
})
export class EditarUsuarioDialogComponent implements OnInit {

  form: FormGroup;
  id_usuario: number = 0;
  showSpinner: boolean = false;

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private modificaPerson: ModificaDataPersonaService,
              private datosPortafolio: DatosPortfoliosService,
              private notificationToast: NotificacionToastService) {
    this.datosPortafolio.ObtenerDatosUsuarioPorEmail().subscribe(data =>{
        this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(data.id).subscribe({next: (data) =>{
          this.showSpinner = true;
          this.form.patchValue({
            id: data.id,
            nombre: data.nombre,
            apellido: data.apellido,
            domicilio: data.domicilio,
            fechaNac: data.fechaNac,
            telefono: data.telefono,
            correo: data.correo,
            sobreMi: data.sobreMi,
            posicionDev: data.posicionDev,
            imagenPerfil: data.imagenPerfil,
            usuario_id: data.usuario_id
          });

          this.showSpinner = false;

        }, error: (e)=>{
          if(e.ok !=true){
            setTimeout(() => {
              this.showSpinner = false;
            }, 1000);
            this.notificationToast.showError("Ha ocurrido un error, recarga la página e intenta nuevamente.", " ");
          }}
        });
    });

    this.form = this.formBuilder.group(
          {
          id: [' ', [Validators.required]],
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

  ngOnInit(): void {}

  onEnviarEditarUsuario(event:Event){
    event.preventDefault;
    this.showSpinner= true;
    this.modificaPerson.ModificarPersona(this.form.value).subscribe({next:(data)=>{
      if(data.ok){
        setTimeout(() => {
          this.showSpinner = false;
          this.dialog.closeAll();
        }, 1500);
        this.notificationToast.showSuccess('Se actualizó con exito.', ' ');
      } else {
        this.dialog.closeAll();
        this.notificationToast.showError('Ha ocurrido un error, intenta luego.', ' ');
      };
    }, error: (e)=>{
        if(e.ok !=true){
          setTimeout(() => {
            this.showSpinner = false;
          }, 1500);
          this.notificationToast.showError("Ha ocurrido un error, intenta luego.", " ");
        }
       }
    })
  }

  get IdUsuario(){
    return this.id_usuario;
  }

}
