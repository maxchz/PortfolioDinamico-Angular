import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroUsuarioService } from 'src/app/service/registro-usuario.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  //La variable form se enlaza con el formulario en el template html
  form: FormGroup;

  //Variable para manejar errores
  errorMessage: String = "";
  errType: number = 0;

  statusResponse: boolean=false;


  constructor( private formBuilder: FormBuilder, private registroUserService: RegistroUsuarioService, private ruta: Router) {

    this.form = this.formBuilder.group(
      {
        //Aquí especificamos el grupo de forms control que integran el formGroup, respetando el modelo de datos que espera recibir
        //el backend para generar el usuario en la BBDD
        // nombre: ['',[Validators.required]],
        // apellido: ['',[Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['',[Validators.required, Validators.minLength(5)]],

      }
    )
  }

  ngOnInit(): void {
  }

  //Propiedad para acceder al valor del nombre, apellido, email y password
  get Nombre(){
    return this.form.get('nombre');
  }
  get Apellido(){
    return this.form.get('apellido');
  }
  get Email(){
    return this.form.get('email');
  }
  get Password(){
    return this.form.get('password');
  }

  //Método para enviar los datos a la API de la controladora
  onEnviarRegistro(event:Event){
    //cancela el evento normal del formulario
    event.preventDefault;
    //suscribimos al método registrar que proporciona el servicio de registrarService
    //que recibe los datos del usuario que están definidas en el value del form, por que usamos formularios reactivos
    // y estan asociados al modelo creados en el backend

    this.registroUserService.RegistrarUsuario(this.form.value).subscribe(
      (res: Response)=>{
        this.statusResponse = res.ok;
        if(this.statusResponse){
          this.form.reset();
        }

        console.log(res);
      },


      (error)=>{

        this.errType = this.registroUserService.ErrType;

        console.log(error);


          // Si backend responde un ok, mostrat tooltip de registro exitoso

          //redirigimos al usuario a una nueva ruta, que es la de iniciar sesión, usando el servicio de Router
          // this.ruta.navigate(['/iniciar-sesion']);



      }

    )




  }


}

