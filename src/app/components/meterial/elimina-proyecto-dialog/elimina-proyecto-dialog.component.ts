import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { EliminarDatosPortfolioService } from 'src/app/service/eliminar-datos-portfolio.service';

@Component({
  selector: 'app-elimina-proyecto-dialog',
  templateUrl: './elimina-proyecto-dialog.component.html',
  styleUrls: ['./elimina-proyecto-dialog.component.css']
})
export class EliminaProyectoDialogComponent implements OnInit {

  dataProyecto: any;

  id_usuario: number = 0;

  id_persona: number = 0;

  id_proyecto: number = 0;

  showSpinner: boolean = false;

  constructor(public dialog: MatDialog,
              private eliminaProyect: EliminarDatosPortfolioService,
              private datosPortafolio: DatosPortfoliosService,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

                this.datosPortafolio.ObtenerDatosUsuarioPorEmail().subscribe(data =>{
                  this.id_usuario = data.id;

                  this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(this.id_usuario).subscribe(data =>{
                    this.id_persona = data.id;

                    this.datosPortafolio.obtenerDatosProyectoPorIdPersona(this.id_persona).subscribe((data) =>{
                      this.dataProyecto = data.body[this.data];
                      this.id_proyecto = data.body[this.data].id;

                    });
                  });
                });
  }

  onEnviarEliminarProyecto(){
    this.showSpinner= true;

    this.eliminaProyect.EliminarProyecto(this.id_proyecto).subscribe(response=>{

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
