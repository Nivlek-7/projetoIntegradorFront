import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Saida } from './../../../models/saida.model';
import { SaidaService } from './../../../services/saida.service';

@Component({
  selector: 'app-marcar-saida',
  templateUrl: './marcar-saida.component.html',
  styleUrls: ['./marcar-saida.component.css']
})
export class MarcarSaidaComponent implements OnInit {

  saida: Saida = new Saida();
  saidaSalva: any;

  constructor(public dialogRef: MatDialogRef<MarcarSaidaComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private saidaService: SaidaService) { }

  ngOnInit(): void {
    this.saida.entrada = this.data.entrada;
    this.saidaService.save(this.saida).subscribe(data => this.saidaSalva = data);
  }

}
