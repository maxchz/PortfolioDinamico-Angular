import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistroUsuarioService {
  errorType: number = 0;
  url="https://app-portfolio-backend-argpro.herokuapp.com/nuevo/usuario";
  //El objeto observable BehaviorSubject guarda los estados
  currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient){
    this.currentUserSubject= new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
  }

  RegistrarUsuario(datosUsuario: any): Observable<any>{
    const headers = {'content-type' : 'application/json', 'Access-Control-Allow-Origin':'*'}
    return this.http
      .post<any>(this.url, datosUsuario,{'headers': headers, observe: 'response'})
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
