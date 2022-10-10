import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificacionToastService } from 'src/app/service/alertas/notificacion-toast.service';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { RegistroPersonaService } from 'src/app/service/registro-persona.service';

@Component({
  selector: 'app-crea-hab-blanda-dialog',
  templateUrl: './crea-hab-blanda-dialog.component.html',
  styleUrls: ['./crea-hab-blanda-dialog.component.css']
})
export class CreaHabBlandaDialogComponent implements OnInit {
  formSoftCrea: FormGroup;
  id_usuario: number = 0;
  personaId: number = 0;
  showSpinner: boolean = false;
  isValidSkillSoft: boolean = true;
  isValidSkillNumber: boolean = true;
  skillSoft: String = '';
  listSkillSoft: any;

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private registerPerson: RegistroPersonaService,
              private datosPortafolio: DatosPortfoliosService,
              private notificationToast: NotificacionToastService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.listSkillSoft = data;
                this.datosPortafolio.ObtenerDatosUsuarioPorEmail().subscribe(data =>{
                  this.id_usuario = data.id;
                  this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(this.id_usuario).subscribe(data=>{
                    this.personaId = data.id;
                    this.formSoftCrea.patchValue({
                      persona_id: this.personaId});
                    });
                });
                this.formSoftCrea = this.formBuilder.group(
                  {
                  hab_blanda: ['', [Validators.required]],
                  persona_id: ['' ,[Validators.required]],
                  });

  }

  ngOnInit(): void {
    if(this.listSkillSoft.length > 0 && this.listSkillSoft !=null){
      this.formSoftCrea.valueChanges.subscribe(data=>{
        this.skillSoft = data.hab_blanda;
        for (let i =0; i<this.listSkillSoft.length; i++){
          const element = this.listSkillSoft[i];
          if(element.hab_blanda.toUpperCase().trim() === this.skillSoft.toUpperCase().trim()){
            this.isValidSkillSoft= false;
          break;
          }else {
            this.isValidSkillSoft = true;
          }
        }
      })
    }
  }

  onEnviarNuevaHabilidadBlanda(event:Event){
    event.preventDefault;
    this.showSpinner= true;
    if(this.isValidSkillSoft){
      this.registerPerson.CrearHabilidadBlanda(this.formSoftCrea.value).subscribe({next:(data)=>{
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
    } else {
      this.showSpinner = false;
      this.notificationToast.showError("La habilidad interpersonal ya existe, ingrese otra distinta.", "");
    }
  }
}
