import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { EditDialogComponent } from '../meterial/edit-dialog/edit-dialog.component';


@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent implements OnInit {

  miPortfolio: any;


  constructor(private datosPortafolio: DatosPortfoliosService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.datosPortafolio.obtenerDatos().subscribe(data =>{
    this.miPortfolio=data;
  })

  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '450px',

      // data: {name: this.name, animal: this.animal},
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }




}
