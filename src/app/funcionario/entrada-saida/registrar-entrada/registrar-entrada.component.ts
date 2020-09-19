import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Entrada } from 'src/app/models/entrada.model';

import { Veiculo } from './../../../models/veiculo.model';
import { EntradaService } from './../../../services/entrada.service';
import { VeiculoService } from './../../../services/veiculo.service';
import { SnackbarService } from './../../../shared/snackbar.service';

@Component({
  selector: 'app-registrar-entrada',
  templateUrl: './registrar-entrada.component.html',
  styleUrls: ['./registrar-entrada.component.css']
})
export class RegistrarEntradaComponent implements OnInit {

  veiculos: Veiculo[] = [];
  veiculo: Veiculo = new Veiculo();
  titleSuccess: string = 'Entrada registrada com sucesso.';
  titleError: string = 'Erro ao registrar entrada.';

  constructor(public dialogRef: MatDialogRef<RegistrarEntradaComponent>, private entradaService: EntradaService, private veiculoService: VeiculoService,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.veiculoService.list().subscribe(data => this.veiculos = data);
  }

  registrarEntrada(veiculo: Veiculo) {
    let entrada = new Entrada();
    entrada.veiculo = veiculo;
    this.entradaService.save(entrada).subscribe(
      success => {
        this.snackbarService.success(this.titleSuccess);
        this.dialogRef.close(veiculo);
      }, error => {
        this.snackbarService.error(this.titleError);
        this.dialogRef.close();
      }
    )
  }

  registrarEntrada2(form: NgForm) {
    let veiculoSalvo: any;
    let entrada = new Entrada();
    this.veiculoService.save(form.value).subscribe(data => {
      veiculoSalvo = data
      entrada.veiculo = veiculoSalvo;
      this.entradaService.save(entrada).subscribe(
        success => {
          this.snackbarService.success(this.titleSuccess);
          this.dialogRef.close(veiculoSalvo);
        }, error => {
          this.snackbarService.error(this.titleError);
          this.dialogRef.close();
        }
      )
    });
  }

}
