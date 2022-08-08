import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AutenticacionService } from 'src/app/service/autenticacion.service';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { CreaEducacionDialogComponent } from '../meterial/crea-educacion-dialog/crea-educacion-dialog.component';
import { EditaEducacionDialogComponent } from '../meterial/edita-educacion-dialog/edita-educacion-dialog.component';
import { EliminaEducacionDialogComponent } from '../meterial/elimina-educacion-dialog/elimina-educacion-dialog.component';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  datosUsuario: any;

  miPortfolioEducacion: any;

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
        this.datosPortafolio.obtenerDatosEducacionPorIdPersona(this.idPersona).subscribe(data =>{
          this.miPortfolioEducacion = data.body;
        })
      });
    });

  }

  openDialogAgregarEducacion(): void {
    const dialogRef = this.dialog.open(CreaEducacionDialogComponent, {
      width: '450px',
      disableClose: true,
    }).afterClosed().subscribe(()=>{

      this.datosPortafolio.obtenerDatosEducacionPorIdPersona(this.idPersona).subscribe(data =>{
        this.miPortfolioEducacion = data.body;

      })
    });
  }



  openDialogEditarEducacion(indice: number): void {
    const dialogRef = this.dialog.open(EditaEducacionDialogComponent, {
      width: '450px',
      disableClose: true,
      data: indice,
    }).afterClosed().subscribe(()=>{
        this.datosPortafolio.obtenerDatosEducacionPorIdPersona(this.idPersona).subscribe(data =>{
          this.miPortfolioEducacion = data.body;
        });
      });
  }


  openDialogEliminarEducacion(indice:number): void {
    const dialogRef = this.dialog.open(EliminaEducacionDialogComponent, {
      width: '450px',
      disableClose: true,
      data: indice,
    }).afterClosed().subscribe(()=>{
      this.datosPortafolio.obtenerDatosEducacionPorIdPersona(this.idPersona).subscribe(data =>{
        this.miPortfolioEducacion = data.body;
      });
    });
  }



}
