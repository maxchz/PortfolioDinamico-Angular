import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { EliminarDatosPortfolioService } from 'src/app/service/eliminar-datos-portfolio.service';

@Component({
  selector: 'app-elimina-experiencia-dialog',
  templateUrl: './elimina-experiencia-dialog.component.html',
  styleUrls: ['./elimina-experiencia-dialog.component.css']
})
export class EliminaExperienciaDialogComponent implements OnInit {


  dataExperiencia: any;

  id_usuario: number = 0;

  id_persona: number = 0;

  id_experiencia: number = 0;

  showSpinner: boolean = false;

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private eliminaExpe: EliminarDatosPortfolioService,
              private datosPortafolio: DatosPortfoliosService,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

                this.datosPortafolio.ObtenerDatosUsuarioPorEmail().subscribe(data =>{
                  this.id_usuario = data.id;

                  this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(this.id_usuario).subscribe(data =>{
                    this.id_persona = data.id;

                    this.datosPortafolio.obtenerDatosExperienciaPorIdPersona(this.id_persona).subscribe((data) =>{
                      this.dataExperiencia = data.body[this.data];
                      this.id_experiencia = data.body[this.data].id;
                      console.log("Datos para eliminar experiencia" + JSON.stringify(this.dataExperiencia));

                    });
                  });
                });

  }

  onEnviarEliminarExperiencia(){
    this.showSpinner= true;

    this.eliminaExpe.EliminarExperiencia(this.id_experiencia).subscribe(response=>{


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
