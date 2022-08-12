import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { EliminarDatosPortfolioService } from 'src/app/service/eliminar-datos-portfolio.service';

@Component({
  selector: 'app-elimina-hab-blanda-dialog',
  templateUrl: './elimina-hab-blanda-dialog.component.html',
  styleUrls: ['./elimina-hab-blanda-dialog.component.css']
})
export class EliminaHabBlandaDialogComponent implements OnInit {
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
              private eliminaHabBlanda: EliminarDatosPortfolioService,
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

}

onEnviarEliminaHabilidadBlanda(event:Event){
  event.preventDefault;
  this.showSpinner= true;

  this.selectedItem = this.selected.value;
  this.datosPortafolio.obtenerDatosHabilidadBlandaPorHabBlanda(this.selectedItem).subscribe(data=>{
    let id_habilidadBlanda = data.body[0].id;

      this.eliminaHabBlanda.EliminarHabilidadBlanda(id_habilidadBlanda).subscribe(data=>{

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
  this.toastr.success('Se elimino con exito.', ' ', {
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
