import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor (private autenticacionServicio: AutenticacionService, private rutas: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //Si existe el usuario retorna un true, sino false
      let currentUser= this.autenticacionServicio.UsuarioAutenticado;
      if (currentUser && currentUser.accessToken){
        return true;
      }else{
      //si no existe lo redireccionamos al formulario de iniciar sesión o página de home
         this.rutas.navigate(['/home']);
        return false;
      }
  }

}
