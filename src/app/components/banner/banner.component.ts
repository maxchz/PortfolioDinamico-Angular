import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { MatDialog } from '@angular/material/dialog';
import { CreaUsuarioDialogComponent } from '../meterial/crea-usuario-dialog/crea-usuario-dialog.component';
import { EditarUsuarioDialogComponent } from '../meterial/editar-usuario-dialog/editar-usuario-dialog.component';
import { AutenticacionService } from 'src/app/service/autenticacion.service';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {

  @Output()
  miPortfolioEmit: EventEmitter<any> = new EventEmitter<any>();

  miPortfolio: any;

  datosUsuario: any;

  datosUsuarioLogin: any;

  emailUser: String ='';


  constructor(private datosPortafolio: DatosPortfoliosService,
              public dialog: MatDialog,
              private autenticacionServicio: AutenticacionService
              ) {

    this.emailUser = this.autenticacionServicio.UsuarioAutenticado.email;

   }

  ngOnInit(): void {

    this.autenticacionServicio.DatosNuevoUsuario().subscribe(data =>{
      this.datosUsuario = data;
      var idUsuario = data.id;
      this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(idUsuario).subscribe(data =>{
        this.miPortfolio=data;
        this.miPortfolioEmit.emit(data);

      });

    });

  }

  irASobreMi(){
    document.getElementById("about")?.scrollIntoView();
  }

  openDialogCreaPerfil(): void {
    let dialogRef = this.dialog.open(CreaUsuarioDialogComponent, {
      width: '480px',
      disableClose: true,

    }).afterClosed().subscribe(()=>{

      this.autenticacionServicio.DatosNuevoUsuario().subscribe(data =>{
        this.datosUsuario = data;
        var id_usuario = data.id;

        this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(id_usuario).subscribe(data =>{
          this.miPortfolio=data;
          this.miPortfolioEmit.emit(data);
          console.log("Los datos de la persona son: ");
          console.log(this.miPortfolio);
        });
        console.log("Id desde banner component:" + id_usuario);
      });

    });

  }

  openDialogEditaPerfil(): void {
    const dialogRef = this.dialog.open(EditarUsuarioDialogComponent, {
      width: '450px',
      disableClose: true,

    }).afterClosed().subscribe(()=>{

        this.autenticacionServicio.DatosNuevoUsuario().subscribe(data =>{
          this.datosUsuario = data;
          var id_usuario = data.id;


        this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(id_usuario).subscribe(data =>{
          this.miPortfolio=data;
          this.miPortfolioEmit.emit(data);
          console.log("Los datos de la persona son: ");
          console.log(this.miPortfolio);
        });
      });

    });

  }


  get DatosUsuarioLogin(){
    return this.datosUsuarioLogin;
  }


}
