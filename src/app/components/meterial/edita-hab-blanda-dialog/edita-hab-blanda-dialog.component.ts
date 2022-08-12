import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { ModificaDataPersonaService } from 'src/app/service/modifica-data-persona.service';

@Component({
  selector: 'app-edita-hab-blanda-dialog',
  templateUrl: './edita-hab-blanda-dialog.component.html',
  styleUrls: ['./edita-hab-blanda-dialog.component.css']
})
export class EditaHabBlandaDialogComponent implements OnInit {

  form: FormGroup= new FormGroup({});

  selected: FormControl = new FormControl();

  selectedItem: String="";

  listHabBlanda: any;

  id_usuario: number = 0;

  id_persona: number = 0;

  id_habilidadBlanda: number = 0;

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
                    this.datosPortafolio.obtenerDatosHabilidadBlandaPorIdPersona(this.id_persona).subscribe(data =>{
                      this.listHabBlanda = data.body;
                    });
                  });
                });

                this.form = this.formBuilder.group({
                  id: [null,[Validators.required]],
                  habilidadBlanda: ['', [Validators.required]],
                  persona_id: [null,[Validators.required]],
                });
  }

onEnviarEditaHabilidadBlanda(event:Event){
  event.preventDefault;
  this.showSpinner= true;

  this.selectedItem = this.selected.value;
  this.datosPortafolio.obtenerDatosHabilidadBlandaPorHabBlanda(this.selectedItem).subscribe(data=>{
    this.form.patchValue({
      id: data.body[0].id,
      persona_id: data.body[0].persona_id
      });

      this.modificaPerson.ModificarHabilidadBlanda(this.form.value).subscribe(data=>{

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
  });

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

ngOnInit(): void {}

}
