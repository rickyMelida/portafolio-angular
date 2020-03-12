import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interfaces';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productoFiltrado: Producto[] = [];

  constructor( private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos() {

    //Hacemos que trabaje de forma asincrona
    return new Promise( (resolve, reject)=> {

      //Cargamos la url
      this.http.get('https://angular-html-e1480.firebaseio.com/productos_idx.json')
        .subscribe( (resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          //colocamos resolve() cuando se ejecuta correctamente
          resolve();
        });

    });

  }

  getProducto( id:string ) {
    return this.http.get(`https://angular-html-e1480.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino:string ) {

    if(this.productos.length === 0) {
      //cargar productos
      //con then ejecutamos despues de que se ejecute
      this.cargarProductos().then( ()=>{
        //ejecutar despues de tener los productos
        //aplicar filtro
        this.filtrarProducto(termino);
      });
    }else {
      //aplicar el filtro
      this.filtrarProducto(termino);

    }
  }

  private filtrarProducto( termino: string ) {
    //volvemos a vaciar los productos filtrados para que no se sobreescriban
    this.productoFiltrado = [];
    
    //convertimos todo el termino a minuscula
    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod =>{ 

      //convertimos el titulo a minuscula
      const tituloLower = prod.titulo.toLocaleLowerCase();

      //Si contiene algo del termino
      if(prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productoFiltrado.push(prod);
      }
    });
  }

}
