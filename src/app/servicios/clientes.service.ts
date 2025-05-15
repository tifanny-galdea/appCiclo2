import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(
    private servG:GeneralService,
    private http: HttpClient
  ) {}

  getClientes(){
    let url = this.servG.URLSERV +'clientes' // http://localhost:3001/api/clientes
    //console.log(url);
    return this.http.get<any>(url)
  }

  getClienteXid(id:number){
    let url = this.servG.URLSERV+'clientes/'+id;
    return this.http.get<any>(url)
  }

}
