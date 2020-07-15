import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginModel } from '../../../models/login.model';
import { JwtClientService } from '../../../services/jwt-client.service';
import { AuthService } from '../../auth.service';
import { SnackbarService } from './../../../shared/snackbar.service';
import { DonoService } from '../../../services/dono.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  selected = new FormControl(0);
  loginModel: LoginModel = new LoginModel();

  constructor(private route: Router, private authService: AuthService, private jwtService: JwtClientService, private snackbar: SnackbarService,
    private donoService: DonoService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.route.navigate(['/dono'])
    }
  }

  login() {
    if (!this.loginModel.username || !this.loginModel.senha){
      this.snackbar.error("Preencha todos os campos.");
      return;
    }

    this.authService.login(this.loginModel)
      .subscribe(sucess => {
        if (sucess) {
          this.route.navigate(['/dono'])
        }
      })
  }

  registrar(form: NgForm) {
    this.donoService.register(form.value).subscribe(
      success => {
        this.snackbar.success('Dono registrado com sucesso.');
        setInterval(xd => this.selected.setValue(this.selected.value - 1), 1000);
        //this.selected.setValue(this.selected.value - 1);
      }, error => this.snackbar.error('Erro ao registrar dono.')
    )
  }
}
