import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  usuarios: any = [];
  permission: boolean | undefined;

  searchUsuario: any;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.permission = true; //si tenemos permisos, nos mostrará los clientes
    this.getUsers().subscribe(res => {
      console.log("Res", res)
      this.usuarios = res;
      this.searchUsuario = this.usuarios;
    })

  }

  irhome() {
    this.router.navigate(['/'])
  }

  getUsers() {
    return this.http
      .get("assets/Files/usuarios.json")
      .pipe(
        map((res: any) => {
          return res.data;
        })
      )
  }

  searchClientes(event: any) {
    const text = event.target.value
    this.searchUsuario = this.usuarios

    if (text && text.trim() != "") { //si el texto es diferente a vacío
      this.searchUsuario = this.searchUsuario.filter((user: any) => { //hacemos una busqueda en el usuario
        return (user.name.toLowerCase().indexOf(text.toLowerCase()) > -1); //lodevolvemos en minuscula para que pueda realizar la busqueda sin problemas
      })
    }
  }

}
