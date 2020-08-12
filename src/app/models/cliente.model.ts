import { Dono } from './dono.model';

export class Cliente {

  id: number;
  nome: string;
  telefone: string;
  email: string;
  dono: Dono;

  constructor(id?: number, nome?: string, telefone?: string, email?: string, dono?: Dono) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.dono = dono;
  }
}
