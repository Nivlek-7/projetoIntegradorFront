export class LoginModel{
  username: string;
  senha: string;

  constructor(username?: string, senha?: string){
    this.username = username;
    this.senha = senha;
  }
}
