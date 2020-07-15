export class Dono{
  id: number;
  nome: string;
  endereco: string;
  telefone: string;
  username: string;
  senha: string;

  constructor(id?: number, nome?: string, endereco?: string, telefone?: string, username?: string, senha?: string){
    this.id = id;
    this.nome = nome;
    this.endereco = endereco;
    this.telefone = telefone;
    this.username = username;
    this.senha = senha;
  }
}
