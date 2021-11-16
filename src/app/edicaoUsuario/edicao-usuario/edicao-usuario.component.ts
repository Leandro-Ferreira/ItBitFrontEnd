import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EdicaoServiceService } from '../edicao-service.service';
import { IGenero } from '../i-genero';
import Swal  from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edicao-usuario',
  templateUrl: './edicao-usuario.component.html',
  styleUrls: ['./edicao-usuario.component.css'],
  providers:[EdicaoServiceService]
})

export class EdicaoUsuarioComponent implements OnInit {

  edicaoFormGroup;

  generos:Array<IGenero>;
  
  statusCollection:Array<any>;

  submitted = false;

  @ViewChild('txtIdUsuario') txtIdUsuario!: ElementRef;

  constructor(private formBuilder: FormBuilder,private edicaoService:EdicaoServiceService,private router: Router) {

      this.generos = new Array<IGenero>();

      this.statusCollection = new Array<any>();

      this.statusCollection.push({Value:1,Descricao:'Ativo'});
      this.statusCollection.push({Value:0,Descricao:'Inativo'});

      this.generos.push({SexoId:1,Descricao:'Masculino'});
   
      this.generos.push({SexoId:2,Descricao:'Feminino'});

      
    
       this.edicaoFormGroup = this.formBuilder.group
       ({
            UsuarioId:[sessionStorage.getItem("UsuarioId")],
            Nome: [sessionStorage.getItem('Nome'), [Validators.required,Validators.minLength(3)]],
            DataNascimento: [sessionStorage.getItem('DataNascimento'),[Validators.required]],
            Email: [sessionStorage.getItem('Email'),[Validators.required]],
            Senha: [sessionStorage.getItem('Senha'),[Validators.required]],
            Status:[ this.statusCollection.
            find(x=>x.Descricao === sessionStorage.getItem('Status')),[Validators.required]],
            Sexo: [this.generos.find(x=>x.SexoId.toString() === sessionStorage.getItem('Sexo')),[Validators.required]] 
       });

   }

  ngOnInit(): void {
  
  }
 
  get edicao(){
    return this.edicaoFormGroup.controls;
  }

editar(){

  this.submitted = true;

    if (this.edicaoFormGroup.invalid) {
        return;
    }
  
   const usuarioRequest = this.edicaoFormGroup.value;
   this.edicaoService.editar(usuarioRequest)
        .subscribe(response=> { 
          Swal.fire('Edição usuário',response,'success');
        
    });
 
  }

  confirmarExclusao(mensagem:string){
       Swal.fire({
          title: 'Excluisão de usuário',
          text: mensagem,
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Ok',
       }).then((result) => {
          if (result.value) {
              this.router.navigate(['/']);
          }
       })
  }

  excluir(){
    Swal.fire({
      title: 'Excluir Usuário',
      text: 'Tem certeza que deseja excluir esse usuário?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
  }).then((result) => {
      if (result.value) {
          const idUsuario = this.txtIdUsuario.nativeElement.value;
          this.edicaoService.excluir(idUsuario)
              .subscribe(value=> this.confirmarExclusao(value));
      }
  })

 }

}
