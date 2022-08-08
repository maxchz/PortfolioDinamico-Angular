import { Injectable } from '@angular/core';
import  { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { catchError } from'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EliminarDatosPortfolioService {

  errorType: number = 0;


  constructor(private http: HttpClient) { }

  //Método para hacer la llamada a la API, elimina dato experiencia
  EliminarExperiencia(idExperiencia: number): Observable<any>{
    return this.http.delete<any>(`http://localhost:8080/borrar-experiencia/${idExperiencia}`,{observe: 'response'})

    .pipe(
      catchError((error)=>{
      return this.errorHandler(error);
      })
    );

  }

  //Método para hacer la llamada a la API, elimina dato educación
  EliminarEducacion(idEducacion: number): Observable<any>{
    return this.http.delete<any>(`http://localhost:8080/borrar-educacion/${idEducacion}`,{observe: 'response'})

    .pipe(
      catchError((error)=>{
      return this.errorHandler(error);
      })
    );

  }

  //Método para hacer la llamada a la API, elimina dato proyecto
  EliminarProyecto(idProyecto: number): Observable<any>{
    return this.http.delete<any>(`http://localhost:8080/borrar-proyecto/${idProyecto}`,{observe: 'response'})

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
