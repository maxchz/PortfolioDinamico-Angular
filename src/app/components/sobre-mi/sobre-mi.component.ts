import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AutenticacionService } from 'src/app/service/autenticacion.service';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { CreaSobreMiDialogComponent } from '../meterial/crea-sobre-mi-dialog/crea-sobre-mi-dialog.component';
import { EditDialogComponent } from '../meterial/edit-dialog/edit-dialog.component';


@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent implements OnInit {

  datosUsuario: any;

  @Input()
  miPortfolio: any;


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '450px',
    });
  }

  openDialogAgregarSobreMi(): void {
    const dialogRef = this.dialog.open(CreaSobreMiDialogComponent, {
      width: '450px',
    });
  }

}
