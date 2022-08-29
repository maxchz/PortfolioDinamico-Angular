import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroPersonaService {
  errorType: number = 0;
  url_creaPersona="http://localhost:8080/nueva/persona";
  url_creaExperiencia="http://localhost:8080/nueva/experiencia";
  url_creaEducacion="http://localhost:8080/nueva/educacion";
  url_creaProyecto="http://localhost:8080/nuevo/proyecto";
  url_creaHabilidadDura="http://localhost:8080/nueva/habilidad";
  url_creaHabilidadBlanda="http://localhost:8080/nueva/habilidad-blanda";
  //El objeto observable BehaviorSubject guarda los estados
  currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject= new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
   }

  CrearPersona(datosUsuario: any): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http
               .post<any>(this.url_creaPersona, datosUsuario,{'headers': headers, observe: 'response'})
               .pipe(
                  catchError((error)=>{
                    return this.errorHandler(error);
                  })
                );
  }

  CrearExperiencia(datosExperiencia: any): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http
      .post<any>(this.url_creaExperiencia, datosExperiencia,{'headers': headers, observe: 'response'})
      .pipe(catchError((error)=>{
        return this.errorHandler(error)})
      );
  }

  CrearEducacion(datosEducacion: any): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http
      .post<any>(this.url_creaEducacion, datosEducacion,{'headers': headers, observe: 'response'})
      .pipe(catchError((error)=>{
        return this.errorHandler(error)})
      );
  }

  CrearProyecto(datosProyecto: any): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http
      .post<any>(this.url_creaProyecto, datosProyecto, {'headers': headers, observe: 'response'})
      .pipe(catchError((error)=>{
        return this.errorHandler(error)})
      );
  }

  CrearHabilidadDura(datosHabilidadDura: any): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http
      .post<any>(this.url_creaHabilidadDura, datosHabilidadDura, {'headers': headers, observe: 'response'})
      .pipe(catchError((error)=>{
        return this.errorHandler(error)})
      );
  }

  CrearHabilidadBlanda(datosHabilidadBlanda: any): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http
      .post<any>(this.url_creaHabilidadBlanda, datosHabilidadBlanda, {'headers': headers, observe: 'response'})
      .pipe(catchError((error)=>{
        return this.errorHandler(error)})
      );
  }

  errorHandler(error: HttpErrorResponse): Observable<any>{
    this.errorType = error.status;
    return observableThrowError(error);

  }

  get ErrType(){
    return (this.errorType);
  }
}
