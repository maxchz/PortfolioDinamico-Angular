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
  formContactPortfolio: FormGroup;
  showSpinner: boolean = false;
  selectedName: FormControl = new FormControl();
  selectedMail: FormControl = new FormControl();
  correoElect: string= '';
  isValidEmail: boolean = true;
  isTouched: boolean  = false;


  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private enviarMensaje: EnviarMensajeContactoService,
              private notificationToast: NotificacionToastService) {

                this.formContactPortfolio = this.formBuilder.group(
                  {
                  name: [' ', [Validators.required]],
                  email: [' ', [Validators.required]],
                  subject:[' ', [Validators.required]],
                  body: [' ', [Validators.required]],
                  });


  }

  ngOnInit(): void {
    this.selectedMail.valueChanges.subscribe(data=>{
      this.correoElect = data;
      this.isValidEmail = this.validarEmail(this.correoElect);
    });
  }

  onEnviarNuevoMensajePortfolio(event:Event){
    event.preventDefault;
    this.showSpinner= true;
    this.formContactPortfolio.patchValue({
      name: this.selectedName.value,
      email: this.selectedMail.value,
    });

    this.enviarMensaje.EnviarMensajePorfolio(this.formContactPortfolio.value).subscribe({next:(data)=>{

      if(data.ok){
        this.isValidEmail = true;
        this.isTouched = false;
        setTimeout(() => {
          this.showSpinner = false;
          }, 1500);
          this.notificationToast.showSuccess("Mensaje enviado con exito, aguarde respuesta.", " ");
          this.formContactPortfolio.reset();
          this.selectedName.reset();
          this.selectedMail.reset();
      } else {
        setTimeout(() => {
          this.showSpinner = false;
          }, 1500);
          this.formContactPortfolio.reset();
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

  validarEmail(correo: string): boolean {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(correo)){
      return true;
    } else {
      return false;
    }
  }

  touchedInput(event:any){
    this.isTouched= event.isTrusted;
  }

  get Email(){
    return this.selectedMail.valid;
  }

  get Name(){
    return this.selectedName.valid;
  }

  get Subject(){
    return this.formContactPortfolio.get("subject").valid;
  }

  get Body(){
    return this.formContactPortfolio.get("body").valid;
  }
}
