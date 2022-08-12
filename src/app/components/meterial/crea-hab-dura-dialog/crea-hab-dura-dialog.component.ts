import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
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

                  tecnologia: ['', [Validators.required]],
                  progreso:[' ',[Validators.required]],
                  urlTecLogo: [null, [Validators.required]],
                  persona_id: [null,[Validators.required]],

                  });
  }


  ngOnInit(): void {
  }

  onEnviarNuevaHabilidadDura(event:Event){

    event.preventDefault;

    this.showSpinner= true;

    this.registerPerson.CrearHabilidadDura(this.form.value).subscribe(data=>{

      if(data.ok){
        setTimeout(() => {
          this.showSpinner = false;
          this.dialog.closeAll()}, 1500);

        this.showSuccess();

      }

      },Error =>{
            if(Error.ok !=true){
              setTimeout(() => {
                this.showSpinner = false;
                this.dialog.closeAll()}, 1500);

              this.showError();
          }
        }
    )}

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
