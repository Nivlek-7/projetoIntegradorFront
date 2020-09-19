import { Funcionario } from './funcionario.model';
import { Estacionamento } from './estacionamento.model';
import { Veiculo } from './veiculo.model';

export class Entrada {

  id: number;
  hora: Date;
  funcionario: Funcionario;
  estacionamento: Estacionamento;
  veiculo: Veiculo;

  constructor(id?: number, hora?: Date, funcionario?: Funcionario, estacionamento?: Estacionamento, veiculo?: Veiculo) {
    this.id = id;
    this.hora = hora;
    this.funcionario = funcionario;
    this.estacionamento = estacionamento;
    this.veiculo = veiculo;
  }
}
