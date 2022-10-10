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
  selectedName: FormControl = new FormControl();
  selectedEmail: FormControl = new FormControl();
  selectedSubject: FormControl = new FormControl();
  selectedBody: FormControl = new FormControl();
  correoElect: string= '';
  isValidEmail: boolean = true;
  isTouched: boolean  = false;
  clickToggle: boolean = false;

  typewriter_text: string = "¡Bienvenido! completá y compartí tu portfolio.";
  typewriter_display: string = "";
  total_length: number = 0;
  current_length: number = 0;

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private enviarMensaje: EnviarMensajeContactoService,
              private notificationToast: NotificacionToastService,
              private router: Router) {
                this.formContact = this.formBuilder.group(
                  {
                  name: [' ', [Validators.required]],
                  email: [' ', [Validators.required]],
                  subject:[' ', [Validators.required]],
                  body: [' ', [Validators.required]],
                  });
              }


  ngOnInit(): void {
    setInterval(()=>{
      this.total_length = this.typewriter_text.length;
      this.current_length = this.typewriter_display.length;
        if (this.current_length < this.total_length) {
          this.typewriter_display += this.typewriter_text[this.current_length];
        } else {
          this.typewriter_display = "";
        }
    }, 230);

    this.selectedEmail.valueChanges.subscribe(data=>{
      this.correoElect = data;
      this.isValidEmail = this.validarEmail(this.correoElect);
    });
  }

  irAInicio(){
    document.getElementById("navbar-home")?.scrollIntoView();
    if(this.clickToggle){
      let el: HTMLElement  = document.getElementById("toggleBar");
      el.click();
    }
  }

  irASobreMi(){
    document.getElementById("about-home")?.scrollIntoView();
    if(this.clickToggle){
      let el: HTMLElement = document.getElementById("toggleBar");
      el.click();
    }
  }

  irAProyecto(){
    document.getElementById("projects-home")?.scrollIntoView();
    if(this.clickToggle){
      let el: HTMLElement = document.getElementById("toggleBar");
      el.click();
    }
  }

  irABlog(){
    document.getElementById("blog-home")?.scrollIntoView();
    if(this.clickToggle){
      let el: HTMLElement = document.getElementById("toggleBar");
      el.click();
    }
  }

  irAContacto(){
    document.getElementById("contact-home")?.scrollIntoView();
    if(this.clickToggle){
      let el: HTMLElement = document.getElementById("toggleBar");
      el.click();
    }
  }

  toggleMenu() {
    const toggle: any = document.querySelector('.toggle');
    const menu: any = document.querySelector('.menu');
    const main = document.querySelector('.secMain');
      if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
        this.clickToggle=false;
      } else {
        menu.classList.add("active");
        toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
        this.clickToggle=true;
      }
  };

  onEnviarNuevoMensajeHome(event:Event){
    event.preventDefault;
    this.showSpinner= true;
      this.formContact.patchValue({
      name: this.selectedName.value,
      email: this.selectedEmail.value,
      subject: this.selectedSubject.value,
      body: this.selectedBody.value
    });

    this.enviarMensaje.EnviarMensajeHome(this.formContact.value).subscribe({next:(data)=>{

      if(data.ok){
        this.isValidEmail = true;
        this.isTouched = false;
        setTimeout(() => {
          this.showSpinner = false;
          }, 1500);
          this.notificationToast.showSuccess("Mensaje enviado con exito, aguarde respuesta.", " ");
          this.selectedName.reset();
          this.selectedEmail.reset();
          this.selectedSubject.reset();
          this.selectedBody.reset();
      } else {
        setTimeout(() => {
          this.showSpinner = false;
          }, 1500);
          this.selectedName.reset();
          this.selectedEmail.reset();
          this.selectedSubject.reset();
          this.selectedBody.reset();
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
    return this.selectedEmail.valid;
  }

  get Name(){
    return this.selectedName.valid;
  }

  get Subject(){
    return this.selectedSubject.valid;
  }

  get Body(){
    return this.selectedBody.valid;
  }

}
