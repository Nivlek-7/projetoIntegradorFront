import { Estacionamento } from './estacionamento.model';

export class Funcionario {
  id: number;
  nome: string;
  cpf: string;
  endereco: string;
  telefone: string;
  username: string;
  senha: string;
  estacionamento: Estacionamento

  constructor(id?: number, nome?: string, cpf?: string, endereco?: string, telefone?: string, username?: string, senha?: string, estacionamento?: Estacionamento){
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.endereco = endereco;
    this.telefone = telefone;
    this.username = username;
    this.senha = senha;
    this.estacionamento = estacionamento;
  }
}
