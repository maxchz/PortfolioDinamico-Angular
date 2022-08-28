import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificacionToastService } from 'src/app/service/alertas/notificacion-toast.service';
import { EnviarMensajeContactoService } from 'src/app/service/enviar-mensaje-contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  formContact: FormGroup;
  showSpinner: boolean = false;
  selectedName: FormControl = new FormControl();
  selectedMail: FormControl = new FormControl();


  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private enviarMensaje: EnviarMensajeContactoService,
              private notificationToast: NotificacionToastService) {

                this.formContact = this.formBuilder.group(
                  {
                  name: [' ', [Validators.required]],
                  mail: [' ', [Validators.required]],
                  subject:[' ', [Validators.required]],
                  body: [' ', [Validators.required]],
                  });
  }

  ngOnInit(): void {
  }

  onEnviarNuevoMensajePortfolio(event:Event){
    event.preventDefault;
    this.showSpinner= true;
    this.formContact.patchValue({
      name: this.selectedName.value,
      mail: this.selectedMail.value,
    });

    this.enviarMensaje.EnviarMensajePorfolio(this.formContact.value).subscribe({next:(data)=>{

      if(data.ok){
        setTimeout(() => {
          this.showSpinner = false;
          }, 1500);
          this.notificationToast.showSuccess("Mensaje enviado con exito, aguarde respuesta.", " ");
          this.formContact.reset();
          this.selectedName.reset();
          this.selectedMail.reset();
      } else {
        setTimeout(() => {
          this.showSpinner = false;
          }, 1500);
          this.formContact.reset();
          this.selectedName.reset();
          this.selectedMail.reset();
          this.notificationToast.showError("Mensaje no enviado, intente luego.", " ");
      }}, error: (e)=>{
            if(e.ok !=true){
              this.showSpinner = false;
              this.notificationToast.showError("Ha ocurrido un error, intenta luego.", " ");
            }
          }
    });
  }
}
