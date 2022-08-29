import { Injectable } from '@angular/core';
import  { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError } from'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EliminarDatosPortfolioService {
  errorType: number = 0;

  constructor(private http: HttpClient) { }

  EliminarExperiencia(idExperiencia: number): Observable<any>{
    return this.http.delete<any>(`http://localhost:8080/borrar-experiencia/${idExperiencia}`,{observe: 'response'})
    .pipe(
      catchError((error)=>{
      return this.errorHandler(error);
      })
    );
  }

  EliminarEducacion(idEducacion: number): Observable<any>{
    return this.http.delete<any>(`http://localhost:8080/borrar-educacion/${idEducacion}`,{observe: 'response'})
    .pipe(
      catchError((error)=>{
      return this.errorHandler(error);
      })
    );
  }

  EliminarProyecto(idProyecto: number): Observable<any>{
    return this.http.delete<any>(`http://localhost:8080/borrar-proyecto/${idProyecto}`,{observe: 'response'})
    .pipe(
      catchError((error)=>{
      return this.errorHandler(error);
      })
    );
  }

  EliminarHabilidadDura(idHabilidadDura: number): Observable<any>{
    return this.http.delete<any>(`http://localhost:8080/borrar-habilidad/${idHabilidadDura}`,{observe: 'response'})
    .pipe(
      catchError((error)=>{
      return this.errorHandler(error);
      })
    );
  }

  EliminarHabilidadBlanda(idHabilidadBlanda: number): Observable<any>{
    return this.http.delete<any>(`http://localhost:8080/borrar-habilidad-blanda/${idHabilidadBlanda}`,{observe: 'response'})
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


