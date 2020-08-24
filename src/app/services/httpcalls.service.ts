import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Constantes } from '../utils/constantes';
import { map, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { RegistryModel } from '../models/registry.model';

@Injectable({
  providedIn: 'root'
})
export class HttpcallsService {

  constructor(private http: HttpClient) { }

  getToken(username:string, password:string) {

    const header = new HttpHeaders({
      'Authorization':'Basic bG9naW5hcHB1c2VyOmwwZzFuNHBwNXMyci4='
    });

    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

     return this.http.post(Constantes.URL_LOGIN, body, {headers: header})
      .pipe(
        map( (resp:any) => {
          window.sessionStorage.setItem("username",username);
          return resp.access_token;
        }),
        catchError(error => {return throwError(error)})
      );
  }

  createUser(user:RegistryModel){

    return this.http.post(Constantes.URL_REGISTRO, user)
    .pipe(
      map((resp:any) => {
        return resp;
      }),
      catchError(error => {return throwError(error)})
    );

  }

  getUserDetails(){
    const token:string = window.sessionStorage.getItem("access_token");
    const username:string = window.sessionStorage.getItem("username");
    if(token){
      const header = new HttpHeaders({
        'Authorization':'Bearer '+token
      });
      return this.http.get(Constantes.URL_PERFIL+username, {headers:header})
      .pipe(
        map((resp:any) => {
          return resp;
        }),
        catchError(error => {return throwError(error)})
      );
    }else{
      return this.http.get(Constantes.URL_PERFIL+username)
      .pipe(
        map((resp:any) => {
          return resp;
        }),
        catchError(error => {return throwError(error)})
      );
    }
  }

}
