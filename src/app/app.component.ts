import { Component, VERSION } from '@angular/core';
import { cellState } from './interfaces/data.interface';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public tittle = 'Angular ' + VERSION.major;
  public dimension = 'x[5],y[7]';
  public bulbs = '6';
  private selectedFile;
  public readyUpload: boolean = true;

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

  onLogin() {}

  ngOnInit(): void {
    console.log('holaaa');
    //debugger
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

  loadTxt(data: Array<Array<0 | 1>>) {
    // this.loadMatrix(data);
    // this.testMatrix.testPatterns(this.tempMatrixs);
    // this.showOriginalMatrix()
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    console.log(event);
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, 'UTF-8');
    fileReader.onload = () => {
      let data: Array<Array<0 | 1>> = JSON.parse(
        fileReader.result as string
      ) as Array<Array<any>>;
      console.log(data);
    };
  }
}
