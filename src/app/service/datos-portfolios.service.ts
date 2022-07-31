import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterceptorService } from './interceptor.service';
import { AutenticacionService } from 'src/app/service/autenticacion.service';


@Injectable({
  providedIn: 'root'
})
export class DatosPortfoliosService {

  //creamos una variable con la url de la api, que devuelve los datos que seran inmpresos en el front

  emailUser: String ='';


  constructor(private http:HttpClient, private autenticacionServicio: AutenticacionService ) {
    this.emailUser = this.autenticacionServicio.UsuarioAutenticado.email;
    console.log("Email del usuario desde el servicio datos portfolio es:");
    console.log(this.emailUser);

  }



 //Metodo para obtener todos los datos de personas
  obtenerDatos(): Observable<any>{
    //return this.http.get<any>(this.url+"persona");

    return this.http.get<any>('http://localhost:8080/ver/persona/90');
    //return this.http.get('./../../assets/data/data.json');

    // console.log('El servicio Portafolio está corriendo');
  }

  //Método para obtener datos de experiencia según id de usuario
  obtenerDatosExperiencia(): Observable<any>{
    return this.http.get<any>('http://localhost:8080/ver/experiencia-usuario/6');
  }

  //Método para obtener datos de educación según id de usuario
  obtenerDatosEducacion(): Observable<any>{
    return this.http.get<any>('http://localhost:8080/ver/educacion-usuario/6');
  }

  //Método para obtener datos de proyecto según id de usuario
  obtenerDatosProyecto(): Observable<any>{
    return this.http.get<any>('http://localhost:8080/ver/proyecto-usuario/6');
  }

  //Método para obtener datos de habilidad según id de usuario
  obtenerDatosHabilidadTech(): Observable<any>{
    return this.http.get<any>('http://localhost:8080/ver/habilidad-usuario/6');
  }

  //Método para obtener datos de habilidad según id de usuario
  obtenerDatosHabilidadBlanda(): Observable<any>{
    return this.http.get<any>('http://localhost:8080/ver/habilidad-blanda/6');
  }

  ObtenerDatosUsuarioPorEmail(): Observable<any>{
    // console.log('El email usuario desde datos-portfolios service es:');
    // console.log(email);
    return this.http.get<any>(`http://localhost:8080/ver/usuario/${this.emailUser}`);

  }

}
