import { Injectable } from '@angular/core';
import  { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class ModificaDataPersonaService {
  errorType: number = 0;


  url_modPersona="http://localhost:8080/editar/persona/";

  url_modExperiencia="http://localhost:8080/editar/experiencia/";

  url_modEducacion="http://localhost:8080/editar/educacion/";

  url_modProyecto="http://localhost:8080/editar/proyecto/";


  //El objeto observable BehaviorSubject guarda los estados
  currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient,private autenticacionServicio: AutenticacionService) {

console.log("El servicio para modificar está corriendo");

//Siempre debemos inicializar un observable BehaviorSubject ya que siempre va a devolver el último estado de un objeto
//Los datos almacenados en el storage local lo convertimos a un formato JSON, si no hay nada, obtiene un JSON vacio
this.currentUserSubject= new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));

}

//Método para hacer la llamada a la API, recibe los datos d la persona y los modifica en la BD
ModificarPersona(datosPersona: any): Observable<any>{
  var currentUser=this.autenticacionServicio.UsuarioAutenticado;
  const headers = {'content-type' : 'application/json'}
  // let headers = new HttpHeaders();
  // headers.append('Content-Type', 'application/json');
  // headers.append('Authorization' , `Bearer ${currentUser.accessToken}`)

  // const headers = {'Authorization' : `Bearer ${currentUser.accessToken}`}
  return this.http
     .put<any>(this.url_modPersona, datosPersona,{'headers': headers, observe: 'response'})
     .pipe(
        catchError((error)=>{
          // return error;
        return this.errorHandler(error);
        })
      );


}

//Método para hacer la llamada a la API, recibe los datos de experiencia y los modifica en la BD
ModificarExperiencia(datosExperiencia: any): Observable<any>{
  var currentUser=this.autenticacionServicio.UsuarioAutenticado;
  const headers = {'content-type' : 'application/json'}

  return this.http
     .put<any>(this.url_modExperiencia, datosExperiencia,{'headers': headers, observe: 'response'})
     .pipe(
        catchError((error)=>{
        return this.errorHandler(error);
        })
      );


}

//Método para hacer la llamada a la API, recibe los datos de experiencia y los modifica en la BD
ModificarEducacion(datosEducacion: any): Observable<any>{
  const headers = {'content-type' : 'application/json'}

  return this.http
     .put<any>(this.url_modEducacion, datosEducacion,{'headers': headers, observe: 'response'})
     .pipe(
        catchError((error)=>{
        return this.errorHandler(error);
        })
      );
}

//Método para hacer la llamada a la API, recibe los datos de proyectp y los modifica en la BD
ModificarProyecto(datosProyecto: any): Observable<any>{
  const headers = {'content-type' : 'application/json'}

  return this.http
     .put<any>(this.url_modProyecto, datosProyecto,{'headers': headers, observe: 'response'})
     .pipe(
        catchError((error)=>{
        return this.errorHandler(error);
        })
      );
}

//Método para manejar los errores (falla en la conexion, no autorizado, etc)

errorHandler(error: HttpErrorResponse): Observable<any>{
this.errorType = error.status;
return observableThrowError(error);

}

get ErrType(){
return (this.errorType);
}


}
