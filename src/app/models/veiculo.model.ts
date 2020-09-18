import { Cliente } from './cliente.model';

export class Veiculo {

  id: number;
  placa: string;
  modelo: string;
  cor: string;
  cliente: Cliente;

  constructor(id?: number, placa?: string, modelo?: string, cor?: string, cliente?: Cliente) {
    this.id = id;
    this.placa = placa;
    this.modelo = modelo;
    this.cor = cor;
    this.cliente = cliente;
  }
}
