import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  code: any;

  constructor(private barcoScanner: BarcodeScanner) { }

  ngOnInit() {
  }

  scan() {
    this.barcoScanner.scan().then(barcoScanner => {

      this.code = barcoScanner.text
      console.log('Barcode data', this.code);
    }).catch(err => {
      console.log('Error', err)
    })
  }

}
