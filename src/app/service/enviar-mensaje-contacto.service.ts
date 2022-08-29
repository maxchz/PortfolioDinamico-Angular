import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnviarMensajeContactoService {
  url_msjPortfolio="http://localhost:8080/enviar-mensaje-desde-portfolio";
  errorType: number = 0;

  constructor(private http: HttpClient) {
   }

  EnviarMensajePorfolio(datosMensaje: any): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http
               .post<any>(this.url_msjPortfolio, datosMensaje,{'headers': headers, observe: 'response'})
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

function observableThrowError(error: HttpErrorResponse): Observable<any> {
  throw new Error('Function not implemented.');
}

