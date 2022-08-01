import { Injectable } from '@angular/core';
import  { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';
import { DatosPortfoliosService } from './datos-portfolios.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroUsuarioService {

  errorType: number = 0;
  // emailUser: String ='';


  url="http://localhost:8080/nuevo/usuario";

  //El objeto observable BehaviorSubject guarda los estados
  currentUserSubject: BehaviorSubject<any>;


  constructor(private http: HttpClient,
              /*private autenticacionServicio: AutenticacionService,
              private datosPortafolio: DatosPortfoliosService*/) {

    console.log("El servicio de registro está corriendo");

    // this.emailUser = this.autenticacionServicio.UsuarioAutenticado.email;
    // console.log("Email del usuario desde el servicio registro usuario es:");
    // console.log(this.emailUser);

    //Siempre debemos inicializar un observable BehaviorSubject ya que siempre va a devolver el último estado de un objeto
    //Los datos almacenados en el storage local lo convertimos a un formato JSON, si no hay nada, obtiene un JSON vacio
    this.currentUserSubject= new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));

  }

  //Método para hacer la llamada a la API, recibe los datos del usuario
  RegistrarUsuario(datosUsuario: any): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http
               .post<any>(this.url, datosUsuario,{'headers': headers, observe: 'response'})
               .pipe(
                  catchError((error)=>{
                    // return error;
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

  //Obtengo los datos del usuario por su email de registro





}
