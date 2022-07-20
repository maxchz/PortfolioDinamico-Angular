import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  habilidadesList: any;
  habilidadesBlandasList: any;

  constructor(private datosPortafolio: DatosPortfoliosService) { }

  ngOnInit(): void {
    this.datosPortafolio.obtenerDatosHabilidadTech().subscribe(data => {
      this.habilidadesList=data;
    })
    this.datosPortafolio.obtenerDatosHabilidadBlanda().subscribe(data=>{
      this.habilidadesBlandasList=data;
    })
  }

}
