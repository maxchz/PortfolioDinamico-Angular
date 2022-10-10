import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificacionToastService } from 'src/app/service/alertas/notificacion-toast.service';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { RegistroPersonaService } from 'src/app/service/registro-persona.service';

@Component({
  selector: 'app-crea-experiencia-dialog',
  templateUrl: './crea-experiencia-dialog.component.html',
  styleUrls: ['./crea-experiencia-dialog.component.css']
})
export class CreaExperienciaDialogComponent implements OnInit {
  formExpCrea: FormGroup;
  actualidadExpCrea: FormControl = new FormControl();
  fecha: boolean= true;
  firstDate: Date;
  secondDate: Date;
  today: Date;
  yearInicio: number = 0;
  yearFin: number = 0;
  currentYear:number = 0;
  isValiDateInicio: boolean = true;
  isValiDateFin: boolean = true;
  id_usuario: number = 0;
  personaId: number = 0;
  showSpinner: boolean = false;


  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private registerPerson: RegistroPersonaService,
              private datosPortafolio: DatosPortfoliosService,
              private notificationToast: NotificacionToastService) {
                this.datosPortafolio.ObtenerDatosUsuarioPorEmail().subscribe(data =>{
                  this.id_usuario = data.id;
                  this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(this.id_usuario).subscribe(data=>{
                    this.personaId = data.id;
                    this.formExpCrea.patchValue({
                      persona_id: this.personaId,
                      });
                  });
                });

                this.formExpCrea = this.formBuilder.group(
                  {
                    nombreEmpresa: ['', [Validators.required]],
                    posicion: ['',[Validators.required]],
                    fechaInicio:['',[Validators.required]],
                    fechaFin: ['', [Validators.required]],
                    descripcion: ['', [Validators.required]],
                    persona_id: ['',[Validators.required]],
                  });
  }

  ngOnInit(): void {
    this.actualidadExpCrea.valueChanges.subscribe(data=>{
      if(data){
        this.formExpCrea.controls['fechaFin'].disable();
      }else{
        this.formExpCrea.controls['fechaFin'].enable();
      }
    });


    this.formExpCrea.valueChanges.subscribe(data=>{
      this.currentYear = new Date().getFullYear();
      this.yearInicio = new Date(data.fechaInicio).getFullYear();
      this.yearFin = new Date(data.fechaFin).getFullYear();
      if(this.yearInicio<1920 || this.yearInicio>this.currentYear || this.yearInicio>9999){
        this.isValiDateInicio = false;
       }else{
        this.isValiDateInicio = true;
       };

       if(this.yearFin<1920 || this.yearFin>this.currentYear || this.yearFin>9999){
        this.isValiDateFin = false;
       }else{
        this.isValiDateFin = true;
       };
    })
  }

  onEnviarNuevaExperiencia(event:Event){
    event.preventDefault;
    this.showSpinner= true;
    if(this.actualidadExpCrea.value){
      let elemento :any = document.getElementById('fechaFin');
      elemento.type = "text";
      this.formExpCrea.controls['fechaFin'].enable();
      this.formExpCrea.patchValue({
        fechaFin: 'Actualmente desempeño este cargo'
      });
      elemento.type="date";
    };

    this.firstDate = new Date(this.formExpCrea.value.fechaInicio);
    this.secondDate = new Date (this.formExpCrea.value.fechaFin);
    this.today = new Date();
    if(this.secondDate>this.firstDate && this.firstDate<=this.today){
      this.fecha= true;
    }else{
      this.fecha=false;
    };

    if((this.fecha && this.isValiDateInicio && this.isValiDateFin)||(this.fecha && this.isValiDateInicio && this.actualidadExpCrea.value)|| ((this.firstDate<=this.today) && this.actualidadExpCrea.value)){
      this.registerPerson.CrearExperiencia(this.formExpCrea.value).subscribe({next: (data)=>{
        if(data.ok){
          setTimeout(() => {
            this.showSpinner = false;
            this.dialog.closeAll();
          }, 1500);
          this.notificationToast.showSuccess('Se ha guardado con exito.', ' ');
        } else {
          this.dialog.closeAll();
          this.notificationToast.showError('No se ha guardado, intenta luego.', ' ');
        };
      }, error: (e)=>{
          if(e.ok !=true){
            setTimeout(() => {
              this.showSpinner = false;
            }, 1500);
            this.notificationToast.showError("Ha ocurrido un error, intenta luego.", " ");}
        }
      })
    }else {
      this.actualidadExpCrea.reset();
      this.showSpinner = false;
      this.notificationToast.showError("La fecha de finalización debe ser mayor a la fecha de inicio y menor a la fecha actual.", "");
    }
  }

  get FechaInicio(){
    let dateFirst= new Date(this.formExpCrea.value.fechaInicio);
    return dateFirst ;
  }

  get FechaFin(){
    let dateSecond = new Date(this.formExpCrea.value.fechaFin);
    return dateSecond;
  }

}
