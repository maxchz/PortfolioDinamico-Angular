import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { RegistroPersonaService } from 'src/app/service/registro-persona.service';



@Component({
  selector: 'app-crea-usuario-dialog',
  templateUrl: './crea-usuario-dialog.component.html',
  styleUrls: ['./crea-usuario-dialog.component.css']
})
export class CreaUsuarioDialogComponent implements OnInit {

  form: FormGroup;

  id_usuario: number = 0;

  showSpinner: boolean = false;


  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private registerPerson: RegistroPersonaService,
              private datosPortafolio: DatosPortfoliosService,
              private toastr: ToastrService) {
    // this.dataUser = dataPortfolio.ObtenerDatosUsuarioPorEmail();
    // console.log('Datos Usuario desde Constructor crea-usuario-dialog: '+JSON.stringify(this.dataUser));
    this.datosPortafolio.ObtenerDatosUsuarioPorEmail().subscribe(data =>{
        //  this.datosUsuarioLogin = data;
         this.id_usuario = data.id;
        //  this.email_usuario = data.email;
         this.form.patchValue({
          correo: data.email,
          usuario_id: data.id

         });
        //  console.log("Los datos del usuario desde el dialog crea usuario son: ");
        //  console.log(JSON.stringify(data));
        //  console.log('Id del usuario desde crea usuario dialog: ');
        //  console.log(this.id_usuario);
        });
        this.form = this.formBuilder.group(
          {
          //Aquí especificamos el grupo de forms control que integran el formGroup, respetando el modelo de datos que espera recibir
          //el backend para crear una nueva persona
          nombre: ['', [Validators.required]],
          apellido: ['',[Validators.required]],
          domicilio:[' ',[Validators.required]],
          fechaNac: [' ', [Validators.required]],
          telefono: [' ', [Validators.required]],
          correo: [null,[Validators.required]],
          sobreMi: [' ',[Validators.required]],
          posicionDev: ['',[Validators.required]],
          imagenPerfil: ['',[Validators.required]],
          usuario_id: [null,[Validators.required]],

          });

  }

  ngOnInit(): void {

  }

  onEnviarNuevoUsuario(event:Event){
    //cancela el evento normal del formulario
    event.preventDefault;
    //suscribimos al método inciar sesión que proporciona el servicio de autenticacionService
    //que recibe las credenciales del usuario que están definidas en el value del form, por que usamos formularios reactivos
    // y estan asociados al modelo
    this.showSpinner= true;

    this.registerPerson.CrearPersona(this.form.value).subscribe(data=>{

      if(data.ok){
        setTimeout(() => {
          this.showSpinner = false;
          // this.showMessage = true;
          this.dialog.closeAll();
          // this.notificacionToast.showSuccess("Se ha guardado con exito.","Hecho");
          // this.dialog.open(MensajePantallaComponent);
        }, 1500);

        this.showSuccess();

      } else {
        this.dialog.closeAll();
        this.showError();
        // this.notificacionToast.showError("No se ha guardado con exito","Error");
      };

      console.log("La respuesta del servidor a la petición de crear una persona desde el crea-usuario-dialog son: "+JSON.stringify(data));

      //redirigimos al usuario a una nueva ruta, que es la del portfolio, usando el servicio de Router
      // this.ruta.navigate(['/portfolio']);
    })


  }

  // set obtenerEmailUser(emailUser: IniciarSesionComponent){
  //   this.email = emailUser.Email;
  // }

  get IdUsuario(){
    return this.id_usuario;
  }

  showSuccess() {
    this.toastr.success('Se ha guardado con exito.', ' ', {
      tapToDismiss: true,
      disableTimeOut: true,
      positionClass: 'toast-bottom-left',
      onActivateTick: true,
    });
  }
  showError() {
    this.toastr.error('Ha ocurrido un error, intenta luego.', ' ', {
      tapToDismiss: true,
      disableTimeOut: true,
      positionClass: 'toast-bottom-left',
      onActivateTick: true,
    });
  }

}
