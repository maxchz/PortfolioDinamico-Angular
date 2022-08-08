import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { ModificaDataPersonaService } from 'src/app/service/modifica-data-persona.service';

@Component({
  selector: 'app-edita-proyecto-dialog',
  templateUrl: './edita-proyecto-dialog.component.html',
  styleUrls: ['./edita-proyecto-dialog.component.css']
})
export class EditaProyectoDialogComponent implements OnInit {

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
                    this.datosPortafolio.obtenerDatosProyectoPorIdPersona(this.id_persona).subscribe(data =>{
                      this.form.patchValue({

                        id: data.body[this.data].id,
                        nombre: data.body[this.data].nombre,
                        fechaInicio: data.body[this.data].fechaInicio,
                        fechaFin: data.body[this.data].fechaFin,
                        descripcion: data.body[this.data].descripcion,
                        urlProyecto: data.body[this.data].urlProyecto,
                        urlRepositorio: data.body[this.data].urlRepositorio,
                        persona_id: data.body[this.data].persona_id,
                        }
                      );

                    });
                  });
                });


                this.form = this.formBuilder.group({
                  id: [null,[Validators.required]],
                  nombre: ['', [Validators.required]],
                  fechaInicio:[' ',[Validators.required]],
                  fechaFin: [' ', [Validators.required]],
                  descripcion: [' ', [Validators.required]],
                  urlProyecto: [' ', [Validators.required]],
                  urlRepositorio: [' ', [Validators.required]],
                  persona_id: [null,[Validators.required]],
                  });
  }

  onEnviarModificaProyecto(event:Event){
    event.preventDefault;

    this.showSpinner= true;

    this.modificaPerson.ModificarProyecto(this.form.value).subscribe(data=>{

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
