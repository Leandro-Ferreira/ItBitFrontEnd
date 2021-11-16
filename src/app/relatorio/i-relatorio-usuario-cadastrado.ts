export interface IRelatorioUsuarioCadastradoRequest {
    UsuarioId:number;
    Nome:string;
    DataNascimento:string;
    Email:string;
    Senha:string;
    Status:string;
    Sexo:string;
    SexoId:number;
}

export interface IRelatorioUsuarioCadastradoResponse{
    usuarioId:number;
    nome:string;
    dataNascimento:string;
    email:string;
    senha:string;
    status:string;
    sexoId:number;
    sexo:string;
}