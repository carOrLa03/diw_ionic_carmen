import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.page.html',
  styleUrls: ['./ciudades.page.scss'],
})
export class CiudadesPage implements OnInit {
  ciudades: any = [];
  searchCiudad: any;


  constructor(private router: Router, private http: HttpClient, public toastController: ToastController) { }

  ngOnInit() {
    this.getCiudades().subscribe(res => {
      console.log("res", res);
      this.ciudades = res;
      this.searchCiudad = res;
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Ciudad Seleccionada',
      duration: 2000,
      position: 'middle'
    })
    toast.present()
  }

  async presentAlert() {
    const alert = await this.toastController.create({
      header: 'Borrar Ciudad',
      message: 'Se ha borrado la ciudad correctamente',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Ciudad eliminada')
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancelado')
          }
        }
      ]

    })
    await alert.present()
    let result = await alert.onDidDismiss()
    console.log(result)
  }
  getCiudades() {
    return this.http
      .get("assets/Files/ciudades.json")
      .pipe(
        map((res: any) => {
          return res.data;
        })
      )
  }

  irHome() {
    this.router.navigate(['/'])
  }

  searchCiudades(event: any) {
    const text = event.target.value
    this.searchCiudad = this.ciudades

    if (text && text.trim() != "") {
      this.searchCiudad = this.searchCiudad.filter((ciudad: any) => {
        return (ciudad.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
      })
    }
  }

}
