import { Component, OnInit } from '@angular/core';
import { RegistryModel } from '../../models/registry.model';
import { NgForm } from '@angular/forms';
import { HttpcallsService } from '../../services/httpcalls.service';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {

  registry = new RegistryModel();

  errorMessage:string = '';

  constructor(private httpcallsService:HttpcallsService) { }

  ngOnInit(): void {
  }

  registrarse(form:NgForm){
    this.errorMessage = '';
    if(this.registry.password != this.registry.passwordConfirm){
      this.errorMessage = 'Las contraseñas deben coincidir';
    }else{
      this.httpcallsService.createUser(this.registry).subscribe(
        resp => {
          this.errorMessage = 'Se ha creado el usuario correctamente';
        },
        error => {
          this.errorMessage = error.errorMessage;
        }
      );
    }
  }

}
