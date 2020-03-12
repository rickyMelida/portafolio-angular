import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Interfases
import { InfoPagina } from '../interfaces/info-pagina.interfaces';
import { Equipo } from '../interfaces/equipo';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  equipo: Equipo = {};

  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    //Leer el archivo json, hacemos la peticion al archivo y extraemos el resultado
    this.http.get('assets/data/data-pagina.json')
      .subscribe((resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
      });
  }

  private cargarEquipo() {
    this.http.get('https://angular-html-e1480.firebaseio.com/equipo.json')
      .subscribe( resp => {
        this.equipo = resp;
      });
  }
}
