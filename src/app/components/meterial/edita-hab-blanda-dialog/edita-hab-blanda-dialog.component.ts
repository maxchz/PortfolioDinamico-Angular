import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificacionToastService } from 'src/app/service/alertas/notificacion-toast.service';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { ModificaDataPersonaService } from 'src/app/service/modifica-data-persona.service';

@Component({
  selector: 'app-edita-hab-blanda-dialog',
  templateUrl: './edita-hab-blanda-dialog.component.html',
  styleUrls: ['./edita-hab-blanda-dialog.component.css']
})
export class EditaHabBlandaDialogComponent implements OnInit {
  form: FormGroup= new FormGroup({});
  selected: FormControl = new FormControl();
  selectedItem: String="";
  listHabBlanda: any;
  hb:any;
  id_usuario: number = 0;
  id_persona: number = 0;
  id_habilidadBlanda: number = 0;
  showSpinner: boolean = false;
  isValidSkillSoft: boolean = true;
  isValidSkillNumber: boolean = true;
  skillSoft: String = '';
  listSkillSoft: any;

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private modificaPerson: ModificaDataPersonaService,
              private datosPortafolio: DatosPortfoliosService,
              private notificationToast: NotificacionToastService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.showSpinner = true;
                this.listSkillSoft = data;
                this.datosPortafolio.ObtenerDatosUsuarioPorEmail().subscribe(data =>{
                  this.id_usuario = data.id;
                  this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(this.id_usuario).subscribe(data =>{
                    this.id_persona = data.id;
                    this.datosPortafolio.obtenerDatosHabilidadBlandaPorIdPersona(this.id_persona).subscribe({next: (data) =>{
                      this.listHabBlanda = data.body;
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
                  hab_blanda: ['', [Validators.required]],
                  persona_id: [' ',[Validators.required]],
                });
  }

  ngOnInit(): void {
    if(this.listSkillSoft.length > 0 && this.listSkillSoft !=null){
      this.form.valueChanges.subscribe(data=>{
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

  onEnviarEditaHabilidadBlanda(event:Event){
    event.preventDefault;
    this.showSpinner= true;
    this.selectedItem = this.selected.value;

    this.hb = this.listHabBlanda.filter(habilidad=>{
      return habilidad.hab_blanda == this.selectedItem;
    });

    this.form.patchValue({
        id: this.hb[0].id,
        persona_id: this.hb[0].persona_id
        });

    if(this.isValidSkillSoft){
      this.modificaPerson.ModificarHabilidadBlanda(this.form.value).subscribe({next: (data)=>{
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
              this.notificationToast.showError("Ha ocurrido un error, intenta luego.", " ")}
            }
      })
    }else {
      this.showSpinner = false;
      this.notificationToast.showError("La habilidad interpersonal ya existe, ingrese otra distinta.", "");
    }

  }



}
