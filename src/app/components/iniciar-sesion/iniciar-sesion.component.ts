import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/service/autenticacion.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  //La variable form se enlaza con el formulario en el template html
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private autenticacionService: AutenticacionService, private ruta: Router) {
    this.form = this.formBuilder.group(
      {
        //Aquí especificamos el grupo de forms control que integran el formGroup, respetando el modelo de datos que espera recibir
        //el backend para generar el JWT y autenticar al usuario
        email: ['', [Validators.required, Validators.email]],
        password: ['',[Validators.required, Validators.minLength(5)]],

      }
    )
  }

  ngOnInit(): void {
  }

  //Propiedad para acceder al valor del email
  get Email(){
    return this.form.get('email');
  }

  //Propiedad para acceder al valor de la Contraseña
  get Password(){
    return this.form.get('password');
  }

  get EmailUser(){
    return this.form.value('email');
  }

  //Método para enviar los datos a la API y obtener el token
  onEnviar(event:Event){
    //cancela el evento normal del formulario
    event.preventDefault;
    //suscribimos al método inciar sesión que proporciona el servicio de autenticacionService
    //que recibe las credenciales del usuario que están definidas en el value del form, por que usamos formularios reactivos
    // y estan asociados al modelo
    this.autenticacionService.IniciarSesion(this.form.value).subscribe(data=>{
      //imprimimos los datos en consola, deberia ser el token que envia el backend
      console.log("Los datos del usuario son: "+JSON.stringify(data));

      //redirigimos al usuario a una nueva ruta, que es la del portfolio, usando el servicio de Router
      this.ruta.navigate(['/portfolio']);
    })
  }




}
