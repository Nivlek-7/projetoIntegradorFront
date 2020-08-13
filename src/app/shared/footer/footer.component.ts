import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setInterval(this.obterHoraAtual, 1000)
  }

  obterHoraAtual() {
    let data = new Date();
    let hora = data.getHours().toString();
    let minutos = data.getMinutes().toString();
    let segundos = data.getSeconds().toString();
    minutos = Number.parseInt(minutos) < 10 ? '0' + minutos : minutos  //this.adicionaZero(minutos);
    segundos = Number.parseInt(segundos) < 10 ? '0' + segundos : segundos  //this.adicionaZero(segundos);
    return `${hora}:${minutos}:${segundos} | ${data.toLocaleDateString()}`
  }

  getYear() {
    return new Date().getFullYear();
  }

  adicionaZero(minutoOuSegundo: string) {
    if (Number.parseInt(minutoOuSegundo) < 10){
      minutoOuSegundo = '0' + minutoOuSegundo;
    }
    return minutoOuSegundo;
  }

}
