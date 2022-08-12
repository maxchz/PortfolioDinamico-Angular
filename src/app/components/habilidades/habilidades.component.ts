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


@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  color: ThemePalette = 'primary';

  mode: ProgressSpinnerMode = 'determinate';

  // value:number = 0;

  datosUsuario: any;

  miPortfolioHabilidadDura: any;

  miPortfolioHabilidadBlanda: any;

  idPersona: number = 0;



  constructor(private datosPortafolio: DatosPortfoliosService,
              public dialog: MatDialog,
              private autenticacionServicio: AutenticacionService) { }

  ngOnInit(): void {
    this.autenticacionServicio.DatosNuevoUsuario().subscribe(data =>{
      this.datosUsuario = data;
      var idUsuario = data.id;
      this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(idUsuario).subscribe(data =>{
        this.idPersona = data.id;
        this.datosPortafolio.obtenerDatosHabilidadDuraPorIdPersona(this.idPersona).subscribe(data =>{
          this.miPortfolioHabilidadDura = data.body;
        })
        this.datosPortafolio.obtenerDatosHabilidadBlandaPorIdPersona(this.idPersona).subscribe(data =>{
          this.miPortfolioHabilidadBlanda = data.body;
        })
      });
    });



  }

  //HABILIDADES DURAS

  openDialogAgregarHabilidadDura(): void {
    const dialogRef = this.dialog.open(CreaHabDuraDialogComponent, {
      width: '450px',
      disableClose: true,
    }).afterClosed().subscribe(()=>{

      this.datosPortafolio.obtenerDatosHabilidadDuraPorIdPersona(this.idPersona).subscribe(data =>{
        this.miPortfolioHabilidadDura = data.body;
      })
    });
  }


  openDialogEditarHabilidadDura(indice: number): void {
    const dialogRef = this.dialog.open(EditaHabDuraDialogComponent, {
      width: '450px',
      disableClose: true,
      data: indice,
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

  //HABILIDADES BLANDAS

  openDialogAgregarHabilidadBlanda(): void {
    const dialogRef = this.dialog.open(CreaHabBlandaDialogComponent, {
      width: '450px',
      disableClose: true,
    }).afterClosed().subscribe(()=>{

      this.datosPortafolio.obtenerDatosHabilidadBlandaPorIdPersona(this.idPersona).subscribe(data =>{
        this.miPortfolioHabilidadBlanda = data.body;

      })
    });
  }

  openDialogEditarHabilidadBlanda(): void {
    const dialogRef = this.dialog.open(EditaHabBlandaDialogComponent, {
      width: '450px',
      disableClose: true,
      // data: indice,
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
      // data: indice,
    }).afterClosed().subscribe(()=>{
      this.datosPortafolio.obtenerDatosHabilidadBlandaPorIdPersona(this.idPersona).subscribe(data =>{
        this.miPortfolioHabilidadBlanda = data.body;
      });
    });
  }

}
