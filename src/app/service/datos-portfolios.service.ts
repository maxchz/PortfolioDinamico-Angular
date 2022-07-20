import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosPortfoliosService {

  //creamos una variable con la url de la api, que devuelve los datos que seran inmpresos en el front
 // url: string =" url de la api";


  constructor(private http:HttpClient) { }



 //Metodo para obtener todos los datos de personas
  obtenerDatos(): Observable<any>{
    //return this.http.get<any>(this.url+"persona");

    return this.http.get<any>('http://localhost:8080/ver/persona/6');
    //return this.http.get('./../../assets/data/data.json');

    console.log('El servicio Portafolio está corriendo');
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

}
