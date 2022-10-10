import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificacionToastService } from 'src/app/service/alertas/notificacion-toast.service';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { ModificaDataPersonaService } from 'src/app/service/modifica-data-persona.service';

@Component({
  selector: 'app-edita-proyecto-dialog',
  templateUrl: './edita-proyecto-dialog.component.html',
  styleUrls: ['./edita-proyecto-dialog.component.css']
})
export class EditaProyectoDialogComponent implements OnInit {

  form: FormGroup;
  actualidadProEdita: FormControl = new FormControl();
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
  id_persona: number = 0;
  showSpinner: boolean = false;
  varType: string = "";


  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private modificaPerson: ModificaDataPersonaService,
              private datosPortafolio: DatosPortfoliosService,
              private notificationToast: NotificacionToastService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.showSpinner = true;
                this.datosPortafolio.ObtenerDatosUsuarioPorEmail().subscribe(data =>{
                  this.id_usuario = data.id;
                  this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(this.id_usuario).subscribe(data =>{
                    this.id_persona = data.id;
                    this.datosPortafolio.obtenerDatosProyectoPorIdPersona(this.id_persona).subscribe({next: (data) =>{
                      this.varType = "date";
                      this.form.patchValue({
                        id: data.body[this.data].id,
                        nombre: data.body[this.data].nombre,
                        fechaInicio: data.body[this.data].fechaInicio,
                        fechaFin: data.body[this.data].fechaFin,
                        descripcion: data.body[this.data].descripcion,
                        urlProyecto: data.body[this.data].urlProyecto,
                        urlRepositorio: data.body[this.data].urlRepositorio,
                        persona_id: data.body[this.data].persona_id,
                        });

                      this.showSpinner = false;

                    }, error: (e)=>{
                      if(e.ok !=true){
                        setTimeout(() => {
                          this.showSpinner = false;
                        }, 1000);
                        this.notificationToast.showError("Ha ocurrido un error, recarga la página e intenta nuevamente.", " ");
                      }}
                    });
                  });
                });

                this.form = this.formBuilder.group({
                  id: [' ',[Validators.required]],
                  nombre: ['', [Validators.required]],
                  fechaInicio:[' ',[Validators.required]],
                  fechaFin: [' ', [Validators.required]],
                  descripcion: [' ', [Validators.required]],
                  urlProyecto: [' ', [Validators.required]],
                  urlRepositorio: [' ', [Validators.required]],
                  persona_id: [' ',[Validators.required]],
                  });
  }

  ngOnInit(): void {
    this.actualidadProEdita.valueChanges.subscribe(data=>{
      if(data){
        this.form.controls['fechaFin'].disable();
        this.varType = "text";
      }else{
        this.form.controls['fechaFin'].enable();
        this.varType = "date";
      }
    });


    this.form.valueChanges.subscribe(data=>{
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

  onEnviarModificaProyecto(event:Event){
    event.preventDefault;
    this.showSpinner= true;
    if(this.actualidadProEdita.value){
      this.form.controls['fechaFin'].enable();
      this.form.patchValue({
        fechaFin: 'Actualmente en ejecución'
      });
    };

    this.firstDate = new Date(this.form.value.fechaInicio);
    this.secondDate = new Date (this.form.value.fechaFin);
    this.today = new Date();
    if(this.secondDate>this.firstDate && this.firstDate<=this.today){
      this.fecha= true;
    }else{
      this.fecha=false;
    };

    if((this.fecha && this.isValiDateInicio && this.isValiDateFin)||(this.fecha && this.isValiDateInicio && this.actualidadProEdita.value)|| ((this.firstDate<=this.today) && this.actualidadProEdita.value)){
      this.modificaPerson.ModificarProyecto(this.form.value).subscribe({next: (data)=>{
        if(data.ok){
          setTimeout(() => {
            this.showSpinner = false;
            this.dialog.closeAll();
          }, 1500);
          this.notificationToast.showSuccess('Se actualizó con exito.', ' ');
        } else {
            this.dialog.closeAll();
            this.notificationToast.showError('Ha ocurrido un error, intenta luego.', ' ');
          };
      },  error: (e)=>{
            if(e.ok !=true){
              setTimeout(() => {
                this.showSpinner = false;
              }, 1500);
              this.notificationToast.showError("Ha ocurrido un error, intenta luego.", " ");
            }}
      })
    } else {
        this.actualidadProEdita.reset();
        this.showSpinner = false;
        this.notificationToast.showError("La fecha de finalización debe ser mayor a la fecha de inicio y menor a la fecha actual.", "");
      }
  }

  get FechaInicio(){
    let dateFirst= new Date(this.form.value.fechaInicio);
    return dateFirst ;
  }

  get FechaFin(){
    let dateSecond = new Date(this.form.value.fechaFin);
    return dateSecond;
  }



}
