import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IRelatorioUsuarioCadastradoResponse } from '../i-relatorio-usuario-cadastrado';
import { RelatorioService } from '../relatorio.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-relatorio-usuario',
  templateUrl: './relatorio-usuario.component.html',
  styleUrls: ['./relatorio-usuario.component.css'],
  providers:[RelatorioService]
})
export class RelatorioUsuarioComponent implements OnInit {
  
  submitted = false;
  usuarios: Array<IRelatorioUsuarioCadastradoResponse>;
  filtroForm : FormGroup;
  repostaAtualizaUsuario: string = "";

  @ViewChild('tblUsuario',{static:false}) tblUsuario!: ElementRef;

  constructor(private relatorioService: RelatorioService,
         private router: Router, fb:FormBuilder) { 
     
    this.usuarios = new Array<IRelatorioUsuarioCadastradoResponse>();

     this.filtroForm = fb.group({
       NomeUsuario: ['',[Validators.required]]
     });
  }

  ngOnInit(): void {
  }

  get nomeUsuario(){
    return this.filtroForm.controls;
  }

  filtrar(){
    
    this.submitted = true;

    if(this.filtroForm.invalid){
      return;
    }

   this.relatorioService.getUsuario(this.filtroForm.value.NomeUsuario)
     .subscribe(value=>{ this.usuarios = value
          if(value.length > 0){
             this.usuarios = value;
         }
         else{
             Swal.fire('Relatório de usuários',"Usuário não encontrado",'info');
         }
     }); 
 
   }

  alterStatus(indice: number,status: string){
      if(status.toUpperCase() === "ATIVO"){
        this.tblUsuario.nativeElement.rows[indice + 1].cells[6].innerText = "Inativo";
      } 
      else{
        this.tblUsuario.nativeElement.rows[indice + 1].cells[6].innerText = "Ativo";
      }
  }
  formatarDate(str: string){

  }
  alterar(indice:number){
     
    const usuario = this.usuarios[ indice ];

    const idUsuario = usuario.usuarioId;
  
    const status = this.tblUsuario.nativeElement.rows[indice + 1].cells[6].innerText;

    this.relatorioService.atualizarStatus(idUsuario)
        .subscribe(value=> {
             Swal.fire({
                 title: 'Alterar Status',
                 text: value,
                 icon: 'success',
                 showCancelButton: false,
                 confirmButtonText: 'Ok',
            }).then((result) => {
               if (result.value) {
                    this.alterStatus(indice,status); 
               } 
          })     
       })
  }

  editar(indice:number){
    
    const usuario = this.usuarios[ indice ];  
    sessionStorage.setItem('UsuarioId',usuario.usuarioId.toString());
    sessionStorage.setItem('Nome',usuario.nome);
    sessionStorage.setItem('DataNascimento',usuario.dataNascimento);
    sessionStorage.setItem('Email',usuario.email);
    sessionStorage.setItem('Senha',usuario.senha)
    sessionStorage.setItem('Status',usuario.status);
    sessionStorage.setItem('Sexo',usuario.sexoId.toString());
    this.router.navigate(['/editar']);
  }

}
