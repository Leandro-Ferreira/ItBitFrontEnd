import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEdicaoUsuarioRequest } from './i-edicao-usuario-request';

@Injectable()
export class EdicaoServiceService {

 

  constructor(private http: HttpClient) { }
  
  editar(usuario:IEdicaoUsuarioRequest): Observable<string>{

   const url: string = "http://localhost:48375/api/usuario/alterarusuario";

    const body = JSON.stringify(
    {
       UsuarioId:usuario.UsuarioId, 
       Nome:usuario.Nome,
       DataNascimento:usuario.DataNascimento,
       Email:usuario.Email,
       Senha:usuario.Senha,
       Status: usuario.Status.Value,
       SexoId:usuario.Sexo.SexoId
    });

      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }

    return this.http.put<string>(url,body,httpOptions);
  }

  excluir(idUsuario:number) : Observable<string>{

    const url: string = "http://localhost:48375/api/usuario/excluirusuario";
    
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
      return this.http.delete<string>(url + "?idUsuario=" + idUsuario,httpOptions);
  }
}
