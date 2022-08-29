import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificacionToastService } from 'src/app/service/alertas/notificacion-toast.service';
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
              private notificationToast: NotificacionToastService,
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
    this.eliminaProyect.EliminarProyecto(this.id_proyecto).subscribe({next: (response)=>{
      if(response.ok){
          setTimeout(() => {
            this.showSpinner = false;
            this.dialog.closeAll();
            }, 1500);
            this.notificationToast.showSuccess('Se ha eliminado con exito.', ' ');
      } else {
          setTimeout(() => {
            this.showSpinner = false;
            this.dialog.closeAll();
            }, 1500);
            this.notificationToast.showError('Ha ocurrido un error, intenta luego',' ');
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

  ngOnInit(): void {}

}
