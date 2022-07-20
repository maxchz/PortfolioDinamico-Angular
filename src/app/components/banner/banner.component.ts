import { Component, OnInit } from '@angular/core';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {

  miPortfolio: any;

  constructor(private datosPortafolio: DatosPortfoliosService) {

   }

  ngOnInit(): void {
    this.datosPortafolio.obtenerDatos().subscribe(data =>{
      this.miPortfolio=data;
      console.log("Los datos de la persona son: ");
      console.log(this.miPortfolio);

    })

  }

  irASobreMi(){
    document.getElementById("about")?.scrollIntoView();
  }

}
