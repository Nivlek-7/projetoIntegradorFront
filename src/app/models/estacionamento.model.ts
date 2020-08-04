import { Dono } from './dono.model';

export class Estacionamento {

  id: number;
  nome: string;
  endereco: string;
  telefone: string;
  valorPorHora: number;
  vagas: number;
  vagasDisponiveis: number;
  dono: Dono;

  constructor(id?: number, nome?: string, endereco?: string, telefone?: string, valorPorHora?: number, vagas?: number, vagasDisponiveis?: number, dono?: Dono) {
    this.id = id;
    this.nome = nome;
    this.endereco = endereco;
    this.telefone = telefone;
    this.valorPorHora = valorPorHora;
    this.vagas = vagas;
    this.vagasDisponiveis = vagasDisponiveis;
    this.dono = dono;
  }
}
