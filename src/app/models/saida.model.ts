import { Entrada } from './entrada.model';
import { Funcionario } from './funcionario.model';

export class Saida {

  id: number;
  hora: Date;
  valorPago: number;
  entrada: Entrada;
  funcionario: Funcionario;

  constructor(id?: number, hora?: Date, valorPago?: number, entrada?: Entrada, funcionario?: Funcionario) {
    this.id = id;
    this.hora = hora;
    this.valorPago = valorPago;
    this.entrada = entrada;
    this.funcionario = funcionario;
  }
}
