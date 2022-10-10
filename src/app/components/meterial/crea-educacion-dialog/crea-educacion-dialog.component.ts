import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificacionToastService } from 'src/app/service/alertas/notificacion-toast.service';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { RegistroPersonaService } from 'src/app/service/registro-persona.service';

@Component({
  selector: 'app-crea-educacion-dialog',
  templateUrl: './crea-educacion-dialog.component.html',
  styleUrls: ['./crea-educacion-dialog.component.css']
})
export class CreaEducacionDialogComponent implements OnInit {
  formEduCrea: FormGroup;
  actualidadEduCrea: FormControl = new FormControl();
  fecha: boolean= true;
  today: Date;
  firstDate: Date;
  secondDate: Date;
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
                    this.formEduCrea.patchValue({
                      persona_id: this.personaId,
                      url_logo: 'null',
                    });
                  });
                });

                this.formEduCrea = this.formBuilder.group(
                  {
                    institucion: ['',[Validators.required]],
                    titulo: ['',[Validators.required]],
                    fechaInicio:['',[Validators.required]],
                    fechaFin: ['',[Validators.required]],
                    descripcion: ['',[Validators.required]],
                    url_logo: ['',[Validators.required]],
                    persona_id: ['',[Validators.required]],
                  });
  }

  ngOnInit(): void {
    this.actualidadEduCrea.valueChanges.subscribe(data=>{
      if(data){
        this.formEduCrea.controls['fechaFin'].disable();
      }else{
        this.formEduCrea.controls['fechaFin'].enable();
      }
    });


    this.formEduCrea.valueChanges.subscribe(data=>{
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

  onEnviarNuevaEducacion(event:Event){
    event.preventDefault;
    this.showSpinner= true;
    if(this.actualidadEduCrea.value){
      let elemento :any = document.getElementById('fechaFin');
      elemento.type = "text";
      this.formEduCrea.controls['fechaFin'].enable();
      this.formEduCrea.patchValue({
        fechaFin: 'Actualmente en curso'
      });
      elemento.type="date";
    };

    this.firstDate = new Date(this.formEduCrea.value.fechaInicio);
    this.secondDate = new Date (this.formEduCrea.value.fechaFin);
    this.today = new Date();
    if(this.secondDate>this.firstDate && this.firstDate<=this.today){
      this.fecha= true;
    }else{
      this.fecha=false;
    };

    if((this.fecha && this.isValiDateInicio && this.isValiDateFin)||(this.fecha && this.isValiDateInicio && this.actualidadEduCrea.value)|| ((this.firstDate<=this.today) && this.actualidadEduCrea.value)){
      this.registerPerson.CrearEducacion(this.formEduCrea.value).subscribe({next: (data)=>{
        if(data){
          setTimeout(() => {
            this.showSpinner = false;
            this.dialog.closeAll();
          }, 1500);
          this.notificationToast.showSuccess('Se ha guardado con exito.', ' ');
        } else {
          setTimeout(() => {
            this.showSpinner = false;
            this.dialog.closeAll();
          }, 1500);
          this.notificationToast.showError('No se ha guardado con exito, intenta luego',' ');
          };
      }, error: (e)=>{
        if(e.ok !=true){
          setTimeout(() => {
            this.showSpinner = false;
          }, 1500);
          this.notificationToast.showError("Ha ocurrido un error, intenta luego.", " ");}
        }
      })
    } else {
        this.actualidadEduCrea.reset();
        this.showSpinner = false;
        this.notificationToast.showError("La fecha de finalización debe ser mayor a la fecha de inicio y menor a la fecha actual.", "");
      }
  }

  get FechaInicio(){
    let dateFirst= new Date(this.formEduCrea.value.fechaInicio);
    return dateFirst ;
  }

  get FechaFin(){
    let dateSecond = new Date(this.formEduCrea.value.fechaFin);
    return dateSecond;
  }
}
