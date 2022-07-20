import { Component, OnInit } from '@angular/core';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectosList: any;

  constructor(private datosPortafolio: DatosPortfoliosService) { }

  ngOnInit(): void {
    this.datosPortafolio.obtenerDatosProyecto().subscribe(data=>{
      this.proyectosList=data;

    })
  }

}
