import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificacionToastService } from 'src/app/service/alertas/notificacion-toast.service';
import { EnviarMensajeContactoService } from 'src/app/service/enviar-mensaje-contacto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formContact: FormGroup;
  showSpinner: boolean = false;
  // selectedName: String = '';
  // selectedEmail: String = '';
  selectedName: FormControl = new FormControl();
  selectedMail: FormControl = new FormControl();
  selectedSubject: FormControl = new FormControl();
  selectedBody: FormControl = new FormControl();

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private enviarMensaje: EnviarMensajeContactoService,
              private notificationToast: NotificacionToastService,
              private router: Router) {
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

  irAInicio(){
    document.getElementById("navbar-home")?.scrollIntoView();
  }

  irASobreMi(){
    document.getElementById("about-home")?.scrollIntoView();
  }

  irAProyecto(){
    document.getElementById("projects-home")?.scrollIntoView();
  }

  irABlog(){
    document.getElementById("blog-home")?.scrollIntoView();
  }

  irAContacto(){
    document.getElementById("contact-home")?.scrollIntoView();
  }

  toggleMenu() {
    const toggle: any = document.querySelector('.toggle');
    const menu: any = document.querySelector('.menu');
    const main = document.querySelector('.secMain');
      if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
      } else {
        menu.classList.add("active");
        toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
      }
  };

  onEnviarNuevoMensajeHome(event:Event){

    event.preventDefault;
    this.showSpinner= true;
    // this.selectedName = this.selectedname.value;
    // this.selectedEmail = this.selectedemail.value;
    this.formContact.patchValue({
      name: this.selectedName.value,
      mail: this.selectedMail.value,
      subject: this.selectedSubject.value,
      body: this.selectedBody.value
    });
console.log("DAtos del formulario contacto home: "+ JSON.stringify(this.formContact.value))
    // this.enviarMensaje.EnviarMensajePorfolio(this.formContact.value).subscribe({next:(data)=>{

    //   if(data.ok){
    //     setTimeout(() => {
    //       this.showSpinner = false;
    //       }, 1500);
    //       this.notificationToast.showSuccess("Mensaje enviado con exito, aguarde respuesta.", " ");
    //       this.formContact.reset();
    //       this.selectedname.reset();
    //       this.selectedemail.reset();
    //   } else {
    //     setTimeout(() => {
    //       this.showSpinner = false;
    //       }, 1500);
    //       this.formContact.reset();
    //       this.selectedname.reset();
    //       this.selectedemail.reset();
    //       this.notificationToast.showError("Mensaje no enviado, intente luego.", " ");
    //   }}, error: (e)=>{
    //         if(e.ok !=true){
    //           this.showSpinner = false;
    //           this.notificationToast.showError("Ha ocurrido un error, intenta luego.", " ");
    //         }
    //       }
    // });
  }

}
