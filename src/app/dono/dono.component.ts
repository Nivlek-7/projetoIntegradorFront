import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dono',
  templateUrl: './dono.component.html',
  styleUrls: ['./dono.component.css']
})
export class DonoComponent implements OnInit {

  nome = sessionStorage.getItem('nome');

  constructor() { }

  ngOnInit(): void {
  }

}
