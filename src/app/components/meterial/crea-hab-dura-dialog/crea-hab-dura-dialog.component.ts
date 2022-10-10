import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificacionToastService } from 'src/app/service/alertas/notificacion-toast.service';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { RegistroPersonaService } from 'src/app/service/registro-persona.service';

@Component({
  selector: 'app-crea-hab-dura-dialog',
  templateUrl: './crea-hab-dura-dialog.component.html',
  styleUrls: ['./crea-hab-dura-dialog.component.css']
})
export class CreaHabDuraDialogComponent implements OnInit {
  formHardCrea: FormGroup;
  id_usuario: number = 0;
  personaId: number = 0;
  showSpinner: boolean = false;
  isValidSkillHard: boolean = true;
  isValidSkillNumber: boolean = true;
  skillHard: String = '';
  listSkillHard: any;

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private registerPerson: RegistroPersonaService,
              private datosPortafolio: DatosPortfoliosService,
              private notificationToast: NotificacionToastService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.listSkillHard = data;
                this.datosPortafolio.ObtenerDatosUsuarioPorEmail().subscribe(data =>{
                  this.id_usuario = data.id;
                  this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(this.id_usuario).subscribe(data=>{
                    this.personaId = data.id;
                    this.formHardCrea.patchValue({
                       persona_id: this.personaId,
                       urlTecLogo: 'null'});
                    });
                });
                this.formHardCrea = this.formBuilder.group(
                  {
                    tecnologia: ['',[Validators.required]],
                    progreso:['',[Validators.required]],
                    urlTecLogo: ['',[Validators.required]],
                    persona_id: ['',[Validators.required]],
                  });
  }

  ngOnInit(): void {

    if(this.listSkillHard.length > 0 && this.listSkillHard !=null){
      this.formHardCrea.valueChanges.subscribe(data=>{
        this.skillHard = data.tecnologia;
        for (let i =0; i<this.listSkillHard.length; i++){
          const element = this.listSkillHard[i];
          if(element.tecnologia.toUpperCase().trim() === this.skillHard.toUpperCase().trim()){
            this.isValidSkillHard= false;
          break;
          }else {
            this.isValidSkillHard = true;
          }
        }
      })
    }

    this.formHardCrea.valueChanges.subscribe(data=>{
      if(data.progreso >100 || data.progreso<0){
        this.isValidSkillNumber = false;
      }else {
        this.isValidSkillNumber = true;
      }
    })

  }

  onEnviarNuevaHabilidadDura(event:Event){
    event.preventDefault;
    this.showSpinner= true;
    if(this.isValidSkillHard && this.isValidSkillNumber){
    this.registerPerson.CrearHabilidadDura(this.formHardCrea.value).subscribe({next: (data)=>{
      if(data.ok){
        setTimeout(() => {
          this.showSpinner = false;
          this.dialog.closeAll()}, 1500);
          this.notificationToast.showSuccess('Se ha guardado con exito.', ' ');
      }else {
        setTimeout(() => {
          this.showSpinner = false;
          this.dialog.closeAll();
        }, 1500);
        this.notificationToast.showError('No se ha guardado con exito, intenta luego',' ');
      }
      }, error: (e)=>{
          if(e.ok !=true){
            setTimeout(() => {
              this.showSpinner = false;
            }, 1500);
            this.notificationToast.showError('Ha ocurrido un error, intenta luego.', ' ');}
          }
    })
  }else{
    this.showSpinner = false;
    this.notificationToast.showError("El nombre de tecnología o número de progreso ingresado es incorrecto.", "");
  }
  }

}
