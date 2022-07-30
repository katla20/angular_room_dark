import { Component, VERSION } from '@angular/core';
import { cellState } from './interfaces/data.interface';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  dimension = 'x[5],y[7]';
  bulbs = '6';
  public map_grid: Array<Array<cellState>> = [
    // cellState
    // bulb (true o false)
    // light (true o false)
    // wall (true o false)

    [
      { light: false, bulb: false, wall: false },
      { light: true, bulb: false, wall: false },
      { light: true, bulb: false, wall: false },
    ],
    [
      { light: false, bulb: false, wall: true },
      { light: true, bulb: true, wall: false },
      { light: false, bulb: false, wall: true },
      { light: false, bulb: false, wall: true },
    ],
  ];

  constructor() {}

  ngOnInit(): void {
    console.log('holaaa');
    //debugger
  }
  onFileInput($event) {
    console.log('click');
  }

  ligthGrid() {
    console.log('test event ligthGrid');
  }
  initGrid() {
    console.log('test event initGrid');
  }
  randomGrid() {
    console.log('test event randomGrid');
  }
}
