import { Component, OnInit } from '@angular/core';
import { HttpcallsService } from 'src/app/services/httpcalls.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  errorMessage:string='';

  nombre:string;
  apellidos:string;
  email:string;
  nombreUsuario:string;
  estado:string;
  fecha:string;



  constructor(private httpcallsService:HttpcallsService) { }

  ngOnInit(): void {
    this.errorMessage = '';
    this.httpcallsService.getUserDetails().subscribe(
      resp => {
        this.nombre = resp.name;
        this.apellidos = resp.surname;
        this.email = resp.email;
        this.nombreUsuario = resp.username;
        this.estado = (resp.enabled == true) ? 'Activo' : 'Inactivo';
        this.fecha = resp.signupdate;
      },
      error => {
        this.errorMessage = 'No está autorizado para ver la información de esta página. Por favor, realice el login en la aplicación.';
      }
    );
  }

}
