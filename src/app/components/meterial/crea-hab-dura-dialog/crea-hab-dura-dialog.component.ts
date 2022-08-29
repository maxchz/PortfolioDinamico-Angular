import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificacionToastService } from 'src/app/service/alertas/notificacion-toast.service';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { RegistroPersonaService } from 'src/app/service/registro-persona.service';

@Component({
  selector: 'app-crea-hab-dura-dialog',
  templateUrl: './crea-hab-dura-dialog.component.html',
  styleUrls: ['./crea-hab-dura-dialog.component.css']
})
export class CreaHabDuraDialogComponent implements OnInit {
  form: FormGroup;
  id_usuario: number = 0;
  personaId: number = 0;
  showSpinner: boolean = false;

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private registerPerson: RegistroPersonaService,
              private datosPortafolio: DatosPortfoliosService,
              private notificationToast: NotificacionToastService) {
                this.datosPortafolio.ObtenerDatosUsuarioPorEmail().subscribe(data =>{
                  this.id_usuario = data.id;
                  this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(this.id_usuario).subscribe(data=>{
                    this.personaId = data.id;
                    this.form.patchValue({
                       persona_id: this.personaId});
                    });
                });
                this.form = this.formBuilder.group(
                  {
                    tecnologia: ['', [Validators.required]],
                    progreso:[' ',[Validators.required]],
                    urlTecLogo: [null, [Validators.required]],
                    persona_id: [null,[Validators.required]],
                  });
  }

  ngOnInit(): void {}

  onEnviarNuevaHabilidadDura(event:Event){
    event.preventDefault;
    this.showSpinner= true;
    this.registerPerson.CrearHabilidadDura(this.form.value).subscribe({next: (data)=>{
      if(data.ok){
        setTimeout(() => {
          this.showSpinner = false;
          this.dialog.closeAll()}, 1500);
          this.notificationToast.showSuccess('Se ha guardado con exito.', ' ');
      }else {
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
}
