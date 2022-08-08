import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { EliminarDatosPortfolioService } from 'src/app/service/eliminar-datos-portfolio.service';

@Component({
  selector: 'app-elimina-educacion-dialog',
  templateUrl: './elimina-educacion-dialog.component.html',
  styleUrls: ['./elimina-educacion-dialog.component.css']
})
export class EliminaEducacionDialogComponent implements OnInit {

  dataEducacion: any;

  id_usuario: number = 0;

  id_persona: number = 0;

  id_educacion: number = 0;

  showSpinner: boolean = false;

  constructor(public dialog: MatDialog,
              private eliminaEduca: EliminarDatosPortfolioService,
              private datosPortafolio: DatosPortfoliosService,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

                this.datosPortafolio.ObtenerDatosUsuarioPorEmail().subscribe(data =>{
                  this.id_usuario = data.id;

                  this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(this.id_usuario).subscribe(data =>{
                    this.id_persona = data.id;

                    this.datosPortafolio.obtenerDatosEducacionPorIdPersona(this.id_persona).subscribe((data) =>{
                      this.dataEducacion = data.body[this.data];
                      this.id_educacion = data.body[this.data].id;

                    });
                  });
                });
  }

  onEnviarEliminarEducacion(){
    this.showSpinner= true;

    this.eliminaEduca.EliminarEducacion(this.id_educacion).subscribe(response=>{

      if(response.ok){
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
