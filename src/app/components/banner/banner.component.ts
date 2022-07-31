import { Component, OnInit } from '@angular/core';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreaUsuarioDialogComponent } from '../meterial/crea-usuario-dialog/crea-usuario-dialog.component';
import { EditarUsuarioDialogComponent } from '../meterial/editar-usuario-dialog/editar-usuario-dialog.component';
import { AutenticacionService } from 'src/app/service/autenticacion.service';
import { NotificacionToastService } from 'src/app/service/alertas/notificacion-toast.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {

  miPortfolio: any;

  datosUsuarioLogin: any;

  emailUser: String ='';




  constructor(private datosPortafolio: DatosPortfoliosService,
              public dialog: MatDialog,
              private autenticacionServicio: AutenticacionService
              ) {

    this.emailUser = this.autenticacionServicio.UsuarioAutenticado.email;
    // console.log("Email del usuario desde banner componente:");
    // console.log(this.emailUser);
    // if(this.showMessage){
    //   this.notificacionToast.showSuccess("Se ha guardado con exito.","");
    // } else {
    //   this.notificacionToast.showError("No se ha guardado con exito","");
    // };
   }

  ngOnInit(): void {
    this.datosPortafolio.obtenerDatos().subscribe(data =>{
      this.miPortfolio=data;
      console.log("Los datos de la persona son: ");
      console.log(this.miPortfolio);

    });

    // this.datosPortafolio.ObtenerDatosUsuarioPorEmail(this.emailUser).subscribe(data =>{
    //   this.datosUsuarioLogin = data;
    //   console.log("Los datos del usuario son: ");
    //   console.log(JSON.stringify(data));
    // })

  }

  irASobreMi(){
    document.getElementById("about")?.scrollIntoView();
  }

  openDialogCreaPerfil(): void {
    const dialogRef = this.dialog.open(CreaUsuarioDialogComponent, {
      width: '480px',
      disableClose: true,

    });



  }

  openDialogEditaPerfil(): void {
    const dialogRef = this.dialog.open(EditarUsuarioDialogComponent, {
      width: '450px',
    });

  }



  get DatosUsuarioLogin(){
    return this.datosUsuarioLogin;
  }


}
