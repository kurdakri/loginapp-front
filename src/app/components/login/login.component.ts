import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../models/login.model';
import { NgForm } from '@angular/forms';
import { HttpcallsService } from '../../services/httpcalls.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = new LoginModel();

  errorMessage:string = '';

  constructor(private httpcallsService:HttpcallsService) { }

  ngOnInit(): void {
  }

  acceder(form:NgForm){
    this.httpcallsService.getToken(this.login.username, this.login.password)
    .subscribe(
    resp => {
      this.errorMessage = '';
      window.sessionStorage.setItem("access_token",resp);
    },
    error => {
      if(error.status == '500'){
        this.errorMessage = 'El usuario introducido no existe o no se ha podido recuperar en este momento.';
      }else {
        this.errorMessage = 'Las credenciales del usuario no son correctas.';
      }
    });
  }

}
