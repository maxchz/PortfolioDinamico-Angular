import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { RegistroPersonaService } from 'src/app/service/registro-persona.service';

@Component({
  selector: 'app-crea-proyecto-dialog',
  templateUrl: './crea-proyecto-dialog.component.html',
  styleUrls: ['./crea-proyecto-dialog.component.css']
})
export class CreaProyectoDialogComponent implements OnInit {

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
                       persona_id: this.personaId});
                    });

                });

                this.form = this.formBuilder.group(
                  {

                  nombre: ['', [Validators.required]],
                  fechaInicio:[' ',[Validators.required]],
                  fechaFin: [' ', [Validators.required]],
                  descripcion: [' ', [Validators.required]],
                  urlProyecto: [' ', [Validators.required]],
                  urlRepositorio: [' ', [Validators.required]],
                  persona_id: [null,[Validators.required]],

                  });
  }


  ngOnInit(): void {
  }

  onEnviarNuevoProyecto(event:Event){

    event.preventDefault;

    this.showSpinner= true;

    this.registerPerson.CrearProyecto(this.form.value).subscribe(data=>{

      if(data.ok){
        setTimeout(() => {
          this.showSpinner = false;

          this.dialog.closeAll();

        }, 1500);

        this.showSuccess();

      }
      //  else {
      //   this.dialog.closeAll();
      //   this.showError();
      // };



    }, Error =>{
      if(Error.ok !=true){
        setTimeout(() => {
          this.showSpinner = false;
          this.dialog.closeAll();

        }, 1500);

        this.showError();
      }

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
