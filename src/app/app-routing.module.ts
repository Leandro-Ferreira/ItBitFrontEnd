import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroUsuarioComponent } from './cadastroUsuario/cadastro-usuario/cadastro-usuario.component';
import { EdicaoUsuarioComponent } from './edicaoUsuario/edicao-usuario/edicao-usuario.component';
import { RelatorioUsuarioComponent } from './relatorio/relatorio-usuario/relatorio-usuario.component';

const routes: Routes = [

   {path:'cadastro',component:CadastroUsuarioComponent},
   {path:'relatorio',component:RelatorioUsuarioComponent },
   {path:'editar',component:EdicaoUsuarioComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
