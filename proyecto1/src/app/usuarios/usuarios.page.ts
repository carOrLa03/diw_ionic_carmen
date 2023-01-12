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

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getUsers().subscribe(res => {
      console.log("Res", res)
      this.usuarios = res;
    })

  }

  irhome() {
    this.router.navigate(['/home'])
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

}
