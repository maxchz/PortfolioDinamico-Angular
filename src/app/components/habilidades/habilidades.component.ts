import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { AutenticacionService } from 'src/app/service/autenticacion.service';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { CreaHabDuraDialogComponent } from '../meterial/crea-hab-dura-dialog/crea-hab-dura-dialog.component';
import { EditaHabDuraDialogComponent } from '../meterial/edita-hab-dura-dialog/edita-hab-dura-dialog.component';
import { EliminaHabDuraDialogComponent } from '../meterial/elimina-hab-dura-dialog/elimina-hab-dura-dialog.component';
import { CreaHabBlandaDialogComponent } from '../meterial/crea-hab-blanda-dialog/crea-hab-blanda-dialog.component';
import { EditaHabBlandaDialogComponent } from '../meterial/edita-hab-blanda-dialog/edita-hab-blanda-dialog.component';
import { EliminaHabBlandaDialogComponent } from '../meterial/elimina-hab-blanda-dialog/elimina-hab-blanda-dialog.component';
import { NotificacionToastService } from 'src/app/service/alertas/notificacion-toast.service';


@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';

  datosUsuario: any;
  miPortfolioHabilidadDura: any;
  miPortfolioHabilidadBlanda: any;
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
        if(data == null){
          this.showIcon = false;
        }else{
          this.idPersona = data.id;
          this.datosPortafolio.obtenerDatosHabilidadDuraPorIdPersona(this.idPersona).subscribe(data =>{
            if(data.body == null || data.body.length === 0){
              this.miPortfolioHabilidadDura = null;
            }else{
              this.miPortfolioHabilidadDura = data.body;
            }
          });
          this.datosPortafolio.obtenerDatosHabilidadBlandaPorIdPersona(this.idPersona).subscribe(data =>{
            if(data.body == null || data.body.length === 0){
              this.miPortfolioHabilidadBlanda = null;
            }else{
              this.miPortfolioHabilidadBlanda = data.body;
            }
          })
        }
      });
    });
  }

  //HABILIDADES - TECNOLOGIA

  openDialogAgregarHabilidadDura(): void {
    if(this.showIcon){
    const dialogRef = this.dialog.open(CreaHabDuraDialogComponent, {
      width: '450px',
      disableClose: true,
      data: this.miPortfolioHabilidadDura,
    }).afterClosed().subscribe(()=>{
      this.datosPortafolio.obtenerDatosHabilidadDuraPorIdPersona(this.idPersona).subscribe(data =>{
        if(data.body == null || data.body.length === 0){
          this.miPortfolioHabilidadDura = null;
        }else{
          this.miPortfolioHabilidadDura = data.body;
        }
      })
    });
  }else{
    this.notificationToast.showError("Para ingresar información aquí debe completar la primera sección.", "");
  }
  }

  openDialogEditarHabilidadDura(indice: number): void {
    const dialogRef = this.dialog.open(EditaHabDuraDialogComponent, {
      width: '450px',
      disableClose: true,
      data: [indice, this.miPortfolioHabilidadDura],

    }).afterClosed().subscribe(()=>{
        this.datosPortafolio.obtenerDatosHabilidadDuraPorIdPersona(this.idPersona).subscribe(data =>{
          this.miPortfolioHabilidadDura = data.body;
        });
      });
  }

  openDialogEliminarHabilidadDura(indice:number): void {
    const dialogRef = this.dialog.open(EliminaHabDuraDialogComponent, {
      width: '450px',
      disableClose: true,
      data: indice,
    }).afterClosed().subscribe(()=>{
      this.datosPortafolio.obtenerDatosHabilidadDuraPorIdPersona(this.idPersona).subscribe(data =>{
        this.miPortfolioHabilidadDura = data.body;
      });
    });
  }

  //HABILIDADES INTERPERSONALES

  openDialogAgregarHabilidadBlanda(): void {
    if(this.showIcon){
    const dialogRef = this.dialog.open(CreaHabBlandaDialogComponent, {
      width: '450px',
      disableClose: true,
      data: this.miPortfolioHabilidadBlanda,
    }).afterClosed().subscribe(()=>{
      this.datosPortafolio.obtenerDatosHabilidadBlandaPorIdPersona(this.idPersona).subscribe(data =>{
        if(data.body == null || data.body.length === 0){
          this.miPortfolioHabilidadBlanda = null;
        }else{
          this.miPortfolioHabilidadBlanda = data.body;
        }
      })
    });
  }else{
    this.notificationToast.showError("Para ingresar información aquí debe completar la primera sección.", "");
  }
  }

  openDialogEditarHabilidadBlanda(): void {
    const dialogRef = this.dialog.open(EditaHabBlandaDialogComponent, {
      width: '450px',
      disableClose: true,
      data: this.miPortfolioHabilidadBlanda,
    }).afterClosed().subscribe(()=>{
        this.datosPortafolio.obtenerDatosHabilidadBlandaPorIdPersona(this.idPersona).subscribe(data =>{
          this.miPortfolioHabilidadBlanda = data.body;
        });
      });
  }

  openDialogEliminarHabilidadBlanda(): void {
    const dialogRef = this.dialog.open(EliminaHabBlandaDialogComponent, {
      width: '450px',
      disableClose: true,
    }).afterClosed().subscribe(()=>{
      this.datosPortafolio.obtenerDatosHabilidadBlandaPorIdPersona(this.idPersona).subscribe(data =>{
        this.miPortfolioHabilidadBlanda = data.body;
      });
    });
  }

}
