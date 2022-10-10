import { Injectable } from '@angular/core';
import  { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class ModificaDataPersonaService {
  errorType: number = 0;
  url_modPersona="https://app-portfolio-backend-argpro.herokuapp.com/editar/persona/";
  url_modExperiencia="https://app-portfolio-backend-argpro.herokuapp.com/editar/experiencia/";
  url_modEducacion="https://app-portfolio-backend-argpro.herokuapp.com/editar/educacion/";
  url_modProyecto="https://app-portfolio-backend-argpro.herokuapp.com/editar/proyecto/";
  url_modHabilidadDura="https://app-portfolio-backend-argpro.herokuapp.com/editar/habilidad/";
  url_modHabilidadBlanda="https://app-portfolio-backend-argpro.herokuapp.com/editar/habilidad-blanda/";
  //El objeto observable BehaviorSubject guarda los estados
  currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient,private autenticacionServicio: AutenticacionService) {
    this.currentUserSubject= new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
  }

  ModificarPersona(datosPersona: any): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http
      .put<any>(this.url_modPersona, datosPersona,{'headers': headers, observe: 'response'})
      .pipe(
        catchError((error)=>{
        return this.errorHandler(error);
        })
      );
  }

  ModificarExperiencia(datosExperiencia: any): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http
      .put<any>(this.url_modExperiencia, datosExperiencia,{'headers': headers, observe: 'response'})
      .pipe(
        catchError((error)=>{
        return this.errorHandler(error);
        })
      );
  }

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

  ModificarHabilidadDura(datosHabilidad: any): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http
      .put<any>(this.url_modHabilidadDura, datosHabilidad,{'headers': headers, observe: 'response'})
      .pipe(
        catchError((error)=>{
        return this.errorHandler(error);
        })
      );
  }

  ModificarHabilidadBlanda(datosHabilidad: any): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http
      .put<any>(this.url_modHabilidadBlanda, datosHabilidad,{'headers': headers, observe: 'response'})
      .pipe(
        catchError((error)=>{
        return this.errorHandler(error);
        })
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
