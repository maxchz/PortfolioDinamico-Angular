import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificacionToastService } from 'src/app/service/alertas/notificacion-toast.service';
import { AutenticacionService } from 'src/app/service/autenticacion.service';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { CreaProyectoDialogComponent } from '../meterial/crea-proyecto-dialog/crea-proyecto-dialog.component';
import { EditaProyectoDialogComponent } from '../meterial/edita-proyecto-dialog/edita-proyecto-dialog.component';
import { EliminaProyectoDialogComponent } from '../meterial/elimina-proyecto-dialog/elimina-proyecto-dialog.component';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  datosUsuario: any;
  miPortfolioProyecto: any;
  idPersona: number = 0;
  showIcon: boolean = true;

  constructor(private datosPortafolio: DatosPortfoliosService,
              public dialog: MatDialog,
              private autenticacionServicio: AutenticacionService,
              private notificationToast: NotificacionToastService) {}

  ngOnInit(): void {
    this.autenticacionServicio.DatosNuevoUsuario().subscribe(data =>{
      this.datosUsuario = data;
      var idUsuario = data.id;
      this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(idUsuario).subscribe(data =>{
        if(data == null || !data){
          this.showIcon = false;
        }else{
          this.idPersona = data.id;
          this.datosPortafolio.obtenerDatosProyectoPorIdPersona(this.idPersona).subscribe(data =>{
            if(data.body == null || data.body.length === 0){
              this.miPortfolioProyecto = null;
            }else {
              this.miPortfolioProyecto = data.body;
            }
          })
        }
      });
    });
  }

  openDialogAgregarProyecto(): void {
    if(this.showIcon){
    const dialogRef = this.dialog.open(CreaProyectoDialogComponent, {
      width: '450px',
      disableClose: true,
    }).afterClosed().subscribe(()=>{
      this.datosPortafolio.obtenerDatosProyectoPorIdPersona(this.idPersona).subscribe(data =>{
        if(data.body == null || data.body.length === 0){
          this.miPortfolioProyecto = null;
        }else {
          this.miPortfolioProyecto = data.body;
        }
      })
    });
  }else{
    this.notificationToast.showError("Para ingresar información aquí debe completar la primera sección.", "");
  }
  }

  openDialogEditarProyecto(indice: number): void {
    const dialogRef = this.dialog.open(EditaProyectoDialogComponent, {
      width: '450px',
      disableClose: true,
      data: indice,
    }).afterClosed().subscribe(()=>{
        this.datosPortafolio.obtenerDatosProyectoPorIdPersona(this.idPersona).subscribe(data =>{
          this.miPortfolioProyecto = data.body;
        });
      });
  }

  openDialogEliminarProyecto(indice:number): void {
    const dialogRef = this.dialog.open(EliminaProyectoDialogComponent, {
      width: '450px',
      disableClose: true,
      data: indice,
    }).afterClosed().subscribe(()=>{
      this.datosPortafolio.obtenerDatosProyectoPorIdPersona(this.idPersona).subscribe(data =>{
        this.miPortfolioProyecto = data.body;
      });
    });
  }

}
