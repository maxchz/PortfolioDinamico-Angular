import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificacionToastService } from 'src/app/service/alertas/notificacion-toast.service';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { ModificaDataPersonaService } from 'src/app/service/modifica-data-persona.service';

@Component({
  selector: 'app-edita-hab-dura-dialog',
  templateUrl: './edita-hab-dura-dialog.component.html',
  styleUrls: ['./edita-hab-dura-dialog.component.css']
})
export class EditaHabDuraDialogComponent implements OnInit {
  formHardEdita: FormGroup;
  id_usuario: number = 0;
  id_persona: number = 0;
  showSpinner: boolean = false;
  isValidSkillHard: boolean = true;
  isValidSkillNumber: boolean = true;
  skillHard: String = '';
  listSkillHard: any;

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private modificaPerson: ModificaDataPersonaService,
              private datosPortafolio: DatosPortfoliosService,
              private notificationToast: NotificacionToastService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.showSpinner = true;
                this.listSkillHard = data[1];
                this.datosPortafolio.ObtenerDatosUsuarioPorEmail().subscribe(data =>{
                  this.id_usuario = data.id;
                  this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(this.id_usuario).subscribe(data =>{
                    this.id_persona = data.id;
                    this.datosPortafolio.obtenerDatosHabilidadDuraPorIdPersona(this.id_persona).subscribe({next: (data) =>{
                      this.formHardEdita.patchValue({
                        id: data.body[this.data[0]].id,
                        tecnologia: data.body[this.data[0]].tecnologia,
                        progreso: data.body[this.data[0]].progreso,
                        urlTecLogo: data.body[this.data[0]].urlTecLogo,
                        persona_id: data.body[this.data[0]].persona_id,
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
                this.formHardEdita = this.formBuilder.group({
                  id: ['',[Validators.required]],
                  tecnologia: ['', [Validators.required]],
                  progreso:['',[Validators.required]],
                  urlTecLogo: ['', [Validators.required]],
                  persona_id: ['',[Validators.required]],
                  });
}

ngOnInit(): void {
  if(this.listSkillHard.length > 0 && this.listSkillHard !=null){
    this.formHardEdita.valueChanges.subscribe(data=>{
      this.skillHard = data.tecnologia;
      for (let i =0; i<this.listSkillHard.length; i++){
        const element = this.listSkillHard[i];
        if(element.tecnologia.toUpperCase().trim() === this.skillHard.toUpperCase().trim() && i != this.data[0]){
          this.isValidSkillHard= false;
        break;
        }else {
          this.isValidSkillHard = true;
        }
      }
    })
  }

  this.formHardEdita.valueChanges.subscribe(data=>{
    if(data.progreso >100 || data.progreso<0){
      this.isValidSkillNumber = false;
    }else {
      this.isValidSkillNumber = true;
    }
  })
}

onEnviarEditaHabilidadDura(event:Event){
  event.preventDefault;
  this.showSpinner= true;
  if(this.isValidSkillHard && this.isValidSkillNumber){
  this.modificaPerson.ModificarHabilidadDura(this.formHardEdita.value).subscribe({next: (data)=>{
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
  }, error: (e)=>{
      if(e.ok !=true){
        setTimeout(() => {
        this.showSpinner = false;
      }, 1500);
      this.notificationToast.showError("Ha ocurrido un error, intenta luego.", " ");
      }
    }
  })
}else{
  this.showSpinner = false;
  this.notificationToast.showError("El nombre de tecnología o número de progreso ingresado es incorrecto.", "");
}
}



}
