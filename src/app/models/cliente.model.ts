import { Dono } from './dono.model';
import { Veiculo } from './veiculo.model';

export class Cliente {

  id: number;
  nome: string;
  telefone: string;
  email: string;
  dono: Dono;
  veiculos: Veiculo[];

  constructor(id?: number, nome?: string, telefone?: string, email?: string, dono?: Dono, veiculos?: Veiculo[]) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.dono = dono;
    this.veiculos = veiculos;
  }
}
