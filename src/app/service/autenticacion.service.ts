import { Injectable } from '@angular/core';
import  { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatosPortfoliosService } from './datos-portfolios.service';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  url="http://localhost:8080/auth/login";

  id_usuario: number = 0;


  //El objeto observable BehaviorSubject guarda los estados
  currentUserSubject: BehaviorSubject<any>;


  constructor(private http: HttpClient) {
    console.log("El servicio de autenticación está corriendo");

    //Siempre debemos inicializar un observable BehaviorSubject ya que siempre va a devolver el último estado de un objeto
    //Los datos almacenados en el storage local lo convertimos a un formato JSON, si no hay nada, obtiene un JSON vacio
    this.currentUserSubject= new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));

  }

  //Método para hacer la llamada a la API, recibe las credenciales del usuario
  IniciarSesion(credenciales: any): Observable<any>{
    return this.http.post(this.url, credenciales).pipe(map(data =>{
      //intercepatamos los datos (data) que recibimos del backend (token) y los manipulamos con esta funcion, usando la propiedad sessionStorage
      //Para almacenar los datos de manera local en el navegador usando la session storage(hasta que se cierre el navegador)
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
      return data;
    }))
  }

  //Propiedad para devolver el valor del BehaviorSubject y asi poder usarlo en el interceptor
   get UsuarioAutenticado (){
    return this.currentUserSubject.value;
   }

   //Método para cerrar sesión desde la página de portfolio, limpia el sesion storage
   CerrarSesion(){
    sessionStorage.clear();
   }

   DatosNuevoUsuario(): Observable<any>{
    return this.http.get<any>(`http://localhost:8080/ver/usuario/${this.UsuarioAutenticado.email}`);
   }



}
