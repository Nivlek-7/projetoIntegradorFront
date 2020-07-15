export class RetornoLogin{
  id: number;
  nome: string;
  token: string;
  tipoUser: string;

  constructor(id?: number, nome?: string, token?: string, tipoUser?: string){
    this.id = id;
    this.nome = nome;
    this.token = token;
    this.tipoUser = tipoUser;
  }
}
