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
  // id_usuario: number = 0;


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
  obtenerDatosPersonaPorIdUsuario(id_usuario: number) :Observable <any>{
    return this.http.get<any>(`http://localhost:8080/ver/persona-idUsuario/${id_usuario}`);
  }


  obtenerDatosExperienciaPorIdPersona(id_persona: number): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http.get<any>(`http://localhost:8080/ver/experiencia-usuario/${id_persona}`,{observe: 'response'});
  }

  obtenerDatosEducacionPorIdPersona(id_persona: number): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http.get<any>(`http://localhost:8080/ver/educacion-usuario/${id_persona}`,{observe: 'response'});
  }

  obtenerDatosProyectoPorIdPersona(id_persona: number): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http.get<any>(`http://localhost:8080/ver/proyecto-usuario/${id_persona}`,{observe: 'response'});
  }

  obtenerDatosHabilidadDuraPorIdPersona(id_persona: number): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http.get<any>(`http://localhost:8080/ver/habilidad-usuario/${id_persona}`,{observe: 'response'});
  }

  obtenerDatosHabilidadBlandaPorIdPersona(id_persona: number): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http.get<any>(`http://localhost:8080/ver/habilidad-blanda/${id_persona}`,{observe: 'response'});
  }

  obtenerDatosHabilidadBlandaPorHabBlanda(habBlanda: String): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http.get<any>(`http://localhost:8080/ver/habilidad-blanda/habBlanda/${habBlanda}`,{observe: 'response'});
  }


  // obtenerDatosEducacion(): Observable<any>{
  //   return this.http.get<any>('http://localhost:8080/ver/educacion-usuario/6');
  // }

  // obtenerDatosProyecto(): Observable<any>{
  //   return this.http.get<any>('http://localhost:8080/ver/proyecto-usuario/6');
  // }

  // obtenerDatosHabilidadTech(): Observable<any>{
  //   return this.http.get<any>('http://localhost:8080/ver/habilidad-usuario/6');
  // }

  // obtenerDatosHabilidadBlanda(): Observable<any>{
  //   return this.http.get<any>('http://localhost:8080/ver/habilidad-blanda/6');
  // }




  ObtenerDatosUsuarioPorEmail(): Observable<any>{
    // console.log('El email usuario desde datos-portfolios service es:');
    // console.log(email);
    return this.http.get<any>(`http://localhost:8080/ver/usuario/${this.emailUser}`);

  }

   existeUsuarioRegistrado(email_registro: String) :Observable <any>{
    return this.http.get<any>(`http://localhost:8080/ver/existe-usuario/${email_registro}`);
  }





}
