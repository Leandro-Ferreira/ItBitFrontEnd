import { NgModule,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroUsuarioComponent } from './cadastroUsuario/cadastro-usuario/cadastro-usuario.component';
import { EdicaoUsuarioComponent } from './edicaoUsuario/edicao-usuario/edicao-usuario.component';
import { RelatorioUsuarioComponent } from './relatorio/relatorio-usuario/relatorio-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';

registerLocaleData(localePT);

@NgModule({
  declarations: [
    AppComponent,
    CadastroUsuarioComponent,
    EdicaoUsuarioComponent,
    RelatorioUsuarioComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-br' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
