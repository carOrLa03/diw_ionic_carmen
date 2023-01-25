import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.page.html',
  styleUrls: ['./ciudad.page.scss'],
})
export class CiudadPage implements OnInit {

  id: any;
  finalId: any;
  ciudades: any = []
  name: any
  image: any;
  description: any


  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id")
    this.finalId = this.id - 1
    console.log(this.id)

    this.getCiudades().subscribe(res => { 
      console.log(res)
      this.ciudades = res
      this.name = this.ciudades[this.finalId].name 
      this.image = this.ciudades[this.finalId].image
      this.description = this.ciudades[this.finalId].description
    })
    
    
  }

  getCiudades() { 
    return this.http
      .get("assets/Files/ciudades.json")
      .pipe(
        map((res: any) => { return res.data; })
    )
  }

}
