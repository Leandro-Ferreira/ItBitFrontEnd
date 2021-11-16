export interface IEdicaoUsuarioRequest {
    UsuarioId:number;
    Nome:string;
    DataNascimento:string;
    Email:string;
    Senha:string;
    Status:IStatus;
    Sexo:ISexo;
    SexoId:number;
}

export interface IStatus{
    Value: number;
    Descricao: number;
}

export interface ISexo{
    SexoId: number;
    Descricao: number;
}