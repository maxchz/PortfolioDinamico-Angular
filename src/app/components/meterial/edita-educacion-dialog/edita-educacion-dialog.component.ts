import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificacionToastService } from 'src/app/service/alertas/notificacion-toast.service';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { ModificaDataPersonaService } from 'src/app/service/modifica-data-persona.service';

@Component({
  selector: 'app-edita-educacion-dialog',
  templateUrl: './edita-educacion-dialog.component.html',
  styleUrls: ['./edita-educacion-dialog.component.css']
})
export class EditaEducacionDialogComponent implements OnInit {
  form: FormGroup;
  id_usuario: number = 0;
  id_persona: number = 0;
  showSpinner: boolean = false;

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private modificaPerson: ModificaDataPersonaService,
              private datosPortafolio: DatosPortfoliosService,
              private notificationToast: NotificacionToastService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

                this.datosPortafolio.ObtenerDatosUsuarioPorEmail().subscribe(data =>{
                  this.id_usuario = data.id;
                  this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(this.id_usuario).subscribe(data =>{
                    this.id_persona = data.id;
                    this.datosPortafolio.obtenerDatosEducacionPorIdPersona(this.id_persona).subscribe(data =>{
                      this.form.patchValue({
                        id: data.body[this.data].id,
                        institucion: data.body[this.data].institucion,
                        titulo: data.body[this.data].titulo,
                        fechaInicio: data.body[this.data].fechaInicio,
                        fechaFin: data.body[this.data].fechaFin,
                        descripcion: data.body[this.data].descripcion,
                        url_logo: data.body[this.data].url_logo,
                        persona_id: data.body[this.data].persona_id,
                        });
                    });
                  });
                });

                this.form = this.formBuilder.group({
                  id: [null,[Validators.required]],
                  institucion: ['', [Validators.required]],
                  titulo: ['',[Validators.required]],
                  fechaInicio:[' ',[Validators.required]],
                  fechaFin: [' ', [Validators.required]],
                  descripcion: [' ', [Validators.required]],
                  url_logo: [null, [Validators.required]],
                  persona_id: [null,[Validators.required]],
                  });
  }

  onEnviarModificaEducacion(event:Event){
    event.preventDefault;
    this.showSpinner= true;
    this.modificaPerson.ModificarEducacion(this.form.value).subscribe({next: (data)=>{
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

  ngOnInit(): void {
  }

}
