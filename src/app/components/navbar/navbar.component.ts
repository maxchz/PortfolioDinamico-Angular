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
  clickToggle: boolean = false;

  constructor(private datosPortafolio: DatosPortfoliosService,
              private cerrarSesion: AutenticacionService,
              private router: Router) { }

  ngOnInit(): void {
    this.datosPortafolio.obtenerDatos();
  }

  cierraSesion(){
    this.cerrarSesion.CerrarSesion();
    window.location.reload();
  }

  irASobreMi(){
    document.getElementById("about")?.scrollIntoView();
    if(this.clickToggle){
      let el: HTMLElement  = document.getElementById("toggleNavBar");
      el.click();
    }
  }

  irAExperiencia(){
    document.getElementById("experience")?.scrollIntoView();
    if(this.clickToggle){
      let el: HTMLElement  = document.getElementById("toggleNavBar");
      el.click();
    }
  }

  irAEducacion(){
    document.getElementById("education")?.scrollIntoView();
    if(this.clickToggle){
      let el: HTMLElement  = document.getElementById("toggleNavBar");
      el.click();
    }
  }

  irAProyecto(){
    document.getElementById("projects")?.scrollIntoView();
    if(this.clickToggle){
      let el: HTMLElement  = document.getElementById("toggleNavBar");
      el.click();
    }
  }

  irAHabilidad(){
    document.getElementById("skill")?.scrollIntoView();
    if(this.clickToggle){
      let el: HTMLElement  = document.getElementById("toggleNavBar");
      el.click();
    }
  }

  irAContacto(){
    document.getElementById("contact")?.scrollIntoView();
    if(this.clickToggle){
      let el: HTMLElement  = document.getElementById("toggleNavBar");
      el.click();
    }
  }

  toggleMenu() {
    const toggle: any = document.querySelector('.toggle');
    const menu: any = document.querySelector('.menu');
      if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
        this.clickToggle=false;
      } else {
        menu.classList.add("active");
        toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
        this.clickToggle=true;
      }
    };

}


