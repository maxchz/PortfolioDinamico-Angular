import { Injectable } from '@angular/core';
import  { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroPersonaService {

  errorType: number = 0;

  url="http://localhost:8080/nueva/persona";

  //El objeto observable BehaviorSubject guarda los estados
  currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    console.log("El servicio de registro persona está corriendo");
    this.currentUserSubject= new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));


   }

   //Método para hacer la llamada a la API, crea una nueva persona
  CrearPersona(datosUsuario: any): Observable<any>{
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
}
