import { Injectable } from '@angular/core';
import { ICadastroUsuario } from './i-cadastro-usuario';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CadastroUsuarioService {
  private url: string = "http://localhost:48375/api/usuario/cadastrousuario";

  constructor(private http: HttpClient) { }
  
  salvar(usuario:ICadastroUsuario): Observable<any>{

    const body = JSON.stringify({Nome:usuario.Nome,DataNascimento:usuario.DataNascimento,
      Email:usuario.Email,Senha:usuario.Senha,SexoId:usuario.Sexo.Value});

      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }

    return this.http.post<any>(this.url,body,httpOptions);

  }

}
