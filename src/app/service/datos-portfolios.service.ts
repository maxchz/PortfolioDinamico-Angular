import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutenticacionService } from 'src/app/service/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class DatosPortfoliosService {

  emailUser: String ='';

  constructor(private http:HttpClient,
              private autenticacionServicio: AutenticacionService ) {
                this.emailUser = this.autenticacionServicio.UsuarioAutenticado.email;
  }

  obtenerDatos(): Observable<any>{
    return this.http.get<any>('https://app-portfolio-backend-argpro.herokuapp.com/ver/persona/90');
  }

  obtenerDatosPersonaPorIdUsuario(id_usuario: number) :Observable <any>{
    return this.http.get<any>(`https://app-portfolio-backend-argpro.herokuapp.com/ver/persona-idUsuario/${id_usuario}`);
  }

  obtenerDatosExperienciaPorIdPersona(id_persona: number): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http.get<any>(`https://app-portfolio-backend-argpro.herokuapp.com/ver/experiencia-usuario/${id_persona}`,{observe: 'response'});
  }

  obtenerDatosEducacionPorIdPersona(id_persona: number): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http.get<any>(`https://app-portfolio-backend-argpro.herokuapp.com/ver/educacion-usuario/${id_persona}`,{observe: 'response'});
  }

  obtenerDatosProyectoPorIdPersona(id_persona: number): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http.get<any>(`https://app-portfolio-backend-argpro.herokuapp.com/ver/proyecto-usuario/${id_persona}`,{observe: 'response'});
  }

  obtenerDatosHabilidadDuraPorIdPersona(id_persona: number): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http.get<any>(`https://app-portfolio-backend-argpro.herokuapp.com/ver/habilidad-usuario/${id_persona}`,{observe: 'response'});
  }

  obtenerDatosHabilidadBlandaPorIdPersona(id_persona: number): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http.get<any>(`https://app-portfolio-backend-argpro.herokuapp.com/ver/habilidad-blanda/${id_persona}`,{observe: 'response'});
  }

  obtenerDatosHabilidadBlandaPorHabBlanda(habBlanda: String): Observable<any>{
    const headers = {'content-type' : 'application/json'}
    return this.http.get<any>(`https://app-portfolio-backend-argpro.herokuapp.com/ver/habilidad-blanda/habBlanda/${habBlanda}`,{observe: 'response'});
  }

  ObtenerDatosUsuarioPorEmail(): Observable<any>{
    return this.http.get<any>(`https://app-portfolio-backend-argpro.herokuapp.com/ver/usuario/${this.emailUser}`);
  }

  existeUsuarioRegistrado(email_registro: String) :Observable <any>{
    const headers = {'Access-Control-Allow-Origin':'*'}
    return this.http.get<any>(`https://app-portfolio-backend-argpro.herokuapp.com/ver/existe-usuario/${email_registro}`, {headers: headers});
  }

}
