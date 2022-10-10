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
    return this.http.delete<any>(`https://app-portfolio-backend-argpro.herokuapp.com/borrar-experiencia/${idExperiencia}`,{observe: 'response'})
    .pipe(
      catchError((error)=>{
      return this.errorHandler(error);
      })
    );
  }

  EliminarEducacion(idEducacion: number): Observable<any>{
    return this.http.delete<any>(`https://app-portfolio-backend-argpro.herokuapp.com/borrar-educacion/${idEducacion}`,{observe: 'response'})
    .pipe(
      catchError((error)=>{
      return this.errorHandler(error);
      })
    );
  }

  EliminarProyecto(idProyecto: number): Observable<any>{
    return this.http.delete<any>(`https://app-portfolio-backend-argpro.herokuapp.com/borrar-proyecto/${idProyecto}`,{observe: 'response'})
    .pipe(
      catchError((error)=>{
      return this.errorHandler(error);
      })
    );
  }

  EliminarHabilidadDura(idHabilidadDura: number): Observable<any>{
    return this.http.delete<any>(`https://app-portfolio-backend-argpro.herokuapp.com/borrar-habilidad/${idHabilidadDura}`,{observe: 'response'})
    .pipe(
      catchError((error)=>{
      return this.errorHandler(error);
      })
    );
  }

  EliminarHabilidadBlanda(idHabilidadBlanda: number): Observable<any>{
    return this.http.delete<any>(`https://app-portfolio-backend-argpro.herokuapp.com/borrar-habilidad-blanda/${idHabilidadBlanda}`,{observe: 'response'})
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


