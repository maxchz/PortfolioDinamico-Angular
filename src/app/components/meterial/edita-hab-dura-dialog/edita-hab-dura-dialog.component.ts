import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { ModificaDataPersonaService } from 'src/app/service/modifica-data-persona.service';

@Component({
  selector: 'app-edita-hab-dura-dialog',
  templateUrl: './edita-hab-dura-dialog.component.html',
  styleUrls: ['./edita-hab-dura-dialog.component.css']
})
export class EditaHabDuraDialogComponent implements OnInit {

  form: FormGroup;

  id_usuario: number = 0;

  id_persona: number = 0;

  showSpinner: boolean = false;

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private modificaPerson: ModificaDataPersonaService,
              private datosPortafolio: DatosPortfoliosService,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

                this.datosPortafolio.ObtenerDatosUsuarioPorEmail().subscribe(data =>{
                  this.id_usuario = data.id;
                  this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(this.id_usuario).subscribe(data =>{
                    this.id_persona = data.id;
                    this.datosPortafolio.obtenerDatosHabilidadDuraPorIdPersona(this.id_persona).subscribe(data =>{
                      this.form.patchValue({

                        id: data.body[this.data].id,
                        tecnologia: data.body[this.data].tecnologia,
                        progreso: data.body[this.data].progreso,
                        urlTecLogo: data.body[this.data].urlTecLogo,
                        persona_id: data.body[this.data].persona_id,
                        }
                      );

                    });
                  });
                });


                this.form = this.formBuilder.group({
                  id: [null,[Validators.required]],
                  tecnologia: ['', [Validators.required]],
                  progreso:[' ',[Validators.required]],
                  urlTecLogo: [null, [Validators.required]],
                  persona_id: [null,[Validators.required]],
                  });
}

onEnviarEditaHabilidadDura(event:Event){
  event.preventDefault;

  this.showSpinner= true;

  this.modificaPerson.ModificarHabilidadDura(this.form.value).subscribe(data=>{

    if(data.ok){
      setTimeout(() => {
        this.showSpinner = false;
        this.dialog.closeAll();

      }, 1500);

      this.showSuccess();

    } else {
      this.dialog.closeAll();
      this.showError();
    };
  })
}

showSuccess() {
  this.toastr.success('Se actualizo con exito.', ' ', {
    tapToDismiss: true,
    disableTimeOut: true,
    positionClass: 'toast-bottom-left',
    onActivateTick: true,
  });
}

showError() {
  this.toastr.error('Ha ocurrido un error, intenta luego.', ' ', {
    tapToDismiss: true,
    disableTimeOut: true,
    positionClass: 'toast-bottom-left',
    onActivateTick: true,
  });
}

ngOnInit(): void {
}

}
