import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  IRelatorioUsuarioCadastradoRequest, IRelatorioUsuarioCadastradoResponse } from './i-relatorio-usuario-cadastrado';

@Injectable()
export class RelatorioService {

  private nomeParam = new HttpParams();

  constructor(private httpCliente: HttpClient) { }

  getUsuario(nome:string): Observable<IRelatorioUsuarioCadastradoResponse[]> {
    
    const url: string = "http://localhost:48375/api/usuario/obterusuariopornome";

    this.nomeParam.set("nomeUsuario",nome);
    
    return this.httpCliente.get<IRelatorioUsuarioCadastradoResponse[]>(url + "?nomeUsuario=" + nome);
  }

  atualizarStatus(idUsuario:number): Observable<string>{
 
    const url: string = "http://localhost:48375/api/usuario/alterarstatusuario";

    const body = JSON.stringify({idUsuario:idUsuario});

      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
    
      return this.httpCliente.put<any>(url,idUsuario,httpOptions);
 
  }

  getTodosUsuarios():Observable<IRelatorioUsuarioCadastradoResponse[]>  {
    const url: string = "http://localhost:48375/api/usuario/listartodosusuarios";

    return this.httpCliente.get<IRelatorioUsuarioCadastradoResponse[]>(url);

  }

}
