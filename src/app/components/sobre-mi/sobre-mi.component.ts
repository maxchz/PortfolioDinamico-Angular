import { Component, OnInit } from '@angular/core';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';

@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent implements OnInit {

  miPortfolio: any;


  constructor(private datosPortafolio: DatosPortfoliosService) { }

  ngOnInit(): void {
    this.datosPortafolio.obtenerDatos().subscribe(data =>{
    this.miPortfolio=data;
  })

  }
}
