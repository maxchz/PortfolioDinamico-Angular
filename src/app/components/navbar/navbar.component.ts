import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/service/autenticacion.service';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private datosPortafolio: DatosPortfoliosService, private cerrarSesion: AutenticacionService, private router: Router) { }

  ngOnInit(): void {
    this.datosPortafolio.obtenerDatos();
  }

  cierraSesion(){
    this.cerrarSesion.CerrarSesion();
    window.location.reload();
  }

  irASobreMi(){
    document.getElementById("about")?.scrollIntoView();
  }

  irAExperiencia(){
    document.getElementById("experience")?.scrollIntoView();
  }

  irAEducacion(){
    document.getElementById("education")?.scrollIntoView();
  }

  irAProyecto(){
    document.getElementById("projects")?.scrollIntoView();
  }

  irAHabilidad(){
    document.getElementById("skill")?.scrollIntoView();
  }

  irAContacto(){
    document.getElementById("contact")?.scrollIntoView();
  }

}


