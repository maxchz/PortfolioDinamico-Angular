import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AutenticacionService } from './autenticacion.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private autenticacionServicio: AutenticacionService) { }

  //Tengo que implementar el método interceptor de la interfaz HttpInterceptor,el cual intercepta el request le agrega el
  //token en el encabezado y deja que continue el curso del código, se envia al backend
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    //Obtenemos el último estado
    var currentUser=this.autenticacionServicio.UsuarioAutenticado;
    //Verifico si el currentUser tiene almacenado el token
    //Si existe el currentUser, clonamos el request para setear en el encabezado el token

    if(currentUser && currentUser.accessToken){
      req=req.clone({
        setHeaders:{
          Authorization: `Bearer ${currentUser.accessToken}`
        }
      })
    };
    // console.log("Interceptor está corriendo " + JSON.stringify(currentUser));
    //Para que permita seguir su curso a la API
    return next.handle(req);
  }
}
