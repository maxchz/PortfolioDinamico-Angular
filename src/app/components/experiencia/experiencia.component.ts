import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificacionToastService } from 'src/app/service/alertas/notificacion-toast.service';
import { AutenticacionService } from 'src/app/service/autenticacion.service';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { CreaExperienciaDialogComponent } from '../meterial/crea-experiencia-dialog/crea-experiencia-dialog.component';
import { EditaExperienciaDialogComponent } from '../meterial/edita-experiencia-dialog/edita-experiencia-dialog.component';
import { EliminaExperienciaDialogComponent } from '../meterial/elimina-experiencia-dialog/elimina-experiencia-dialog.component';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  @Output()
  miPortfolioExpEmit: EventEmitter<any> = new EventEmitter<any>();

  datosUsuario: any;
  miPortfolioExperiencia: any;
  emailUser: String ='';
  idPersona: number = 0;
  showIcon: boolean = true;

  constructor(private datosPortafolio: DatosPortfoliosService,
              public dialog: MatDialog,
              private autenticacionServicio: AutenticacionService,
              private notificationToast: NotificacionToastService) { }

  ngOnInit(): void {
    this.autenticacionServicio.DatosNuevoUsuario().subscribe(data =>{
      this.datosUsuario = data;
      var idUsuario = data.id;
      this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(idUsuario).subscribe(data =>{
        if(data == null || !data){
          this.showIcon = false;
        }else{
          this.idPersona = data.id;
          this.datosPortafolio.obtenerDatosExperienciaPorIdPersona(this.idPersona).subscribe(data =>{
            if(data.body == null || data.body.length === 0){
              this.miPortfolioExperiencia = null;
            }else{
              this.miPortfolioExperiencia = data.body;
              this.miPortfolioExpEmit.emit(data.body)
            }
          });
         }
      });
    });

  }

  openDialogAgregarExperiencia(): void {
    if(this.showIcon){
    const dialogRef = this.dialog.open(CreaExperienciaDialogComponent, {
      width: '450px',
      disableClose: true,
    }).afterClosed().subscribe(()=>{

      this.datosPortafolio.obtenerDatosExperienciaPorIdPersona(this.idPersona).subscribe(data =>{
        if(data.body == null || data.body.length === 0){
          this.miPortfolioExperiencia = null;
        }else{
          this.miPortfolioExperiencia = data.body;
          this.miPortfolioExpEmit.emit(data.body)
        }
      })
    });
  }else{
    this.notificationToast.showError("Para ingresar información aquí debe completar la primera sección.", "");
  }
  }

  openDialogEditarExperiencia(indice: number): void {
    const dialogRef = this.dialog.open(EditaExperienciaDialogComponent, {
      width: '450px',
      disableClose: true,
      data: indice,
    }).afterClosed().subscribe(()=>{
        this.datosPortafolio.obtenerDatosExperienciaPorIdPersona(this.idPersona).subscribe(data =>{
          this.miPortfolioExperiencia = data.body;
          this.miPortfolioExpEmit.emit(data.body);
        });
      });
  }

  openDialogEliminarExperiencia(indice:number): void {
    const dialogRef = this.dialog.open(EliminaExperienciaDialogComponent, {
      width: '450px',
      disableClose: true,
      data: indice,
    }).afterClosed().subscribe(()=>{
      this.datosPortafolio.obtenerDatosExperienciaPorIdPersona(this.idPersona).subscribe(data =>{
        this.miPortfolioExperiencia = data.body;
        this.miPortfolioExpEmit.emit(data.body);
      });
    });
  }

  get dataExperiencia(){
    return this.miPortfolioExperiencia;
  }


}
