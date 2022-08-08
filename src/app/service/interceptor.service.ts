import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AutenticacionService } from './autenticacion.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  // public emailUser:String = ' ';

  constructor(private autenticacionServicio: AutenticacionService) { }


  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   throw new Error('Method not implemented.');
  // }

  //Tengo que implementar el método interceptor de la interfaz HttpInterceptor,el cual intercepta el request le agrega el
  //token en el encabezado y deja que continue el curso del código, se envia al backend
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    //Obtenemos el ultimo estado
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

    // this.emailUsuario = JSON.stringify(currentUser).email;
    // var datosUser = currentUser.email;
    // this.emailUser = currentUser.email.toString();
    console.log("Interceptor está corriendo " + JSON.stringify(currentUser));
    // console.log('El email es: ' + this.emailUser);


    //Para que érmita seguir su curso a la API
    return next.handle(req);
  }

  // get EmailUser(){
  //   return this.emailUser;
  // }
}
