import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CadastroUsuarioService } from '../cadastro-usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css'],
  providers:[CadastroUsuarioService]
})


export class CadastroUsuarioComponent implements OnInit,AfterViewInit {
  
  submitted = false;
 
  cadastroForm;
 
  public mensagemCadastroUsuario: string = "";

  generos:Array<any>;


  constructor(private cadastroUsuarioService: CadastroUsuarioService,
    private frmBuilder:FormBuilder) { 
    
    this.generos = new Array<any>();

    this.generos.push({Value:1,Descricao:"Masculino"});
    this.generos.push({Value:2,Descricao:"Feminino"});

    this.cadastroForm = this.frmBuilder.group(
      {
        Nome:['',[Validators.required,Validators.minLength(3)]],
        DataNascimento:['',[Validators.required]],
        Email:['',[Validators.required, Validators.email]],
        Senha:['',[Validators.required]],
        Sexo:["",[Validators.required]]
      },
    
    );
   
  }
  ngAfterViewInit() {
    
  }
  ngOnInit(): void {
   
  }

  get cadastro(){
      return this.cadastroForm.controls;
  }

  salvar(){
      this.submitted = true;

        if (this.cadastroForm.invalid) {
            return;
        }
     const usuarioRequest = this.cadastroForm.value;
     this.cadastroUsuarioService.salvar(usuarioRequest)
      .subscribe(response=> { 
           
          Swal.fire('Cadastro Usuário',response,'success');
        
      });
  }

 

}
