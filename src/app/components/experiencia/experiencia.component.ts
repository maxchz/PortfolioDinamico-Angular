import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private datosPortafolio: DatosPortfoliosService,
              public dialog: MatDialog,
              private autenticacionServicio: AutenticacionService) {}

  ngOnInit(): void {

    this.autenticacionServicio.DatosNuevoUsuario().subscribe(data =>{
      this.datosUsuario = data;
      var idUsuario = data.id;
      this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(idUsuario).subscribe(data =>{
        this.idPersona = data.id;
        this.datosPortafolio.obtenerDatosExperienciaPorIdPersona(this.idPersona).subscribe(data =>{
          this.miPortfolioExperiencia = data.body;
          this.miPortfolioExpEmit.emit(data.body)});
      });
    });
  }

  openDialogAgregarExperiencia(): void {
    const dialogRef = this.dialog.open(CreaExperienciaDialogComponent, {
      width: '450px',
      disableClose: true,
    }).afterClosed().subscribe(()=>{

      this.datosPortafolio.obtenerDatosExperienciaPorIdPersona(this.idPersona).subscribe(data =>{
        this.miPortfolioExperiencia = data.body;
        this.miPortfolioExpEmit.emit(data.body);
      })
    });
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
