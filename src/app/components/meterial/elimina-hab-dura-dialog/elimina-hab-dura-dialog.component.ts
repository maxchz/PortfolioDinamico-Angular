import { Component,Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { EliminarDatosPortfolioService } from 'src/app/service/eliminar-datos-portfolio.service';

@Component({
  selector: 'app-elimina-hab-dura-dialog',
  templateUrl: './elimina-hab-dura-dialog.component.html',
  styleUrls: ['./elimina-hab-dura-dialog.component.css']
})
export class EliminaHabDuraDialogComponent implements OnInit {

  dataHabilidadDura: any;

  id_usuario: number = 0;

  id_persona: number = 0;

  id_habilidadDura: number = 0;

  showSpinner: boolean = false;

  constructor(public dialog: MatDialog,
              private eliminaHabDura: EliminarDatosPortfolioService,
              private datosPortafolio: DatosPortfoliosService,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

                this.datosPortafolio.ObtenerDatosUsuarioPorEmail().subscribe(data =>{
                  this.id_usuario = data.id;

                  this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(this.id_usuario).subscribe(data =>{
                    this.id_persona = data.id;

                    this.datosPortafolio.obtenerDatosHabilidadDuraPorIdPersona(this.id_persona).subscribe((data) =>{
                      this.dataHabilidadDura = data.body[this.data];
                      this.id_habilidadDura = data.body[this.data].id;

                    });
                  });
                });
}

onEnviarEliminarHabilidadDura(){
  this.showSpinner= true;

  this.eliminaHabDura.EliminarHabilidadDura(this.id_habilidadDura).subscribe(response=>{

    if(response.ok){
      setTimeout(() => {
        this.showSpinner = false;
        this.dialog.closeAll();

      }, 1500);

      this.showSuccess();

    } else {
      this.dialog.closeAll();
      this.showError();
    };
  })

}

showSuccess() {
  this.toastr.success('Se elimino con exito.', ' ', {
      tapToDismiss: true,
      disableTimeOut: true,
      positionClass: 'toast-bottom-left',
      onActivateTick: true,
  });
}

showError() {
  this.toastr.error('Ha ocurrido un error, intenta luego.', ' ', {
      tapToDismiss: true,
      disableTimeOut: true,
      positionClass: 'toast-bottom-left',
      onActivateTick: true,
  });
}

  ngOnInit(): void {
  }

}
