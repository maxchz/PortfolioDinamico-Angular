import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { RegistroPersonaService } from 'src/app/service/registro-persona.service';

@Component({
  selector: 'app-crea-experiencia-dialog',
  templateUrl: './crea-experiencia-dialog.component.html',
  styleUrls: ['./crea-experiencia-dialog.component.css']
})
export class CreaExperienciaDialogComponent implements OnInit {

  form: FormGroup;

  id_usuario: number = 0;

  personaId: number = 0;

  showSpinner: boolean = false;

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private registerPerson: RegistroPersonaService,
              private datosPortafolio: DatosPortfoliosService,
              private toastr: ToastrService) {

                this.datosPortafolio.ObtenerDatosUsuarioPorEmail().subscribe(data =>{

                  this.id_usuario = data.id;
                  this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(this.id_usuario).subscribe(data=>{

                    this.personaId = data.id;

                    this.form.patchValue({
                      persona_id: this.personaId,
                      }
                      );
                    }
                  );

                  }
                );

                this.form = this.formBuilder.group(
                  {

                  nombreEmpresa: ['', [Validators.required]],
                  posicion: ['',[Validators.required]],
                  fechaInicio:[' ',[Validators.required]],
                  fechaFin: [' ', [Validators.required]],
                  descripcion: [' ', [Validators.required]],
                  persona_id: [null,[Validators.required]],

                  });

  }

  ngOnInit(): void {
  }

  onEnviarNuevaExperiencia(event:Event){

    event.preventDefault;

    this.showSpinner= true;

    this.registerPerson.CrearExperiencia(this.form.value).subscribe(data=>{

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
    this.toastr.success('Se ha guardado con exito.', ' ', {
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

}
