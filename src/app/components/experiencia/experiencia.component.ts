import { Component, OnInit } from '@angular/core';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  miExperiencia: any;

  constructor(private datosPortafolio: DatosPortfoliosService) { }

  ngOnInit(): void {
    this.datosPortafolio.obtenerDatosExperiencia().subscribe(data =>{
    this.miExperiencia=data;
      })
  }

  
}
