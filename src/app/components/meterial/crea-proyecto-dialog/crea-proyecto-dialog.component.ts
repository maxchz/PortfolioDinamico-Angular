import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificacionToastService } from 'src/app/service/alertas/notificacion-toast.service';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { RegistroPersonaService } from 'src/app/service/registro-persona.service';

@Component({
  selector: 'app-crea-proyecto-dialog',
  templateUrl: './crea-proyecto-dialog.component.html',
  styleUrls: ['./crea-proyecto-dialog.component.css']
})
export class CreaProyectoDialogComponent implements OnInit {
  formProCrea: FormGroup;
  actualidadProCrea: FormControl = new FormControl();
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
              private notificationToast: NotificacionToastService){
                this.datosPortafolio.ObtenerDatosUsuarioPorEmail().subscribe(data =>{
                  this.id_usuario = data.id;
                  this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(this.id_usuario).subscribe(data=>{
                    this.personaId = data.id;
                    this.formProCrea.patchValue({
                       persona_id: this.personaId});
                    });
                });

                this.formProCrea = this.formBuilder.group(
                  {
                    nombre: ['', [Validators.required]],
                    fechaInicio:['',[Validators.required]],
                    fechaFin: ['', [Validators.required]],
                    descripcion: ['', [Validators.required]],
                    urlProyecto: ['', [Validators.required]],
                    urlRepositorio: ['', [Validators.required]],
                    persona_id: ['',[Validators.required]],
                  });
  }

  ngOnInit(): void {
    this.actualidadProCrea.valueChanges.subscribe(data=>{
      if(data){
        this.formProCrea.controls['fechaFin'].disable();
      }else{
        this.formProCrea.controls['fechaFin'].enable();
      }
    });


    this.formProCrea.valueChanges.subscribe(data=>{
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

  onEnviarNuevoProyecto(event:Event){
    event.preventDefault;
    this.showSpinner= true;
    if(this.actualidadProCrea.value){
      let elemento :any = document.getElementById('fechaFin');
      elemento.type = "text";
      this.formProCrea.controls['fechaFin'].enable();
      this.formProCrea.patchValue({
        fechaFin: 'Actualmente en ejecución'
      });
      elemento.type="date";
    };

    this.firstDate = new Date(this.formProCrea.value.fechaInicio);
    this.secondDate = new Date (this.formProCrea.value.fechaFin);
    this.today = new Date();
    if(this.secondDate>this.firstDate && this.firstDate<=this.today){
      this.fecha= true;
    }else{
      this.fecha=false;
    };

    if((this.fecha && this.isValiDateInicio && this.isValiDateFin)||(this.fecha && this.isValiDateInicio && this.actualidadProCrea.value)|| ((this.firstDate<=this.today) && this.actualidadProCrea.value)){
      this.registerPerson.CrearProyecto(this.formProCrea.value).subscribe({next: (data)=>{
        if(data.ok){
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
      this.actualidadProCrea.reset();
      this.showSpinner = false;
      this.notificationToast.showError("La fecha de finalización debe ser mayor a la fecha de inicio y menor a la fecha actual.", "");
      }
  }

  get FechaInicio(){
    let dateFirst= new Date(this.formProCrea.value.fechaInicio);
    return dateFirst ;
  }

  get FechaFin(){
    let dateSecond = new Date(this.formProCrea.value.fechaFin);
    return dateSecond;
  }

}
