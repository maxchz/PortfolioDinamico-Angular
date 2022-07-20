import { Component, OnInit } from '@angular/core';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  educationList: any;

  constructor(private datosPortafolio: DatosPortfoliosService) { }

  ngOnInit(): void {
    this.datosPortafolio.obtenerDatosEducacion().subscribe(data =>{
      this.educationList=data;
    });
  }



}
