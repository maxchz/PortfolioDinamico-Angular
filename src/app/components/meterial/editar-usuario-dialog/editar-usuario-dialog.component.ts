import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DatosPortfoliosService } from 'src/app/service/datos-portfolios.service';
import { ModificaDataPersonaService } from 'src/app/service/modifica-data-persona.service';


@Component({
  selector: 'app-editar-usuario-dialog',
  templateUrl: './editar-usuario-dialog.component.html',
  styleUrls: ['./editar-usuario-dialog.component.css']
})
export class EditarUsuarioDialogComponent implements OnInit {

  form: FormGroup;

  id_usuario: number = 0;

  showSpinner: boolean = false;

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private modificaPerson: ModificaDataPersonaService,
              private datosPortafolio: DatosPortfoliosService,
              private toastr: ToastrService) {

    this.datosPortafolio.ObtenerDatosUsuarioPorEmail().subscribe(data =>{

         this.datosPortafolio.obtenerDatosPersonaPorIdUsuario(data.id).subscribe(data =>{
          console.log("Datos de la persona "+ JSON.stringify(data));
              this.form.patchValue({
                id: data.id,
                nombre: data.nombre,
                apellido: data.apellido,
                domicilio: data.domicilio,
                fechaNac: data.fechaNac,
                telefono: data.telefono,
                correo: data.correo,
                sobreMi: data.sobreMi,
                posicionDev: data.posicionDev,
                imagenPerfil: data.imagenPerfil,
                usuario_id: data.usuario_id

             });

        });
    });

    this.form = this.formBuilder.group(
          {
          //Aquí especificamos el grupo de forms control que integran el formGroup, respetando el modelo de datos que espera recibir
          //el backend para crear una nueva persona
          id: [null, [Validators.required]],
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

  onEnviarEditarUsuario(event:Event){
    //cancela el evento normal del formulario
    event.preventDefault;
    //suscribimos al método inciar sesión que proporciona el servicio de autenticacionService
    //que recibe las credenciales del usuario que están definidas en el value del form, por que usamos formularios reactivos
    // y estan asociados al modelo

    this.showSpinner= true;

    console.log('Datos Usuario desde onEnviarEditarUsuario() en el edita-usuario-dialog: '+JSON.stringify(this.form.value));

    this.modificaPerson.ModificarPersona(this.form.value).subscribe(data=>{


      console.log("La respuesta del servidor a la petición de modifica una persona desde el crea-usuario-dialog son: "+JSON.stringify(data));



      if(data.ok){
        setTimeout(() => {
          this.showSpinner = false;
          this.dialog.closeAll();

        }, 1500);

        this.showSuccess();

      } else {
        this.dialog.closeAll();
        this.showError();
      };

    })


  }

  get IdUsuario(){
    return this.id_usuario;
  }

  showSuccess() {
    this.toastr.success('Se actualizo con exito.', ' ', {
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
