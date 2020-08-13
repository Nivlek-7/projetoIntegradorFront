import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  nome = sessionStorage.getItem('nome');

  constructor() { }

  ngOnInit(): void {
  }

}
